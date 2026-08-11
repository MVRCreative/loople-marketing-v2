import type { PortableTextBlock } from 'next-sanity';

export type ResourceCategory = 'blog' | 'caseStudy' | 'tutorial' | 'news';

export type ResourceListItem = {
  _id: string;
  title: string;
  slug: string;
  category: ResourceCategory;
  excerpt: string;
  publishedAt: string;
  featured: boolean | null;
  authorName: string | null;
};

export type ResourceDetail = ResourceListItem & {
  body: PortableTextBlock[] | null;
  relatedFeatures:
    | {
        name: string;
        slug: string;
      }[]
    | null;
};
