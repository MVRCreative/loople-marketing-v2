import type { MetadataRoute } from 'next';
import { featureSlugs } from '@/data/feature-index';
import { getBaseUrl } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const routes = ['', '/design-system', ...featureSlugs.map((slug) => `/features/${slug}`)];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
