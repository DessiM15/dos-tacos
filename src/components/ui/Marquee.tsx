"use client";

/** Small solid star used as the default ticker separator. */
function StarGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9Z" />
    </svg>
  );
}

/**
 * Infinite horizontal ticker. Children are rendered twice and translated -50%,
 * which makes the loop seamless without measuring anything.
 */
export default function Marquee({
  items,
  separator = <StarGlyph />,
  reverse = false,
  duration = 26,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  separator?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
  itemClassName?: string;
}) {
  const run = (
    <div
      className={`flex shrink-0 items-center gap-8 pr-8 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className={`flex items-center gap-8 ${itemClassName}`}>
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden className="opacity-60">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee-pause flex overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {run}
    </div>
  );
}
