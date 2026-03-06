import { sql } from './drizzle';
import { POPULAR_SERIES_DATA } from './popular-series-data';

async function main() {
  console.log('🏗️  Creating popular_series tables if not exist...');

  await sql(`
    CREATE TABLE IF NOT EXISTS popular_series (
      id SERIAL PRIMARY KEY,
      rank INTEGER NOT NULL,
      series_name TEXT NOT NULL,
      series_name_de TEXT,
      author TEXT NOT NULL,
      goodreads_score INTEGER,
      goodreads_url TEXT,
      avg_rating NUMERIC(3, 2),
      total_books_en INTEGER,
      total_books_de INTEGER
    )
  `);

  await sql(`
    CREATE TABLE IF NOT EXISTS popular_series_books (
      id SERIAL PRIMARY KEY,
      series_id INTEGER NOT NULL REFERENCES popular_series(id) ON DELETE CASCADE,
      volume INTEGER NOT NULL,
      title_en TEXT NOT NULL,
      title_de TEXT,
      year_us INTEGER,
      year_dach INTEGER,
      is_dach_split BOOLEAN NOT NULL DEFAULT false,
      dach_split_part TEXT,
      goodreads_url TEXT,
      isbn_us TEXT,
      isbn_dach TEXT
    )
  `);

  await sql(`CREATE INDEX IF NOT EXISTS idx_popular_series_books_series_id ON popular_series_books(series_id)`);
  await sql(`CREATE INDEX IF NOT EXISTS idx_popular_series_books_volume ON popular_series_books(volume)`);

  // Clear existing data
  console.log('🗑️  Clearing existing popular series data...');
  await sql(`DELETE FROM popular_series_books`);
  await sql(`DELETE FROM popular_series`);
  await sql(`ALTER SEQUENCE popular_series_id_seq RESTART WITH 1`);
  await sql(`ALTER SEQUENCE popular_series_books_id_seq RESTART WITH 1`);

  console.log(`📚 Seeding ${POPULAR_SERIES_DATA.length} popular series...`);

  for (const series of POPULAR_SERIES_DATA) {
    const enBookCount = new Set(series.books.map((b) => b.volume)).size;
    const deBookCount = series.books.filter((b) => b.title_de).length;

    // Insert the series
    const result = (await sql(
      `INSERT INTO popular_series (rank, series_name, series_name_de, author, goodreads_score, avg_rating, total_books_en, total_books_de)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        series.rank,
        series.series_name,
        series.series_name_de,
        series.author,
        series.goodreads_score,
        series.avg_rating,
        enBookCount,
        deBookCount,
      ]
    )) as { id: number }[];

    const seriesId = result[0].id;

    // Insert each book entry
    for (const book of series.books) {
      await sql(
        `INSERT INTO popular_series_books (series_id, volume, title_en, title_de, year_us, year_dach, is_dach_split, dach_split_part)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          seriesId,
          book.volume,
          book.title_en,
          book.title_de,
          book.year_us,
          book.year_dach,
          book.is_dach_split,
          book.dach_split_part,
        ]
      );
    }

    const splitCount = series.books.filter((b) => b.is_dach_split).length;
    const splitLabel = splitCount > 0 ? ` (${splitCount} DACH splits)` : '';
    console.log(
      `  ✅ #${series.rank} ${series.series_name} — ${enBookCount} EN / ${deBookCount} DE books${splitLabel}`
    );
  }

  console.log('\n🎉 Popular series seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
