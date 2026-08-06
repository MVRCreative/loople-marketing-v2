/**
 * Placeholder for Content-layer documents (guides, FAQs, tutorials)
 * related to a Feature. Replace with Sanity-driven cards when CMS lands.
 */

import { MediaPlaceholder } from '@/components/common/MediaPlaceholder';

const PLACEHOLDER_CARDS = [
  { id: 'guide', type: 'Guide', title: 'Guide placeholder' },
  { id: 'faq', type: 'FAQ', title: 'FAQ placeholder' },
  { id: 'tutorial', type: 'Tutorial', title: 'Tutorial placeholder' },
] as const;

export type RelatedContentPlaceholderProps = {
  /** Feature name used in the section label. */
  featureName: string;
};

/**
 * Guides & resources placeholder section for feature detail pages.
 * @param props Feature name for labeling.
 * @returns Placeholder card row — delete or replace when Sanity Content lands.
 */
export const RelatedContentPlaceholder = (props: RelatedContentPlaceholderProps) => (
  <section aria-labelledby="related-content-heading" className="border-t border-ds-border">
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <p className="text-xs font-semibold tracking-wide text-ds-muted-foreground uppercase">
        Guides & resources
      </p>
      <h2
        id="related-content-heading"
        className="mt-2 text-2xl font-semibold tracking-tight text-ds-foreground sm:text-3xl"
      >
        Related to {props.featureName}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-ds-muted-foreground">
        Content placeholders — guides, FAQs, and tutorials that reference this feature will appear
        here once Sanity is connected.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {PLACEHOLDER_CARDS.map((card) => (
          <li
            key={card.id}
            className="overflow-hidden rounded-ds-lg border border-dashed border-ds-border bg-ds-card"
          >
            <MediaPlaceholder aspectRatio="16 / 9" label={card.type} />
            <div className="p-5">
              <p className="text-xs font-semibold tracking-wide text-ds-muted-foreground uppercase">
                {card.type}
              </p>
              <p className="mt-2 text-sm font-medium text-ds-foreground/70">{card.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
