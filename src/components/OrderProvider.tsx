"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";
import Icon, { type IconName } from "@/components/ui/Icon";

type OrderContextValue = { open: () => void; close: () => void };

const OrderContext = createContext<OrderContextValue | null>(null);

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}

const OPTIONS = [
  {
    label: "Order Online",
    sub: "Direct with us — no delivery-app fees",
    href: site.order.toast,
    bg: "bg-lime",
    icon: "bag" as IconName,
    featured: true,
  },
  {
    label: "Uber Eats",
    sub: "Delivered to your door",
    href: site.order.uberEats,
    bg: "bg-mango",
    icon: "scooter" as IconName,
  },
  {
    label: "Grubhub",
    sub: "Delivered to your door",
    href: site.order.grubhub,
    bg: "bg-salsa",
    icon: "car" as IconName,
  },
  {
    label: "DoorDash",
    sub: "Delivered to your door",
    href: site.order.doorDash,
    bg: "bg-guava",
    icon: "car" as IconName,
  },
  {
    label: "Call Us",
    sub: site.phone,
    href: site.phoneHref,
    bg: "bg-turquoise",
    icon: "phone" as IconName,
  },
] as const;

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <OrderContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close ordering options"
              onClick={close}
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Order from Dos Tacos"
              initial={{ scale: 0.85, y: 40, rotate: -3 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="sticker relative max-h-[88svh] w-full max-w-lg overflow-y-auto rounded-3xl bg-cream p-6 sm:p-8"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="sticky top-0 z-10 float-right -mt-1 grid h-11 w-11 place-items-center rounded-full bg-ink text-xl font-bold text-cream transition-transform hover:rotate-90 hover:scale-110"
              >
                ×
              </button>

              <p className="font-fun text-salsa text-lg">¡Órale!</p>
              <h2 className="font-display text-4xl sm:text-5xl uppercase leading-[0.9] mb-1">
                How hungry
                <br />
                are we talking?
              </h2>
              <p className="text-ink/70 mb-6 text-sm">
                Pick your poison. We&apos;ll be here.
              </p>

              <div className="grid gap-3">
                {OPTIONS.map((o, i) => (
                  <motion.a
                    key={o.label}
                    href={o.href}
                    target={o.href.startsWith("tel:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                    className={`${o.bg} sticker-sm group relative flex items-center gap-4 rounded-2xl px-4 py-3 transition-transform hover:-translate-y-1 hover:translate-x-1`}
                  >
                    <Icon
                      name={o.icon}
                      className="h-9 w-9 shrink-0 transition-transform group-hover:scale-125 group-hover:-rotate-12"
                    />
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2 font-display text-xl uppercase leading-none">
                        {o.label}
                        {"featured" in o && o.featured && (
                          <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] tracking-wide text-cream">
                            Best value
                          </span>
                        )}
                      </span>
                      <span className="block text-xs font-medium text-ink/70">
                        {o.sub}
                      </span>
                    </span>
                    <span className="font-display text-2xl">→</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OrderContext.Provider>
  );
}
