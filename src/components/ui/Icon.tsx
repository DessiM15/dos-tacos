/**
 * Hand-drawn-feeling line icons. Chunky 2.2 stroke to match the sticker
 * borders used across the site. No emoji anywhere.
 */

export type IconName =
  | "taco"
  | "leaf"
  | "flame"
  | "chili"
  | "cheese"
  | "drink"
  | "scooter"
  | "car"
  | "phone"
  | "pin"
  | "star"
  | "search"
  | "gift"
  | "clock"
  | "bag";

const P = {
  taco: (
    <>
      <path d="M3 15a9 9 0 0 1 18 0" />
      <path d="M3 15c0 2 1.6 3.5 3.6 3.5S10 17 12 17s3.4 1.5 5.4 1.5S21 17 21 15" />
      <path d="M8 12.5c1.2-1 2.4-1 3.6 0M13 11c1.2-1 2.4-1 3.6 0" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-8 5-14 15-15 1 10-4 15-11 15-2 0-4-.6-4-.6Z" />
      <path d="M9.5 19c1-4 3-7 6.5-9.5" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3s5 4.2 5 9a5 5 0 0 1-10 0c0-2 1-3.4 2-4.5.4 1.6 1.3 2.3 2 2.3 1.2 0 1.6-1.4 1-3.3A9 9 0 0 0 12 3Z" />
    </>
  ),
  chili: (
    <>
      <path d="M6 20c7 0 12-4 12-9 0-2-1.4-3.5-3-3.5S12 9 12 11c0 3-2.6 5-6 5v4Z" />
      <path d="M15 7.5c.4-2 1.6-3 3.5-3" />
    </>
  ),
  cheese: (
    <>
      <path d="M3 17V11l9-5 9 5v6Z" />
      <circle cx="8.5" cy="13.5" r="1.2" />
      <circle cx="14" cy="15" r="1.2" />
      <circle cx="16.5" cy="11.5" r="1" />
    </>
  ),
  drink: (
    <>
      <path d="M6 5h12l-1.5 14a2 2 0 0 1-2 1.8h-5A2 2 0 0 1 7.5 19Z" />
      <path d="M6.6 10h10.8" />
      <path d="M14 2l-1 3" />
    </>
  ),
  scooter: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M9 17h6M6 17l3-9h3l2.5 9M12 8h5l1 9" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-3l2-5h12l2 5v3" />
      <path d="M3 16h18" />
      <circle cx="7.5" cy="17.5" r="2" />
      <circle cx="16.5" cy="17.5" r="2" />
      <path d="M6.5 12h11" />
    </>
  ),
  phone: (
    <>
      <path d="M7 3.5 9.5 8 7.5 10c1 2.4 3.1 4.5 5.5 5.5l2-2 4.5 2.5-1 3c-.3.9-1.2 1.4-2.1 1.2C9.4 19 5 14.6 3.8 8.1c-.2-.9.3-1.8 1.2-2.1Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  star: (
    <>
      <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  gift: (
    <>
      <path d="M3 11h18v9H3zM3 7.5h18V11H3zM12 7.5V20" />
      <path d="M12 7.5C10.5 4 8 3 6.8 4.2 5.6 5.4 7 7.5 12 7.5Zm0 0c1.5-3.5 4-4.5 5.2-3.3C18.4 5.4 17 7.5 12 7.5Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.3l3.4 2" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12H6Z" />
      <path d="M9 8V6a3 3 0 1 1 6 0v2" />
    </>
  ),
};

export default function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 2.2,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {P[name]}
    </svg>
  );
}

/** Solid star, used for ratings. */
export function Stars({
  count = 5,
  className = "h-4 w-4",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9Z" />
        </svg>
      ))}
    </span>
  );
}

/** Heat level as filled chili glyphs rather than emoji. */
export function Heat({ level }: { level: 0 | 1 | 2 | 3 }) {
  if (!level) return null;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-salsa"
      title={`Heat level ${level} of 3`}
      aria-label={`Heat level ${level} of 3`}
    >
      {Array.from({ length: level }).map((_, i) => (
        <Icon key={i} name="chili" className="h-4 w-4" strokeWidth={2.4} />
      ))}
    </span>
  );
}
