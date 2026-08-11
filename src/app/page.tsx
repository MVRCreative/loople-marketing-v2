import type { Metadata } from 'next';
import { Navbar, SiteFooter } from '@/components/common';
import { FeatureIndex } from '@/components/home/FeatureIndex';
import { HomeHero } from '@/components/home/HomeHero';

export const metadata: Metadata = {
  title: 'Loople',
  description:
    'Keep the whole community moving. Bring registration, communication, schedules, payments, family accounts, and operations together.',
};

/**
 * Homepage — split hero on the page canvas, then the platform feature index.
 * @returns Homepage layout with hero and feature index.
 */
export default function HomePage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <HomeHero />

      <FeatureIndex />

      <SiteFooter />
    </div>
  );
}
