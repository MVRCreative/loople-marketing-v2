import { PortableText } from 'next-sanity';
import type { PortableTextBlock, PortableTextComponents } from 'next-sanity';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-ds-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-ds-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-ds-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-ds-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-ds-border pl-4 text-ds-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-5 text-ds-muted-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-ds-muted-foreground">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ds-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded-ds-sm bg-ds-muted px-1.5 py-0.5 text-sm text-ds-foreground">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          className="font-medium text-ds-brand underline-offset-4 hover:underline"
          {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

/**
 * Renders a Sanity portable-text resource body with marketing styles.
 * @param props Portable text blocks from Sanity.
 * @returns Styled article body, or null when empty.
 */
export const ResourcePortableText = (props: { value: PortableTextBlock[] | null }) => {
  if (!props.value || props.value.length === 0) {
    return null;
  }

  return <PortableText value={props.value} components={components} />;
};
