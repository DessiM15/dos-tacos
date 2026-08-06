import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ReviewCard from "@/components/ui/ReviewCard";
import OrderButton from "@/components/ui/OrderButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Icon";
import { site, reviews, reviewSummary } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Reviews",
  description:
    "4.9 stars from 1,020 Google reviews. Read what Katy says about Dos Tacos' street tacos, quesabirrias and vegan menu.",
  path: "/reviews",
  image: "/img/real/chilaquiles.jpg",
});

const RATING_BARS = [
  { stars: 5, pct: 94 },
  { stars: 4, pct: 4 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0.5 },
  { stars: 1, pct: 0.5 },
];

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        kicker="Lo que dice la gente"
        title="4.9 Stars. 1,020 Reviews."
        blurb="We didn't write any of these. Katy did."
        accent="turquoise"
      />

      {/* score panel */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="sticker grid gap-8 rounded-3xl bg-ink p-8 text-cream lg:grid-cols-[auto_1fr] lg:p-10">
          <div className="text-center lg:border-r-4 lg:border-cream/20 lg:pr-10">
            <p className="font-display text-8xl leading-none text-mango">
              {site.rating}
            </p>
            <p className="mt-1 flex justify-center text-mango">
              <Stars count={5} className="h-6 w-6" />
            </p>
            <p className="mt-2 text-sm text-cream/60">
              {site.reviewCount.toLocaleString()} Google reviews
            </p>
          </div>

          <div className="flex flex-col justify-center gap-2">
            {RATING_BARS.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <span className="flex w-12 shrink-0 items-center gap-1 text-sm text-cream/70">
                  {r.stars}
                  <Stars count={1} className="h-3.5 w-3.5" />
                </span>
                <div className="h-4 flex-1 overflow-hidden rounded-full border-2 border-cream/25 bg-cream/5">
                  <div
                    className="h-full rounded-full bg-mango"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right text-sm tabular-nums text-cream/60">
                  {r.pct}%
                </span>
              </div>
            ))}
            <p className="mt-2 text-[11px] uppercase tracking-wider text-cream/35">
              Distribution estimated from the public listing
            </p>
          </div>
        </div>

        {/* Google's own AI summary */}
        <div className="sticker mt-8 rounded-3xl bg-mango p-7">
          <p className="font-fun text-lg text-ink/70">
            What Google&apos;s summary says
          </p>
          <p className="mt-2 text-lg leading-relaxed text-ink sm:text-xl">
            {reviewSummary}
          </p>
        </div>
      </section>

      {/* the wall */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading
          kicker="En sus palabras"
          title="The wall"
          blurb="A handful of the ones that made us blush."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="font-fun text-xl text-salsa">Your turn</p>
          <p className="mb-6 font-display text-4xl uppercase leading-none sm:text-5xl">
            Come make it 1,021
          </p>
          <OrderButton size="lg">Order Now</OrderButton>
        </div>
      </section>
    </>
  );
}
