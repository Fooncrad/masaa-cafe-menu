import mysql from "mysql2/promise";

const imagePool = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=82",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=82",
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1200&q=82",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=82",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=82",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=82",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=82",
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=82",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=82",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=82",
];
const coverUrl = "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1800&q=85";
const defaultCategories = ["قهوة مختصة", "مشروبات باردة", "حلويات", "فطور", "مقبلات", "وجبات رئيسية", "سلطات", "إضافات"];

const db = await mysql.createConnection(process.env.DATABASE_URL);
const [restaurants] = await db.query("SELECT id, name FROM restaurants WHERE status IN ('active','trial') ORDER BY id");
if (!restaurants.length) throw new Error("لا توجد متاجر active أو trial لزرع البيانات التجريبية.");
let total = 0;
for (const restaurant of restaurants) {
  await db.execute("UPDATE restaurants SET coverUrl = COALESCE(NULLIF(coverUrl, ''), ?) WHERE id = ?", [coverUrl, restaurant.id]);
  const [existingCategories] = await db.query("SELECT id, name FROM menuCategories WHERE restaurantId = ? ORDER BY sortOrder, id", [restaurant.id]);
  let categories = existingCategories;
  if (!categories.length) {
    for (const [sortOrder, name] of defaultCategories.entries()) {
      await db.execute("INSERT INTO menuCategories (restaurantId, name, imageUrl, translationsJson, sortOrder) VALUES (?, ?, ?, ?, ?)", [restaurant.id, name, imagePool[sortOrder % imagePool.length], JSON.stringify({ en: name, fr: name }), sortOrder]);
    }
    [categories] = await db.query("SELECT id, name FROM menuCategories WHERE restaurantId = ? ORDER BY sortOrder, id", [restaurant.id]);
  }
  await db.execute("DELETE FROM menuItems WHERE restaurantId = ? AND JSON_CONTAINS(tagsJson, JSON_QUOTE('masaa-demo'))", [restaurant.id]);
  for (const category of categories) {
    for (let index = 0; index < 10; index += 1) {
      const price = (12 + ((category.id + index) % 9) * 2.5).toFixed(2);
      const name = `${category.name} ${index + 1}`;
      const tags = JSON.stringify(["masaa-demo", "test-data"]);
      const translations = JSON.stringify({ en: `${category.name} ${index + 1}`, fr: `${category.name} ${index + 1}` });
      await db.execute("INSERT INTO menuItems (restaurantId, categoryId, name, description, price, imageUrl, translationsJson, tagsJson, isAvailable, prepTimeMinutes, calories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)", [restaurant.id, category.id, name, `صنف تجريبي من قسم ${category.name} للمعاينة فقط.`, price, imagePool[index % imagePool.length], translations, tags, 8 + (index % 8), 120 + index * 35]);
      total += 1;
    }
  }
  console.log(`تم تجهيز ${restaurant.name}: ${categories.length} قسم × 10 أصناف`);
}
await db.end();
console.log(`اكتمل Seed: ${total} صنف تجريبي مع صور وكفر للمتاجر التي لا تملك كفرًا.`);
