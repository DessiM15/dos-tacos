"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import HeroCannon from "@/components/heroes/HeroCannon";
import HeroBuild from "@/components/heroes/HeroBuild";
import HeroLoteria from "@/components/heroes/HeroLoteria";
import HeroColorBlock from "@/components/heroes/HeroColorBlock";

const STORAGE_KEY = "dos-tacos:hero";

const VARIANTS = [
  {
    id: "cannon",
    label: "Taco Cannon",
    hint: "Kinetic type + parallax ingredients",
    swatch: "bg-salsa",
    Component: HeroCannon,
  },
  {
    id: "build",
    label: "Build-A-Taco",
    hint: "Scroll assembles the taco",
    swatch: "bg-mango",
    Component: HeroBuild,
  },
  {
    id: "loteria",
    label: "Lotería",
    hint: "Mercado poster + papel picado",
    swatch: "bg-turquoise",
    Component: HeroLoteria,
  },
  {
    id: "colorblock",
    label: "Color Block",
    hint: "Hover-expanding fiesta panels",
    swatch: "bg-lime",
    Component: HeroColorBlock,
  },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

const DEFAULT_VARIANT: VariantId = "cannon";
const isVariant = (v: string | null): v is VariantId =>
  VARIANTS.some((x) => x.id === v);

/**
 * localStorage treated as an external store, so the chosen hero is read during
 * render instead of patched in via an effect. The server snapshot is the
 * default variant, which keeps hydration consistent.
 */
const heroStore = {
  subscribe(onChange: () => void) {
    window.addEventListener(STORAGE_KEY, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(STORAGE_KEY, onChange);
      window.removeEventListener("storage", onChange);
    };
  },
  getSnapshot(): VariantId {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isVariant(saved) ? saved : DEFAULT_VARIANT;
  },
  getServerSnapshot(): VariantId {
    return DEFAULT_VARIANT;
  },
};

export default function HeroSwitcher() {
  const current = useSyncExternalStore(
    heroStore.subscribe,
    heroStore.getSnapshot,
    heroStore.getServerSnapshot,
  );
  const [expanded, setExpanded] = useState(false);

  const pick = (id: VariantId) => {
    localStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new Event(STORAGE_KEY));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 1–4 jump straight to a hero, as long as you're not typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement | null)?.isContentEditable
      )
        return;
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < VARIANTS.length) pick(VARIANTS[idx].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = VARIANTS.find((v) => v.id === current) ?? VARIANTS[0];
  const Hero = active.Component;

  return (
    <>
      <div key={current}>
        <Hero />
      </div>

      {/* ---- floating switcher ---- */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex justify-center px-3">
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.6 }}
          className="pointer-events-auto"
        >
          <AnimatePresence initial={false} mode="wait">
            {expanded ? (
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="w-[min(92vw,560px)] rounded-3xl bg-ink p-3 shadow-[7px_7px_0_var(--color-salsa)] ring-4 ring-cream"
              >
                <div className="mb-2 flex items-center justify-between px-1">
                  <p className="font-display text-sm uppercase tracking-[0.2em] text-mango">
                    Pick a hero · press 1–4
                  </p>
                  <button
                    onClick={() => setExpanded(false)}
                    aria-label="Collapse hero switcher"
                    className="grid h-7 w-7 place-items-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-salsa"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {VARIANTS.map((v, i) => {
                    const isActive = v.id === current;
                    return (
                      <button
                        key={v.id}
                        onClick={() => pick(v.id)}
                        aria-pressed={isActive}
                        className={`group relative rounded-2xl border-3 px-2 py-3 text-center transition-all duration-150 ${
                          isActive
                            ? "border-cream bg-salsa text-cream"
                            : "border-cream/20 bg-cream/5 text-cream/75 hover:border-cream/60 hover:bg-cream/10 hover:-translate-y-0.5"
                        }`}
                      >
                        <span className="absolute left-1.5 top-1 font-display text-[10px] text-cream/40">
                          {i + 1}
                        </span>
                        <span
                          className={`mx-auto block h-6 w-6 rounded-lg border-2 border-cream/50 transition-transform group-hover:scale-125 ${v.swatch}`}
                        />
                        <span className="mt-1 block font-display text-xs uppercase leading-tight">
                          {v.label}
                        </span>
                        <span className="mt-0.5 block text-[10px] leading-tight text-cream/50">
                          {v.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="closed"
                onClick={() => setExpanded(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 rounded-full bg-ink py-2.5 pl-4 pr-3 shadow-[6px_6px_0_var(--color-salsa)] ring-4 ring-cream transition-transform hover:-translate-y-0.5"
              >
                <span
                  className={`h-5 w-5 rounded-md border-2 border-cream/50 ${active.swatch}`}
                />
                <span className="text-left">
                  <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-mango">
                    Hero style
                  </span>
                  <span className="block font-display text-sm uppercase leading-none text-cream">
                    {active.label}
                  </span>
                </span>
                <span className="ml-1 rounded-full bg-salsa px-2.5 py-1 font-display text-xs uppercase text-cream">
                  Switch
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
