import { createClient } from 'next-sanity';
import { Env } from '@/libs/Env';

/**
 * Shared Sanity client for server-side content fetches.
 */
const sanityClient = createClient({
  projectId: Env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: Env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-02-01',
  useCdn: true,
});

type SanityFetchOptions = {
  query: string;
  params?: Record<string, string>;
  revalidate?: number | false;
  tags?: string[];
};

/**
 * Fetches content from Sanity with Next.js cache tags / revalidation.
 * @param props Query string, optional params, and cache options.
 * @returns Query result.
 */
export const sanityFetch = async <T>(props: SanityFetchOptions): Promise<T> =>
  await sanityClient.fetch<T>(props.query, props.params ?? {}, {
    next: {
      // Time-based by default; tags still allow on-demand revalidation later.
      revalidate: props.revalidate ?? 60,
      tags: props.tags ?? [],
    },
  });
