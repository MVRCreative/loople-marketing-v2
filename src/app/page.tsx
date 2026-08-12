import type { Metadata } from 'next';
import { Navbar, SiteFooter } from '@/components/common';
import { FeatureIndex } from '@/components/home/FeatureIndex';
import { HomeCta } from '@/components/home/HomeCta';
import { HomeHero } from '@/components/home/HomeHero';

export const metadata: Metadata = {
  title: 'Loople',
  description:
    'Keep the whole community moving. Bring registration, communication, schedules, payments, family accounts, and operations together.',
};

/**
 * Homepage — hero, feature index, closing CTA, and footer.
 * @returns Homepage layout with hero, features, and CTA.
 */
export default function HomePage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <HomeHero />

      <FeatureIndex />

      <HomeCta />

      <SiteFooter />
    </div>
  );
}
