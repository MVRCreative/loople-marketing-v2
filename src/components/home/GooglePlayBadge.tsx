/**
 * Official-style Google Play badge (black).
 * Trademark: Google LLC. Used for download affordance only.
 * @param props Badge props.
 * @param props.className Optional width/height utility classes.
 * @returns Google Play badge SVG.
 */
export const GooglePlayBadge = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 135 40"
    aria-hidden="true"
    focusable="false"
    className={props.className}
  >
    <rect width="135" height="40" rx="6" fill="#000" />
    <rect
      x="0.5"
      y="0.5"
      width="134"
      height="39"
      rx="5.5"
      fill="none"
      stroke="#a6a6a6"
      strokeWidth="1"
    />
    <path fill="#EA4335" d="M12.8 8.2 24.5 19.9 21.2 23.2 9.5 11.5z" />
    <path fill="#FBBC04" d="M9.5 28.5 21.2 16.8 24.5 20.1 12.8 31.8z" />
    <path fill="#4285F4" d="M24.5 19.9 28.8 17.4c.7-.4.7-1.1 0-1.5L12.8 8.2 21.2 16.6z" />
    <path fill="#34A853" d="M24.5 20.1 21.2 23.4 12.8 31.8l16-9.2c.7-.4.7-1.1 0-1.5z" />
    <text
      x="36"
      y="15.5"
      fill="#fff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="7.5"
      fontWeight="400"
    >
      GET IT ON
    </text>
    <text
      x="36"
      y="28"
      fill="#fff"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="13"
      fontWeight="600"
    >
      Google Play
    </text>
  </svg>
);
