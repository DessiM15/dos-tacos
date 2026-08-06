"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { visibleMenu as menu, type MenuItem } from "@/data/menu";
import { imageFor } from "@/data/images";
import Icon, { Heat } from "@/components/ui/Icon";
import OrderButton from "@/components/ui/OrderButton";

const ACCENT_BG = {
  salsa: "bg-salsa text-cream",
  lime: "bg-lime text-ink",
  mango: "bg-mango text-ink",
  turquoise: "bg-turquoise text-ink",
  guava: "bg-guava text-cream",
} as const;

type Filter = "all" | "popular" | "vegan" | "spicy";

const ALL_FILTERS: {
  id: Filter;
  label: string;
  match: (i: MenuItem) => boolean;
}[] = [
  { id: "all", label: "Everything", match: () => true },
  { id: "popular", label: "Popular", match: (i) => !!i.popular },
  { id: "vegan", label: "Vegan", match: (i) => !!i.vegan },
  { id: "spicy", label: "Spicy", match: (i) => !!i.spicy && i.spicy > 0 },
];

/** Only offer a filter that would actually return something. */
const items = menu.flatMap((c) => c.items);
const FILTERS = ALL_FILTERS.filter(
  (f) => f.id === "all" || items.some(f.match),
);

export default function MenuBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return menu
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          if (filter === "popular" && !item.popular) return false;
          if (filter === "vegan" && !item.vegan) return false;
          if (filter === "spicy" && !(item.spicy && item.spicy > 0)) return false;
          if (!q) return true;
          return (
            item.name.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q) ||
            cat.name.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [filter, query]);

  const total = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <div>
      {/* ---- controls ---- */}
      <div className="sticky top-[72px] z-30 -mx-4 mb-10 border-y-4 border-ink bg-cream/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full border-3 border-ink px-4 py-2 font-display text-base uppercase transition-all duration-150 ${
                  filter === f.id
                    ? "bg-salsa text-cream shadow-[4px_4px_0_var(--color-ink)]"
                    : "bg-cream text-ink hover:bg-mango hover:-translate-y-0.5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center gap-3">
            <label className="relative flex-1">
              <span className="sr-only">Search the menu</span>
              <Icon
                name="search"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tacos, drinks, anything…"
                className="w-full rounded-full border-3 border-ink bg-cream py-2.5 pl-11 pr-5 font-semibold placeholder:text-ink/40 focus:outline-none"
              />
            </label>
            <span className="hidden shrink-0 font-display text-sm uppercase text-ink/50 sm:block">
              {total} {total === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
      </div>

      {/* ---- category jump links ---- */}
      <nav className="mb-12 flex flex-wrap justify-center gap-2">
        {menu.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`sticker-sm flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm uppercase transition-transform hover:-translate-y-1 ${ACCENT_BG[c.accent]}`}
          >
            <Icon name={c.icon} className="h-4 w-4" />
            {c.name}
          </a>
        ))}
      </nav>

      {/* ---- the menu ---- */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="sticker mx-auto max-w-md rounded-3xl bg-mango p-8 text-center"
          >
            <Icon name="search" className="mx-auto h-14 w-14" />
            <p className="mt-3 font-display text-3xl uppercase leading-none">
              Nada found
            </p>
            <p className="mt-2 text-ink/70">
              Nothing matches &ldquo;{query}&rdquo;. Try &ldquo;pastor&rdquo; or
              just order the queso.
            </p>
          </motion.div>
        ) : (
          filtered.map((cat) => (
            <motion.section
              key={cat.id}
              id={cat.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mb-16 scroll-mt-48"
            >
              <div
                className={`sticker mb-6 flex flex-wrap items-end justify-between gap-3 rounded-3xl px-6 py-5 ${ACCENT_BG[cat.accent]}`}
              >
                <div>
                  <p className="font-fun text-lg opacity-80">{cat.spanish}</p>
                  <h2 className="flex items-center gap-3 font-display text-4xl uppercase leading-none sm:text-5xl">
                    <Icon name={cat.icon} className="h-9 w-9 shrink-0" />
                    {cat.name}
                  </h2>
                  <p className="mt-1 max-w-xl text-sm opacity-90">{cat.blurb}</p>
                </div>
                <span className="rounded-full bg-ink/20 px-3 py-1 font-display text-sm uppercase">
                  {cat.items.length}{" "}
                  {cat.items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {cat.items.map((item, i) => {
                  const src = imageFor(item.id);
                  return (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.3) }}
                      className="group flex items-center gap-4 rounded-2xl border-3 border-ink bg-cream p-2 pr-4 transition-all duration-150 hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--color-ink)]"
                    >
                      <span
                        className={`relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border-3 border-ink ${ACCENT_BG[cat.accent]}`}
                      >
                        {src ? (
                          <Image
                            src={src}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover transition-transform duration-300 group-hover:scale-115"
                          />
                        ) : (
                          <Icon name={cat.icon} className="h-7 w-7" />
                        )}
                      </span>

                      <div className="min-w-0 flex-1 py-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="font-display text-xl uppercase leading-none">
                            {item.name}
                          </h3>
                          {item.popular && (
                            <span className="rounded-full bg-mango px-2 py-0.5 text-[10px] font-bold uppercase">
                              Popular
                            </span>
                          )}
                          {item.vegan && (
                            <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold uppercase">
                              Vegan
                            </span>
                          )}
                          <Heat level={item.spicy ?? 0} />
                        </div>
                        {item.description && (
                          <p className="mt-1 text-sm text-ink/65">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 self-start pt-1 font-display text-xl tabular-nums">
                        ${item.price.toFixed(2)}
                        {item.estimated && (
                          <span className="ml-1 align-super text-[9px] uppercase text-ink/35">
                            tbc
                          </span>
                        )}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.section>
          ))
        )}
      </AnimatePresence>

      <div className="sticker mt-16 rounded-3xl bg-ink p-8 text-center text-cream">
        <p className="font-fun text-xl text-mango">Hungry yet?</p>
        <p className="mb-5 font-display text-4xl uppercase leading-none sm:text-5xl">
          Let&apos;s fix that
        </p>
        <OrderButton size="lg" variant="salsa">
          Order Now
        </OrderButton>
      </div>
    </div>
  );
}
