/**
 * Shared typography primitives for legal and policy documents.
 */

import Link from 'next/link';

const linkClassName =
  'font-medium text-ds-brand underline-offset-4 transition-colors outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ds-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background';

/**
 * Body paragraph for legal copy.
 * @param props Paragraph children.
 * @returns Styled paragraph.
 */
export const LegalParagraph = (props: { children: React.ReactNode }) => (
  <p className="mb-4 text-base leading-relaxed text-ds-muted-foreground">{props.children}</p>
);

/**
 * Bulleted list for legal copy.
 * @param props List items.
 * @returns Styled unordered list.
 */
export const LegalList = (props: { children: React.ReactNode }) => (
  <ul className="mb-4 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-ds-muted-foreground">
    {props.children}
  </ul>
);

/**
 * Numbered list for legal copy.
 * @param props List items.
 * @returns Styled ordered list.
 */
export const LegalOrderedList = (props: { children: React.ReactNode }) => (
  <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-base leading-relaxed text-ds-muted-foreground">
    {props.children}
  </ol>
);

/**
 * Numbered section heading with a stable fragment id.
 * @param props Heading id and label.
 * @returns Styled h2 with scroll margin for the sticky nav.
 */
export const LegalH2 = (props: { id: string; children: React.ReactNode }) => (
  <h2
    id={props.id}
    className="mt-12 mb-4 scroll-mt-28 text-2xl font-semibold tracking-tight text-ds-foreground first:mt-0"
  >
    {props.children}
  </h2>
);

/**
 * Subsection heading with a stable fragment id.
 * @param props Heading id and label.
 * @returns Styled h3 with scroll margin for the sticky nav.
 */
export const LegalH3 = (props: { id: string; children: React.ReactNode }) => (
  <h3
    id={props.id}
    className="mt-8 mb-3 scroll-mt-28 text-lg font-semibold tracking-tight text-ds-foreground"
  >
    {props.children}
  </h3>
);

/**
 * In-page, site, or external link styled for legal copy.
 * @param props Href, children, and optional external target.
 * @returns Styled anchor or Next.js link.
 */
export const LegalLink = (props: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) => {
  if (props.external || props.href.startsWith('#') || props.href.startsWith('mailto:')) {
    return (
      <a
        href={props.href}
        className={linkClassName}
        {...(props.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {props.children}
      </a>
    );
  }

  return (
    <Link href={props.href} className={linkClassName}>
      {props.children}
    </Link>
  );
};

const SUPPORT_EMAIL = 'support@joinloople.com';

/**
 * Support mailbox link used throughout legal copy.
 * @returns Mailto link for Loople support.
 */
export const LegalMailLink = () => (
  <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClassName}>
    {SUPPORT_EMAIL}
  </a>
);
