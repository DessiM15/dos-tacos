import type { Metadata, Viewport } from "next";
import { Anton, Luckiest_Guy, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { siteUrl, OG_IMAGE, restaurantJsonLd, JsonLd } from "@/lib/seo";
import { OrderProvider } from "@/components/OrderProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const luckiest = Luckiest_Guy({
  variable: "--font-luckiest",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = `${site.name} — Authentic Street Tacos in ${site.city}`;
const DESCRIPTION = `Authentic Mexican street tacos, quesabirrias, breakfast tacos and vegan options in Katy, TX. ${site.rating} stars from ${site.reviewCount.toLocaleString()} Google reviews. Order online for pickup or delivery.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: TITLE, template: `%s · ${site.name}` },
  description: DESCRIPTION,
  applicationName: site.name,
  keywords: [
    "tacos Katy TX",
    "Mexican food Katy",
    "street tacos",
    "quesabirria Katy",
    "breakfast tacos Katy TX",
    "vegan tacos Katy",
    "taqueria near me",
    "Dos Tacos",
    "Gaston Rd restaurants",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: siteUrl },
  formatDetection: { telephone: true, address: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: siteUrl,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/img/dos-tacos-logo.jpg",
    apple: "/img/dos-tacos-logo.jpg",
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ED1C24",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${luckiest.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <JsonLd data={restaurantJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:uppercase focus:text-cream"
        >
          Skip to content
        </a>
        <OrderProvider>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </OrderProvider>
      </body>
    </html>
  );
}
