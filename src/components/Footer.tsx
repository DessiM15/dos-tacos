import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { tacoNames } from "@/data/menu";
import Marquee from "@/components/ui/Marquee";
import OrderButton from "@/components/ui/OrderButton";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream">
      <Marquee
        items={tacoNames}
        reverse
        duration={30}
        className="border-y-4 border-cream bg-salsa py-3 font-display text-2xl uppercase text-cream"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <span className="relative block h-16 w-16 overflow-hidden rounded-full border-4 border-cream bg-white">
              <Image
                src="/img/dos-tacos-logo.jpg"
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <div>
              <p className="font-display text-3xl uppercase leading-none">
                {site.name}
              </p>
              <p className="font-fun text-mango">{site.tagline}</p>
            </div>
          </div>

          <p className="mt-6 max-w-md text-cream/70">{site.blurb}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="sticker-sm rounded-full border-cream! bg-mango px-4 py-1.5 font-display text-lg text-ink shadow-[4px_4px_0_var(--color-cream)]">
              {site.rating}★ · {site.reviewCount.toLocaleString()} reviews
            </span>
            <OrderButton size="sm" variant="lime">
              Order Now
            </OrderButton>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl uppercase text-mango">Visit</h3>
          <address className="mt-3 not-italic text-cream/80 leading-relaxed">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <a
            href={site.phoneHref}
            className="mt-3 inline-block font-display text-xl text-cream underline decoration-salsa decoration-4 underline-offset-4 hover:text-mango"
          >
            {site.phone}
          </a>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-cream/70 underline underline-offset-4 hover:text-mango"
          >
            Get directions →
          </a>
        </div>

        <div>
          <h3 className="font-display text-xl uppercase text-mango">Hours</h3>
          <ul className="mt-3 space-y-1 text-sm text-cream/80">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day.slice(0, 3)}</span>
                <span className="tabular-nums">
                  {h.open} – {h.close}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 font-display text-xl uppercase text-mango">
            Follow
          </h3>
          <ul className="mt-2 flex gap-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 underline underline-offset-4 hover:text-mango"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. Made with lime and
            questionable restraint.
          </p>
          <nav className="flex gap-4">
            <Link href="/menu" className="hover:text-mango">
              Menu
            </Link>
            <Link href="/catering" className="hover:text-mango">
              Catering
            </Link>
            <Link href="/contact" className="hover:text-mango">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
