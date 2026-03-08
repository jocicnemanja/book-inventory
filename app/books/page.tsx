import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BooksGrid } from '@/components/grid';
import { BookPagination } from '@/components/book-pagination';
import {
  estimateTotalBooks,
  fetchBooksWithPagination,
  ITEMS_PER_PAGE,
} from '@/lib/db/queries';
import { parseSearchParams } from '@/lib/url-state';

export const metadata: Metadata = {
  title: 'Bücher online durchsuchen — Reihenfolge, Bewertung & Filter',
  description:
    'Über 2 Millionen Bücher durchsuchen und filtern: Finde Bücher nach Autor, Genre, Bewertung und Sprache. Fantasy, Krimi, Thriller, Sci-Fi und Klassiker — mit Buchreihenfolge auf einen Blick.',
  openGraph: {
    title: 'Bücher durchsuchen | Buchinventar',
    description:
      'Bücher nach Autor, Genre und Bewertung suchen. Buchreihen in der richtigen Reihenfolge entdecken.',
    type: 'website',
    locale: 'de_DE',
    siteName: 'Buchinventar',
  },
};

export default async function BooksPage(
  props: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const searchParams = await props.searchParams;
  const parsedSearchParams = parseSearchParams(searchParams);

  const [books, estimatedTotal] = await Promise.all([
    fetchBooksWithPagination(parsedSearchParams),
    estimateTotalBooks(parsedSearchParams),
  ]);

  const totalPages = Math.ceil(estimatedTotal / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Number(parsedSearchParams.page) || 1);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto min-h-[200px]">
        <div className="group-has-[[data-pending]]:animate-pulse p-4">
          <BooksGrid books={books} searchParams={parsedSearchParams} />
        </div>
      </div>
      <div className="mt-auto p-4 border-t">
        <Suspense fallback={null}>
          <BookPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={estimatedTotal}
            searchParams={parsedSearchParams}
          />
        </Suspense>
      </div>
    </div>
  );
}
