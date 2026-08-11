import { defineQuery } from 'next-sanity';

/**
 * Lists published resources for the marketing resources index.
 */
export const RESOURCES_QUERY = defineQuery(/* groq */ `
  *[_type == "resource" && defined(slug.current)]
  | order(featured desc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    featured,
    "authorName": author->name
  }
`);

/**
 * Fetches a single resource by slug for the detail page.
 */
export const RESOURCE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "resource" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    featured,
    "authorName": author->name,
    body,
    relatedFeatures[]->{
      name,
      "slug": slug.current
    }
  }
`);

/**
 * Slugs used by generateStaticParams for resource detail routes.
 */
export const RESOURCE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "resource" && defined(slug.current)]{
    "slug": slug.current
  }
`);
