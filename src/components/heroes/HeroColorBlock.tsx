"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { site } from "@/data/site";
import OrderButton from "@/components/ui/OrderButton";

const PANELS = [
  {
    id: "tacos",
    word: "Tacos",
    sub: "Al pastor · Birria · Carnitas · Asada",
    emoji: "🌮",
    bg: "bg-salsa",
    text: "text-cream",
    href: "/menu#street-tacos",
  },
  {
    id: "vegan",
    word: "Vegano",
    sub: "Vegan pastor · Egg & potato · Sampler",
    emoji: "🌱",
    bg: "bg-lime",
    text: "text-ink",
    href: "/menu#vegan",
  },
  {
    id: "drinks",
    word: "Bebidas",
    sub: "Micheladas · Margaritas · Horchata",
    emoji: "🍹",
    bg: "bg-mango",
    text: "text-ink",
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

                {/* oversize watermark emoji */}
                <motion.span
                  aria-hidden
                  animate={{
                    scale: isActive ? 1.25 : 1,
                    rotate: isActive ? 8 : -6,
                    opacity: isActive ? 0.35 : 0.18,
                  }}
                  transition={{ type: "spring", stiffness: 160, damping: 18 }}
                  className="pointer-events-none absolute text-[42vh] leading-none"
                >
                  {p.emoji}
                </motion.span>

                <motion.h2
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  className="relative font-display text-[13vw] uppercase leading-[0.82] tracking-tight md:text-[7vw]"
                >
                  {p.word}
                </motion.h2>

                <motion.p
                  animate={{
                    opacity: isActive ? 1 : 0.75,
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
              <p className="font-display text-3xl leading-none text-mango">
                {site.rating}★
              </p>
              <p className="text-xs text-cream/70">
                {site.reviewCount.toLocaleString()} reviews · {site.city}
              </p>
            </div>
            <OrderButton size="lg" variant="cream">
              Order Now 🌮
            </OrderButton>
          </div>
        </div>
      </div>
    </section>
  );
}
