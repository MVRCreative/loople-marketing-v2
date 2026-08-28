/**
 * Shared types for legal document navigation.
 */

/** A clickable on-this-page index entry, optionally with nested subsections. */
export type LegalTocItem = {
  id: string;
  label: string;
  children?: readonly LegalTocItem[];
};
