import type { MetadataRoute } from 'next';
import { db } from '@/lib/db/drizzle';
import { books } from '@/lib/db/schema';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://buchinventar.de';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: { languages: { 'de-DE': BASE_URL } },
    },
    {
      url: `${BASE_URL}/books`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: { languages: { 'de-DE': `${BASE_URL}/books` } },
    },
  ];

  // Dynamic book pages
  const allBooks = await db
    .select({ id: books.id })
    .from(books);

  const bookPages: MetadataRoute.Sitemap = allBooks.map((book) => ({
    url: `${BASE_URL}/books/${book.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...bookPages];
}
