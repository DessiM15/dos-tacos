import Marquee from "@/components/ui/Marquee";

const BG = {
  salsa: "bg-salsa text-cream",
  lime: "bg-lime text-ink",
  mango: "bg-mango text-ink",
  turquoise: "bg-turquoise text-ink",
  guava: "bg-guava text-cream",
  ink: "bg-ink text-cream",
} as const;

/** Compact banner used at the top of every non-home page. */
export default function PageHero({
  kicker,
  title,
  blurb,
  accent = "salsa",
  ticker,
}: {
  kicker: string;
  title: string;
  blurb?: string;
  accent?: keyof typeof BG;
  ticker?: string[];
}) {
  return (
    <section className={`relative overflow-hidden ${BG[accent]}`}>
      <div aria-hidden className="halftone absolute inset-0 text-ink opacity-15" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <p className="font-fun text-xl opacity-90 sm:text-2xl">{kicker}</p>
        <h1 className="font-display text-[15vw] uppercase leading-[0.82] tracking-tight sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        {blurb && (
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">{blurb}</p>
        )}
      </div>

      {ticker && (
        <Marquee
          items={ticker}
          duration={26}
          className="border-t-4 border-ink bg-ink py-2.5 font-display text-lg uppercase text-cream sm:text-xl"
        />
      )}
    </section>
  );
}
