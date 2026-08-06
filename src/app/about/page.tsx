import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import OrderButton from "@/components/ui/OrderButton";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "How Dos Tacos became Katy's favorite taqueria — daily salsa, a real vegan menu, and free samples for first-timers.",
  path: "/about",
  image: "/img/store-front.jpg",
});

/**
 * PLACEHOLDER COPY — the story beats below are written from the Google reviews
 * (free samples, vegan range, family feel). Swap in the real history.
 */
const CHAPTERS = [
  {
    num: "01",
    title: "It started with a comal",
    body: "No consultants, no focus groups. Just a griddle, a family recipe for adobo, and the stubborn belief that a $3 taco should taste like somebody cared.",
    bg: "bg-mango",
  },
  {
    num: "02",
    title: "We made the vegan menu real",
    body: "Most places bolt on a sad veggie option. We built a whole second kitchen's worth — vegan pastor, vegan egg tacos, a four-taco sampler. People drive across Katy for it.",
    bg: "bg-lime",
  },
  {
    num: "03",
    title: "First time? Here, try this.",
    body: "If you've never been in, somebody is going to hand you a free sample before you've even ordered. It's in the reviews more than almost anything else. That's on purpose.",
    bg: "bg-turquoise",
  },
  {
    num: "04",
    title: "1,020 reviews later",
    body: `${site.rating} stars and counting. We still open at 8 AM, we still make the salsa every morning, and we still get nervous when a table goes quiet.`,
    bg: "bg-guava",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Nuestra Historia"
        title="Two Tacos, Twice the Happiness"
        blurb={site.blurb}
        accent="mango"
      />

      {/* storefront */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl border-4 border-ink shadow-[10px_10px_0_var(--color-salsa)]">
          <Image
            src="/img/store-front.jpg"
            alt={`${site.name} storefront on Gaston Rd in ${site.city}`}
            width={1400}
            height={700}
            className="h-[38vh] w-full object-cover sm:h-[52vh]"
            priority
          />
        </div>
        <p className="mt-3 text-center font-fun text-lg text-ink/60">
          {site.address.street} — you can smell it from the parking lot.
        </p>
      </section>

      {/* chapters */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <SectionHeading
          kicker="Cómo empezamos"
          title="How we got here"
          blurb="Four chapters, no filler."
        />

        <div className="mt-12 space-y-6">
          {CHAPTERS.map((c, i) => (
            <article
              key={c.num}
              className={`sticker flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-start sm:p-8 ${c.bg} text-ink`}
              style={{ rotate: i % 2 ? "0.8deg" : "-0.8deg" }}
            >
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 border-ink font-display text-3xl leading-none">
                {c.num}
              </span>
              <div>
                <h3 className="font-display text-3xl uppercase leading-none sm:text-4xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-ink/80">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="bg-ink py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            light
            accent="mango"
            kicker="Lo que nos importa"
            title="Three house rules"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "Salsa made daily",
                d: "Roja, verde, and the one that fights back. Never from a jar, never yesterday's.",
              },
              {
                t: "Everybody eats",
                d: "Vegan, kids' portions, and prices that don't punish a family of four.",
              },
              {
                t: "Nobody leaves a stranger",
                d: "Free samples for first-timers. We'd rather you try it than guess.",
              },
            ].map((v) => (
              <div
                key={v.t}
                className="rounded-3xl border-4 border-cream/25 p-6 transition-colors hover:border-mango"
              >
                <h3 className="font-display text-2xl uppercase text-mango">
                  {v.t}
                </h3>
                <p className="mt-2 text-cream/75">{v.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <OrderButton size="lg" variant="mango">
              Try it yourself
            </OrderButton>
          </div>
        </div>
      </section>
    </>
  );
}
