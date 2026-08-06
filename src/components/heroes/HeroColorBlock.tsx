"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { site } from "@/data/site";
import { featureImages } from "@/data/images";
import OrderButton from "@/components/ui/OrderButton";
import { Stars } from "@/components/ui/Icon";

const PANELS = [
  {
    id: "tacos",
    word: "Tacos",
    sub: "El Pur · El Bacon · El Chorizo · Al Pastor",
    image: featureImages.tacos,
    bg: "bg-salsa",
    text: "text-ink",
    scrim: "via-cream/45",
    href: "/menu#street-tacos",
  },
  {
    id: "breakfast",
    word: "Desayuno",
    sub: "Egg & birria · Egg & pastor · Chilaquiles",
    image: featureImages.breakfast,
    bg: "bg-lime",
    text: "text-cream",
    scrim: "via-ink/50",
    href: "/menu#breakfast",
  },
  {
    id: "drinks",
    word: "Bebidas",
    sub: "Micheladas · Margaritas · Horchata · Jarritos",
    image: featureImages.drinks,
    bg: "bg-mango",
    text: "text-ink",
    scrim: "via-cream/45",
    href: "/menu#drinks",
  },
];

export default function HeroColorBlock() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col">
      {/* panels */}
      <div className="flex flex-1 flex-col md:flex-row">
        {PANELS.map((p, i) => {
          const isActive = active === p.id;
          const isDimmed = active !== null && !isActive;

          return (
            <motion.div
              key={p.id}
              onHoverStart={() => setActive(p.id)}
              onHoverEnd={() => setActive(null)}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 18 }}
              className="relative flex-1 border-ink md:border-r-4 last:md:border-r-0 border-b-4 md:border-b-0"
              style={{ flexGrow: isActive ? 1.9 : isDimmed ? 0.75 : 1 }}
            >
              <Link
                href={p.href}
                className={`group relative flex h-full min-h-[26svh] flex-col items-center justify-center overflow-hidden px-4 py-10 transition-[flex-grow] ${p.bg} ${p.text}`}
              >
                <div
                  aria-hidden
                  className="halftone absolute inset-0 opacity-15 text-ink"
                />

                {/* photo washes in behind the type on hover */}
                <motion.span
                  aria-hidden
                  animate={{
                    scale: isActive ? 1.05 : 1.16,
                    opacity: isActive ? 0.85 : 0.5,
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 20 }}
                  className="pointer-events-none absolute inset-0"
                >
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover mix-blend-multiply saturate-125"
                  />
                </motion.span>

                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 bg-gradient-to-b from-transparent to-transparent ${p.scrim}`}
                />

                <motion.h2
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  className="relative font-display text-[13vw] uppercase leading-[0.82] tracking-tight md:text-[7vw]"
                >
                  {p.word}
                </motion.h2>

                <motion.p
                  animate={{
                    opacity: isActive ? 1 : 0.92,
                    y: isActive ? 0 : 6,
                  }}
                  className="relative mt-2 max-w-xs text-center text-sm font-semibold sm:text-base"
                >
                  {p.sub}
                </motion.p>

                <motion.span
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                  className="sticker-sm relative mt-5 rounded-full bg-cream px-5 py-2 font-display text-lg uppercase text-ink"
                >
                  Explore →
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* headline bar pinned across the bottom */}
      <div className="relative z-10 border-t-4 border-ink bg-ink text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-7 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h1 className="font-display text-5xl uppercase leading-[0.85] tracking-tight sm:text-6xl lg:text-7xl">
              Dos <span className="text-salsa">Tacos</span>
            </h1>
            <p className="mt-1 font-fun text-lg text-mango">{site.taglineEn}</p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="text-center sm:text-right">
              <p className="flex items-center justify-center gap-1 font-display text-3xl leading-none text-mango sm:justify-end">
                {site.rating}
                <Stars count={1} className="h-6 w-6" />
              </p>
              <p className="text-xs text-cream/70">
                {site.reviewCount.toLocaleString()} reviews · {site.city}
              </p>
            </div>
            <OrderButton size="lg" variant="cream">
              Order Now
            </OrderButton>
          </div>
        </div>
      </div>
    </section>
  );
}
