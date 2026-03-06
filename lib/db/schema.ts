import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  decimal,
  json,
  vector,
  primaryKey,
  index,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export type SelectBook = typeof books.$inferSelect;
export type Book = Pick<SelectBook, 'id' | 'title' | 'image_url' | 'thumbhash'>;
export type SelectAuthor = typeof authors.$inferSelect;
export type Author = Pick<SelectAuthor, 'id' | 'name'>;

export const authors = pgTable('authors', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  average_rating: decimal('average_rating', { precision: 3, scale: 2 }),
  text_reviews_count: integer('text_reviews_count'),
  ratings_count: integer('ratings_count'),
});

export const books = pgTable(
  'books',
  {
    id: serial('id').primaryKey(),
    isbn: text('isbn').unique(),
    isbn13: text('isbn13'),
    title: text('title').notNull(),
    publication_year: integer('publication_year'),
    publisher: text('publisher'),
    image_url: text('image_url'),
    description: text('description'),
    num_pages: integer('num_pages'),
    language_code: text('language_code'),
    text_reviews_count: integer('text_reviews_count'),
    ratings_count: integer('ratings_count'),
    average_rating: decimal('average_rating', { precision: 3, scale: 2 }),
    series: text('series').array(),
    popular_shelves: json('popular_shelves'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    metadata: json('metadata'),
    embedding: vector('embedding', { dimensions: 1536 }),
    title_tsv: text('title_tsv').notNull(),
    thumbhash: text('thumbhash'),
  },
  (table) => ({
    titleTsvIdx: index('idx_books_title_tsv').using(
      'gin',
      sql`to_tsvector('english', ${table.title_tsv})`
    ),
    publicationYearIdx: index('idx_books_publication_year').on(
      table.publication_year
    ),
    averageRatingIdx: index('idx_books_average_rating').on(
      table.average_rating
    ),
    languageCodeIdx: index('idx_books_language_code').on(table.language_code),
    numPagesIdx: index('idx_books_num_pages').on(table.num_pages),
    createdAtIdx: index('idx_books_created_at').on(table.createdAt),
    isbnIdx: index('idx_books_isbn').on(table.isbn),
    coveringIdx: index('idx_books_id_title_image_url_thumbhash').on(
      table.id,
      table.title,
      table.image_url,
      table.thumbhash
    ),
  })
);

export const bookToAuthor = pgTable(
  'book_to_author',
  {
    bookId: integer('book_id')
      .notNull()
      .references(() => books.id),
    authorId: text('author_id')
      .notNull()
      .references(() => authors.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.bookId, t.authorId] }),
  })
);

export const booksRelations = relations(books, ({ many }) => ({
  bookToAuthor: many(bookToAuthor),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
  bookToAuthor: many(bookToAuthor),
}));

export const bookToAuthorRelations = relations(bookToAuthor, ({ one }) => ({
  book: one(books, {
    fields: [bookToAuthor.bookId],
    references: [books.id],
  }),
  author: one(authors, {
    fields: [bookToAuthor.authorId],
    references: [authors.id],
  }),
}));

// ── Popular Series (curated from Goodreads Best Series list) ──

export const popularSeries = pgTable('popular_series', {
  id: serial('id').primaryKey(),
  rank: integer('rank').notNull(),
  series_name: text('series_name').notNull(),
  series_name_de: text('series_name_de'),
  author: text('author').notNull(),
  goodreads_score: integer('goodreads_score'),
  goodreads_url: text('goodreads_url'),
  avg_rating: decimal('avg_rating', { precision: 3, scale: 2 }),
  total_books_en: integer('total_books_en'),
  total_books_de: integer('total_books_de'),
});

export const popularSeriesBooks = pgTable(
  'popular_series_books',
  {
    id: serial('id').primaryKey(),
    series_id: integer('series_id')
      .notNull()
      .references(() => popularSeries.id, { onDelete: 'cascade' }),
    volume: integer('volume').notNull(),
    title_en: text('title_en').notNull(),
    title_de: text('title_de'),
    year_us: integer('year_us'),
    year_dach: integer('year_dach'),
    is_dach_split: boolean('is_dach_split').default(false).notNull(),
    dach_split_part: text('dach_split_part'),
    goodreads_url: text('goodreads_url'),
    isbn_us: text('isbn_us'),
    isbn_dach: text('isbn_dach'),
  },
  (table) => ({
    seriesIdIdx: index('idx_popular_series_books_series_id').on(table.series_id),
    volumeIdx: index('idx_popular_series_books_volume').on(table.volume),
  })
);

export const popularSeriesRelations = relations(popularSeries, ({ many }) => ({
  books: many(popularSeriesBooks),
}));

export const popularSeriesBooksRelations = relations(
  popularSeriesBooks,
  ({ one }) => ({
    series: one(popularSeries, {
      fields: [popularSeriesBooks.series_id],
      references: [popularSeries.id],
    }),
  })
);

export type PopularSeries = typeof popularSeries.$inferSelect;
export type PopularSeriesBook = typeof popularSeriesBooks.$inferSelect;
