import type { Metadata } from 'next';
import {
  StarIcon,
  BookOpenIcon,
  GlobeIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchBookById, fetchBooksWithPagination } from '@/lib/db/queries';
import { Photo } from '@/components/photo';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { SearchParams, stringifySearchParams } from '@/lib/url-state';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://buchinventar.de';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const book = await fetchBookById(id);
  const authorStr = book.authors?.filter(Boolean).join(', ') || 'Unbekannt';
  const desc = book.description
    ? book.description.slice(0, 155).replace(/\s+\S*$/, '') + '…'
    : `Entdecke „${book.title}" von ${authorStr} — Bewertung, Seitenzahl & mehr.`;

  return {
    title: `„${book.title}" von ${authorStr} — Bewertung & Reihenfolge`,
    description: desc,
    alternates: {
      canonical: `${BASE_URL}/books/${id}`,
    },
    openGraph: {
      title: `${book.title} — ${authorStr} | Buchinventar`,
      description: desc,
      url: `${BASE_URL}/books/${id}`,
      siteName: 'Buchinventar',
      locale: 'de_DE',
      type: 'article',
      ...(book.image_url ? { images: [{ url: book.image_url, alt: book.title }] } : {}),
    },
  };
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'spa', label: 'Spanish' },
  { value: 'ita', label: 'Italian' },
  { value: 'ara', label: 'Arabic' },
  { value: 'fre', label: 'French' },
  { value: 'ger', label: 'German' },
  { value: 'ind', label: 'Indonesian' },
  { value: 'por', label: 'Portuguese' },
];

function getLanguageLabel(code: string | null): string {
  if (!code) return 'Unknown';
  const language = LANGUAGES.find((lang) => lang.value === code.toLowerCase());
  return language ? language.label : 'Unknown';
}

// Prerender the first page of books
export async function generateStaticParams() {
  try {
    const books = await fetchBooksWithPagination({});

    if (books.length > 0) {
      return books.map((book) => ({
        id: book.id.toString(),
      }));
    }
  } catch {
    // Database may not be available at build time
  }

  // Must return at least one entry for build-time validation
  return [{ id: '1' }];
}

export default async function Page(
  props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<SearchParams>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const book = await fetchBookById(params.id);

  // JSON-LD structured data (schema.org/Book)
  const authorStr = book.authors?.filter(Boolean).join(', ') || 'Unbekannt';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: (book.authors || []).filter(Boolean).map((a) => ({
      '@type': 'Person',
      name: a,
    })),
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.num_pages ? { numberOfPages: book.num_pages } : {}),
    ...(book.language_code ? { inLanguage: book.language_code } : {}),
    ...(book.image_url ? { image: book.image_url } : {}),
    ...(book.publisher ? { publisher: { '@type': 'Organization', name: book.publisher } } : {}),
    ...(book.publication_year ? { datePublished: String(book.publication_year) } : {}),
    ...(book.average_rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: book.average_rating,
            bestRating: '5',
            ratingCount: book.ratings_count ?? 0,
          },
        }
      : {}),
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Bücher', item: `${BASE_URL}/books` },
      { '@type': 'ListItem', position: 3, name: book.title, item: `${BASE_URL}/books/${params.id}` },
    ],
  };

  return (
    <ScrollArea className="px-4 h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb-Navigation */}
      <nav aria-label="Brotkrumen" className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
        <Link href="/" className="hover:text-foreground">Startseite</Link>
        <span>/</span>
        <Link href="/books" className="hover:text-foreground">Bücher</Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{book.title}</span>
      </nav>

      <Button variant="ghost" className="mb-4" asChild>
        <Link href={`/books?${stringifySearchParams(searchParams)}`}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Zurück zur Übersicht
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-1/2 md:w-1/4 mx-auto md:mx-0">
          <Photo
            src={book.image_url!}
            title={book.title}
            thumbhash={book.thumbhash!}
            priority={true}
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
          <div className="text-lg md:text-xl mb-4">
            {book.authors.map((author, index) => (
              <span key={author}>
                {author}
                {index < book.authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>

          <div className="flex items-center mb-4">
            <StarRating rating={book.average_rating} />
            <span className="text-lg font-semibold">
              {Number(book.average_rating).toFixed(1)}
            </span>
            <span className="text-gray-600 ml-2">
              ({Number(book.ratings_count).toLocaleString('de-DE')} Bewertungen)
            </span>
          </div>

          <p className="text-gray-700 mb-6">{book.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <BookOpenIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span>{book.num_pages} Seiten</span>
            </div>
            <div className="flex items-center">
              <GlobeIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span>{getLanguageLabel(book.language_code)}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span>{book.publication_year}</span>
            </div>
            <div className="flex items-center">
              <span>ISBN: {book.isbn || 'Keine Angabe'}</span>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function StarRating({ rating }: { rating: string | null }) {
  if (rating === null) return null;

  return (
    <div className="flex items-center mr-4">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`w-5 h-5 ${
            i < Math.floor(Number(rating))
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
