import { describe, expect, it } from "vitest";
import { sectorCatalog } from "../shared/sectorCatalog";

describe("NFOOD sector catalog", () => {
  it("keeps every marketplace sector represented", () => {
    expect(sectorCatalog.map((sector) => sector.slug)).toEqual([
      "restaurant",
      "fashion",
      "beauty_salon",
      "grocery",
      "vegetables",
      "laundry",
      "automotive",
      "public_works",
      "trend",
      "other",
    ]);
  });

  it("provides categories, items, service modes, and custom fields for every sector", () => {
    for (const sector of sectorCatalog) {
      expect(sector.categories.length).toBeGreaterThan(0);
      expect(sector.categories.every((category) => category.items.length > 0)).toBe(true);
      expect(sector.serviceModes.length).toBeGreaterThan(0);
      expect(sector.customFields.length).toBeGreaterThan(0);
    }
  });
});
