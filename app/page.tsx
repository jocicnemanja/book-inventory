import Link from 'next/link';
import {
  POPULAR_SERIES_DATA,
  type SeriesData,
} from '@/lib/db/popular-series-data';
import {
  StarIcon,
  BookOpenIcon,
  SplitIcon,
  GlobeIcon,
  ArrowRightIcon,
  SearchIcon,
  LibraryIcon,
  TrendingUpIcon,
} from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://buchinventar.de';

// Top 50 Autoren – statisch vorgerendert
const POPULAR_AUTHORS = [
  { id: '1', name: 'J.K. Rowling', avg_rating: '4.47', ratings: 345080 },
  { id: '2', name: 'Rick Riordan', avg_rating: '4.31', ratings: 248936 },
  { id: '3', name: 'Cassandra Clare', avg_rating: '4.15', ratings: 219165 },
  { id: '4', name: 'Suzanne Collins', avg_rating: '4.35', ratings: 146448 },
  { id: '5', name: 'Veronica Roth', avg_rating: '4.13', ratings: 135624 },
  { id: '6', name: 'Sarah J. Maas', avg_rating: '4.19', ratings: 131000 },
  { id: '7', name: 'George R.R. Martin', avg_rating: '4.45', ratings: 83002 },
  { id: '8', name: 'J.R.R. Tolkien', avg_rating: '4.41', ratings: 81411 },
  { id: '9', name: 'Stephenie Meyer', avg_rating: '3.68', ratings: 92416 },
  { id: '10', name: 'Richelle Mead', avg_rating: '4.13', ratings: 95747 },
  { id: '11', name: 'James Dashner', avg_rating: '4.06', ratings: 55456 },
  { id: '12', name: 'Christopher Paolini', avg_rating: '3.97', ratings: 53840 },
  { id: '13', name: 'Kiera Cass', avg_rating: '4.07', ratings: 50545 },
  { id: '14', name: 'Marissa Meyer', avg_rating: '4.12', ratings: 43614 },
  { id: '15', name: 'Lemony Snicket', avg_rating: '4.03', ratings: 42418 },
  { id: '16', name: 'Scott Westerfeld', avg_rating: '3.84', ratings: 38427 },
  { id: '17', name: 'Becca Fitzpatrick', avg_rating: '3.92', ratings: 35764 },
  { id: '18', name: 'Douglas Adams', avg_rating: '4.22', ratings: 34926 },
  { id: '19', name: 'L.M. Montgomery', avg_rating: '4.33', ratings: 33109 },
  { id: '20', name: 'Philip Pullman', avg_rating: '4.03', ratings: 32556 },
  { id: '21', name: 'Diana Gabaldon', avg_rating: '4.26', ratings: 32285 },
  { id: '22', name: 'C.S. Lewis', avg_rating: '4.24', ratings: 32205 },
  { id: '23', name: 'Kristin Cashore', avg_rating: '4.06', ratings: 30747 },
  { id: '24', name: 'Stieg Larsson', avg_rating: '4.18', ratings: 30567 },
  { id: '25', name: 'Marie Lu', avg_rating: '4.15', ratings: 27866 },
  { id: '26', name: 'Orson Scott Card', avg_rating: '4.31', ratings: 26075 },
  { id: '27', name: 'Ally Condie', avg_rating: '3.62', ratings: 25996 },
  { id: '28', name: 'Charlaine Harris', avg_rating: '3.97', ratings: 25552 },
  { id: '29', name: 'Tahereh Mafi', avg_rating: '3.84', ratings: 23196 },
  { id: '30', name: 'Lauren Oliver', avg_rating: '3.95', ratings: 23056 },
  { id: '31', name: 'P.C. Cast', avg_rating: '3.82', ratings: 22050 },
  { id: '32', name: 'Maggie Stiefvater', avg_rating: '3.76', ratings: 21965 },
  { id: '33', name: 'J.R. Ward', avg_rating: '4.15', ratings: 21492 },
  { id: '34', name: 'Dan Brown', avg_rating: '3.96', ratings: 21341 },
  { id: '35', name: "Madeleine L'Engle", avg_rating: '3.97', ratings: 20715 },
  { id: '36', name: 'Louisa May Alcott', avg_rating: '4.17', ratings: 19986 },
  { id: '37', name: 'James Patterson', avg_rating: '4.07', ratings: 19526 },
  { id: '38', name: 'Lauren Kate', avg_rating: '3.72', ratings: 19489 },
  { id: '39', name: 'Eoin Colfer', avg_rating: '3.86', ratings: 19115 },
  { id: '40', name: 'Anne Rice', avg_rating: '4.02', ratings: 18805 },
  { id: '41', name: 'Ally Carter', avg_rating: '3.84', ratings: 18621 },
  { id: '42', name: 'Jennifer L. Armentrout', avg_rating: '4.13', ratings: 18530 },
  { id: '43', name: 'E.L. James', avg_rating: '3.67', ratings: 18138 },
  { id: '44', name: 'Lois Lowry', avg_rating: '4.12', ratings: 17656 },
  { id: '45', name: 'Julie Kagawa', avg_rating: '3.87', ratings: 17570 },
  { id: '46', name: 'Johnathon Nicolaou', avg_rating: '4.39', ratings: 61365 },
  { id: '47', name: 'Holly Black', avg_rating: '3.91', ratings: 16800 },
  { id: '48', name: 'Colleen Hoover', avg_rating: '4.01', ratings: 16500 },
  { id: '49', name: 'Brandon Sanderson', avg_rating: '4.44', ratings: 16200 },
  { id: '50', name: 'Neil Gaiman', avg_rating: '4.12', ratings: 15900 },
];

export default function HomePage() {
  // JSON-LD: WebSite + Organization (structured data for Google)
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Buchinventar',
    alternateName: 'Buchinventar.de',
    url: BASE_URL,
    description:
      'Alle Bücher in der richtigen Reihenfolge: Buchreihen, Autoren, Bewertungen und Empfehlungen für den deutschsprachigen Raum.',
    inLanguage: 'de-DE',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/books?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Buchinventar',
    url: BASE_URL,
    logo: `${BASE_URL}/icon.png`,
    sameAs: [],
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: BASE_URL,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Kopfzeile */}
      <header className="border-b border-border/60 bg-card">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <h1 className="font-serif text-xl font-semibold tracking-tight">
                Buchinventar
              </h1>
              <span className="hidden sm:inline text-sm text-muted-foreground border-l border-border pl-3">
                Bücher in der richtigen Reihenfolge
              </span>
            </div>
            <nav aria-label="Hauptnavigation" className="flex items-center gap-4">
              <Link
                href="/books"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
              >
                Alle Bücher durchsuchen
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero-Bereich — SEO-Einführungstext */}
      <section className="bg-accent/20 border-b border-border/40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-3">
              Bücher in der richtigen Reihenfolge lesen
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Willkommen bei <strong>Buchinventar</strong> — deiner Anlaufstelle, um
              Buchreihen in der richtigen Reihenfolge zu entdecken. Egal ob Fantasy,
              Krimi, Thriller oder Sci-Fi: Finde heraus, welches Buch als Nächstes
              kommt, durchstöbere Bewertungen und entdecke neue Buchempfehlungen.
              Über 2&nbsp;Millionen Titel — übersichtlich sortiert nach Autor und
              Erscheinungsjahr.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href="/books"
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                <SearchIcon className="h-4 w-4" />
                Bücher durchsuchen
              </Link>
              <Link
                href="/books?sort=rating"
                className="inline-flex items-center gap-1.5 bg-card border border-border px-4 py-2 rounded-md font-medium hover:bg-accent transition-colors"
              >
                <TrendingUpIcon className="h-4 w-4" />
                Bestseller &amp; Top-Bewertungen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hauptinhalt */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Buchreihen — 3/4 */}
          <section className="lg:col-span-3">
            <div className="flex items-baseline justify-between mb-3 px-1">
              <h2 className="font-serif text-lg font-medium">
                Beliebte Buchreihen — Reihenfolge der Bücher
              </h2>
              <span className="text-[11px] text-muted-foreground uppercase tracking-widest">
                DE / EN
              </span>
            </div>
            <div className="bg-card rounded border border-border overflow-hidden">
              <CuratedSeriesList series={POPULAR_SERIES_DATA} />
            </div>
          </section>

          {/* Autoren — 1/4, sticky sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <h2 className="font-serif text-lg font-medium mb-3 px-1">
                Top&#8209;Autoren nach Bewertung
              </h2>
              <div className="bg-card rounded border border-border p-3">
                <div className="grid grid-cols-2 gap-x-3">
                  {/* Spalte 1: Rang 1–25 */}
                  <div>
                    {POPULAR_AUTHORS.slice(0, 25).map((a, i) => (
                      <AuthorRow
                        key={a.id}
                        rank={i + 1}
                        name={a.name}
                        rating={a.avg_rating}
                      />
                    ))}
                  </div>
                  {/* Spalte 2: Rang 26–50 */}
                  <div>
                    {POPULAR_AUTHORS.slice(25).map((a, i) => (
                      <AuthorRow
                        key={a.id}
                        rank={i + 26}
                        name={a.name}
                        rating={a.avg_rating}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Kategorien-Links (interne Verlinkung wie orderofbooks.com) */}
              <div className="mt-4 bg-card rounded border border-border p-3">
                <h3 className="font-serif text-sm font-medium mb-2">
                  Bücher nach Genre
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="/books?search=fantasy" className="text-primary hover:underline">
                      Fantasy Bücher
                    </Link>
                  </li>
                  <li>
                    <Link href="/books?search=krimi" className="text-primary hover:underline">
                      Krimi &amp; Thriller
                    </Link>
                  </li>
                  <li>
                    <Link href="/books?search=science+fiction" className="text-primary hover:underline">
                      Science-Fiction
                    </Link>
                  </li>
                  <li>
                    <Link href="/books?search=romance" className="text-primary hover:underline">
                      Liebesromane
                    </Link>
                  </li>
                  <li>
                    <Link href="/books?search=history" className="text-primary hover:underline">
                      Historische Romane
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* SEO-Textblock — FAQ-Stil für Long-Tail-Keywords */}
        <section className="mt-10 max-w-3xl">
          <h2 className="font-serif text-xl font-semibold mb-4">
            Häufige Fragen zu Buchreihen &amp; Lesereihenfolge
          </h2>
          <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h3 className="font-medium text-foreground mb-1">
                Was ist die richtige Reihenfolge einer Buchreihe?
              </h3>
              <p>
                Die richtige Reihenfolge einer Buchreihe richtet sich nach der
                Erzählchronologie oder dem Erscheinungsdatum. Bei Buchinventar zeigen
                wir beide Varianten an — Erscheinungsjahr und erzählerische
                Reihenfolge —, damit du selbst entscheiden kannst, wie du die Bücher
                liest.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">
                Wie finde ich alle Bücher eines Autors?
              </h3>
              <p>
                Nutze die <Link href="/books" className="text-primary hover:underline">Buchsuche</Link>,
                um nach Autor, Titel oder ISBN zu filtern. Jede Autorenseite zeigt
                sämtliche Buchreihen in der richtigen Reihenfolge an — inklusive
                deutscher Übersetzungen und Erscheinungsjahr im DACH-Raum.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">
                Welche Buchreihen sind 2026 besonders beliebt?
              </h3>
              <p>
                Zu den beliebtesten Buchreihen 2026 im deutschsprachigen Raum zählen
                Fantasy-Serien wie Harry Potter, Die Tribute von Panem und Das Lied
                von Eis und Feuer. Unsere Top-Liste oben wird regelmäßig
                aktualisiert.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">
                Was bedeutet „DACH-Teilung" bei Buchreihen?
              </h3>
              <p>
                Manche englische Bücher werden im deutschsprachigen Raum
                (Deutschland, Österreich, Schweiz) in zwei oder mehr Bände aufgeteilt.
                Diese Teilungen kennzeichnen wir mit dem Teilungssymbol, damit du
                keinen Band übersiehst.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer mit internen Links — SEO-Boost */}
      <footer className="border-t border-border/60 bg-card mt-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div>
              <h3 className="font-medium mb-2">Buchinventar</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Startseite</Link></li>
                <li><Link href="/books" className="hover:text-foreground">Alle Bücher</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Beliebte Genres</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/books?search=fantasy" className="hover:text-foreground">Fantasy</Link></li>
                <li><Link href="/books?search=thriller" className="hover:text-foreground">Thriller</Link></li>
                <li><Link href="/books?search=krimi" className="hover:text-foreground">Krimi</Link></li>
                <li><Link href="/books?search=romance" className="hover:text-foreground">Liebesromane</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Top-Autoren</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/books?search=J.K.+Rowling" className="hover:text-foreground">J.K. Rowling</Link></li>
                <li><Link href="/books?search=George+R.R.+Martin" className="hover:text-foreground">George R.R. Martin</Link></li>
                <li><Link href="/books?search=J.R.R.+Tolkien" className="hover:text-foreground">J.R.R. Tolkien</Link></li>
                <li><Link href="/books?search=Brandon+Sanderson" className="hover:text-foreground">Brandon Sanderson</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Info</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li className="text-xs">© 2026 Buchinventar</li>
                <li className="text-xs text-muted-foreground/60">
                  Alle Buchcover und Bewertungen stammen aus öffentlichen Quellen.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ──────────────────────────────────────────────────
 * Kompakte Autorenzeile — Bibliothekindex-Stil
 * ────────────────────────────────────────────────── */

function AuthorRow({
  rank,
  name,
  rating,
}: {
  rank: number;
  name: string;
  rating: string;
}) {
  return (
    <div className="flex items-baseline gap-1 py-[3px]">
      <span className="w-5 text-right text-[11px] text-muted-foreground tabular-nums shrink-0">
        {rank}
      </span>
      <span className="truncate text-[13px] leading-snug">{name}</span>
      <span className="ml-auto text-[10px] text-muted-foreground/60 tabular-nums shrink-0">
        {rating}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────
 * Kuratierte Reihenliste mit DE/EN-Titeln
 * ────────────────────────────────────────────────── */

function CuratedSeriesList({ series }: { series: SeriesData[] }) {
  return (
    <div className="divide-y divide-border/60">
      {series.map((s) => {
        const hasSplits = s.books.some((b) => b.is_dach_split);
        const enBookCount = new Set(s.books.map((b) => b.volume)).size;
        const deBookCount = s.books.filter((b) => b.title_de).length;
        return (
          <details key={s.rank} className="group">
            <summary className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-accent/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
              <span className="shrink-0 w-7 text-right text-sm font-medium text-muted-foreground tabular-nums">
                {s.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-serif font-medium text-sm truncate">
                  {s.series_name_de || s.series_name}
                  {s.series_name_de &&
                    s.series_name_de !== s.series_name && (
                      <span className="ml-2 font-sans text-xs text-muted-foreground font-normal">
                        ({s.series_name})
                      </span>
                    )}
                </p>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground mt-0.5">
                  <span className="truncate">{s.author}</span>
                  <span className="flex items-center gap-0.5 shrink-0">
                    <StarIcon className="h-3 w-3 text-amber-500" />
                    {s.avg_rating}
                  </span>
                  <span className="shrink-0">
                    {deBookCount > 0 ? `${deBookCount}\u00a0DE` : ''}
                    {deBookCount > 0 && enBookCount > 0 ? ' · ' : ''}
                    {enBookCount}\u00a0EN
                  </span>
                  {hasSplits && (
                    <span className="shrink-0 flex items-center gap-0.5 text-amber-600 dark:text-amber-400">
                      <SplitIcon className="h-3 w-3" />
                      Teilung
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground/40 group-open:rotate-90 transition-transform shrink-0">
                ▶
              </span>
            </summary>

            {/* Aufgeklappte Bücherliste */}
            <div className="bg-accent/30 border-t border-border/60 px-4 py-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] text-muted-foreground uppercase tracking-wider">
                    <th className="text-left pb-1.5 pr-2 font-medium">Nr.</th>
                    <th className="text-left pb-1.5 pr-2 font-medium">
                      <span className="flex items-center gap-1">
                        <GlobeIcon className="h-3 w-3" />
                        Deutscher Titel
                      </span>
                    </th>
                    <th className="text-left pb-1.5 pr-2 font-medium">
                      <span className="flex items-center gap-1">
                        <GlobeIcon className="h-3 w-3" />
                        Originaltitel (EN)
                      </span>
                    </th>
                    <th className="text-right pb-1.5 font-medium">Jahr</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {s.books.map((book, idx) => (
                    <tr
                      key={idx}
                      className={
                        book.is_dach_split
                          ? 'bg-amber-50/50 dark:bg-amber-900/10'
                          : ''
                      }
                    >
                      <td className="py-1.5 pr-2 text-muted-foreground align-top tabular-nums">
                        {book.volume}
                      </td>
                      <td className="py-1.5 pr-2 align-top">
                        {book.title_de ? (
                          <span>
                            {book.title_de}
                            {book.is_dach_split && book.dach_split_part && (
                              <span className="ml-1 inline-flex items-center text-[11px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1 py-0.5 rounded-sm">
                                <SplitIcon className="h-2.5 w-2.5 mr-0.5" />
                                {book.dach_split_part}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50 italic">
                            –
                          </span>
                        )}
                      </td>
                      <td className="py-1.5 pr-2 align-top text-muted-foreground">
                        {book.title_en}
                      </td>
                      <td className="py-1.5 text-right text-muted-foreground align-top whitespace-nowrap tabular-nums">
                        {book.year_dach || book.year_us || '–'}
                        {book.year_us &&
                        book.year_dach &&
                        book.year_dach !== book.year_us
                          ? ` (EN ${book.year_us})`
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
