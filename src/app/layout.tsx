import type { Metadata } from "next";
import { Anton, Luckiest_Guy, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { OrderProvider } from "@/components/OrderProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const luckiest = Luckiest_Guy({
  variable: "--font-luckiest",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dostacoskaty.com"),
  title: {
    default: `${site.name} — Authentic Street Tacos in ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: `${site.blurb} ${site.rating}★ from ${site.reviewCount.toLocaleString()} reviews in ${site.city}.`,
  openGraph: {
    title: `${site.name} — Authentic Street Tacos in ${site.city}`,
    description: site.blurb,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${luckiest.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <OrderProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </OrderProvider>
      </body>
    </html>
  );
}
