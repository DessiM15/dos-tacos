"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { site } from "@/data/site";
import { tacoNames } from "@/data/menu";
import Marquee from "@/components/ui/Marquee";
import OrderButton from "@/components/ui/OrderButton";

/** Floating ingredients. depth drives how far each drifts from the cursor. */
const FLOATERS = [
  { emoji: "🍋", top: "14%", left: "8%", depth: 46, size: "text-6xl sm:text-8xl", delay: 0 },
  { emoji: "🌿", top: "24%", left: "86%", depth: 62, size: "text-5xl sm:text-7xl", delay: 0.6 },
  { emoji: "🌶️", top: "66%", left: "12%", depth: 36, size: "text-5xl sm:text-7xl", delay: 1.1 },
  { emoji: "🧅", top: "74%", left: "82%", depth: 54, size: "text-5xl sm:text-6xl", delay: 0.3 },
  { emoji: "🌮", top: "8%", left: "62%", depth: 28, size: "text-4xl sm:text-6xl", delay: 1.5 },
  { emoji: "🥑", top: "82%", left: "48%", depth: 70, size: "text-4xl sm:text-6xl", delay: 0.9 },
];

const HEADLINE = "DOS TACOS";

export default function HeroCannon() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // -0.5..0.5 relative to the hero's center
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden bg-ink text-cream grain"
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/img/taco-1.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-45 blur-[2px]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/95" />
      <div
        className="halftone absolute inset-0 -z-10 text-salsa opacity-25"
        aria-hidden
      />

      {/* floating ingredients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5]">
        {FLOATERS.map((f) => (
          <Floater key={f.emoji} {...f} sx={sx} sy={sy} />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-fun text-xl text-mango sm:text-2xl"
        >
          ¡Bienvenidos a {site.city}&apos;s favorite taquería!
        </motion.p>

        {/* kinetic headline — each letter pops in and reacts to hover */}
        <h1 className="mt-2 font-display uppercase leading-[0.82] tracking-tight">
          <span className="sr-only">{HEADLINE}</span>
          <span aria-hidden className="flex flex-wrap justify-center">
            {HEADLINE.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i} className="w-4 sm:w-8" />
              ) : (
                <motion.span
                  key={i}
                  initial={{ y: 120, opacity: 0, rotate: -14 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: 0.18 + i * 0.055,
                    type: "spring",
                    stiffness: 260,
                    damping: 14,
                  }}
                  whileHover={{ y: -18, rotate: i % 2 ? 7 : -7, scale: 1.08 }}
                  className="inline-block cursor-default text-[19vw] leading-[0.82] text-cream drop-shadow-[7px_7px_0_var(--color-salsa)] sm:text-[15vw] lg:text-[13rem]"
                >
                  {ch}
                </motion.span>
              ),
            )}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-cream/85 sm:text-xl"
        >
          {site.blurb}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <OrderButton size="lg">Order Now 🌮</OrderButton>
          <a
            href="/menu"
            className="sticker inline-flex items-center gap-2 rounded-full bg-mango px-8 py-4 font-display text-2xl uppercase tracking-wide text-ink transition-all duration-150 hover:-translate-y-1 hover:shadow-[9px_9px_0_var(--color-ink)] active:translate-y-1 sm:text-3xl"
          >
            See the Menu
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.15, type: "spring", stiffness: 200 }}
          className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-full border-3 border-cream/30 bg-cream/10 px-5 py-2 backdrop-blur-sm"
        >
          <span className="font-display text-2xl text-mango">
            {site.rating}★
          </span>
          <span className="text-sm text-cream/80">
            {site.reviewCount.toLocaleString()} Google reviews
          </span>
          <span className="text-cream/30">·</span>
          <span className="text-sm text-cream/80">{site.priceRange} a head</span>
        </motion.div>
      </div>

      <Marquee
        items={tacoNames}
        duration={28}
        className="absolute inset-x-0 bottom-0 border-y-4 border-cream bg-salsa py-2.5 font-display text-xl uppercase text-cream sm:text-2xl"
      />
    </section>
  );
}

function Floater({
  emoji,
  top,
  left,
  depth,
  size,
  delay,
  sx,
  sy,
}: (typeof FLOATERS)[number] & {
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, (v) => v * depth * -1);
  const y = useTransform(sy, (v) => v * depth * -1);

  return (
    <motion.span
      style={{ top, left, x, y }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + delay, type: "spring", stiffness: 160 }}
      className={`absolute ${size} drop-shadow-lg`}
    >
      <span
        className="block animate-bob"
        style={{ animationDelay: `${delay}s` }}
      >
        {emoji}
      </span>
    </motion.span>
  );
}
