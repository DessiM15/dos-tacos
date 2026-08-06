/**
 * The menu.
 *
 * Item names and the prices that were visible on the Uber Eats listing are
 * real. Everything with `estimated: true` is a placeholder price I mocked up
 * because the live site was down — replace those numbers and delete the flag.
 */

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  /** true = price is a placeholder, not confirmed by the restaurant */
  estimated?: boolean;
  description?: string;
  popular?: boolean;
  vegan?: boolean;
  spicy?: 0 | 1 | 2 | 3;
};

export type MenuCategory = {
  id: string;
  name: string;
  spanish: string;
  blurb: string;
  emoji: string;
  accent: "salsa" | "lime" | "mango" | "turquoise" | "guava";
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "street-tacos",
    name: "Street Tacos",
    spanish: "Tacos de Calle",
    blurb: "Corn tortillas, onion, cilantro, lime. The whole reason we're here.",
    emoji: "🌮",
    accent: "salsa",
    items: [
      {
        id: "taco-al-pastor",
        name: "Tacos Al Pastor",
        price: 3.25,
        estimated: true,
        description:
          "Marinated pork off the trompo, pineapple, onion, cilantro.",
        popular: true,
        spicy: 2,
      },
      {
        id: "taco-carnitas",
        name: "Street Taco Carnitas",
        price: 3.25,
        estimated: true,
        description: "Slow-braised pork, crisped on the flat top.",
        popular: true,
        spicy: 1,
      },
      {
        id: "taco-carne-asada",
        name: "Tacos Carne Asada",
        price: 3.5,
        estimated: true,
        description: "Grilled steak, charred onion, salsa verde.",
        popular: true,
        spicy: 1,
      },
      {
        id: "taco-birria",
        name: "Birria Tacos",
        price: 4.25,
        estimated: true,
        description: "Dipped, griddled, and served with consomé for dunking.",
        popular: true,
        spicy: 2,
      },
      {
        id: "taco-pollo",
        name: "Tacos de Pollo",
        price: 3.25,
        estimated: true,
        description: "Grilled adobo chicken, onion, cilantro.",
        spicy: 1,
      },
      {
        id: "taco-lengua",
        name: "Tacos de Lengua",
        price: 3.75,
        estimated: true,
        description: "Tender beef tongue. Ask the regulars.",
        spicy: 1,
      },
    ],
  },
  {
    id: "specialties",
    name: "House Specialties",
    spanish: "Especialidades",
    blurb: "The stuff people drive across Katy for.",
    emoji: "🔥",
    accent: "mango",
    items: [
      {
        id: "quesadilla-birria",
        name: "Quesadilla Birria",
        price: 12.95,
        estimated: true,
        description: "Cheese-crusted, birria-stuffed, consomé on the side.",
        popular: true,
        spicy: 2,
      },
      {
        id: "volcanes-asada",
        name: "Carne Asada Volcanes",
        price: 11.95,
        estimated: true,
        description:
          "Crispy tostada base, melted cheese, carne asada piled high.",
        popular: true,
        spicy: 1,
      },
      {
        id: "crawfish-tostada",
        name: "Crawfish Tostada",
        price: 10.95,
        estimated: true,
        description: "Gulf crawfish, avocado, citrus, crunch. A Texas thing.",
        popular: true,
        spicy: 2,
      },
      {
        id: "fish-burrito",
        name: "El Fried Fish Burrito",
        price: 12.5,
        estimated: true,
        description: "Crispy fried fish, cabbage slaw, chipotle crema.",
        spicy: 2,
      },
      {
        id: "soup-du-jour",
        name: "Soup Du Jour",
        price: 7.95,
        estimated: true,
        description: "Whatever the kitchen felt like today. Always good.",
      },
    ],
  },
  {
    id: "vegan",
    name: "Vegan & Veggie",
    spanish: "Vegano",
    blurb:
      "Not an afterthought. People come here specifically for these — check the reviews.",
    emoji: "🌱",
    accent: "lime",
    items: [
      {
        id: "vegan-pastor",
        name: "Taco Vegan Pastor",
        price: 3.5,
        estimated: true,
        description: "Adobo-marinated soy protein, pineapple, onion, cilantro.",
        popular: true,
        vegan: true,
        spicy: 2,
      },
      {
        id: "vegan-egg-potato",
        name: "Vegan Egg & Potato Taco",
        price: 3.5,
        estimated: true,
        description: "Plant-based egg, crispy potato, salsa roja.",
        vegan: true,
        spicy: 1,
      },
      {
        id: "vegan-bf-egg",
        name: "Vegan Breakfast Egg Taco",
        price: 3.5,
        estimated: true,
        description: "Served all morning, because 8 AM tacos are a right.",
        popular: true,
        vegan: true,
      },
      {
        id: "vegan-sampler",
        name: "Vegan Taco Sampler",
        price: 12.95,
        estimated: true,
        description: "Four vegan tacos, four different fillings. Best intro.",
        vegan: true,
        spicy: 1,
      },
    ],
  },
  {
    id: "sides",
    name: "Sides & Extras",
    spanish: "Para Compartir",
    blurb: "Order the queso. Everyone orders the queso.",
    emoji: "🧀",
    accent: "turquoise",
    items: [
      {
        id: "queso-chips",
        name: "Queso and Chips",
        price: 7.95,
        estimated: true,
        description: "Warm queso, fresh chips. Non-negotiable.",
        popular: true,
      },
      {
        id: "salsa",
        name: "Salsa",
        price: 1.5,
        estimated: true,
        description: "Roja, verde, or the one that fights back.",
        spicy: 3,
      },
      {
        id: "guacamole",
        name: "Guacamole & Chips",
        price: 8.5,
        estimated: true,
        description: "Smashed to order.",
      },
      {
        id: "rice-beans",
        name: "Rice & Beans",
        price: 4.5,
        estimated: true,
        description: "Charro beans and Mexican rice.",
      },
      {
        id: "elote",
        name: "Elote",
        price: 5.5,
        estimated: true,
        description: "Grilled corn, crema, cotija, chile, lime.",
        spicy: 1,
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    spanish: "Bebidas",
    blurb: "Ice cold, imported, and one of them has beer in it.",
    emoji: "🥤",
    accent: "guava",
    items: [
      {
        id: "michelada",
        name: "Michelada",
        price: 9.5,
        estimated: true,
        description: "Beer, lime, spice, chile rim. Brunch's best friend.",
        popular: true,
        spicy: 2,
      },
      {
        id: "margarita",
        name: "House Margarita",
        price: 9.5,
        estimated: true,
        description: "On the rocks, salted, no mix nonsense.",
        popular: true,
      },
      { id: "mexican-coke", name: "Mexican Coke", price: 4.95 },
      { id: "mexican-fanta", name: "Mexican Fanta Orange", price: 4.95 },
      { id: "coca-cola", name: "Coca-Cola", price: 4.5 },
      { id: "sangria", name: "Sangria", price: 4.95 },
      { id: "barrilitos", name: "Barrilitos Apple", price: 3.95 },
      { id: "strawberry-milk", name: "Strawberry Milk", price: 4.25 },
      { id: "chocolate-milk", name: "Chocolate Milk", price: 4.25 },
      { id: "bottled-water", name: "Bottled Water", price: 3.95 },
      {
        id: "horchata",
        name: "Horchata",
        price: 4.5,
        estimated: true,
        description: "Rice, cinnamon, vanilla. House-made.",
        popular: true,
      },
    ],
  },
];

export const popularItems = menu
  .flatMap((c) => c.items.map((i) => ({ ...i, category: c })))
  .filter((i) => i.popular);

export const veganItems = menu
  .flatMap((c) => c.items)
  .filter((i) => i.vegan);

/** Names used by the scrolling marquees. */
export const tacoNames = [
  "AL PASTOR",
  "BIRRIA",
  "CARNITAS",
  "CARNE ASADA",
  "VEGAN PASTOR",
  "LENGUA",
  "CRAWFISH TOSTADA",
  "QUESO",
  "MICHELADA",
  "ELOTE",
  "HORCHATA",
  "VOLCANES",
];
