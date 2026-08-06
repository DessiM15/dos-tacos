import Image from "next/image";
import Link from "next/link";
import HeroSwitcher from "@/components/HeroSwitcher";
import SectionHeading from "@/components/ui/SectionHeading";
import DishCard from "@/components/ui/DishCard";
import ReviewCard from "@/components/ui/ReviewCard";
import Marquee from "@/components/ui/Marquee";
import OrderButton from "@/components/ui/OrderButton";
import { Stars } from "@/components/ui/Icon";
import { popularItems, tacoNames } from "@/data/menu";
import { galleryImages, storeFront } from "@/data/images";
import Icon from "@/components/ui/Icon";
import { site, reviews } from "@/data/site";

const STATS = [
  { value: `${site.rating}`, label: "Google rating", bg: "bg-mango", star: true },
  { value: `${(site.reviewCount / 1000).toFixed(1)}K`, label: "Reviews", bg: "bg-lime" },
  { value: site.priceRange, label: "Per person", bg: "bg-turquoise" },
  { value: "8 AM", label: "Tacos start", bg: "bg-guava" },
];

export default function Home() {
  const bestSellers = popularItems.slice(0, 6);

  return (
    <>
      <HeroSwitcher />

      {/* ---------- stats strip ---------- */}
      <section className="border-y-4 border-ink bg-ink">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className={`${s.bg} sticker-sm rounded-2xl px-4 py-3 text-center text-ink`}
            >
              <p className="flex items-center justify-center gap-1 font-display text-3xl leading-none sm:text-4xl">
                {s.value}
                {"star" in s && s.star && <Stars count={1} className="h-6 w-6" />}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- best sellers ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          kicker="Lo más pedido"
          title={
            <>
              The Greatest
              <br />
              <span className="text-salsa">Hits</span>
            </>
          }
          blurb="The stuff that got us 1,020 five-star reviews. Start here, thank us later."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((item, i) => (
            <DishCard
              key={item.id}
              item={item}
              accent={item.category.accent}
              icon={item.category.icon}
              index={i}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="sticker inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-2xl uppercase text-cream transition-transform hover:-translate-y-1"
          >
            See the whole menu →
          </Link>
        </div>
      </section>

      <Marquee
        items={tacoNames}
        duration={30}
        className="border-y-4 border-ink bg-mango py-3 font-display text-2xl uppercase text-ink sm:text-3xl"
      />

      {/* ---------- vegan spotlight ----------
           Deliberately no item cards: there is no vegan photography yet, and
           placeholder tiles would undercut the rest of the page. The section
           still earns its place because the reviews single the vegan menu out. */}
      <section className="relative overflow-hidden bg-lime">
        <div aria-hidden className="halftone absolute inset-0 text-ink opacity-15" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <SectionHeading
            accent="ink"
            kicker="No, seriously"
            title={
              <>
                The vegan menu{" "}
                <span className="text-salsa">slaps</span>
              </>
            }
            blurb="Vegan pastor, vegan egg and potato, and a four-taco sampler — built properly, not bolted on."
          />

          <figure className="sticker mx-auto mt-8 max-w-2xl rounded-3xl bg-cream p-6">
            <Icon name="leaf" className="mx-auto h-9 w-9 text-lime" />
            <blockquote className="mt-3 font-display text-2xl uppercase leading-tight sm:text-3xl">
              &ldquo;Best vegan tacos in Katy, hands down. The vegan pastor
              actually tastes like pastor.&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">
              — Google review
            </figcaption>
          </figure>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <OrderButton size="lg" variant="ink">
              Order Vegan
            </OrderButton>
            <Link
              href="/menu"
              className="sticker inline-flex items-center rounded-full bg-cream px-8 py-4 font-display text-2xl uppercase transition-transform hover:-translate-y-1"
            >
              See the Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- reviews ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          kicker="1,020 people can't be wrong"
          title={
            <>
              Katy <span className="text-salsa">said it</span>,
              <br />
              not us
            </>
          }
          blurb="Straight from the Google reviews. We didn't even edit the typos."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r, i) => (
            <ReviewCard key={i} review={r} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-flex min-h-12 items-center px-2 font-display text-2xl uppercase underline decoration-salsa decoration-4 underline-offset-8 transition-colors hover:text-salsa"
          >
            Read more reviews →
          </Link>
        </div>
      </section>

      {/* ---------- gallery ---------- */}
      <section className="relative overflow-hidden bg-ink py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            light
            accent="mango"
            kicker="La comida"
            title={
              <>
                Straight off
                <br />
                <span className="text-salsa">the tray</span>
              </>
            }
            blurb="Real photos, real plates. No stock food here."
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((img, i) => (
              <li
                key={img.src}
                className="group relative aspect-square overflow-hidden rounded-2xl border-4 border-cream"
                style={{ rotate: i % 2 ? "1deg" : "-1deg" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- visit ---------- */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border-4 border-cream shadow-[8px_8px_0_var(--color-salsa)]">
            <Image
              src={storeFront}
              alt={`The ${site.name} storefront in ${site.city}`}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <SectionHeading
              align="left"
              accent="mango"
              light
              kicker="Come say hola"
              title={
                <>
                  Find us in
                  <br />
                  <span className="text-salsa">Katy, TX</span>
                </>
              }
            />
            <address className="mt-5 not-italic">
              <p className="font-display text-3xl uppercase leading-tight">
                {site.address.street}
              </p>
              <p className="text-cream/70">
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
            </address>

            <ul className="mt-6 flex flex-wrap gap-2">
              {site.perks.map((p) => (
                <li
                  key={p}
                  className="rounded-full border-2 border-cream/30 px-4 py-1.5 text-sm font-semibold"
                >
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <OrderButton size="lg" variant="mango">
                Order Now
              </OrderButton>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border-4 border-cream bg-transparent px-8 py-4 font-display text-2xl uppercase text-cream shadow-[6px_6px_0_var(--color-cream)] transition-transform hover:-translate-y-1"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
