'use client';

/**
 * Calendly inline embed with name/email prefill.
 * Matches the official inline widget (700px height, event details/GDPR hidden).
 */

import { useEffect, useRef } from 'react';
import { Env } from '@/libs/Env';

export type CalendlyEmbedProps = {
  name: string;
  email: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- augmenting Window
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill: { name: string; email: string };
      }) => void;
    };
  }
}

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Appends Calendly display flags used by the official inline embed snippet.
 * @param baseUrl Event URL from env.
 * @returns URL with hide_event_type_details + hide_gdpr_banner.
 */
const withEmbedDisplayParams = (baseUrl: string): string => {
  const url = new URL(baseUrl);
  url.searchParams.set('hide_event_type_details', '1');
  url.searchParams.set('hide_gdpr_banner', '1');
  return url.toString();
};

/**
 * Loads Calendly's widget script once, then mounts an inline embed.
 * @param props Prefill name and email from the demo request form.
 * @returns Reserved-height embed container.
 */
export const CalendlyEmbed = (props: CalendlyEmbedProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const calendlyUrl = Env.NEXT_PUBLIC_CALENDLY_URL
    ? withEmbedDisplayParams(Env.NEXT_PUBLIC_CALENDLY_URL)
    : undefined;

  useEffect(() => {
    const parent = containerRef.current;
    let removeLoadListener: (() => void) | undefined;

    if (calendlyUrl && parent) {
      parent.replaceChildren();

      const mount = () => {
        window.Calendly?.initInlineWidget({
          url: calendlyUrl,
          parentElement: parent,
          prefill: { name: props.name, email: props.email },
        });
      };

      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${CALENDLY_SCRIPT_SRC}"]`,
      );

      if (window.Calendly) {
        mount();
      } else if (existing) {
        existing.addEventListener('load', mount);
        removeLoadListener = () => {
          existing.removeEventListener('load', mount);
        };
      } else {
        const script = document.createElement('script');
        script.src = CALENDLY_SCRIPT_SRC;
        script.async = true;
        script.addEventListener('load', mount);
        document.body.append(script);
        removeLoadListener = () => {
          script.removeEventListener('load', mount);
        };
      }
    }

    return () => {
      removeLoadListener?.();
      parent?.replaceChildren();
    };
  }, [calendlyUrl, props.email, props.name]);

  if (!calendlyUrl) {
    return (
      <p className="rounded-ds-lg border border-ds-border bg-ds-muted/40 p-6 text-sm text-ds-muted-foreground">
        Scheduling is not configured yet. We received your details and will follow up by email.
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget min-h-[700px] w-full min-w-[320px] overflow-hidden rounded-ds-lg border border-ds-border bg-ds-card"
      data-testid="calendly-embed"
    />
  );
};
