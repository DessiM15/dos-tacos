import type { IconName } from "@/components/ui/Icon";
import { imageFor } from "@/data/images";

/**
 * The menu.
 *
 * Item names come from two sources: the restaurant's own photo filenames and
 * the public Google Business listing. Prices marked `estimated: true` are
 * placeholders (they render with a visible "TBC" tag) — replace those numbers
 * and delete the flag.
 *
 * NEEDS-CONFIRM on names: "El Pur", "El Chorizo" and "El Bacon" are taken from
 * the photo filenames; confirm the exact spelling used on the printed menu.
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
  icon: IconName;
  accent: "salsa" | "lime" | "mango" | "turquoise" | "guava";
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "street-tacos",
    name: "Street Tacos",
    spanish: "Tacos de Calle",
    blurb: "Corn tortillas, onion, cilantro, lime. The whole reason we're here.",
    icon: "taco",
    accent: "salsa",
    items: [
      {
        id: "el-pur",
        name: "El Pur",
        price: 3.75,
        estimated: true,
        description: "Cheese-crisped and loaded. The one people photograph.",
        popular: true,
        spicy: 1,
      },
      {
        id: "el-bacon",
        name: "El Bacon",
        price: 3.75,
        estimated: true,
        description: "Bacon, melted cheese, onion, cilantro.",
        popular: true,
        spicy: 1,
      },
      {
        id: "el-chorizo",
        name: "El Chorizo",
        price: 3.75,
        estimated: true,
        description: "Mexican chorizo crisped on the flat top.",
        popular: true,
        spicy: 2,
      },
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
        id: "chicken-fajita-taco",
        name: "Chicken Fajita Taco",
        price: 3.75,
        estimated: true,
        description: "Grilled chicken, peppers and onions, queso on the side.",
        spicy: 1,
      },
      {
        id: "chicken-fried-taco",
        name: "Chicken Fried Taco",
        price: 3.95,
        estimated: true,
        description: "Crispy fried chicken, slaw, salsa. A Texas idea.",
        spicy: 1,
      },
      {
        id: "fish-tacos",
        name: "Fish Tacos",
        price: 4.25,
        estimated: true,
        description: "Fresh fish, cabbage, pico, crema.",
        popular: true,
        spicy: 1,
      },
    ],
  },
  {
    id: "breakfast",
    name: "Breakfast Tacos",
    spanish: "Desayuno",
    blurb: "Doors open at 8 AM. These are why.",
    icon: "clock",
    accent: "mango",
    items: [
      {
        id: "egg-pastor",
        name: "Egg & Pastor",
        price: 3.75,
        estimated: true,
        description: "Scrambled egg, al pastor, cheese.",
        popular: true,
        spicy: 2,
      },
      {
        id: "egg-birria",
        name: "Egg & Birria",
        price: 4.25,
        estimated: true,
        description: "Scrambled egg with birria and melted cheese.",
        popular: true,
        spicy: 2,
      },
      {
        id: "egg-sausage",
        name: "Egg & Sausage",
        price: 3.5,
        estimated: true,
        description: "Scrambled egg, sausage, cheese. The classic.",
        spicy: 1,
      },
      {
        id: "chilaquiles",
        name: "Chilaquiles",
        price: 11.95,
        estimated: true,
        description:
          "Crispy tortillas in salsa with avocado, crema and pickled onion.",
        popular: true,
        spicy: 2,
      },
    ],
  },
  {
    id: "specialties",
    name: "House Specialties",
    spanish: "Especialidades",
    blurb: "The stuff people drive across Katy for.",
    icon: "flame",
    accent: "turquoise",
    items: [
      {
        id: "quesabirrias",
        name: "Quesabirrias",
        price: 12.95,
        estimated: true,
        description: "Cheese-crusted, birria-stuffed, consomé for dunking.",
        popular: true,
        spicy: 2,
      },
      {
        id: "bowl",
        name: "Taco Bowl",
        price: 12.5,
        estimated: true,
        description: "Everything in a bowl — rice, beans, protein, avocado.",
        popular: true,
        spicy: 1,
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
        id: "crawfish-tostada",
        name: "Crawfish Tostada",
        price: 10.95,
        estimated: true,
        description: "Gulf crawfish, avocado, citrus, crunch. A Texas thing.",
        popular: true,
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
    icon: "leaf",
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
    icon: "cheese",
    accent: "guava",
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
        id: "guac-chips",
        name: "Guacamole & Chips",
        price: 8.5,
        estimated: true,
        description: "Smashed to order.",
        popular: true,
      },
      {
        id: "nachos",
        name: "Nachos",
        price: 12.95,
        estimated: true,
        description: "Fully loaded — cheese, crema, guac, jalapeño, the works.",
        popular: true,
        spicy: 2,
      },
      {
        id: "corn",
        name: "Esquites",
        price: 5.5,
        estimated: true,
        description: "Grilled corn off the cob with crema, cotija, chile, lime.",
        spicy: 1,
      },
      {
        id: "salsa",
        name: "Salsa",
        price: 1.5,
        estimated: true,
        description: "Roja, verde, or the one that fights back.",
        spicy: 3,
      },
    ],
  },
  {
    id: "sweets",
    name: "Sweets",
    spanish: "Postres",
    blurb: "Save room. Or don't, and come back tomorrow.",
    icon: "gift",
    accent: "lime",
    items: [
      {
        id: "flan",
        name: "Flan",
        price: 6.5,
        estimated: true,
        description: "Classic, wobbly, caramel on top.",
        popular: true,
      },
      {
        id: "arroz-con-leche",
        name: "Arroz con Leche",
        price: 5.5,
        estimated: true,
        description: "Rice pudding with cinnamon. Served warm.",
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    spanish: "Bebidas",
    blurb: "Ice cold, imported, and one of them has beer in it.",
    icon: "drink",
    accent: "salsa",
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
      {
        id: "horchata",
        name: "Horchata",
        price: 4.5,
        estimated: true,
        description: "Rice, cinnamon, vanilla. House-made.",
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
    ],
  },
];

/**
 * PRESENTATION MODE.
 *
 * While photography is incomplete, the site only shows dishes we have a real
 * photo for — a menu of mixed photos and placeholder tiles reads as unfinished.
 * Categories that end up empty are dropped entirely.
 *
 * Flip this to `false` once the remaining photos land and the full menu below
 * comes back automatically. Nothing else needs to change.
 */
export const PHOTOS_ONLY = true;

/** What the site actually renders. Everything downstream derives from this. */
export const visibleMenu: MenuCategory[] = PHOTOS_ONLY
  ? menu
      .map((c) => ({ ...c, items: c.items.filter((i) => imageFor(i.id)) }))
      .filter((c) => c.items.length > 0)
  : menu;

/** Items hidden by presentation mode — surfaced in the README/handoff. */
export const hiddenItemCount =
  menu.reduce((n, c) => n + c.items.length, 0) -
  visibleMenu.reduce((n, c) => n + c.items.length, 0);

export const popularItems = visibleMenu
  .flatMap((c) => c.items.map((i) => ({ ...i, category: c })))
  .filter((i) => i.popular);

export const veganItems = visibleMenu
  .flatMap((c) => c.items)
  .filter((i) => i.vegan);

export const allItems = visibleMenu.flatMap((c) => c.items);

/** Marquee copy, built from what is actually on the page. */
export const tacoNames = visibleMenu
  .flatMap((c) => c.items)
  .filter((i) => i.popular)
  .map((i) => i.name.toUpperCase());
