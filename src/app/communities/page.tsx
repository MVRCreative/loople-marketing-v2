import type { Metadata } from 'next';
import {
  Button,
  Navbar,
  RevealHeading,
  RevealLines,
  SiteFooter,
  Stagger,
} from '@/components/common';
import { siteDemoCta } from '@/data/site-nav';

export const metadata: Metadata = {
  title: 'Communities | Loople',
  description: 'See how clubs, leagues, and local organizations run on Loople.',
};

const communityTypes = [
  {
    id: 'sports-clubs',
    title: 'Sports clubs',
    description:
      'Registration, family accounts, schedules, and sideline updates in one place — without the group-text scramble.',
  },
  {
    id: 'leagues',
    title: 'Leagues and associations',
    description:
      'Multi-program seasons, targeted broadcasts, and member directories that stay accurate as rosters change.',
  },
  {
    id: 'youth-orgs',
    title: 'Youth organizations',
    description:
      'Waivers, payments, and parent visibility built around how families actually manage kids and schedules.',
  },
  {
    id: 'community-groups',
    title: 'Local communities',
    description:
      'Newsfeeds, events, and lightweight ops for groups that need structure without enterprise software.',
  },
] as const;

/**
 * Communities overview — who Loople is built for.
 * @returns Communities marketing page.
 */
export default function CommunitiesPage() {
  return (
    <div className="bg-ds-background text-ds-foreground">
      <Navbar />

      <main>
        <section className="border-b border-ds-border">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <RevealHeading
              as="h1"
              className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl"
            >
              Built for communities that move together
            </RevealHeading>
            <RevealLines
              as="p"
              delay={0.12}
              className="mt-6 max-w-2xl text-base leading-relaxed text-ds-muted-foreground sm:text-lg"
            >
              Loople helps organizers run the work and members keep up — across clubs, leagues, and
              local groups that used to live in spreadsheets and chat threads.
            </RevealLines>
            <div className="mt-10">
              <Button href={siteDemoCta.href} size="md">
                {siteDemoCta.label}
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="community-types-heading" className="border-b border-ds-border">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
            <h2
              id="community-types-heading"
              className="text-2xl font-semibold tracking-tight text-ds-foreground sm:text-3xl"
            >
              Who runs on Loople
            </h2>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2" stagger={0.08}>
              {communityTypes.map((item) => (
                <article
                  key={item.id}
                  className="rounded-ds-lg border border-ds-border bg-ds-card p-6 sm:p-8"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-ds-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ds-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </article>
              ))}
            </Stagger>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
