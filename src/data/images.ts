/**
 * Dish photography — all real photos supplied by the restaurant.
 *
 * Deliberately no stock imagery: every shot here is on the branded pink Dos
 * Tacos wrapper, so mixing in stock would break that consistency. Items with
 * no photo fall back to a coloured tile + icon, which reads as intentional.
 *
 * Still needs a photo: al pastor, carnitas, crawfish tostada, soup du jour,
 * every vegan item, and the non-alcoholic drinks.
 */

const R = (name: string) => `/img/real/${name}.jpg`;

const BY_ITEM: Record<string, string> = {
  // street tacos
  "el-pur": R("el-pur"),
  "el-bacon": R("el-bacon"),
  "el-chorizo": R("el-churizo"),
  "chicken-fajita-taco": R("chicken-fajita-taco"),
  "chicken-fried-taco": R("chicken-fried-taco"),
  "fish-tacos": R("fish-tacos"),

  // breakfast
  "egg-pastor": R("egg-pastor"),
  "egg-birria": R("egg-birria"),
  "egg-sausage": R("egg-sausage"),
  chilaquiles: R("chilaquiles"),

  // specialties
  quesabirrias: R("quesabirrias"),
  bowl: R("bowl"),
  "fish-burrito": R("burrito"),

  // sides
  "queso-chips": R("queso-chips"),
  "guac-chips": R("guac-chips"),
  nachos: R("nachos"),
  corn: R("corn"),

  // drinks
  margarita: R("marg"),

  // sweets
  flan: R("flan"),
  "arroz-con-leche": R("arroz-con-leche"),
};

export const imageFor = (id: string): string | null => BY_ITEM[id] ?? null;

/** Feature imagery. */
export const heroImage = R("quesabirrias");
export const storeFront = "/img/store-front.jpg";
export const logo = "/img/dos-tacos-logo.jpg";

/** Used by the colour-block hero and section art. */
export const featureImages = {
  tacos: R("el-pur"),
  breakfast: R("egg-birria"),
  sides: R("nachos"),
  drinks: R("marg"),
  sweets: R("flan"),
  spread: R("chilaquiles"),
} as const;

/** Gallery strip. Keep the count divisible by 4 so no row is orphaned. */
export const galleryImages = [
  { src: R("el-pur"), alt: "El Pur taco with melted cheese on a Dos Tacos tray" },
  { src: R("quesabirrias"), alt: "Quesabirrias with consomé for dipping" },
  { src: R("chilaquiles"), alt: "Chilaquiles with avocado, crema and pickled onion" },
  { src: R("nachos"), alt: "Loaded nachos with guacamole and crema" },
  { src: R("egg-birria"), alt: "Egg and birria breakfast taco" },
  { src: R("guac-chips"), alt: "Fresh guacamole with tortilla chips" },
  { src: R("fish-tacos"), alt: "Fish taco topped with pico de gallo" },
  { src: R("flan"), alt: "Slice of house-made flan" },
  {
    src: R("marg"),
    alt: "Chile-rimmed margarita with sangrita and a Jarritos on the side",
  },
  { src: R("bowl"), alt: "Taco bowl with rice, beans, avocado and crema" },
  { src: R("queso-chips"), alt: "Warm queso with fresh tortilla chips" },
  { src: R("corn"), alt: "Esquites — grilled corn with crema, cotija and chile" },
];
