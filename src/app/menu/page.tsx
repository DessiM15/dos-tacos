import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MenuBrowser from "@/components/MenuBrowser";
import { tacoNames } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Street tacos, birria, vegan pastor, micheladas and more. The full Dos Tacos menu in Katy, TX.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        kicker="El Menú"
        title="Everything We Make"
        blurb="Street tacos, house specialties, a vegan menu people actually drive for, and drinks that are colder than they need to be."
        accent="salsa"
        ticker={tacoNames}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <MenuBrowser />
      </div>
    </>
  );
}
