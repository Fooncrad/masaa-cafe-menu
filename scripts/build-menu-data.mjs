import fs from "node:fs";

const input = new URL("../client/src/data/source-menu.json", import.meta.url);
const translationsInput = new URL("../client/src/data/menu-translations.json", import.meta.url);
const output = new URL("../client/src/data/menu.ts", import.meta.url);
const source = JSON.parse(fs.readFileSync(input, "utf8"));
const translations = JSON.parse(fs.readFileSync(translationsInput, "utf8"));

const categoryEnglish = {
  "المقبلات": "Appetizers",
  "الطبق الرئيسي": "Main dishes",
  "الشوربة": "Soup",
  "السندويشات": "Sandwiches",
  "وجبات الاطفال": "Kids meals",
  "العصائر": "Juices",
  "السلطات": "Salads",
  "الباستا": "Pasta",
  "البيتزا": "Pizza",
  "الحلويات": "Desserts",
  "القهوة والشاي": "Coffee & tea",
  "فرابتشينو اند شيك": "Frappuccino & shakes",
  "موهيتو": "Mojito",
  "ايسد درنكس": "Iced drinks",
  "مشروبات ساخنة": "Hot drinks",
  "باقات اعياد ميلاد": "Birthday packages",
  "شيشة": "Shisha",
};

const sections = source.map((section) => ({
  id: section.id,
  nameAr: section.category,
  nameEn: categoryEnglish[section.category] || section.category,
  count: section.products.length,
}));

const products = source.flatMap((section) => section.products.map((product) => ({
  id: Number(product.sourceId),
  name: product.name,
  english: translations[product.sourceId]?.nameEn || product.name,
  category: section.category,
  categoryEnglish: categoryEnglish[section.category] || section.category,
  price: product.price,
  oldPrice: product.oldPrice,
  discount: product.oldPrice && product.oldPrice > product.price
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0,
  image: product.image,
  description: product.description || product.name,
  descriptionEnglish: translations[product.sourceId]?.descriptionEn || translations[product.sourceId]?.nameEn || product.description || product.name,
})));

const contents = `export const menuSections = ${JSON.stringify(sections, null, 2)} as const;\n\nexport const products = ${JSON.stringify(products, null, 2)} as const;\n`;
fs.writeFileSync(output, contents);
console.log(JSON.stringify({ sections: sections.length, products: products.length, output: output.pathname }));
