"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { site } from "@/data/site";

/**
 * No backend yet, so submitting composes a pre-filled email to the shop.
 * To move this server-side, replace `handleSubmit` with a POST to a route
 * handler (or Formspree/Resend) — the field names are already sensible.
 */

const PACKAGES = [
  "Taco Bar (build your own)",
  "Birria Feast",
  "Vegan Spread",
  "Breakfast Tacos",
  "Not sure yet — help me pick",
];

export default function CateringForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Event date: ${data.get("date")}`,
      `Headcount: ${data.get("guests")}`,
      `Package: ${data.get("package")}`,
      "",
      "Details:",
      String(data.get("details") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Catering inquiry — ${data.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  const field =
    "w-full rounded-2xl border-3 border-ink bg-cream px-4 py-3 font-semibold placeholder:text-ink/35 focus:outline-none";
  const label = "block font-display text-lg uppercase mb-1.5";

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="sticker rounded-3xl bg-lime p-10 text-center"
      >
        <p className="text-7xl">🎉</p>
        <h3 className="mt-3 font-display text-4xl uppercase leading-none">
          ¡Órale! Email drafted
        </h3>
        <p className="mx-auto mt-3 max-w-md text-ink/75">
          Your mail app should have opened with everything filled in — just hit
          send. If it didn&apos;t, call us at{" "}
          <a href={site.phoneHref} className="font-bold underline">
            {site.phone}
          </a>
          .
        </p>
        <button
          onClick={() => setSent(false)}
          className="sticker-sm mt-6 rounded-full bg-cream px-6 py-2.5 font-display text-lg uppercase transition-transform hover:-translate-y-1"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="sticker rounded-3xl bg-cream p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" required className={field} placeholder="Maria G." />
        </div>

        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label className={label} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={field}
            placeholder="(281) 555-0142"
          />
        </div>

        <div>
          <label className={label} htmlFor="date">
            Event date
          </label>
          <input id="date" name="date" type="date" className={field} />
        </div>

        <div>
          <label className={label} htmlFor="guests">
            How many people?
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={10}
            className={field}
            placeholder="40"
          />
        </div>

        <div>
          <label className={label} htmlFor="package">
            What sounds good?
          </label>
          <select id="package" name="package" className={field} defaultValue={PACKAGES[0]}>
            {PACKAGES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="details">
            Tell us about it
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            className={field}
            placeholder="Office lunch, backyard quinceañera, 6 PM start, half the guests are vegan…"
          />
        </div>
      </div>

      <button
        type="submit"
        className="sticker mt-6 w-full rounded-full bg-salsa px-8 py-4 font-display text-2xl uppercase text-cream transition-all duration-150 hover:-translate-y-1 hover:shadow-[9px_9px_0_var(--color-ink)] active:translate-y-1"
      >
        Send it 🌮
      </button>

      <p className="mt-3 text-center text-xs text-ink/50">
        We usually reply same day. Prefer to talk?{" "}
        <a href={site.phoneHref} className="font-bold underline">
          {site.phone}
        </a>
      </p>
    </form>
  );
}
