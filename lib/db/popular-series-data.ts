/**
 * Top 50 Most Popular Book Series
 * Source: https://www.goodreads.com/list/show/1381.Best_Series
 *
 * Includes:
 * - USA (English) titles & publication years
 * - DACH (German) titles & publication years
 * - DACH split markers where one US book was published as 2+ German volumes
 */

export interface SeriesData {
  rank: number;
  series_name: string;
  series_name_de: string | null;
  author: string;
  goodreads_score: number;
  avg_rating: string;
  books: BookData[];
}

export interface BookData {
  volume: number;
  title_en: string;
  title_de: string | null;
  year_us: number | null;
  year_dach: number | null;
  is_dach_split: boolean;
  dach_split_part: string | null;
}

export const POPULAR_SERIES_DATA: SeriesData[] = [
  // ── #1 Harry Potter ──
  {
    rank: 1,
    series_name: 'Harry Potter',
    series_name_de: 'Harry Potter',
    author: 'J.K. Rowling',
    goodreads_score: 345080,
    avg_rating: '4.47',
    books: [
      { volume: 1, title_en: "Harry Potter and the Philosopher's Stone", title_de: 'Harry Potter und der Stein der Weisen', year_us: 1997, year_dach: 1998, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Harry Potter and the Chamber of Secrets', title_de: 'Harry Potter und die Kammer des Schreckens', year_us: 1998, year_dach: 1999, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Harry Potter and the Prisoner of Azkaban', title_de: 'Harry Potter und der Gefangene von Askaban', year_us: 1999, year_dach: 1999, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Harry Potter and the Goblet of Fire', title_de: 'Harry Potter und der Feuerkelch', year_us: 2000, year_dach: 2000, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Harry Potter and the Order of the Phoenix', title_de: 'Harry Potter und der Orden des Phönix', year_us: 2003, year_dach: 2003, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'Harry Potter and the Half-Blood Prince', title_de: 'Harry Potter und der Halbblutprinz', year_us: 2005, year_dach: 2005, is_dach_split: false, dach_split_part: null },
      { volume: 7, title_en: 'Harry Potter and the Deathly Hallows', title_de: 'Harry Potter und die Heiligtümer des Todes', year_us: 2007, year_dach: 2007, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #2 Percy Jackson and the Olympians ──
  {
    rank: 2,
    series_name: 'Percy Jackson and the Olympians',
    series_name_de: 'Percy Jackson',
    author: 'Rick Riordan',
    goodreads_score: 152548,
    avg_rating: '4.31',
    books: [
      { volume: 1, title_en: 'The Lightning Thief', title_de: 'Diebe im Olymp', year_us: 2005, year_dach: 2006, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Sea of Monsters', title_de: 'Im Bann des Zyklopen', year_us: 2006, year_dach: 2007, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: "The Titan's Curse", title_de: 'Der Fluch des Titanen', year_us: 2007, year_dach: 2008, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'The Battle of the Labyrinth', title_de: 'Die Schlacht um das Labyrinth', year_us: 2008, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'The Last Olympian', title_de: 'Die letzte Göttin', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #3 The Hunger Games ──
  {
    rank: 3,
    series_name: 'The Hunger Games',
    series_name_de: 'Die Tribute von Panem',
    author: 'Suzanne Collins',
    goodreads_score: 146448,
    avg_rating: '4.35',
    books: [
      { volume: 1, title_en: 'The Hunger Games', title_de: 'Die Tribute von Panem – Tödliche Spiele', year_us: 2008, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Catching Fire', title_de: 'Die Tribute von Panem – Gefährliche Liebe', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Mockingjay', title_de: 'Die Tribute von Panem – Flammender Zorn', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'The Ballad of Songbirds and Snakes', title_de: 'Die Tribute von Panem – Das Lied von Vogel und Schlange', year_us: 2020, year_dach: 2020, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #4 The Mortal Instruments ──
  {
    rank: 4,
    series_name: 'The Mortal Instruments',
    series_name_de: 'Chroniken der Unterwelt',
    author: 'Cassandra Clare',
    goodreads_score: 138988,
    avg_rating: '4.07',
    books: [
      { volume: 1, title_en: 'City of Bones', title_de: 'City of Bones', year_us: 2007, year_dach: 2008, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'City of Ashes', title_de: 'City of Ashes', year_us: 2008, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'City of Glass', title_de: 'City of Glass', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'City of Fallen Angels', title_de: 'City of Fallen Angels', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'City of Lost Souls', title_de: 'City of Lost Souls', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'City of Heavenly Fire', title_de: 'City of Heavenly Fire', year_us: 2014, year_dach: 2015, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #5 Divergent ──
  {
    rank: 5,
    series_name: 'Divergent',
    series_name_de: 'Die Bestimmung',
    author: 'Veronica Roth',
    goodreads_score: 135624,
    avg_rating: '4.13',
    books: [
      { volume: 1, title_en: 'Divergent', title_de: 'Die Bestimmung', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Insurgent', title_de: 'Tödliche Wahrheit', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Allegiant', title_de: 'Letzte Entscheidung', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #6 The Twilight Saga ──
  {
    rank: 6,
    series_name: 'The Twilight Saga',
    series_name_de: 'Twilight / Bis(s)',
    author: 'Stephenie Meyer',
    goodreads_score: 92416,
    avg_rating: '3.68',
    books: [
      { volume: 1, title_en: 'Twilight', title_de: 'Bis(s) zum Morgengrauen', year_us: 2005, year_dach: 2006, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'New Moon', title_de: 'Bis(s) zur Mittagsstunde', year_us: 2006, year_dach: 2007, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Eclipse', title_de: 'Bis(s) zum Abendrot', year_us: 2007, year_dach: 2008, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Breaking Dawn', title_de: 'Bis(s) zum Ende der Nacht', year_us: 2008, year_dach: 2009, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #7 A Song of Ice and Fire ── ⚠️ MAJOR DACH SPLITS ──
  {
    rank: 7,
    series_name: 'A Song of Ice and Fire',
    series_name_de: 'Das Lied von Eis und Feuer',
    author: 'George R.R. Martin',
    goodreads_score: 83002,
    avg_rating: '4.45',
    books: [
      // ── Book 1: A Game of Thrones → SPLIT into 2 German volumes ──
      { volume: 1, title_en: 'A Game of Thrones', title_de: 'Die Herren von Winterfell', year_us: 1996, year_dach: 1997, is_dach_split: true, dach_split_part: 'Band 1 (US Book 1, Teil 1)' },
      { volume: 1, title_en: 'A Game of Thrones', title_de: 'Das Erbe von Winterfell', year_us: 1996, year_dach: 1998, is_dach_split: true, dach_split_part: 'Band 2 (US Book 1, Teil 2)' },
      // ── Book 2: A Clash of Kings → SPLIT into 2 German volumes ──
      { volume: 2, title_en: 'A Clash of Kings', title_de: 'Der Thron der Sieben Königreiche', year_us: 1998, year_dach: 1999, is_dach_split: true, dach_split_part: 'Band 3 (US Book 2, Teil 1)' },
      { volume: 2, title_en: 'A Clash of Kings', title_de: 'Die Saat des goldenen Löwen', year_us: 1998, year_dach: 2000, is_dach_split: true, dach_split_part: 'Band 4 (US Book 2, Teil 2)' },
      // ── Book 3: A Storm of Swords → SPLIT into 2 German volumes ──
      { volume: 3, title_en: 'A Storm of Swords', title_de: 'Sturm der Schwerter', year_us: 2000, year_dach: 2001, is_dach_split: true, dach_split_part: 'Band 5 (US Book 3, Teil 1)' },
      { volume: 3, title_en: 'A Storm of Swords', title_de: 'Die Königin der Drachen', year_us: 2000, year_dach: 2002, is_dach_split: true, dach_split_part: 'Band 6 (US Book 3, Teil 2)' },
      // ── Book 4: A Feast for Crows → SPLIT into 2 German volumes ──
      { volume: 4, title_en: 'A Feast for Crows', title_de: 'Zeit der Krähen', year_us: 2005, year_dach: 2006, is_dach_split: true, dach_split_part: 'Band 7 (US Book 4, Teil 1)' },
      { volume: 4, title_en: 'A Feast for Crows', title_de: 'Die dunkle Königin', year_us: 2005, year_dach: 2006, is_dach_split: true, dach_split_part: 'Band 8 (US Book 4, Teil 2)' },
      // ── Book 5: A Dance with Dragons → SPLIT into 2 German volumes ──
      { volume: 5, title_en: 'A Dance with Dragons', title_de: 'Der Sohn des Greifen', year_us: 2011, year_dach: 2012, is_dach_split: true, dach_split_part: 'Band 9 (US Book 5, Teil 1)' },
      { volume: 5, title_en: 'A Dance with Dragons', title_de: 'Ein Tanz mit Drachen', year_us: 2011, year_dach: 2012, is_dach_split: true, dach_split_part: 'Band 10 (US Book 5, Teil 2)' },
    ],
  },

  // ── #8 The Lord of the Rings ──
  {
    rank: 8,
    series_name: 'The Lord of the Rings',
    series_name_de: 'Der Herr der Ringe',
    author: 'J.R.R. Tolkien',
    goodreads_score: 81411,
    avg_rating: '4.41',
    books: [
      { volume: 1, title_en: 'The Fellowship of the Ring', title_de: 'Die Gefährten', year_us: 1954, year_dach: 1969, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Two Towers', title_de: 'Die zwei Türme', year_us: 1954, year_dach: 1970, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Return of the King', title_de: 'Die Rückkehr des Königs', year_us: 1955, year_dach: 1970, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #9 The Infernal Devices ──
  {
    rank: 9,
    series_name: 'The Infernal Devices',
    series_name_de: 'Chroniken der Schattenjäger',
    author: 'Cassandra Clare',
    goodreads_score: 80177,
    avg_rating: '4.30',
    books: [
      { volume: 1, title_en: 'Clockwork Angel', title_de: 'Clockwork Angel', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Clockwork Prince', title_de: 'Clockwork Prince', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Clockwork Princess', title_de: 'Clockwork Princess', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #10 Vampire Academy ──
  {
    rank: 10,
    series_name: 'Vampire Academy',
    series_name_de: 'Vampire Academy',
    author: 'Richelle Mead',
    goodreads_score: 73275,
    avg_rating: '4.10',
    books: [
      { volume: 1, title_en: 'Vampire Academy', title_de: 'Blutsschwestern', year_us: 2007, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Frostbite', title_de: 'Blaues Blut', year_us: 2008, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Shadow Kiss', title_de: 'Schattenträume', year_us: 2008, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Blood Promise', title_de: 'Blutschwur', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Spirit Bound', title_de: 'Seelenruf', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'Last Sacrifice', title_de: 'Schicksalsbande', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #11 The Heroes of Olympus ──
  {
    rank: 11,
    series_name: 'The Heroes of Olympus',
    series_name_de: 'Helden des Olymp',
    author: 'Rick Riordan',
    goodreads_score: 72108,
    avg_rating: '4.29',
    books: [
      { volume: 1, title_en: 'The Lost Hero', title_de: 'Der verschwundene Halbgott', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Son of Neptune', title_de: 'Der Sohn des Neptun', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Mark of Athena', title_de: 'Das Zeichen der Athene', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'The House of Hades', title_de: 'Das Haus des Hades', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'The Blood of Olympus', title_de: 'Das Blut des Olymp', year_us: 2014, year_dach: 2015, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #12 The Lost Artefacts ──
  {
    rank: 12,
    series_name: 'The Lost Artefacts',
    series_name_de: null,
    author: 'Johnathon Nicolaou',
    goodreads_score: 61365,
    avg_rating: '4.39',
    books: [
      { volume: 1, title_en: 'The Chain Between Worlds', title_de: null, year_us: 2021, year_dach: null, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #13 The Maze Runner ──
  {
    rank: 13,
    series_name: 'The Maze Runner',
    series_name_de: 'Die Auserwählten',
    author: 'James Dashner',
    goodreads_score: 55456,
    avg_rating: '4.06',
    books: [
      { volume: 1, title_en: 'The Maze Runner', title_de: 'Die Auserwählten – Im Labyrinth', year_us: 2009, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Scorch Trials', title_de: 'Die Auserwählten – In der Brandwüste', year_us: 2010, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Death Cure', title_de: 'Die Auserwählten – In der Todeszone', year_us: 2011, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #14 The Inheritance Cycle ──
  {
    rank: 14,
    series_name: 'The Inheritance Cycle',
    series_name_de: 'Eragon',
    author: 'Christopher Paolini',
    goodreads_score: 53840,
    avg_rating: '3.97',
    books: [
      { volume: 1, title_en: 'Eragon', title_de: 'Eragon – Das Vermächtnis der Drachenreiter', year_us: 2003, year_dach: 2004, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Eldest', title_de: 'Eragon – Der Auftrag des Ältesten', year_us: 2005, year_dach: 2005, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Brisingr', title_de: 'Eragon – Die Weisheit des Feuers', year_us: 2008, year_dach: 2008, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Inheritance', title_de: 'Eragon – Das Erbe der Macht', year_us: 2011, year_dach: 2011, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #15 The Selection ──
  {
    rank: 15,
    series_name: 'The Selection',
    series_name_de: 'Selection',
    author: 'Kiera Cass',
    goodreads_score: 50545,
    avg_rating: '4.07',
    books: [
      { volume: 1, title_en: 'The Selection', title_de: 'Selection', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Elite', title_de: 'Selection – Die Elite', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The One', title_de: 'Selection – Der Erwählte', year_us: 2014, year_dach: 2015, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'The Heir', title_de: 'Selection – Die Kronprinzessin', year_us: 2015, year_dach: 2016, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'The Crown', title_de: 'Selection – Die Krone', year_us: 2016, year_dach: 2017, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #16 The Lunar Chronicles ──
  {
    rank: 16,
    series_name: 'The Lunar Chronicles',
    series_name_de: 'Die Luna-Chroniken',
    author: 'Marissa Meyer',
    goodreads_score: 43614,
    avg_rating: '4.12',
    books: [
      { volume: 1, title_en: 'Cinder', title_de: 'Wie Monde so silbern', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Scarlet', title_de: 'Wie Blut so rot', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Cress', title_de: 'Wie Sterne so golden', year_us: 2014, year_dach: 2015, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Winter', title_de: 'Wie Schnee so weiß', year_us: 2015, year_dach: 2016, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #17 A Series of Unfortunate Events ──
  {
    rank: 17,
    series_name: 'A Series of Unfortunate Events',
    series_name_de: 'Eine Reihe betrüblicher Ereignisse',
    author: 'Lemony Snicket',
    goodreads_score: 42418,
    avg_rating: '4.03',
    books: [
      { volume: 1, title_en: 'The Bad Beginning', title_de: 'Der schreckliche Anfang', year_us: 1999, year_dach: 2002, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Reptile Room', title_de: 'Das Haus der Schlangen', year_us: 1999, year_dach: 2002, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Wide Window', title_de: 'Der Seufzersee', year_us: 2000, year_dach: 2002, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'The Miserable Mill', title_de: 'Die Elende Mühle', year_us: 2000, year_dach: 2003, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'The Austere Academy', title_de: 'Die Schule des Schreckens', year_us: 2000, year_dach: 2003, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'The Ersatz Elevator', title_de: 'Der Aufzug des Bösen', year_us: 2001, year_dach: 2003, is_dach_split: false, dach_split_part: null },
      { volume: 7, title_en: 'The Vile Village', title_de: 'Das Dorf der Verdammten', year_us: 2001, year_dach: 2004, is_dach_split: false, dach_split_part: null },
      { volume: 8, title_en: 'The Hostile Hospital', title_de: 'Das Hospital des Grauens', year_us: 2001, year_dach: 2004, is_dach_split: false, dach_split_part: null },
      { volume: 9, title_en: 'The Carnivorous Carnival', title_de: 'Der Karneval des Grauens', year_us: 2002, year_dach: 2004, is_dach_split: false, dach_split_part: null },
      { volume: 10, title_en: 'The Slippery Slope', title_de: 'Der Abgrund des Bösen', year_us: 2003, year_dach: 2005, is_dach_split: false, dach_split_part: null },
      { volume: 11, title_en: 'The Grim Grotto', title_de: 'Die Grotte des Grauens', year_us: 2004, year_dach: 2005, is_dach_split: false, dach_split_part: null },
      { volume: 12, title_en: 'The Penultimate Peril', title_de: 'Die vorletzte Gefahr', year_us: 2005, year_dach: 2006, is_dach_split: false, dach_split_part: null },
      { volume: 13, title_en: 'The End', title_de: 'Das Ende', year_us: 2006, year_dach: 2007, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #18 Throne of Glass ──
  {
    rank: 18,
    series_name: 'Throne of Glass',
    series_name_de: 'Throne of Glass',
    author: 'Sarah J. Maas',
    goodreads_score: 41157,
    avg_rating: '4.19',
    books: [
      { volume: 1, title_en: 'Throne of Glass', title_de: 'Die Erwählte', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Crown of Midnight', title_de: 'Kriegerin im Schatten', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Heir of Fire', title_de: 'Erbin des Feuers', year_us: 2014, year_dach: 2015, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Queen of Shadows', title_de: 'Königin der Finsternis', year_us: 2015, year_dach: 2016, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Empire of Storms', title_de: 'Herrscherin über Asche und Zorn', year_us: 2016, year_dach: 2017, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'Tower of Dawn', title_de: 'Turm der Morgenröte', year_us: 2017, year_dach: 2018, is_dach_split: false, dach_split_part: null },
      { volume: 7, title_en: 'Kingdom of Ash', title_de: 'Königreich der Asche', year_us: 2018, year_dach: 2019, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #19 Uglies ──
  {
    rank: 19,
    series_name: 'Uglies',
    series_name_de: 'Ugly – Pretty – Special',
    author: 'Scott Westerfeld',
    goodreads_score: 38427,
    avg_rating: '3.84',
    books: [
      { volume: 1, title_en: 'Uglies', title_de: 'Ugly – Verlier nicht dein Gesicht', year_us: 2005, year_dach: 2007, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Pretties', title_de: 'Pretty – Erkenne dein Gesicht', year_us: 2005, year_dach: 2007, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Specials', title_de: 'Special – Zeig dein Gesicht', year_us: 2006, year_dach: 2008, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Extras', title_de: 'Extra – Finde dein Gesicht', year_us: 2007, year_dach: 2009, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #20 Hush, Hush ──
  {
    rank: 20,
    series_name: 'Hush, Hush',
    series_name_de: 'Hush, Hush',
    author: 'Becca Fitzpatrick',
    goodreads_score: 35764,
    avg_rating: '3.92',
    books: [
      { volume: 1, title_en: 'Hush, Hush', title_de: 'Hush, Hush – Engelsfluch', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Crescendo', title_de: 'Crescendo – Engelsblut', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Silence', title_de: 'Silence – Engelslied', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Finale', title_de: 'Finale – Engelssturz', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #21 The Hitchhiker's Guide to the Galaxy ──
  {
    rank: 21,
    series_name: "The Hitchhiker's Guide to the Galaxy",
    series_name_de: 'Per Anhalter durch die Galaxis',
    author: 'Douglas Adams',
    goodreads_score: 34926,
    avg_rating: '4.22',
    books: [
      { volume: 1, title_en: "The Hitchhiker's Guide to the Galaxy", title_de: 'Per Anhalter durch die Galaxis', year_us: 1979, year_dach: 1981, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Restaurant at the End of the Universe', title_de: 'Das Restaurant am Ende des Universums', year_us: 1980, year_dach: 1982, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Life, the Universe and Everything', title_de: 'Das Leben, das Universum und der ganze Rest', year_us: 1982, year_dach: 1983, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'So Long, and Thanks for All the Fish', title_de: 'Macht\'s gut, und danke für den Fisch', year_us: 1984, year_dach: 1985, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Mostly Harmless', title_de: 'Einmal Rupert und zurück', year_us: 1992, year_dach: 1993, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #22 Anne of Green Gables ──
  {
    rank: 22,
    series_name: 'Anne of Green Gables',
    series_name_de: 'Anne auf Green Gables',
    author: 'L.M. Montgomery',
    goodreads_score: 33109,
    avg_rating: '4.33',
    books: [
      { volume: 1, title_en: 'Anne of Green Gables', title_de: 'Anne auf Green Gables', year_us: 1908, year_dach: 1986, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Anne of Avonlea', title_de: 'Anne in Avonlea', year_us: 1909, year_dach: 1986, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Anne of the Island', title_de: 'Anne in Kingsport', year_us: 1915, year_dach: 1987, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: "Anne of Windy Poplars", title_de: 'Anne in Windy Willows', year_us: 1936, year_dach: 1988, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: "Anne's House of Dreams", title_de: 'Anne in Four Winds', year_us: 1917, year_dach: 1989, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #23 His Dark Materials ──
  {
    rank: 23,
    series_name: 'His Dark Materials',
    series_name_de: 'His Dark Materials',
    author: 'Philip Pullman',
    goodreads_score: 32556,
    avg_rating: '4.03',
    books: [
      { volume: 1, title_en: 'The Golden Compass', title_de: 'Der Goldene Kompass', year_us: 1995, year_dach: 1996, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Subtle Knife', title_de: 'Das Magische Messer', year_us: 1997, year_dach: 1998, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Amber Spyglass', title_de: 'Das Bernstein-Teleskop', year_us: 2000, year_dach: 2001, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #24 Outlander ──
  {
    rank: 24,
    series_name: 'Outlander',
    series_name_de: 'Highland-Saga',
    author: 'Diana Gabaldon',
    goodreads_score: 32285,
    avg_rating: '4.26',
    books: [
      { volume: 1, title_en: 'Outlander', title_de: 'Feuer und Stein', year_us: 1991, year_dach: 1995, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Dragonfly in Amber', title_de: 'Die geliehene Zeit', year_us: 1992, year_dach: 1996, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Voyager', title_de: 'Ferne Ufer', year_us: 1993, year_dach: 1997, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Drums of Autumn', title_de: 'Der Ruf der Trommel', year_us: 1996, year_dach: 1999, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'The Fiery Cross', title_de: 'Das flammende Kreuz', year_us: 2001, year_dach: 2003, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'A Breath of Snow and Ashes', title_de: 'Ein Hauch von Schnee und Asche', year_us: 2005, year_dach: 2006, is_dach_split: false, dach_split_part: null },
      { volume: 7, title_en: 'An Echo in the Bone', title_de: 'Echo der Hoffnung', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 8, title_en: 'Written in My Own Heart\'s Blood', title_de: 'Ein Schatten von Verrat und Liebe', year_us: 2014, year_dach: 2015, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #25 Chronicles of Narnia ──
  {
    rank: 25,
    series_name: 'Chronicles of Narnia',
    series_name_de: 'Die Chroniken von Narnia',
    author: 'C.S. Lewis',
    goodreads_score: 32205,
    avg_rating: '4.24',
    books: [
      { volume: 1, title_en: 'The Lion, the Witch and the Wardrobe', title_de: 'Der König von Narnia', year_us: 1950, year_dach: 1957, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Prince Caspian', title_de: 'Prinz Kaspian von Narnia', year_us: 1951, year_dach: 1958, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Voyage of the Dawn Treader', title_de: 'Die Reise auf der Morgenröte', year_us: 1952, year_dach: 1959, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'The Silver Chair', title_de: 'Der silberne Sessel', year_us: 1953, year_dach: 1960, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'The Horse and His Boy', title_de: 'Der Ritt nach Narnia', year_us: 1954, year_dach: 1961, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: "The Magician's Nephew", title_de: 'Das Wunder von Narnia', year_us: 1955, year_dach: 1962, is_dach_split: false, dach_split_part: null },
      { volume: 7, title_en: 'The Last Battle', title_de: 'Der letzte Kampf', year_us: 1956, year_dach: 1963, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #26 Graceling Realm ──
  {
    rank: 26,
    series_name: 'Graceling Realm',
    series_name_de: 'Die sieben Königreiche',
    author: 'Kristin Cashore',
    goodreads_score: 30747,
    avg_rating: '4.06',
    books: [
      { volume: 1, title_en: 'Graceling', title_de: 'Die Beschenkte', year_us: 2008, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Fire', title_de: 'Die Flammende', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Bitterblue', title_de: 'In Liebe, Bitterblue', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #27 Millennium ──
  {
    rank: 27,
    series_name: 'Millennium',
    series_name_de: 'Millennium',
    author: 'Stieg Larsson',
    goodreads_score: 30567,
    avg_rating: '4.18',
    books: [
      { volume: 1, title_en: 'The Girl with the Dragon Tattoo', title_de: 'Verblendung', year_us: 2005, year_dach: 2006, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Girl Who Played with Fire', title_de: 'Verdammnis', year_us: 2006, year_dach: 2007, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Girl Who Kicked the Hornets\' Nest', title_de: 'Vergebung', year_us: 2007, year_dach: 2008, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #28 Legend ──
  {
    rank: 28,
    series_name: 'Legend',
    series_name_de: 'Legend',
    author: 'Marie Lu',
    goodreads_score: 27866,
    avg_rating: '4.15',
    books: [
      { volume: 1, title_en: 'Legend', title_de: 'Legend – Fallender Himmel', year_us: 2011, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Prodigy', title_de: 'Legend – Schwelender Sturm', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Champion', title_de: 'Legend – Berstende Sterne', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #29 Ender's Saga ──
  {
    rank: 29,
    series_name: "Ender's Saga",
    series_name_de: 'Ender',
    author: 'Orson Scott Card',
    goodreads_score: 26075,
    avg_rating: '4.31',
    books: [
      { volume: 1, title_en: "Ender's Game", title_de: 'Das große Spiel', year_us: 1985, year_dach: 1986, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Speaker for the Dead', title_de: 'Sprecher für die Toten', year_us: 1986, year_dach: 1987, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Xenocide', title_de: 'Xenozid', year_us: 1991, year_dach: 1993, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Children of the Mind', title_de: 'Kinder des Geistes', year_us: 1996, year_dach: 1997, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #30 Matched ──
  {
    rank: 30,
    series_name: 'Matched',
    series_name_de: 'Cassia & Ky',
    author: 'Ally Condie',
    goodreads_score: 25996,
    avg_rating: '3.62',
    books: [
      { volume: 1, title_en: 'Matched', title_de: 'Die Auswahl', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Crossed', title_de: 'Die Flucht', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Reached', title_de: 'Die Ankunft', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #31 Sookie Stackhouse ──
  {
    rank: 31,
    series_name: 'Sookie Stackhouse',
    series_name_de: 'Sookie Stackhouse',
    author: 'Charlaine Harris',
    goodreads_score: 25552,
    avg_rating: '3.97',
    books: [
      { volume: 1, title_en: 'Dead Until Dark', title_de: 'Vorübergehend tot', year_us: 2001, year_dach: 2004, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Living Dead in Dallas', title_de: 'Untot in Dallas', year_us: 2002, year_dach: 2005, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Club Dead', title_de: 'Club Dead', year_us: 2003, year_dach: 2006, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #32 The Kane Chronicles ──
  {
    rank: 32,
    series_name: 'The Kane Chronicles',
    series_name_de: 'Die Kane-Chroniken',
    author: 'Rick Riordan',
    goodreads_score: 24580,
    avg_rating: '4.10',
    books: [
      { volume: 1, title_en: 'The Red Pyramid', title_de: 'Die Rote Pyramide', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Throne of Fire', title_de: 'Der Feuerthron', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Serpent\'s Shadow', title_de: 'Der Schatten der Schlange', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #33 Shatter Me ──
  {
    rank: 33,
    series_name: 'Shatter Me',
    series_name_de: 'Shatter Me',
    author: 'Tahereh Mafi',
    goodreads_score: 23196,
    avg_rating: '3.84',
    books: [
      { volume: 1, title_en: 'Shatter Me', title_de: 'Ich fürchte mich nicht', year_us: 2011, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Unravel Me', title_de: 'Ich brenne für dich', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Ignite Me', title_de: 'Ich erstrahle für dich', year_us: 2014, year_dach: 2015, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #34 Delirium ──
  {
    rank: 34,
    series_name: 'Delirium',
    series_name_de: 'Amor-Trilogie',
    author: 'Lauren Oliver',
    goodreads_score: 23056,
    avg_rating: '3.95',
    books: [
      { volume: 1, title_en: 'Delirium', title_de: 'Delirium', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Pandemonium', title_de: 'Pandemonium', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Requiem', title_de: 'Requiem', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #35 Bloodlines ──
  {
    rank: 35,
    series_name: 'Bloodlines',
    series_name_de: 'Bloodlines',
    author: 'Richelle Mead',
    goodreads_score: 22472,
    avg_rating: '4.20',
    books: [
      { volume: 1, title_en: 'Bloodlines', title_de: 'Bloodlines – Silberne Schatten', year_us: 2011, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Golden Lily', title_de: 'Bloodlines – Die goldene Lilie', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Indigo Spell', title_de: 'Bloodlines – Der Indigo Zauber', year_us: 2013, year_dach: 2014, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'The Fiery Heart', title_de: 'Bloodlines – Feuriges Herz', year_us: 2013, year_dach: 2015, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Silver Shadows', title_de: 'Bloodlines – Silberne Schatten', year_us: 2014, year_dach: 2015, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'The Ruby Circle', title_de: 'Bloodlines – Der rubinrote Kreis', year_us: 2015, year_dach: 2016, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #36 House of Night ──
  {
    rank: 36,
    series_name: 'House of Night',
    series_name_de: 'House of Night',
    author: 'P.C. Cast',
    goodreads_score: 22050,
    avg_rating: '3.82',
    books: [
      { volume: 1, title_en: 'Marked', title_de: 'Gezeichnet', year_us: 2007, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Betrayed', title_de: 'Betrogen', year_us: 2007, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Chosen', title_de: 'Erwählt', year_us: 2008, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Untamed', title_de: 'Ungezähmt', year_us: 2008, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Hunted', title_de: 'Gejagt', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'Tempted', title_de: 'Versucht', year_us: 2009, year_dach: 2011, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #37 The Wolves of Mercy Falls ──
  {
    rank: 37,
    series_name: 'The Wolves of Mercy Falls',
    series_name_de: 'Mercy Falls',
    author: 'Maggie Stiefvater',
    goodreads_score: 21965,
    avg_rating: '3.76',
    books: [
      { volume: 1, title_en: 'Shiver', title_de: 'Nach dem Sommer', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Linger', title_de: 'Ruht das Licht', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Forever', title_de: 'In deinen Augen', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #38 Black Dagger Brotherhood ──
  {
    rank: 38,
    series_name: 'Black Dagger Brotherhood',
    series_name_de: 'Black Dagger',
    author: 'J.R. Ward',
    goodreads_score: 21492,
    avg_rating: '4.15',
    books: [
      { volume: 1, title_en: 'Dark Lover', title_de: 'Nachtjagd', year_us: 2005, year_dach: 2007, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Lover Eternal', title_de: 'Ewige Liebe', year_us: 2006, year_dach: 2008, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Lover Awakened', title_de: 'Menschenkind', year_us: 2006, year_dach: 2008, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #39 Robert Langdon ──
  {
    rank: 39,
    series_name: 'Robert Langdon',
    series_name_de: 'Robert Langdon',
    author: 'Dan Brown',
    goodreads_score: 21341,
    avg_rating: '3.96',
    books: [
      { volume: 1, title_en: 'Angels & Demons', title_de: 'Illuminati', year_us: 2000, year_dach: 2003, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Da Vinci Code', title_de: 'Sakrileg', year_us: 2003, year_dach: 2004, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Lost Symbol', title_de: 'Das verlorene Symbol', year_us: 2009, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Inferno', title_de: 'Inferno', year_us: 2013, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Origin', title_de: 'Origin', year_us: 2017, year_dach: 2017, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #40 Time Quintet ──
  {
    rank: 40,
    series_name: 'Time Quintet',
    series_name_de: 'Das Zeitquintett',
    author: "Madeleine L'Engle",
    goodreads_score: 20715,
    avg_rating: '3.97',
    books: [
      { volume: 1, title_en: 'A Wrinkle in Time', title_de: 'Die Zeitfalte', year_us: 1962, year_dach: 1978, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'A Wind in the Door', title_de: 'Der Wind in der Tür', year_us: 1973, year_dach: 1979, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'A Swiftly Tilting Planet', title_de: 'Ein Ring um die Erde', year_us: 1978, year_dach: 1980, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #41 Little Women ──
  {
    rank: 41,
    series_name: 'Little Women',
    series_name_de: 'Betty und ihre Schwestern',
    author: 'Louisa May Alcott',
    goodreads_score: 19986,
    avg_rating: '4.17',
    books: [
      { volume: 1, title_en: 'Little Women', title_de: 'Betty und ihre Schwestern', year_us: 1868, year_dach: 1958, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Good Wives', title_de: 'Bettys Glück', year_us: 1869, year_dach: 1960, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Little Men', title_de: 'Kleine Männer', year_us: 1871, year_dach: 1962, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: "Jo's Boys", title_de: 'Jos Jungs', year_us: 1886, year_dach: 1964, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #42 Maximum Ride ──
  {
    rank: 42,
    series_name: 'Maximum Ride',
    series_name_de: 'Maximum Ride',
    author: 'James Patterson',
    goodreads_score: 19526,
    avg_rating: '4.07',
    books: [
      { volume: 1, title_en: 'The Angel Experiment', title_de: 'Das Experiment Angel', year_us: 2005, year_dach: 2007, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: "School's Out Forever", title_de: 'Der Zerberus-Faktor', year_us: 2006, year_dach: 2008, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Saving the World and Other Extreme Sports', title_de: 'Die Rache der Omega', year_us: 2007, year_dach: 2009, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #43 Fallen ──
  {
    rank: 43,
    series_name: 'Fallen',
    series_name_de: 'Fallen',
    author: 'Lauren Kate',
    goodreads_score: 19489,
    avg_rating: '3.72',
    books: [
      { volume: 1, title_en: 'Fallen', title_de: 'Fallen – Engelsnacht', year_us: 2009, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Torment', title_de: 'Fallen – Engelssturm', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Passion', title_de: 'Fallen – Engelsmorgen', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Rapture', title_de: 'Fallen – Engelsfluch', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #44 Artemis Fowl ──
  {
    rank: 44,
    series_name: 'Artemis Fowl',
    series_name_de: 'Artemis Fowl',
    author: 'Eoin Colfer',
    goodreads_score: 19115,
    avg_rating: '3.86',
    books: [
      { volume: 1, title_en: 'Artemis Fowl', title_de: 'Artemis Fowl', year_us: 2001, year_dach: 2002, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Artemis Fowl: The Arctic Incident', title_de: 'Artemis Fowl – Die Verschwörung', year_us: 2002, year_dach: 2003, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Artemis Fowl: The Eternity Code', title_de: 'Artemis Fowl – Der Geheimcode', year_us: 2003, year_dach: 2004, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Artemis Fowl: The Opal Deception', title_de: 'Artemis Fowl – Die Rache', year_us: 2005, year_dach: 2006, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Artemis Fowl: The Lost Colony', title_de: 'Artemis Fowl – Die verlorene Kolonie', year_us: 2006, year_dach: 2007, is_dach_split: false, dach_split_part: null },
      { volume: 6, title_en: 'Artemis Fowl: The Time Paradox', title_de: 'Artemis Fowl – Das Zeitparadox', year_us: 2008, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 7, title_en: 'Artemis Fowl: The Atlantis Complex', title_de: 'Artemis Fowl – Der Atlantis-Komplex', year_us: 2010, year_dach: 2011, is_dach_split: false, dach_split_part: null },
      { volume: 8, title_en: 'Artemis Fowl: The Last Guardian', title_de: 'Artemis Fowl – Der letzte Wächter', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #45 The Vampire Chronicles ──
  {
    rank: 45,
    series_name: 'The Vampire Chronicles',
    series_name_de: 'Chronik der Vampire',
    author: 'Anne Rice',
    goodreads_score: 18805,
    avg_rating: '4.02',
    books: [
      { volume: 1, title_en: 'Interview with the Vampire', title_de: 'Gespräch mit dem Vampir', year_us: 1976, year_dach: 1989, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Vampire Lestat', title_de: 'Der Fürst der Finsternis', year_us: 1985, year_dach: 1990, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Queen of the Damned', title_de: 'Die Königin der Verdammten', year_us: 1988, year_dach: 1991, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #46 Gallagher Girls ──
  {
    rank: 46,
    series_name: 'Gallagher Girls',
    series_name_de: 'Gallagher Girls',
    author: 'Ally Carter',
    goodreads_score: 18621,
    avg_rating: '3.84',
    books: [
      { volume: 1, title_en: "I'd Tell You I Love You, But Then I'd Have to Kill You", title_de: 'Gallagher Girls – Ich weiß, was du letzte Nacht getan hast', year_us: 2006, year_dach: 2009, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Cross My Heart and Hope to Spy', title_de: 'Gallagher Girls – Spione küsst man nicht', year_us: 2007, year_dach: 2010, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: "Don't Judge a Girl by Her Cover", title_de: 'Gallagher Girls – Abgefahren und top secret', year_us: 2009, year_dach: 2011, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #47 Lux ──
  {
    rank: 47,
    series_name: 'Lux',
    series_name_de: 'Lux',
    author: 'Jennifer L. Armentrout',
    goodreads_score: 18530,
    avg_rating: '4.13',
    books: [
      { volume: 1, title_en: 'Obsidian', title_de: 'Obsidian – Schattendunkel', year_us: 2011, year_dach: 2014, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Onyx', title_de: 'Onyx – Schattenschimmer', year_us: 2012, year_dach: 2015, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Opal', title_de: 'Opal – Schattenglanz', year_us: 2012, year_dach: 2015, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Origin', title_de: 'Origin – Schattenfunke', year_us: 2013, year_dach: 2016, is_dach_split: false, dach_split_part: null },
      { volume: 5, title_en: 'Opposition', title_de: 'Opposition – Schattenblitz', year_us: 2014, year_dach: 2016, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #48 Fifty Shades ──
  {
    rank: 48,
    series_name: 'Fifty Shades',
    series_name_de: 'Fifty Shades of Grey',
    author: 'E.L. James',
    goodreads_score: 18138,
    avg_rating: '3.67',
    books: [
      { volume: 1, title_en: 'Fifty Shades of Grey', title_de: 'Fifty Shades of Grey – Geheimes Verlangen', year_us: 2011, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Fifty Shades Darker', title_de: 'Fifty Shades of Grey – Gefährliche Liebe', year_us: 2012, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Fifty Shades Freed', title_de: 'Fifty Shades of Grey – Befreite Lust', year_us: 2012, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #49 The Giver ──
  {
    rank: 49,
    series_name: 'The Giver',
    series_name_de: 'Hüter der Erinnerung',
    author: 'Lois Lowry',
    goodreads_score: 17656,
    avg_rating: '4.12',
    books: [
      { volume: 1, title_en: 'The Giver', title_de: 'Hüter der Erinnerung', year_us: 1993, year_dach: 1994, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'Gathering Blue', title_de: 'Auf der Suche nach dem Blau', year_us: 2000, year_dach: 2002, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'Messenger', title_de: 'Der Botschafter', year_us: 2004, year_dach: 2006, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'Son', title_de: 'Der Sohn', year_us: 2012, year_dach: 2014, is_dach_split: false, dach_split_part: null },
    ],
  },

  // ── #50 The Iron Fey ──
  {
    rank: 50,
    series_name: 'The Iron Fey',
    series_name_de: 'Plötzlich Fee',
    author: 'Julie Kagawa',
    goodreads_score: 17570,
    avg_rating: '3.87',
    books: [
      { volume: 1, title_en: 'The Iron King', title_de: 'Plötzlich Fee – Sommernacht', year_us: 2010, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 2, title_en: 'The Iron Daughter', title_de: 'Plötzlich Fee – Winternacht', year_us: 2010, year_dach: 2012, is_dach_split: false, dach_split_part: null },
      { volume: 3, title_en: 'The Iron Queen', title_de: 'Plötzlich Fee – Herbstnacht', year_us: 2011, year_dach: 2013, is_dach_split: false, dach_split_part: null },
      { volume: 4, title_en: 'The Iron Knight', title_de: 'Plötzlich Fee – Frühlingsnacht', year_us: 2011, year_dach: 2013, is_dach_split: false, dach_split_part: null },
    ],
  },
];
