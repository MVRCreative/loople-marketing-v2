import { author } from './documents/author';
import { docCategory } from './documents/docCategory';
import { docFeature } from './documents/docFeature';
import { feature } from './documents/feature';
import { jobPosting } from './documents/jobPosting';
import { resource } from './documents/resource';
import { blockContent } from './objects/blockContent';
import { seo } from './objects/seo';

export const schemaTypes = [
  feature,
  docCategory,
  docFeature,
  resource,
  author,
  jobPosting,
  blockContent,
  seo,
];
