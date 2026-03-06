import Link from 'next/link';
import {
  fetchCuratedSeriesWithBooks,
  fetchPopularSeries,
  fetchPopularAuthors,
} from '@/lib/db/queries';
import {
  StarIcon,
  BookOpenIcon,
  UsersIcon,
  TrendingUpIcon,
  SplitIcon,
  GlobeIcon,
} from 'lucide-react';

export default async function HomePage() {
  const [curatedSeries, fallbackSeries, popularAuthors] = await Promise.all([
    fetchCuratedSeriesWithBooks(50).catch(() => []),
    fetchPopularSeries(50).catch(() => []),
    fetchPopularAuthors(50),
  ]);

  // Use curated data when available, fall back to dynamic aggregation
  const hasCuratedData = curatedSeries.length > 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                📚 Book Inventory
              </h1>
              <p className="mt-1 text-muted-foreground">
                Discover popular book series and top-rated authors
              </p>
            </div>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              <BookOpenIcon className="h-4 w-4" />
              Browse All Books
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column — Popular Series */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUpIcon className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Top 50 Book Series</h2>
              {hasCuratedData && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  EN / DE
                </span>
              )}
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-900 shadow-sm border overflow-hidden">
              {hasCuratedData ? (
                <CuratedSeriesList series={curatedSeries} />
              ) : (
                <FallbackSeriesList series={fallbackSeries} />
              )}
            </div>
          </section>

          {/* Right Column — Popular Authors */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <UsersIcon className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-semibold">Top 50 Authors</h2>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-900 shadow-sm border overflow-hidden">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {popularAuthors.map((author, index) => (
                  <li
                    key={author.id}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{author.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {author.average_rating && (
                          <span className="flex items-center gap-1">
                            <StarIcon className="h-3.5 w-3.5 text-yellow-500" />
                            {Number(author.average_rating).toFixed(1)}
                          </span>
                        )}
                        {author.text_reviews_count && (
                          <span>
                            {Number(author.text_reviews_count).toLocaleString()}{' '}
                            reviews
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {Number(author.ratings_count).toLocaleString()} ratings
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────────────
 * Curated series list with EN/DE titles & DACH splits
 * ────────────────────────────────────────────────── */
type CuratedSeriesItem = Awaited<
  ReturnType<typeof fetchCuratedSeriesWithBooks>
>[number];

function CuratedSeriesList({ series }: { series: CuratedSeriesItem[] }) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {series.map((s) => {
        const hasSplits = s.books.some((b) => b.is_dach_split);
        return (
          <details key={s.id} className="group">
            <summary className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-semibold">
                {s.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {s.series_name}
                  {s.series_name_de && s.series_name_de !== s.series_name && (
                    <span className="ml-2 text-sm text-muted-foreground font-normal">
                      / {s.series_name_de}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="truncate">{s.author}</span>
                  <span className="flex items-center gap-1">
                    <StarIcon className="h-3.5 w-3.5 text-yellow-500" />
                    {s.avg_rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpenIcon className="h-3.5 w-3.5" />
                    {s.total_books_en} EN
                    {s.total_books_de ? ` / ${s.total_books_de} DE` : ''}
                  </span>
                  {hasSplits && (
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                      <SplitIcon className="h-3.5 w-3.5" />
                      DACH&nbsp;Split
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground group-open:rotate-90 transition-transform">
                ▶
              </span>
            </summary>

            {/* Expanded book list */}
            <div className="bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 px-4 py-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="text-left pb-2 pr-2">#</th>
                    <th className="text-left pb-2 pr-2">
                      <span className="flex items-center gap-1">
                        <GlobeIcon className="h-3 w-3" />
                        USA Title
                      </span>
                    </th>
                    <th className="text-left pb-2 pr-2">
                      <span className="flex items-center gap-1">
                        <GlobeIcon className="h-3 w-3" />
                        DACH Title
                      </span>
                    </th>
                    <th className="text-right pb-2">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {s.books.map((book, idx) => (
                    <tr
                      key={idx}
                      className={
                        book.is_dach_split
                          ? 'bg-amber-50/50 dark:bg-amber-900/10'
                          : ''
                      }
                    >
                      <td className="py-1.5 pr-2 text-muted-foreground align-top">
                        {book.volume}
                      </td>
                      <td className="py-1.5 pr-2 align-top">
                        {book.title_en}
                      </td>
                      <td className="py-1.5 pr-2 align-top">
                        {book.title_de ? (
                          <span>
                            {book.title_de}
                            {book.is_dach_split && book.dach_split_part && (
                              <span className="ml-1 inline-flex items-center text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                                <SplitIcon className="h-3 w-3 mr-0.5" />
                                {book.dach_split_part}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-1.5 text-right text-muted-foreground align-top whitespace-nowrap">
                        {book.year_us || '—'}
                        {book.year_dach && book.year_dach !== book.year_us
                          ? ` / ${book.year_dach}`
                          : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────
 * Fallback when curated data isn't seeded yet
 * ────────────────────────────────────────────────── */
function FallbackSeriesList({
  series,
}: {
  series: {
    series_name: string;
    book_count: number;
    avg_rating: string;
    total_ratings: string;
  }[];
}) {
  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
      {series.map((s, index) => (
        <li
          key={s.series_name}
          className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-semibold">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{s.series_name}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpenIcon className="h-3.5 w-3.5" />
                {s.book_count} {s.book_count === 1 ? 'book' : 'books'}
              </span>
              <span className="flex items-center gap-1">
                <StarIcon className="h-3.5 w-3.5 text-yellow-500" />
                {s.avg_rating}
              </span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {Number(s.total_ratings).toLocaleString()} ratings
          </span>
        </li>
      ))}
    </ul>
  );
}
