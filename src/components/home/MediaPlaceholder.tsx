/**
 * Neutral media placeholder sized to a target aspect ratio.
 * Used while production screenshots/imagery are not yet available.
 */

import { cn } from '@/lib/cn';

export type MediaPlaceholderProps = {
  /** CSS aspect-ratio value, e.g. "16 / 9" or "758 / 633". */
  aspectRatio: string;
  /** Visible label so placeholders stay obvious in layout review. */
  label: string;
  className?: string;
};

export const MediaPlaceholder = (props: MediaPlaceholderProps) => (
  <div
    aria-label={`${props.label} placeholder`}
    className={cn(
      'flex w-full items-center justify-center border border-dashed border-ds-border bg-ds-muted text-ds-muted-foreground',
      props.className,
    )}
    style={{ aspectRatio: props.aspectRatio }}
  >
    <div className="px-6 text-center">
      <p className="text-sm font-medium tracking-tight text-ds-foreground/70">{props.label}</p>
      <p className="mt-1 font-ds-mono text-[11px] text-ds-muted-foreground">
        {props.aspectRatio.replaceAll(' ', '')}
      </p>
    </div>
  </div>
);
