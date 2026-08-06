"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";
import OrderButton from "@/components/ui/OrderButton";

const LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/reviews", label: "Reviews" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Visit" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md border-b-4 border-ink"
            : "bg-transparent border-b-4 border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} home`}
          >
            <span className="relative block h-12 w-12 overflow-hidden rounded-full border-3 border-ink bg-white shadow-[3px_3px_0_var(--color-ink)] transition-transform duration-300 group-hover:rotate-[360deg] sm:h-14 sm:w-14">
              <Image
                src="/img/dos-tacos-logo.jpg"
                alt=""
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </span>
            <span className="hidden font-display text-2xl uppercase leading-none tracking-tight sm:block">
              Dos
              <br />
              Tacos
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative block rounded-full px-4 py-2 font-display text-lg uppercase tracking-wide transition-colors hover:text-salsa ${
                      active ? "text-salsa" : "text-ink"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-1 rounded-full bg-salsa"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <OrderButton size="sm" className="hidden sm:inline-flex">
              Order
            </OrderButton>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="sticker-sm grid h-11 w-11 place-items-center rounded-full bg-mango lg:hidden"
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 h-[3px] w-6 rounded bg-ink transition-all ${
                    mobileOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[3px] w-6 rounded bg-ink transition-all ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[3px] w-6 rounded bg-ink transition-all ${
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-[76px] z-40 lg:hidden"
          >
            <ul className="mx-4 grid gap-2 rounded-3xl bg-cream sticker p-4">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={closeMobile}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl uppercase transition-colors hover:bg-mango"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-1">
                <OrderButton size="md" className="w-full justify-center">
                  Order Now
                </OrderButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
