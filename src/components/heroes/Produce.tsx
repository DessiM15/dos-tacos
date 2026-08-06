/**
 * Chunky illustrated produce for the hero. Filled and colourful (unlike the
 * line icons in ui/Icon), because these float at large sizes.
 */

const INK = "#0d0b0b";

export type ProduceName =
  | "lime"
  | "chili"
  | "cilantro"
  | "onion"
  | "avocado"
  | "taco";

const SHAPES: Record<ProduceName, React.ReactNode> = {
  lime: (
    <>
      <circle cx="50" cy="50" r="38" fill="#8FD400" stroke={INK} strokeWidth="6" />
      <circle cx="50" cy="50" r="29" fill="#C6F06A" />
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={i}
          d="M50 50 L50 23"
          stroke={INK}
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="5" fill="#8FD400" stroke={INK} strokeWidth="3" />
    </>
  ),
  chili: (
    <>
      <path
        d="M22 82c34 0 54-19 54-40 0-9-6-15-13-15s-12 7-12 15c0 14-12 22-29 22z"
        fill="#ED1C24"
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M63 27c2-9 7-13 16-13"
        fill="none"
        stroke="#5FA524"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M63 27c2-9 7-13 16-13"
        fill="none"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
    </>
  ),
  cilantro: (
    <>
      <path d="M50 92V50" stroke="#3E7315" strokeWidth="7" strokeLinecap="round" />
      <path d="M50 62 33 52M50 70 67 60" stroke="#3E7315" strokeWidth="5" strokeLinecap="round" />
      {/* three scalloped leaves */}
      {[
        { d: "M50 46c-9-3-14-11-11-19 8-3 17 2 20 10-2 6-5 9-9 9Z", x: 0, y: 0 },
        { d: "M50 46c9-3 14-11 11-19-8-3-17 2-20 10 2 6 5 9 9 9Z", x: 0, y: 0 },
        { d: "M33 54c-8-2-13-9-11-17 7-3 15 1 18 8-1 6-4 9-7 9Z", x: 0, y: 0 },
        { d: "M67 62c8-2 13-9 11-17-7-3-15 1-18 8 1 6 4 9 7 9Z", x: 0, y: 0 },
      ].map((leaf, i) => (
        <path
          key={i}
          d={leaf.d}
          fill="#5FA524"
          stroke={INK}
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
      ))}
    </>
  ),
  onion: (
    <>
      {/* halved onion: domed body with concentric rings */}
      <path
        d="M12 58c0-22 17-38 38-38s38 16 38 38c0 8-4 12-12 12H24c-8 0-12-4-12-12Z"
        fill="#FFFDF5"
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="M28 70c0-16 10-27 22-27s22 11 22 27" fill="none" stroke="#C9A9D8" strokeWidth="4" />
      <path d="M40 70c0-8 4-14 10-14s10 6 10 14" fill="none" stroke="#C9A9D8" strokeWidth="4" />
      <path
        d="M50 20c-2-8-8-11-8-11M50 20c2-8 8-11 8-11"
        stroke="#5FA524"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  avocado: (
    <>
      <path
        d="M50 12c16 0 27 15 27 33 0 24-13 43-27 43S23 69 23 45c0-18 11-33 27-33Z"
        fill="#5FA524"
        stroke={INK}
        strokeWidth="6"
      />
      <path
        d="M50 24c10 0 18 10 18 22 0 17-9 30-18 30s-18-13-18-30c0-12 8-22 18-22Z"
        fill="#D9E86B"
      />
      <ellipse cx="50" cy="53" rx="12" ry="14" fill="#8A4B2A" stroke={INK} strokeWidth="4" />
    </>
  ),
  taco: (
    <>
      {/* filling sits above the shell's rim */}
      <path
        d="M14 42q8-13 17-6t17-8q10-9 18 3t18 0v13H14Z"
        fill="#8A4B2A"
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <ellipse cx="36" cy="34" rx="7" ry="4.5" fill="#5FA524" stroke={INK} strokeWidth="3" />
      <circle cx="60" cy="33" r="5" fill="#FFFDF5" stroke={INK} strokeWidth="3" />
      {/* folded tortilla */}
      <path
        d="M8 40q42 58 84 0Z"
        fill="#F5C860"
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M24 60q26 20 52 0"
        fill="none"
        stroke="#D99A2B"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  ),
};

export default function Produce({
  name,
  className = "h-16 w-16",
}: {
  name: ProduceName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {SHAPES[name]}
    </svg>
  );
}
