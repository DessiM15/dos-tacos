"use client";

/**
 * Infinite horizontal ticker. Children are rendered twice and translated -50%,
 * which makes the loop seamless without measuring anything.
 */
export default function Marquee({
  items,
  separator = "★",
  reverse = false,
  duration = 26,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  separator?: string;
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
