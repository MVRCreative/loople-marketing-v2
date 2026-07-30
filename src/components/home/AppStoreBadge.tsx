/**
 * Official-style App Store badge (black).
 * Trademark: Apple Inc. Used for download affordance only.
 * @param props Badge props.
 * @param props.className Optional width/height utility classes.
 * @returns App Store badge SVG.
 */
export const AppStoreBadge = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 40"
    aria-hidden="true"
    focusable="false"
    className={props.className}
  >
    <rect width="120" height="40" rx="6" fill="#000" />
    <rect
      x="0.5"
      y="0.5"
      width="119"
      height="39"
      rx="5.5"
      fill="none"
      stroke="#a6a6a6"
      strokeWidth="1"
    />
    <path
      fill="#fff"
      d="M24.77 20.3c0-2.26 1.85-3.36 1.93-3.41-1.05-1.54-2.69-1.75-3.27-1.77-1.39-.14-2.72.82-3.42.82-.71 0-1.8-.8-2.96-.78-1.52.02-2.93.89-3.71 2.25-1.59 2.75-.41 6.82 1.14 9.05.76 1.09 1.66 2.31 2.84 2.27 1.14-.05 1.57-.73 2.95-.73 1.37 0 1.76.73 2.96.71 1.22-.02 2-1.11 2.75-2.21.87-1.27 1.22-2.5 1.24-2.56-.03-.01-2.38-.91-2.41-3.62zm-2.26-6.7c.63-.76 1.05-1.82.93-2.88-.9.04-1.99.6-2.63 1.36-.58.67-1.08 1.75-.95 2.78 1 .08 2.02-.51 2.65-1.26z"
    />
    <text
      x="34"
      y="15.5"
      fill="#fff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="7.5"
      fontWeight="400"
    >
      Download on the
    </text>
    <text
      x="34"
      y="28"
      fill="#fff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="13"
      fontWeight="600"
    >
      App Store
    </text>
  </svg>
);
