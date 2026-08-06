"use client";

import { motion } from "motion/react";
import type { Review } from "@/data/site";

const ACCENT = {
  salsa: "bg-salsa text-cream",
  lime: "bg-lime text-ink",
  mango: "bg-mango text-ink",
  turquoise: "bg-turquoise text-ink",
  guava: "bg-guava text-cream",
} as const;

export default function ReviewCard({
  review,
  index = 0,
}: {
  review: Review;
  index?: number;
}) {
  const tilt = index % 3 === 0 ? -2.5 : index % 3 === 1 ? 1.8 : -1.2;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 36, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 170, damping: 20, delay: index * 0.05 }}
      whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
      className={`sticker flex break-inside-avoid flex-col rounded-3xl p-6 ${ACCENT[review.accent]}`}
    >
      <div className="mb-3 text-xl tracking-widest" aria-label={`${review.stars} out of 5 stars`}>
        {"★".repeat(review.stars)}
      </div>
      <blockquote className="flex-1 font-display text-xl uppercase leading-tight sm:text-2xl">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] opacity-75">
        — {review.author}
      </figcaption>
    </motion.figure>
  );
}
