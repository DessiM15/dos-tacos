"use client";

import { useOrder } from "@/components/OrderProvider";

const SIZES = {
  sm: "px-4 py-2 text-base",
  md: "px-6 py-3 text-xl",
  lg: "px-8 py-4 text-2xl sm:text-3xl",
} as const;

export default function OrderButton({
  children = "Order Now",
  size = "md",
  className = "",
  variant = "salsa",
}: {
  children?: React.ReactNode;
  size?: keyof typeof SIZES;
  className?: string;
  variant?: "salsa" | "ink" | "mango" | "lime" | "cream";
}) {
  const { open } = useOrder();

  const variants = {
    salsa: "bg-salsa text-cream",
    ink: "bg-ink text-cream",
    mango: "bg-mango text-ink",
    lime: "bg-lime text-ink",
    cream: "bg-cream text-ink",
  };

  return (
    <button
      onClick={open}
      className={`sticker inline-flex items-center gap-2 rounded-full font-display uppercase tracking-wide transition-all duration-150 ease-[var(--ease-pop)] hover:-translate-y-1 hover:shadow-[9px_9px_0_var(--color-ink)] active:translate-y-1 active:shadow-[2px_2px_0_var(--color-ink)] ${variants[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
}
