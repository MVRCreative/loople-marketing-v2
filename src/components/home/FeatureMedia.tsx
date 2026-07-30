/**
 * Feature media slot — a self-playing demo when one is registered for the
 * feature, then a video when provided, otherwise a neutral placeholder.
 */

'use client';

import { FEATURE_DEMOS } from '@/components/home/demos';
import { MediaPlaceholder } from '@/components/home/MediaPlaceholder';
import { cn } from '@/lib/cn';

export type FeatureMediaProps = {
  aspectRatio: string;
  label: string;
  /** Public path to an mp4 (or other browser-playable) video. */
  videoSrc?: string;
  /** Feature or sub-feature id used to look up a self-playing demo. */
  demoId?: string;
  className?: string;
};

export const FeatureMedia = (props: FeatureMediaProps) => {
  const Demo = props.demoId ? FEATURE_DEMOS[props.demoId] : undefined;

  if (Demo) {
    return <Demo aspectRatio={props.aspectRatio} className={props.className} />;
  }

  if (!props.videoSrc) {
    return (
      <MediaPlaceholder
        aspectRatio={props.aspectRatio}
        label={props.label}
        className={props.className}
      />
    );
  }

  return (
    <div className={cn('w-full', props.className)}>
      <video
        className="block h-auto w-full"
        src={props.videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={props.label}
      >
        <track
          kind="captions"
          src="/assets/videos/test-video-captions.vtt"
          srcLang="en"
          label="English"
          default
        />
      </video>
    </div>
  );
};
