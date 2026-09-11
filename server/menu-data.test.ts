import { describe, expect, it } from "vitest";
import { menuSections, products } from "../client/src/data/menu";

describe("Masaa source menu data", () => {
  it("contains the complete extracted catalog", () => {
    expect(menuSections).toHaveLength(17);
    expect(products).toHaveLength(135);
    expect(new Set(products.map((product) => product.id)).size).toBe(135);
  });

  it("keeps every product usable in both languages", () => {
    for (const product of products) {
      expect(product.name.trim()).not.toBe("");
      expect(product.english.trim()).not.toBe("");
      expect(product.description.trim()).not.toBe("");
      expect(product.descriptionEnglish.trim()).not.toBe("");
      expect(product.price).toBeGreaterThan(0);
      expect(product.image).toMatch(/^https:\/\//);
    }
  });

  it("matches section counts to the product catalog", () => {
    for (const section of menuSections) {
      expect(products.filter((product) => product.category === section.nameAr)).toHaveLength(section.count);
    }
  });
});
