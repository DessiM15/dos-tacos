import type { Metadata } from "next";
import { site } from "@/data/site";
import { visibleMenu as menu } from "@/data/menu";

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in the host (Vercel → Settings →
 * Environment Variables) once the real domain is live.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dos-tacos.vercel.app"
).replace(/\/$/, "");

export const OG_IMAGE = {
  url: "/img/real/quesabirrias.jpg",
  width: 1200,
  height: 900,
  alt: "Quesabirrias with consomé from Dos Tacos in Katy, TX",
};

/** Per-page metadata with a canonical URL and social cards filled in. */
export function pageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE.url,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = path === "/" ? title : `${title} · ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [{ ...OG_IMAGE, url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** "8:00 AM" -> "08:00" for schema.org openingHoursSpecification. */
function to24h(time: string): string {
  const m = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return time;
  let hour = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") hour += 12;
  return `${String(hour).padStart(2, "0")}:${m[2]}`;
}

/**
 * schema.org Restaurant. This is what earns the rich result in Google —
 * rating stars, hours, price range and the menu link.
 *
 * `geo` is deliberately omitted rather than guessed; add real coordinates
 * once confirmed.
 */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: site.name,
    description: site.blurb,
    url: siteUrl,
    telephone: site.phone,
    priceRange: site.priceRange,
    servesCuisine: ["Mexican", "Tacos", "Tex-Mex"],
    image: [`${siteUrl}${OG_IMAGE.url}`, `${siteUrl}/img/store-front.jpg`],
    logo: `${siteUrl}/img/dos-tacos-logo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating,
      reviewCount: site.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: to24h(h.open),
      closes: to24h(h.close),
    })),
    acceptsReservations: false,
    hasMenu: `${siteUrl}/menu`,
    sameAs: site.socials.map((s) => s.href),
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: site.order.toast,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: [
        "https://schema.org/OnSitePickup",
        "https://schema.org/ParcelService",
      ],
    },
  };
}

/** schema.org Menu, so Google can surface individual dishes. */
export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: `${site.name} Menu`,
    url: `${siteUrl}/menu`,
    inLanguage: "en-US",
    hasMenuSection: menu.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name,
      description: cat.blurb,
      hasMenuItem: cat.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        offers: {
          "@type": "Offer",
          price: item.price.toFixed(2),
          priceCurrency: "USD",
        },
        ...(item.vegan
          ? { suitableForDiet: "https://schema.org/VeganDiet" }
          : {}),
      })),
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${siteUrl}${t.path}`,
    })),
  };
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
