import type { SVGProps } from "react";

/** WhatsApp chat/handset glyph; inherits the site's brand color. */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20.9 11.6a8.9 8.9 0 0 1-13.1 7.8L3 21l1.6-4.7a8.9 8.9 0 1 1 16.3-4.7Z" />
      <path d="m8.8 6.8-1.2.4c-.5.2-.8.8-.7 1.4.5 3.9 3.7 7.1 7.6 7.6.6.1 1.2-.2 1.4-.7l.5-1.2-2.5-1.2-.9 1c-1.6-.7-2.8-1.9-3.5-3.5l1-.9-1.7-2.9Z" />
    </svg>
  );
}
