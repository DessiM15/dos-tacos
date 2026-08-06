"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { site } from "@/data/site";
import { featureImages } from "@/data/images";
import OrderButton from "@/components/ui/OrderButton";

/** Strung papel picado. Each pennant sways on its own offset. */
function PapelPicado({ colors }: { colors: string[] }) {
  return (
    <div aria-hidden className="pointer-events-none flex w-full justify-between">
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="animate-sway"
          style={{
            animationDelay: `${(i % 7) * 0.22}s`,
            animationDuration: `${3.2 + (i % 4) * 0.35}s`,
          }}
        >
          <svg width="46" height="62" viewBox="0 0 46 62">
            <path d="M0 0 H46 V40 L23 62 L0 40 Z" fill={colors[i % colors.length]} />
            <circle cx="23" cy="18" r="7" fill="#FFF6E5" opacity="0.85" />
            <circle cx="11" cy="30" r="4" fill="#FFF6E5" opacity="0.7" />
            <circle cx="35" cy="30" r="4" fill="#FFF6E5" opacity="0.7" />
            <path d="M18 38 L23 46 L28 38 Z" fill="#FFF6E5" opacity="0.7" />
          </svg>
        </span>
      ))}
    </div>
  );
}

const CARDS = [
  {
    num: "1",
    title: "El Taco",
    image: featureImages.tacos,
    caption: "El que come uno, come diez.",
    bg: "bg-mango",
    rotate: -7,
  },
  {
    num: "2",
    title: "El Nacho",
    image: featureImages.sides,
    caption: "Para compartir. O no.",
    bg: "bg-lime",
    rotate: 6,
  },
];

export default function HeroLoteria() {
  return (
    <section className="relative isolate overflow-hidden bg-cream grain">
      {/* aged paper wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,#FFFDF5_0%,#FBEBCE_45%,#F0D9AE_100%)]"
      />
      <div
        aria-hidden
        className="halftone absolute inset-0 -z-10 text-mole opacity-[0.18]"
      />

      {/* two strings of banners */}
      <div className="relative -mt-2">
        <div className="h-1 w-full bg-mole/60" />
        <PapelPicado colors={["#ED1C24", "#A8E10C", "#FFB800", "#00C2CB", "#FF3D8B"]} />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:py-16">
        {/* left card */}
        <LoteriaCard card={CARDS[0]} className="mx-auto hidden lg:block" delay={0.35} />

        {/* center column */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-fun text-2xl text-salsa sm:text-3xl"
          >
            ¡Bienvenidos a!
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 }}
            className="font-display text-[17vw] uppercase leading-[0.78] tracking-tight text-mole sm:text-8xl lg:text-9xl"
          >
            <span className="block text-salsa drop-shadow-[5px_5px_0_var(--color-mole)]">
              Dos
            </span>
            <span className="block drop-shadow-[5px_5px_0_var(--color-mango)]">
              Tacos
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-4 max-w-md"
          >
            <div className="mx-auto mb-3 h-1 w-28 bg-mole/40" />
            <p className="font-fun text-lg text-mole sm:text-xl">
              {site.taglineEn}
            </p>
            <p className="mt-2 text-sm text-mole/70">
              {site.address.street} · {site.city}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <OrderButton size="lg">Ordena Ya</OrderButton>
            <a
              href="/menu"
              className="sticker inline-flex items-center rounded-full bg-cream px-8 py-4 font-display text-2xl uppercase text-mole transition-transform hover:-translate-y-1 sm:text-3xl"
            >
              Ver el Menú
            </a>
          </motion.div>

          {/* stamped review badge */}
          <motion.div
            initial={{ opacity: 0, scale: 1.6, rotate: -22 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ delay: 0.75, type: "spring", stiffness: 240, damping: 15 }}
            className="mx-auto mt-8 w-fit rounded-2xl border-4 border-dashed border-salsa px-5 py-2"
          >
            <p className="font-display text-2xl uppercase leading-none text-salsa">
              {site.rating} Estrellas
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-salsa/80">
              {site.reviewCount.toLocaleString()} reseñas de Google
            </p>
          </motion.div>
        </div>

        {/* right card */}
        <LoteriaCard card={CARDS[1]} className="mx-auto hidden lg:block" delay={0.45} />

        {/* both cards, stacked, on small screens */}
        <div className="flex justify-center gap-4 lg:hidden">
          {CARDS.map((c, i) => (
            <LoteriaCard key={c.num} card={c} delay={0.35 + i * 0.1} small />
          ))}
        </div>
      </div>

      <div className="border-y-4 border-mole bg-mole py-2.5">
        <p className="text-center font-display text-lg uppercase tracking-[0.25em] text-cream sm:text-xl">
          Tacos · Birria · Vegano · Micheladas · Since Day One
        </p>
      </div>
    </section>
  );
}

function LoteriaCard({
  card,
  className = "",
  delay = 0,
  small = false,
}: {
  card: (typeof CARDS)[number];
  className?: string;
  delay?: number;
  small?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: card.rotate * 2.5 }}
      animate={{ opacity: 1, y: 0, rotate: card.rotate }}
      whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay }}
      className={`sticker rounded-xl bg-cream p-2.5 ${
        small ? "w-36" : "w-52"
      } ${className}`}
    >
      <div className={`${card.bg} rounded-lg border-3 border-ink p-3 text-center`}>
        <p className="mb-1.5 text-left font-display text-lg leading-none text-ink/70">
          {card.num}
        </p>
        <span
          className={`relative block w-full overflow-hidden rounded-md border-3 border-ink ${
            small ? "h-20" : "h-28"
          }`}
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 1024px) 144px, 208px"
            className="object-cover"
          />
        </span>
        <p
          className={`mt-1 font-display uppercase leading-none text-ink ${
            small ? "text-lg" : "text-2xl"
          }`}
        >
          {card.title}
        </p>
      </div>
      <p className="mt-2 px-1 text-center font-fun text-[11px] leading-tight text-mole">
        {card.caption}
      </p>
    </motion.div>
  );
}
