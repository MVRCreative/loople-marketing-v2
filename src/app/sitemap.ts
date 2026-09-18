import type { MetadataRoute } from 'next';
import { featureSlugs } from '@/data/features';
import { getBaseUrl } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const routes = [
    '',
    '/demo',
    '/pricing',
    '/communities',
    '/about',
    '/careers',
    '/guides',
    '/support',
    '/resources',
    '/features',
    '/privacy',
    '/terms',
    ...featureSlugs.map((slug) => `/features/${slug}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
