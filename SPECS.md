# AI Book Assistant — Technical Specification

> **Project:** book-inventory (DACH Market Focus)
> **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Drizzle ORM · PostgreSQL (Neon) · Vercel AI SDK · OpenAI · Tailwind CSS
> **Date:** 2026-03-06

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current System Audit](#2-current-system-audit)
3. [Feature 1 — Data Cleaner](#3-feature-1--data-cleaner)
4. [Feature 2 — Mood-Based Discovery](#4-feature-2--mood-based-discovery)
5. [Feature 3 — Series Gap Analyzer](#5-feature-3--series-gap-analyzer)
6. [Database Schema Changes](#6-database-schema-changes)
7. [API Design](#7-api-design)
8. [Frontend Architecture](#8-frontend-architecture)
9. [AI Prompt Engineering](#9-ai-prompt-engineering)
10. [Security & Rate Limiting](#10-security--rate-limiting)
11. [Testing Strategy](#11-testing-strategy)
12. [Rollout Plan](#12-rollout-plan)

---

## 1. Executive Summary

This specification describes three AI-powered features that transform the existing book-inventory app into an intelligent book assistant tailored to the **DACH market** (Germany, Austria, Switzerland). The features are:

| # | Feature | Purpose | AI Model |
|---|---------|---------|----------|
| 1 | **Data Cleaner** | Ingest raw API data (DNB / Open Library), detect series, sort by publication & narrative order | `gpt-4o` (structured output) |
| 2 | **Mood-Based Discovery** | Natural-language German-language recommendations | `gpt-4o` + vector search (embeddings) |
| 3 | **Series Gap Analyzer** | Detect incomplete series in a user's personal booklist and suggest next reads | `gpt-4o` (structured output) |

All three features surface through **Next.js Server Actions** and **streaming UI** (Vercel AI SDK `streamUI` / `streamObject`), keeping the existing SSR architecture intact.

---

## 2. Current System Audit

### 2.1 Existing Database Schema

| Table | Key Columns | Notes |
|-------|-------------|-------|
| `books` | `id (serial PK)`, `isbn`, `isbn13`, `title`, `publication_year`, `publisher`, `image_url`, `description`, `num_pages`, `language_code`, `average_rating`, `series (text[])`, `popular_shelves (json)`, `metadata (json)`, `embedding (vector 1536)`, `title_tsv`, `thumbhash` | Already has `series` array, `embedding` vector, and `metadata` JSON |
| `authors` | `id (text PK)`, `name`, `average_rating`, `ratings_count` | Linked via junction table |
| `book_to_author` | `book_id`, `author_id` (composite PK) | Many-to-many |

### 2.2 Existing AI Infrastructure

- **Embedding model:** `text-embedding-3-small` (1536 dims) via `@ai-sdk/openai`
- **Metadata generation:** `gpt-4o-2024-08-06` with structured output (`generateObject`) producing `{ genre, mood, themes, targetAudience, writingStyle }`
- **Storage:** `embedding` column (pgvector) + `metadata` JSON column on `books`

### 2.3 Existing Frontend

- Server-side rendered grid with pagination
- Client-side filter panel (year, rating, language, pages, ISBN lists)
- Full-text search via `tsvector`/`tsquery`
- Book detail page with author, rating, description

### 2.4 Gaps to Fill

| Gap | Impact |
|-----|--------|
| No `user_booklists` table — cannot track per-user collections | Blocks Feature 3 |
| `series` is a flat `text[]` — no volume number, no narrative chronology | Blocks Features 1 & 3 |
| No DACH-specific metadata (German title, Erscheinungsdatum, Verlag DE) | Limits DACH relevance |
| No streaming AI chat UI component | Blocks Feature 2 interactive UX |
| `title_tsv` index uses `'english'` dictionary — no German stemming | Poor German search |

---

## 3. Feature 1 — Data Cleaner

### 3.1 Purpose

Accept raw JSON from German library APIs (DNB SRU, Open Library, Google Books DE) and produce a clean, series-aware, database-ready payload.

### 3.2 User Flow

```
Admin Panel → Paste/Upload JSON → AI processes → Preview table → Confirm → Upsert to DB
```

### 3.3 Input Contract

```typescript
// app/api/ai/data-cleaner/route.ts
interface DataCleanerRequest {
  /** Raw book records from external API */
  rawBooks: RawBookRecord[];
  /** Source API identifier */
  source: 'dnb' | 'open_library' | 'google_books';
  /** Language hint */
  locale: 'de' | 'de-AT' | 'de-CH';
}

interface RawBookRecord {
  [key: string]: unknown; // Shape varies per source API
}
```

### 3.4 Output Contract (AI Structured Output)

```typescript
import { z } from 'zod';

export const cleanedBookSchema = z.object({
  title: z.string(),
  title_original: z.string().optional().describe('Original title if translated'),
  series_name: z.string().nullable().describe('Series name (Reihenname)'),
  vol_number: z.number().nullable().describe('Volume number in publication order (Reihenfolge)'),
  narrative_order: z.number().nullable().describe('Position in story timeline (Inhaltliche Chronologie)'),
  is_prequel: z.boolean().describe('True if story chronology precedes publication order'),
  is_spinoff: z.boolean().describe('True if standalone spin-off of a series'),
  isbn: z.string().nullable(),
  isbn13: z.string().nullable(),
  publication_year: z.number().nullable().describe('Erscheinungsjahr'),
  publication_date_de: z.string().nullable().describe('German release date (Erscheinungsdatum) YYYY-MM-DD'),
  publisher_de: z.string().nullable().describe('German publisher (Verlag)'),
  language_code: z.string().default('ger'),
  summary_de: z.string().describe('German-language summary (Inhaltsbeschreibung), max 300 words'),
  num_pages: z.number().nullable(),
  authors: z.array(z.string()).describe('Author name(s)'),
});

export const dataCleanerOutputSchema = z.object({
  series_detected: z.boolean(),
  series_name: z.string().nullable(),
  total_volumes_known: z.number().nullable(),
  books: z.array(cleanedBookSchema),
  warnings: z.array(z.string()).describe('Any data quality issues detected'),
});
```

### 3.5 AI Prompt Template

```
SYSTEM:
You are a Data Architect for a German-language book-series web application
serving the DACH market (Germany, Austria, Switzerland).

You understand the following domain concepts:
- Reihenfolge: Publication order of books in a series
- Erscheinungsdatum: Release/publication date in the German market
- Inhaltliche Chronologie: Narrative/story timeline (may differ from publication order)
- Verlag: Publisher
- Reihenname: Series name

TASK:
1. Analyze the provided raw book records from source: {{source}}.
2. Detect if books belong to the same series.
3. Sort by *Publication Order* (Erscheinungsdatum).
4. Identify if *Narrative Chronology* differs from publication order
   (e.g., if a later-published book is a prequel).
5. Output clean structured JSON matching the provided schema.
6. Flag any data quality warnings (missing ISBNs, conflicting dates, duplicates).

DATA:
{{rawBooks}}
```

### 3.6 Implementation Plan

| File | Responsibility |
|------|---------------|
| `lib/ai/data-cleaner.ts` | AI prompt builder + `generateObject()` call with `dataCleanerOutputSchema` |
| `app/api/ai/data-cleaner/route.ts` | POST endpoint; validates input with Zod, calls cleaner, returns structured JSON |
| `app/admin/data-cleaner/page.tsx` | Admin UI: JSON textarea/file upload, preview table, confirm button |
| `lib/db/mutations.ts` | `upsertCleanedBooks()` — batch upsert to `books`, `authors`, `book_to_author`, `book_series` |

### 3.7 Database Writes

On confirmation, the cleaned data maps to:

| Target Table | Fields Written |
|-------------|----------------|
| `books` | All standard fields + `publication_date_de`, `publisher_de`, `summary_de` |
| `book_series` (NEW) | `book_id`, `series_name`, `vol_number`, `narrative_order`, `is_prequel`, `is_spinoff`, `total_volumes_known` |
| `authors` | Upsert by name match or create new |
| `book_to_author` | Link records |

---

## 4. Feature 2 — Mood-Based Discovery

### 4.1 Purpose

A conversational "AI Suggestion" feature where users describe what they want to read in German, and receive curated series recommendations with explanations.

### 4.2 User Flow

```
User types German query → AI streams response → 3 series cards rendered → User clicks to explore
```

### 4.3 Technical Architecture

```
┌──────────────────┐     ┌────────────────┐     ┌──────────────┐
│  DiscoveryPanel   │────▶│  Server Action  │────▶│  OpenAI API  │
│  (Client Component)│◀────│  streamObject() │◀────│  gpt-4o      │
│                    │     │                 │     │              │
│  useObject() hook  │     │  + pgvector     │     │              │
│  renders streaming │     │  similarity     │     │              │
└──────────────────┘     └────────────────┘     └──────────────┘
                                │
                                ▼
                        ┌──────────────┐
                        │  PostgreSQL   │
                        │  (Neon)       │
                        │  cosine sim   │
                        └──────────────┘
```

### 4.4 Discovery Request / Response

```typescript
// Input
interface DiscoveryRequest {
  query: string;          // e.g. "Ich suche einen Krimi, der in Wien spielt"
  locale: 'de' | 'de-AT' | 'de-CH';
  addressForm: 'Sie' | 'Du';  // Formal vs informal German
  maxResults?: number;    // default 3
}

// Output (streamed via AI SDK)
export const discoveryResultSchema = z.object({
  recommendations: z.array(z.object({
    series_name: z.string().describe('Name of the recommended series'),
    first_book_title: z.string().describe('Title of the first book to start with'),
    first_book_isbn: z.string().nullable(),
    author: z.string(),
    why_it_fits: z.string().describe('Explanation of why this matches the user mood, in German'),
    status: z.enum(['Abgeschlossen', 'Fortlaufend']).describe('Finished or Ongoing series'),
    total_volumes: z.number().nullable(),
    mood_tags: z.array(z.string()).describe('e.g. ["düster", "humorvoll", "spannend"]'),
    matched_book_ids: z.array(z.number()).describe('IDs of matching books in our database'),
  })),
  followup_question: z.string().describe('A follow-up question to refine the recommendation, in German'),
});
```

### 4.5 Two-Phase Retrieval Strategy

**Phase 1 — Vector Search (Semantic Retrieval)**

```sql
-- Embed the user's query, then find nearest books
SELECT id, title, series, metadata, image_url, thumbhash,
       1 - (embedding <=> $1::vector) AS similarity
FROM books
WHERE language_code IN ('ger', 'de')
  AND embedding IS NOT NULL
ORDER BY embedding <=> $1::vector
LIMIT 50;
```

**Phase 2 — AI Re-ranking + Explanation**

Pass the top 50 candidates into `gpt-4o` with the user's original query, requesting structured output per `discoveryResultSchema`. The AI selects the best 3, groups by series, and writes German explanations.

### 4.6 AI Prompt Template

```
SYSTEM:
You are an expert literary consultant specializing in the DACH book market
(Germany, Austria, Switzerland). You communicate in German using {{addressForm}}-Form.

TASK:
A user is looking for a new series to start.

User Input: "{{query}}"

CANDIDATE BOOKS (from our database, pre-filtered by semantic similarity):
{{candidateBooks}}

INSTRUCTIONS:
1. Select the 3 best-matching book series from the candidates.
2. For each series, provide the first book to start with.
3. Explain in German why it fits the user's mood/request.
4. State whether the series is 'Abgeschlossen' (Finished) or 'Fortlaufend' (Ongoing).
5. Provide mood tags in German.
6. Suggest a follow-up question to further refine the recommendation.

TONE: Helpful, knowledgeable, professional. Use {{addressForm}}-Form.
```

### 4.7 Implementation Plan

| File | Responsibility |
|------|---------------|
| `lib/ai/discovery.ts` | Embedding generation for query + pgvector similarity search + AI reranking |
| `app/actions/discover.ts` | Server Action using `streamObject()` from Vercel AI SDK |
| `components/discovery-panel.tsx` | Client component: text input, streaming cards, loading states |
| `components/discovery-card.tsx` | Single recommendation card with book cover, explanation, CTA |
| `lib/db/queries.ts` | New `findSimilarBooks(embedding, filters)` query function |

### 4.8 German Full-Text Search Enhancement

Add a German `tsvector` index alongside the existing English one:

```sql
ALTER TABLE books ADD COLUMN title_tsv_de text;
UPDATE books SET title_tsv_de = title WHERE language_code IN ('ger', 'de');
CREATE INDEX idx_books_title_tsv_de ON books
  USING gin(to_tsvector('german', title_tsv_de));
```

---

## 5. Feature 3 — Series Gap Analyzer

### 5.1 Purpose

Analyze a user's personal booklist, detect incomplete series, identify missing volumes, and suggest the optimal next read.

### 5.2 User Flow

```
User Booklist page → "Analyze My Collection" button → AI streams analysis
→ Gap report with missing books → "Next Read" recommendation
```

### 5.3 Prerequisites

- **User authentication** (NextAuth.js or Clerk)
- **`user_booklists` table** (see §6)

### 5.4 Analysis Pipeline

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────┐
│ User's books │────▶│ Group by series   │────▶│  AI Analysis   │
│ from DB      │     │ (DB-side + AI)    │     │  gpt-4o        │
└─────────────┘     └──────────────────┘     └────────────────┘
                                                      │
                                                      ▼
                                              ┌───────────────┐
                                              │ Gap Report +   │
                                              │ Next Read      │
                                              └───────────────┘
```

### 5.5 Output Contract

```typescript
export const seriesGapSchema = z.object({
  incomplete_series: z.array(z.object({
    series_name: z.string(),
    total_volumes: z.number(),
    owned_volumes: z.array(z.object({
      vol_number: z.number(),
      title: z.string(),
      book_id: z.number(),
    })),
    missing_volumes: z.array(z.object({
      vol_number: z.number(),
      title: z.string(),
      isbn: z.string().nullable(),
      available_in_db: z.boolean(),
      book_id: z.number().nullable(),
    })),
    completion_percentage: z.number().describe('0-100'),
    next_release_date_de: z.string().nullable().describe('Next upcoming German release date'),
    series_status: z.enum(['Abgeschlossen', 'Fortlaufend']),
  })),
  next_read_recommendation: z.object({
    book_title: z.string(),
    series_name: z.string(),
    vol_number: z.number(),
    reason: z.string().describe('Why this should be read next, in German'),
    book_id: z.number().nullable(),
  }),
  collection_stats: z.object({
    total_books: z.number(),
    total_series_started: z.number(),
    total_series_completed: z.number(),
    closest_to_completion: z.string().describe('Series name closest to being finished'),
  }),
});
```

### 5.6 AI Prompt Template

```
SYSTEM:
You are a series-tracking assistant for a DACH book inventory application.
You help readers identify gaps in their book collections and plan their next reads.

TASK:
Review this user's personal booklist and cross-reference with known series data.

USER'S BOOKLIST:
{{userBooks}}

KNOWN SERIES DATA (from database):
{{seriesData}}

INSTRUCTIONS:
1. Identify any incomplete series in the user's collection.
2. For each incomplete series, list specific missing volume numbers and titles.
3. Note the next upcoming German release date if the series is ongoing.
4. Create a 'Next Read' recommendation based on which series is closest to completion.
5. Provide collection statistics.

OUTPUT in German where user-facing text is involved.
```

### 5.7 Implementation Plan

| File | Responsibility |
|------|---------------|
| `lib/ai/series-gap.ts` | Build prompt from user books + series data, call `generateObject()` |
| `app/actions/analyze-collection.ts` | Server Action: fetch user books, enrich with series data, call AI |
| `components/gap-report.tsx` | Client component: series gap cards, progress bars, missing book lists |
| `components/next-read-card.tsx` | Highlighted recommendation card |
| `app/my-books/page.tsx` | User booklist page with "Analyze" CTA |
| `lib/db/queries.ts` | `fetchUserBooks(userId)`, `fetchSeriesInfo(seriesNames)` |

---

## 6. Database Schema Changes

### 6.1 New Tables

```sql
-- Series tracking (normalized from the flat books.series array)
CREATE TABLE book_series (
  id            SERIAL PRIMARY KEY,
  book_id       INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  series_name   TEXT NOT NULL,
  vol_number    INTEGER,                    -- Publication order position
  narrative_order INTEGER,                  -- Story timeline position
  is_prequel    BOOLEAN DEFAULT FALSE,
  is_spinoff    BOOLEAN DEFAULT FALSE,
  total_volumes_known INTEGER,              -- NULL if unknown/ongoing
  UNIQUE(book_id, series_name)
);

CREATE INDEX idx_book_series_name ON book_series(series_name);
CREATE INDEX idx_book_series_book_id ON book_series(book_id);

-- User booklists (requires auth)
CREATE TABLE users (
  id          TEXT PRIMARY KEY,             -- Auth provider ID
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  locale      TEXT DEFAULT 'de',            -- de, de-AT, de-CH
  address_form TEXT DEFAULT 'Sie',          -- Sie or Du
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_booklist (
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id     INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  status      TEXT DEFAULT 'owned',         -- owned, reading, wishlist, read
  added_at    TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, book_id)
);

CREATE INDEX idx_user_booklist_user ON user_booklist(user_id);
CREATE INDEX idx_user_booklist_status ON user_booklist(user_id, status);
```

### 6.2 Columns Added to `books`

```sql
ALTER TABLE books ADD COLUMN title_de           TEXT;          -- German title
ALTER TABLE books ADD COLUMN publication_date_de DATE;          -- German release date
ALTER TABLE books ADD COLUMN publisher_de        TEXT;          -- German publisher
ALTER TABLE books ADD COLUMN summary_de          TEXT;          -- German summary
ALTER TABLE books ADD COLUMN title_tsv_de        TEXT;          -- German tsvector source
```

### 6.3 Drizzle Schema Additions

```typescript
// lib/db/schema.ts — additions

export const bookSeries = pgTable('book_series', {
  id: serial('id').primaryKey(),
  bookId: integer('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
  seriesName: text('series_name').notNull(),
  volNumber: integer('vol_number'),
  narrativeOrder: integer('narrative_order'),
  isPrequel: boolean('is_prequel').default(false),
  isSpinoff: boolean('is_spinoff').default(false),
  totalVolumesKnown: integer('total_volumes_known'),
}, (table) => ({
  seriesNameIdx: index('idx_book_series_name').on(table.seriesName),
  bookIdIdx: index('idx_book_series_book_id').on(table.bookId),
  uniqueBookSeries: unique().on(table.bookId, table.seriesName),
}));

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  locale: text('locale').default('de'),
  addressForm: text('address_form').default('Sie'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userBooklist = pgTable('user_booklist', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bookId: integer('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
  status: text('status').default('owned'),
  addedAt: timestamp('added_at').defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.bookId] }),
  userIdx: index('idx_user_booklist_user').on(t.userId),
  statusIdx: index('idx_user_booklist_status').on(t.userId, t.status),
}));
```

---

## 7. API Design

### 7.1 Route Overview

| Method | Route | Auth | Purpose | Feature |
|--------|-------|------|---------|---------|
| POST | `/api/ai/data-cleaner` | Admin | Clean raw API data | F1 |
| POST | `/api/ai/data-cleaner/confirm` | Admin | Upsert cleaned data to DB | F1 |
| POST | `/api/ai/discover` | Public | Mood-based discovery (streaming) | F2 |
| POST | `/api/ai/analyze-collection` | User | Series gap analysis (streaming) | F3 |
| GET | `/api/user/booklist` | User | Fetch user's booklist | F3 |
| POST | `/api/user/booklist` | User | Add book to booklist | F3 |
| DELETE | `/api/user/booklist/:bookId` | User | Remove book from booklist | F3 |

### 7.2 Server Actions (Preferred for F2, F3)

```typescript
// app/actions/discover.ts
'use server';
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { discoveryResultSchema } from '@/lib/ai/discovery';
import { createStreamableValue } from 'ai/rsc';

export async function discoverBooks(query: string, locale: string, addressForm: string) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = streamObject({
      model: openai('gpt-4o'),
      schema: discoveryResultSchema,
      prompt: buildDiscoveryPrompt(query, locale, addressForm, candidates),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
```

### 7.3 Error Handling

| Error | Status | Action |
|-------|--------|--------|
| Invalid input JSON | 400 | Return Zod validation errors |
| OpenAI rate limit | 429 | Exponential backoff (3 retries), then 429 to client |
| OpenAI token limit | 413 | Chunk input data, process in batches |
| DB constraint violation | 409 | Return conflicting records for user review |
| Auth required | 401 | Redirect to login |

---

## 8. Frontend Architecture

### 8.1 New Components

```
components/
  ai/
    discovery-panel.tsx      # Main discovery UI with text input + streaming
    discovery-card.tsx       # Single recommendation card
    data-cleaner-form.tsx    # JSON upload + preview table
    gap-report.tsx           # Series gap analysis results
    gap-series-card.tsx      # Single incomplete series display
    next-read-card.tsx       # Highlighted "read next" suggestion
    ai-loading.tsx           # Skeleton/shimmer loader for AI responses
```

### 8.2 New Pages

```
app/
  admin/
    data-cleaner/
      page.tsx               # Admin: Data Cleaner UI (Feature 1)
  discover/
    page.tsx                 # Public: Mood-Based Discovery (Feature 2)
  my-books/
    page.tsx                 # Auth: User booklist + Series Gap (Feature 3)
```

### 8.3 Discovery Panel Component (Key Component)

```tsx
// components/ai/discovery-panel.tsx
'use client';

import { useObject } from 'ai/react'; // Vercel AI SDK hook for streaming objects
import { useState } from 'react';
import { DiscoveryCard } from './discovery-card';
import { discoveryResultSchema } from '@/lib/ai/discovery';

export function DiscoveryPanel() {
  const [query, setQuery] = useState('');
  const { object, submit, isLoading, error } = useObject({
    api: '/api/ai/discover',
    schema: discoveryResultSchema,
  });

  return (
    <div className="space-y-6">
      {/* Search input */}
      <form onSubmit={(e) => { e.preventDefault(); submit({ query }); }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Was möchten Sie als nächstes lesen?"
          className="w-full p-4 rounded-lg border"
        />
      </form>

      {/* Streaming results */}
      {object?.recommendations?.map((rec, i) => (
        <DiscoveryCard key={i} recommendation={rec} loading={isLoading} />
      ))}

      {/* Follow-up */}
      {object?.followup_question && (
        <p className="text-muted-foreground italic">{object.followup_question}</p>
      )}
    </div>
  );
}
```

### 8.4 Layout Integration

The Discovery Panel integrates into the existing layout as a new route (`/discover`) or as a collapsible panel in the sidebar alongside existing filters.

```
┌─────────────────────────────────────────────────────┐
│ ┌──────────┐  ┌──────────────────────────────────┐  │
│ │ Filters  │  │ Search bar                       │  │
│ │          │  ├──────────────────────────────────┤  │
│ │ ──────── │  │                                  │  │
│ │ Year     │  │  Book Grid / Discovery Results   │  │
│ │ Rating   │  │                                  │  │
│ │ Language │  │                                  │  │
│ │ Pages    │  │                                  │  │
│ │ ──────── │  │                                  │  │
│ │ AI       │  │                                  │  │
│ │ Discover │  │                                  │  │
│ │ [panel]  │  │                                  │  │
│ └──────────┘  └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 9. AI Prompt Engineering

### 9.1 System Prompts (Shared Context)

All three features share a base system prompt:

```
BASE SYSTEM CONTEXT:
You are an AI assistant for a book inventory application focused on the
DACH market (Deutschland, Österreich, Schweiz).

DOMAIN VOCABULARY:
- Reihenfolge = Publication order of books in a series
- Erscheinungsdatum = Publication/release date
- Inhaltliche Chronologie = Narrative/story timeline
- Verlag = Publisher
- Reihenname = Series name
- Abgeschlossen = Series completed/finished
- Fortlaufend = Series ongoing
- Vorgeschichte/Prequel = Prequel
- Spin-off = Spin-off/side story

OUTPUT LANGUAGE: German (for user-facing text)
TECHNICAL OUTPUT: English field names, German values
```

### 9.2 Temperature Settings

| Feature | Temperature | Reason |
|---------|------------|--------|
| Data Cleaner | 0.1 | Deterministic, factual output |
| Mood Discovery | 0.7 | Creative, varied recommendations |
| Series Gap | 0.2 | Factual analysis with slight flexibility |

### 9.3 Token Budget

| Feature | Max Input | Max Output | Model |
|---------|-----------|------------|-------|
| Data Cleaner | ~8,000 tokens (batch of ~20 books) | ~4,000 | gpt-4o |
| Mood Discovery | ~6,000 tokens (query + 50 candidates) | ~2,000 | gpt-4o |
| Series Gap | ~10,000 tokens (user library + series data) | ~3,000 | gpt-4o |

### 9.4 Prompt Chaining (Data Cleaner)

For large datasets (>20 books), use a two-step chain:

```
Step 1: "Classify these books into groups by series. Return only series assignments."
Step 2: "For series '{{seriesName}}', sort and enrich with full metadata."
```

This keeps each call within token limits and improves accuracy.

---

## 10. Security & Rate Limiting

### 10.1 Authentication

| Feature | Auth Level | Implementation |
|---------|-----------|---------------|
| Data Cleaner | Admin only | Server-side role check on API route |
| Mood Discovery | Public (rate-limited) | No auth required, IP-based rate limit |
| Series Gap | Authenticated user | NextAuth session validation |

### 10.2 Rate Limits

| Endpoint | Limit | Window | Strategy |
|----------|-------|--------|----------|
| `/api/ai/discover` | 10 requests | per minute per IP | Sliding window (Upstash Redis) |
| `/api/ai/analyze-collection` | 5 requests | per hour per user | Fixed window |
| `/api/ai/data-cleaner` | 20 requests | per hour per admin | Fixed window |

### 10.3 Input Validation

- All AI inputs sanitized through Zod schemas before prompt construction
- Maximum input size: 100KB per request
- Strip HTML/script tags from user queries
- Validate ISBN format (10/13 digit check)

### 10.4 Cost Controls

| Control | Implementation |
|---------|---------------|
| Token metering | Log `usage.totalTokens` from each AI response |
| Monthly budget cap | Environment variable `AI_MONTHLY_BUDGET_USD`, checked before each call |
| Caching | Cache discovery results for identical queries (5-min TTL, Vercel KV) |
| Embedding reuse | Only embed new books; skip if `embedding IS NOT NULL` |

---

## 11. Testing Strategy

### 11.1 Unit Tests

| Module | Test Coverage |
|--------|--------------|
| `lib/ai/data-cleaner.ts` | Schema validation, prompt building, edge cases (missing fields, duplicates) |
| `lib/ai/discovery.ts` | Embedding generation mock, candidate filtering, response parsing |
| `lib/ai/series-gap.ts` | Series grouping logic, gap detection, completion calculation |
| `lib/db/queries.ts` | New query functions with test database |

### 11.2 Integration Tests

| Scenario | Approach |
|----------|----------|
| Data Cleaner end-to-end | Feed sample DNB JSON → verify DB state after confirm |
| Discovery streaming | Mock OpenAI, verify streamed partial objects render correctly |
| Series Gap accuracy | Seed user with known incomplete series → verify gap report |

### 11.3 AI Output Validation

```typescript
// lib/ai/validation.ts
export function validateDiscoveryResult(result: unknown): boolean {
  const parsed = discoveryResultSchema.safeParse(result);
  if (!parsed.success) {
    console.error('AI output validation failed:', parsed.error);
    return false;
  }
  // Business rules
  const { recommendations } = parsed.data;
  return recommendations.every(r =>
    r.series_name.length > 0 &&
    r.first_book_title.length > 0 &&
    ['Abgeschlossen', 'Fortlaufend'].includes(r.status)
  );
}
```

### 11.4 Prompt Regression Tests

Maintain a `tests/prompts/` directory with:
- Golden input/output pairs for each feature
- Automated comparison using cosine similarity (>0.85 threshold)
- CI pipeline runs prompt tests on every PR touching `lib/ai/`

---

## 12. Rollout Plan

### Phase 1 — Foundation (Week 1-2)

- [ ] Database migration: add `book_series`, `users`, `user_booklist` tables
- [ ] Add DACH columns to `books` table (`title_de`, `publication_date_de`, `publisher_de`, `summary_de`, `title_tsv_de`)
- [ ] Update Drizzle schema and generate migration
- [ ] Create German tsvector index
- [ ] Set up authentication (NextAuth.js / Clerk)

### Phase 2 — Data Cleaner (Week 2-3)

- [ ] Implement `lib/ai/data-cleaner.ts` with structured output
- [ ] Build admin data-cleaner page (`app/admin/data-cleaner/page.tsx`)
- [ ] Build `lib/db/mutations.ts` for batch upsert
- [ ] Create API route with admin auth guard
- [ ] Test with sample DNB and Open Library data
- [ ] Run Data Cleaner on existing `books.series` data to populate `book_series`

### Phase 3 — Mood Discovery (Week 3-4)

- [ ] Implement `findSimilarBooks()` vector search query
- [ ] Implement `lib/ai/discovery.ts` with two-phase retrieval
- [ ] Build `components/ai/discovery-panel.tsx` with streaming UI
- [ ] Add `/discover` route
- [ ] Integrate into sidebar layout
- [ ] Set up rate limiting (Upstash Redis)
- [ ] Add German embeddings for German-language books

### Phase 4 — Series Gap Analyzer (Week 4-5)

- [ ] Implement user booklist CRUD (API + UI)
- [ ] Build `lib/ai/series-gap.ts`
- [ ] Build `components/ai/gap-report.tsx` and `next-read-card.tsx`
- [ ] Add `/my-books` route with analysis CTA
- [ ] Test with various incomplete collection scenarios

### Phase 5 — Polish & Launch (Week 5-6)

- [ ] Cost monitoring dashboard (admin)
- [ ] Prompt regression test suite
- [ ] Performance optimization (response caching, streaming)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] German localization of all UI strings
- [ ] Documentation and README update

---

## Appendix A — Environment Variables

```env
# Existing
POSTGRES_URL=postgresql://...
OPENAI_API_KEY=sk-...

# New
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Rate limiting
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# Cost controls
AI_MONTHLY_BUDGET_USD=50
AI_CACHE_TTL_SECONDS=300

# Feature flags
FEATURE_DATA_CLEANER=true
FEATURE_DISCOVERY=true
FEATURE_SERIES_GAP=true
```

## Appendix B — File Tree (Final State)

```
app/
  layout.tsx
  page.tsx
  error.tsx
  loading.tsx
  globals.css
  [id]/
    page.tsx
    loading.tsx
  discover/                          # NEW — Feature 2
    page.tsx
    loading.tsx
  my-books/                          # NEW — Feature 3
    page.tsx
    loading.tsx
  admin/                             # NEW — Feature 1
    data-cleaner/
      page.tsx
  api/
    ai/
      data-cleaner/
        route.ts                     # NEW — Feature 1
        confirm/
          route.ts                   # NEW — Feature 1
      discover/
        route.ts                     # NEW — Feature 2
      analyze-collection/
        route.ts                     # NEW — Feature 3
    user/
      booklist/
        route.ts                     # NEW — Feature 3
        [bookId]/
          route.ts                   # NEW — Feature 3
  actions/
    discover.ts                      # NEW — Feature 2 Server Action
    analyze-collection.ts            # NEW — Feature 3 Server Action

components/
  book-pagination.tsx
  filters.tsx
  grid.tsx
  photo.tsx
  search.tsx
  welcome-toast.tsx
  ai/                                # NEW
    discovery-panel.tsx              # Feature 2
    discovery-card.tsx               # Feature 2
    data-cleaner-form.tsx            # Feature 1
    gap-report.tsx                   # Feature 3
    gap-series-card.tsx              # Feature 3
    next-read-card.tsx               # Feature 3
    ai-loading.tsx                   # Shared
  ui/
    ...existing...

lib/
  url-state.ts
  use-backpressure.tsx
  utils.ts
  ai/
    create-embeddings.ts
    embeddings.ts
    data-cleaner.ts                  # NEW — Feature 1
    discovery.ts                     # NEW — Feature 2
    series-gap.ts                    # NEW — Feature 3
    validation.ts                    # NEW — Shared AI output validation
    prompts.ts                       # NEW — Shared prompt templates
  db/
    schema.ts                        # MODIFIED (new tables)
    queries.ts                       # MODIFIED (new query functions)
    mutations.ts                     # NEW (upsert logic)
    drizzle.ts
    migrate.ts
    migrations/
      0001_ai_assistant.sql          # NEW migration
      ...

tests/                               # NEW
  prompts/
    data-cleaner.test.ts
    discovery.test.ts
    series-gap.test.ts
  integration/
    data-cleaner.test.ts
    discovery.test.ts
    booklist.test.ts
```

## Appendix C — Key Dependencies to Add

```json
{
  "dependencies": {
    "next-auth": "^5.x",            // Authentication
    "@upstash/ratelimit": "^1.x",   // Rate limiting
    "@upstash/redis": "^1.x",       // Redis for caching + rate limits
    "@vercel/kv": "^2.x"            // Optional: Vercel KV for response caching
  }
}
```

---

*End of specification.*
