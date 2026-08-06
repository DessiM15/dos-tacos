import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CateringForm from "@/components/CateringForm";
import { site } from "@/data/site";
import { featureImages } from "@/data/images";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Catering",
  description:
    "Taco bars, birria feasts and vegan spreads for parties, offices and events around Katy, TX. Get a same-day quote from Dos Tacos.",
  path: "/catering",
  image: "/img/real/nachos.jpg",
});

/** PLACEHOLDER pricing — confirm real packages and per-head rates. */
const PACKAGES = [
  {
    name: "Taco Bar",
    price: "$14",
    unit: "per person",
    image: featureImages.tacos,
    bg: "bg-salsa text-cream",
    blurb: "Build-your-own. Three meats, all the toppings, salsas, rice & beans.",
    includes: ["3 proteins", "Corn + flour tortillas", "4 salsas", "Rice & charro beans"],
  },
  {
    name: "Birria Feast",
    price: "$19",
    unit: "per person",
    image: featureImages.spread,
    bg: "bg-mango text-ink",
    blurb: "The showstopper. Birria, consomé for dipping, quesabirria on request.",
    includes: ["Birria + consomé", "Quesabirria station", "Elote", "Horchata dispenser"],
    featured: true,
  },
  {
    name: "Vegan Spread",
    price: "$13",
    unit: "per person",
    image: null,
    bg: "bg-lime text-ink",
    blurb: "Fully plant-based and genuinely good. Nobody will ask where the meat is.",
    includes: ["Vegan pastor", "Egg & potato", "Guacamole", "Grilled veg"],
  },
];

const STEPS = [
  { n: "1", t: "Tell us the vibe", d: "Headcount, date, and whether it's a backyard thing or a boardroom thing." },
  { n: "2", t: "We build a quote", d: "Usually same day. No deposit until you're happy with it." },
  { n: "3", t: "We show up early", d: "Setup, serve, clean. You get to actually attend your own party." },
];

export default function CateringPage() {
  return (
    <>
      <PageHero
        kicker="Fiestas, oficinas, todo"
        title="We'll Bring the Taquería"
        blurb={`Backyard parties, office lunches, quinceañeras, game day. Anywhere around ${site.city}, if there are people, we can feed them.`}
        accent="guava"
      />

      {/* packages */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          kicker="Los paquetes"
          title="Pick your feast"
          blurb="Starting points, not rules. We'll build whatever you actually want."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <article
              key={p.name}
              className={`sticker relative flex flex-col rounded-3xl p-7 ${p.bg}`}
              style={{ rotate: i === 1 ? "0deg" : i === 0 ? "-1.5deg" : "1.5deg" }}
            >
              {p.featured && (
                <span className="sticker-sm absolute -top-4 left-1/2 -translate-x-1/2 rotate-[-4deg] rounded-full bg-cream px-4 py-1 font-display text-xs uppercase whitespace-nowrap text-ink">
                  Most booked
                </span>
              )}

              <span className="relative mb-4 block h-40 overflow-hidden rounded-2xl border-3 border-ink bg-cream/25">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`${p.name} catering from Dos Tacos`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-full place-items-center">
                    <Icon name="leaf" className="h-16 w-16 opacity-70" />
                  </span>
                )}
              </span>
              <h3 className="font-display text-4xl uppercase leading-none">
                {p.name}
              </h3>
              <p className="mt-2 text-sm opacity-90">{p.blurb}</p>

              <p className="mt-5 font-display text-5xl leading-none">
                {p.price}
                <span className="ml-2 text-base font-normal opacity-70">
                  {p.unit}
                </span>
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider opacity-60">
                Estimate — final quote confirmed by the shop
              </p>

              <ul className="mt-5 flex-1 space-y-2 border-t-2 border-current/20 pt-5 text-sm">
                {p.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2">
                    <span aria-hidden>✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="bg-ink py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            light
            accent="mango"
            kicker="Cómo funciona"
            title="Three steps, no drama"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-3xl border-4 border-cream/25 p-6">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-mango font-display text-3xl text-ink">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase text-mango">
                  {s.t}
                </h3>
                <p className="mt-2 text-cream/75">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* form */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionHeading
          kicker="Hablemos"
          title="Get a quote"
          blurb="Fill this out and we'll come back with numbers. No obligation, no sales call."
        />
        <div className="mt-10">
          <CateringForm />
        </div>
      </section>
    </>
  );
}
