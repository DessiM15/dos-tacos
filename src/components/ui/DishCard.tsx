"use client";

import { motion } from "motion/react";
import type { MenuItem } from "@/data/menu";

const ACCENT_BG = {
  salsa: "bg-salsa text-cream",
  lime: "bg-lime text-ink",
  mango: "bg-mango text-ink",
  turquoise: "bg-turquoise text-ink",
  guava: "bg-guava text-cream",
} as const;

export type Accent = keyof typeof ACCENT_BG;

export function Chili({ level }: { level: 0 | 1 | 2 | 3 }) {
  if (!level) return null;
  return (
    <span
      className="text-sm"
      title={`Heat level ${level} of 3`}
      aria-label={`Heat level ${level} of 3`}
    >
      {"🌶️".repeat(level)}
    </span>
  );
}

/** Big illustrated card used for the "best sellers" style grids. */
export default function DishCard({
  item,
  accent,
  emoji,
  index = 0,
}: {
  item: MenuItem;
  accent: Accent;
  emoji: string;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 1.5 : -1.5 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 170, damping: 20, delay: index * 0.06 }}
      whileHover={{ rotate: 0, y: -10, scale: 1.03 }}
      className="sticker group relative flex flex-col overflow-hidden rounded-3xl bg-cream"
    >
      <div
        className={`relative grid h-44 place-items-center overflow-hidden ${ACCENT_BG[accent]}`}
      >
        <div aria-hidden className="halftone absolute inset-0 text-ink opacity-15" />
        <span className="relative text-8xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
          {emoji}
        </span>

        {item.popular && (
          <span className="sticker-sm absolute left-3 top-3 rotate-[-8deg] rounded-full bg-mango px-3 py-1 font-display text-xs uppercase text-ink">
            ⭐ Popular
          </span>
        )}
        {item.vegan && (
          <span className="sticker-sm absolute right-3 top-3 rotate-[6deg] rounded-full bg-lime px-3 py-1 font-display text-xs uppercase text-ink">
            🌱 Vegan
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl uppercase leading-none">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-ink px-3 py-1 font-display text-lg text-cream tabular-nums">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {item.description && (
          <p className="mt-2 flex-1 text-sm text-ink/70">{item.description}</p>
        )}

        <div className="mt-3 flex items-center gap-2">
          <Chili level={item.spicy ?? 0} />
          {item.estimated && (
            <span className="ml-auto text-[10px] uppercase tracking-wider text-ink/35">
              price TBC
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
