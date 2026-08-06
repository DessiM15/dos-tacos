/**
 * Single source of truth for everything about the shop.
 *
 * Anything marked NEEDS-CONFIRM came from the Google Business listing or is a
 * sensible placeholder. Swap it here and it updates across the whole site.
 */

export const site = {
  name: "Dos Tacos",
  tagline: "Dos Tacos, Dos Veces la Felicidad",
  taglineEn: "Two Tacos, Twice the Happiness",
  blurb:
    "Down-to-earth eatery specializing in authentic Mexican tacos, plus beer and margaritas.",
  city: "Katy, TX",

  address: {
    street: "10610 Gaston Rd Ste 130",
    city: "Katy",
    state: "TX",
    zip: "77494",
    get full() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },

  // NEEDS-CONFIRM: Google lists a 503 (Oregon) area code for a Katy, TX shop.
  // Likely a call-tracking number or a listing typo.
  phone: "(503) 935-0668",
  phoneHref: "tel:+15039350668",

  email: "hola@dostacoskaty.com", // NEEDS-CONFIRM: placeholder

  rating: 4.9,
  reviewCount: 1020,
  priceRange: "$10–20",

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Dos+Tacos+10610+Gaston+Rd+Ste+130+Katy+TX+77494",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=10610+Gaston+Rd+Ste+130,+Katy,+TX+77494&output=embed",

  /** NEEDS-CONFIRM: swap in the real ordering links. */
  order: {
    uberEats: "https://www.ubereats.com/",
    doorDash: "https://www.doordash.com/",
  },

  /** NEEDS-CONFIRM: only "opens 8 AM" was visible on the Google listing. */
  hours: [
    { day: "Monday", open: "8:00 AM", close: "9:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "9:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "9:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "9:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "10:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "10:00 PM" },
    { day: "Sunday", open: "8:00 AM", close: "8:00 PM" },
  ],

  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
  ],

  perks: [
    "Vegan options",
    "Kids' menu",
    "Beer & margaritas",
    "Free samples for first-timers",
    "Takeout & delivery",
  ],
} as const;

export type Review = {
  quote: string;
  author: string;
  stars: number;
  accent: "salsa" | "lime" | "mango" | "turquoise" | "guava";
};

/** Pulled from the public Google review summary. */
export const reviews: Review[] = [
  {
    quote:
      "Friendly service, great prices, and very tasty food and it's a home run.",
    author: "Google review",
    stars: 5,
    accent: "salsa",
  },
  {
    quote:
      "The menu has loads of options including vegetarian choices and kid size meals.",
    author: "Google review",
    stars: 5,
    accent: "lime",
  },
  {
    quote:
      "Pastor tacos with a margarita 10/10 amazing atmosphere and wonderful staff.",
    author: "Google review",
    stars: 5,
    accent: "mango",
  },
  {
    quote:
      "The carne asada volcanes and quesabirrias are unreal. Generous portions for the price.",
    author: "Google review",
    stars: 5,
    accent: "turquoise",
  },
  {
    quote:
      "They brought us complimentary samples because it was our first time. Who does that anymore?",
    author: "Google review",
    stars: 5,
    accent: "guava",
  },
  {
    quote:
      "Best vegan tacos in Katy, hands down. The vegan pastor actually tastes like pastor.",
    author: "Google review",
    stars: 5,
    accent: "salsa",
  },
];

/** The AI-generated summary Google shows on the listing. */
export const reviewSummary =
  "People say this taco spot offers delicious, fresh, and flavorful tacos, including popular options like carne asada volcanes and quesabirrias, with excellent vegetarian and vegan choices. They also highlight the reasonable prices, generous portions, and the clean, welcoming atmosphere. Visitors consistently praise the friendly, attentive, and helpful staff, who often provide complimentary samples for first-time guests.";
