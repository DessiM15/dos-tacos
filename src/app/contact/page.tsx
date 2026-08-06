import type { Metadata } from "next";
import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import OrderButton from "@/components/ui/OrderButton";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit",
  description: `Find ${site.name} at ${site.address.full}. Hours, directions, and phone.`,
};

const CONTACT_CARDS = [
  {
    emoji: "📍",
    title: "Address",
    lines: [site.address.street, `${site.address.city}, ${site.address.state} ${site.address.zip}`],
    href: site.mapsUrl,
    cta: "Open in Maps",
    bg: "bg-turquoise text-ink",
    external: true,
  },
  {
    emoji: "📞",
    title: "Phone",
    lines: [site.phone, "Call for pickup orders"],
    href: site.phoneHref,
    cta: "Call now",
    bg: "bg-mango text-ink",
    external: false,
  },
  {
    emoji: "🌮",
    title: "Delivery",
    lines: ["Uber Eats & DoorDash", "Or skip the fees — order pickup"],
    href: "/menu" as Route,
    cta: "See the menu",
    bg: "bg-lime text-ink",
    external: false,
    internal: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Ven a vernos"
        title="Come Say Hola"
        blurb={`${site.address.full} — right off Gaston Rd. Doors open at 8 AM, every single day.`}
        accent="lime"
      />

      {/* quick cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {CONTACT_CARDS.map((c, i) => (
            <article
              key={c.title}
              className={`sticker flex flex-col rounded-3xl p-7 ${c.bg}`}
              style={{ rotate: i === 1 ? "0deg" : i === 0 ? "-1.2deg" : "1.2deg" }}
            >
              <p className="text-6xl">{c.emoji}</p>
              <h2 className="mt-2 font-display text-3xl uppercase leading-none">
                {c.title}
              </h2>
              <div className="mt-3 flex-1 space-y-1">
                {c.lines.map((l) => (
                  <p key={l} className="text-lg font-semibold">
                    {l}
                  </p>
                ))}
              </div>

              {c.internal ? (
                <Link
                  href={c.href as Route}
                  className="sticker-sm mt-5 w-fit rounded-full bg-cream px-5 py-2.5 font-display text-lg uppercase text-ink transition-transform hover:-translate-y-1"
                >
                  {c.cta} →
                </Link>
              ) : (
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="sticker-sm mt-5 w-fit rounded-full bg-cream px-5 py-2.5 font-display text-lg uppercase text-ink transition-transform hover:-translate-y-1"
                >
                  {c.cta} →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* hours + map */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="sticker rounded-3xl bg-ink p-8 text-cream">
            <SectionHeading
              align="left"
              light
              accent="mango"
              kicker="Horario"
              title="Hours"
            />
            <ul className="mt-6 divide-y divide-cream/15">
              {site.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="font-display text-xl uppercase">{h.day}</span>
                  <span className="tabular-nums text-cream/75">
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs uppercase tracking-wider text-cream/35">
              Holiday hours may vary — call ahead
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <OrderButton size="md" variant="mango">
                Order Now
              </OrderButton>
              <a
                href={site.phoneHref}
                className="inline-flex items-center rounded-full border-4 border-cream px-6 py-3 font-display text-xl uppercase text-cream shadow-[5px_5px_0_var(--color-cream)] transition-transform hover:-translate-y-1"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="sticker overflow-hidden rounded-3xl">
              <iframe
                src={site.mapsEmbedUrl}
                title={`Map to ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full border-0 sm:h-[340px]"
                allowFullScreen
              />
            </div>

            <div className="sticker overflow-hidden rounded-3xl">
              <Image
                src="/img/store-front.jpg"
                alt={`${site.name} storefront`}
                width={1000}
                height={500}
                className="h-[180px] w-full object-cover sm:h-[220px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* perks */}
      <section className="bg-salsa py-14 text-cream">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
            Good to know
          </h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {site.perks.map((p) => (
              <li
                key={p}
                className="rounded-full border-3 border-cream px-5 py-2 font-display text-lg uppercase"
              >
                {p}
              </li>
            ))}
            <li className="rounded-full border-3 border-cream px-5 py-2 font-display text-lg uppercase">
              No reservations
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
