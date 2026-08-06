import type { Metadata } from "next";
import { pageMetadata, menuJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import MenuBrowser from "@/components/MenuBrowser";
import { tacoNames } from "@/data/menu";

export const metadata: Metadata = pageMetadata({
  title: "Menu",
  description:
    "Street tacos, quesabirrias, breakfast tacos, nachos, vegan options and drinks. See the full Dos Tacos menu in Katy, TX and order online.",
  path: "/menu",
  image: "/img/real/el-pur.jpg",
});

export default function MenuPage() {
  return (
    <>
      <JsonLd data={menuJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Menu", path: "/menu" },
        ])}
      />
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
