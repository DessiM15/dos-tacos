"use client";

import { motion } from "motion/react";

const ACCENTS = {
  salsa: "text-salsa",
  lime: "text-lime",
  mango: "text-mango",
  turquoise: "text-turquoise",
  guava: "text-guava",
  ink: "text-ink",
} as const;

export default function SectionHeading({
  kicker,
  title,
  blurb,
  accent = "salsa",
  align = "center",
  light = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  blurb?: string;
  accent?: keyof typeof ACCENTS;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {kicker && (
        <p className={`font-fun text-lg sm:text-xl ${ACCENTS[accent]}`}>
          {kicker}
        </p>
      )}
      <h2
        className={`font-display text-5xl uppercase leading-[0.85] tracking-tight sm:text-6xl lg:text-7xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {blurb && (
        <p
          className={`mt-3 text-lg ${align === "center" ? "mx-auto" : ""} max-w-2xl ${
            light ? "text-cream/75" : "text-ink/70"
          }`}
        >
          {blurb}
        </p>
      )}
    </motion.div>
  );
}
