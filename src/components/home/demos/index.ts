/**
 * Registry of self-playing feature demos, keyed by the feature or
 * sub-feature id from `@/data/feature-index`.
 *
 * `FeatureMedia` looks a demo up here before falling back to a video or the
 * neutral placeholder, so dropping a finished demo onto its panel is a
 * one-line addition to this map.
 */

import type { ComponentType } from 'react';
import { FamilyCheckoutDemo } from '@/components/home/demos/FamilyCheckoutDemo';
import { MemberDirectoryDemo } from '@/components/home/demos/MemberDirectoryDemo';
import { NewsfeedDemo } from '@/components/home/demos/NewsfeedDemo';
import { ProgramSetupDemo } from '@/components/home/demos/ProgramSetupDemo';
import { RolesAccessDemo } from '@/components/home/demos/RolesAccessDemo';

export type FeatureDemoProps = {
  /** CSS aspect-ratio value inherited from the media slot. */
  aspectRatio: string;
  className?: string;
};

export const FEATURE_DEMOS: Record<string, ComponentType<FeatureDemoProps>> = {
  'centralized-newsfeed': NewsfeedDemo,
  'family-checkout': FamilyCheckoutDemo,
  'member-directory': MemberDirectoryDemo,
  'program-setup': ProgramSetupDemo,
  'roles-access': RolesAccessDemo,
};

/**
 * Whether a feature media slot has a registered demo or a video source.
 * @param demoId Feature or sub-feature id to look up in `FEATURE_DEMOS`.
 * @param videoSrc Optional public video path.
 * @returns True when the slot should render media instead of being omitted.
 */
export const hasFeatureMedia = (demoId?: string, videoSrc?: string): boolean => {
  if (demoId && FEATURE_DEMOS[demoId]) {
    return true;
  }
  return typeof videoSrc === 'string' && videoSrc.length > 0;
};
