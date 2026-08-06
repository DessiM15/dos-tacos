"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/data/site";
import OrderButton from "@/components/ui/OrderButton";
import TacoSvg from "@/components/heroes/TacoSvg";

/** Each stage owns a slice of scroll progress. */
const STAGES = [
  { at: 0.0, kicker: "Paso uno", line: "Start with a tortilla", bg: "#FFF6E5" },
  { at: 0.22, kicker: "Paso dos", line: "Add the good stuff", bg: "#FFE8C2" },
  { at: 0.44, kicker: "Paso tres", line: "Onion. Cilantro. Always.", bg: "#E8F6C8" },
  { at: 0.64, kicker: "Paso cuatro", line: "Hit it with salsa", bg: "#FFD9D6" },
  { at: 0.84, kicker: "Listo", line: "Now that's a taco", bg: "#ED1C24" },
];

export default function HeroBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.0005,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = STAGES.reduce((acc, s, i) => (v >= s.at ? i : acc), 0);
    setStage(next);
  });

  // Ingredient layers fade + drop in, each on its own slice of the scroll.
  const shellOpacity = useTransform(p, [0.02, 0.16], [0, 1]);
  const shellY = useTransform(p, [0.02, 0.16], [80, 0]);

  const meatOpacity = useTransform(p, [0.24, 0.38], [0, 1]);
  const meatY = useTransform(p, [0.24, 0.38], [-140, 0]);

  const onionOpacity = useTransform(p, [0.46, 0.56], [0, 1]);
  const onionY = useTransform(p, [0.46, 0.56], [-120, 0]);

  const cilantroOpacity = useTransform(p, [0.52, 0.62], [0, 1]);
  const cilantroY = useTransform(p, [0.52, 0.62], [-160, 0]);

  const salsaOpacity = useTransform(p, [0.66, 0.8], [0, 1]);
  const salsaY = useTransform(p, [0.66, 0.8], [-100, 0]);

  const tacoScale = useTransform(p, [0, 0.84, 1], [0.82, 0.95, 1.12]);
  const tacoRotate = useTransform(p, [0, 1], [-9, 6]);
  const ctaOpacity = useTransform(p, [0.78, 0.88], [0, 1]);
  const ctaY = useTransform(p, [0.78, 0.88], [40, 0]);
  const progressWidth = useTransform(p, [0, 1], ["0%", "100%"]);

  const current = STAGES[stage];
  const finished = stage === STAGES.length - 1;

  return (
    <div ref={ref} className="relative h-[340svh]">
      <motion.section
        className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden grain"
        animate={{ backgroundColor: current.bg }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div
          className={`halftone absolute inset-0 opacity-20 transition-colors duration-500 ${
            finished ? "text-cream" : "text-salsa"
          }`}
          aria-hidden
        />

        {/* stage copy */}
        <div className="relative z-10 px-4 text-center">
          <motion.p
            key={`k-${stage}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-fun text-lg sm:text-xl ${
              finished ? "text-mango" : "text-salsa"
            }`}
          >
            {current.kicker}
          </motion.p>

          <motion.h1
            key={`h-${stage}`}
            initial={{ opacity: 0, y: 34, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className={`font-display text-[13vw] uppercase leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl ${
              finished ? "text-cream" : "text-ink"
            }`}
          >
            {current.line}
          </motion.h1>
        </div>

        {/* the taco itself */}
        <motion.div
          style={{ scale: tacoScale, rotate: tacoRotate }}
          className="relative z-10 mt-4 w-[min(88vw,660px)]"
        >
          <TacoSvg
            className="h-auto w-full drop-shadow-[10px_14px_0_rgba(13,11,11,0.18)]"
            opacity={{
              shell: shellOpacity,
              meat: meatOpacity,
              onion: onionOpacity,
              cilantro: cilantroOpacity,
              salsa: salsaOpacity,
            }}
            y={{
              shell: shellY,
              meat: meatY,
              onion: onionY,
              cilantro: cilantroY,
              salsa: salsaY,
            }}
          />
        </motion.div>

        {/* final CTA reveals only once the taco is built */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3 px-4"
        >
          <OrderButton size="lg" variant="cream">
            Order Now
          </OrderButton>
          <a
            href="/menu"
            className="sticker inline-flex items-center rounded-full bg-mango px-8 py-4 font-display text-2xl uppercase text-ink transition-transform hover:-translate-y-1"
          >
            See the Menu
          </a>
        </motion.div>

        {/* scroll affordance / progress */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto mb-3 w-fit px-4">
            <motion.p
              animate={{ opacity: finished ? 0 : 1 }}
              className={`font-display text-sm uppercase tracking-[0.3em] ${
                finished ? "text-cream" : "text-ink/60"
              }`}
            >
              Keep scrolling ↓
            </motion.p>
          </div>
          <div className="h-3 w-full border-t-4 border-ink bg-ink/10">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-lime"
            />
          </div>
        </div>

        <p className="absolute right-4 top-4 z-10 hidden text-right font-display text-sm uppercase leading-tight text-ink/50 sm:block">
          {site.rating} stars · {site.reviewCount.toLocaleString()} reviews
          <br />
          {site.city}
        </p>
      </motion.section>
    </div>
  );
}
