import mysql from "mysql2/promise";
import { randomBytes, scryptSync } from "node:crypto";

const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";
if (!email || !password) throw new Error("ضع ADMIN_EMAIL و ADMIN_PASSWORD قبل التشغيل.");
if (password.length < 8) console.warn("تحذير: كلمة المرور قصيرة؛ غيّرها فورًا بعد أول دخول.");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL غير موجود. أضفه في متغيرات بيئة تطبيق Hostinger.");
const salt = randomBytes(16).toString("base64");
const passwordHash = `scrypt$${salt}$${scryptSync(password, Buffer.from(salt, "base64"), 64).toString("base64")}`;
const allPlatformPermissions = JSON.stringify({ scope: "platform", all: true, permissions: ["*", "orders.read", "orders.update", "orders.cancel", "kds.manage", "menu.read", "menu.manage", "inventory.manage", "reservations.manage", "waiter_calls.read", "waiter_calls.update", "notifications.read", "studio.manage", "reports.read", "finance.read", "team.manage", "customers.read", "customers.password_reset", "settings.manage", "printers.manage", "translations.manage"] });
const db = await mysql.createConnection(process.env.DATABASE_URL);
const [databaseRows] = await db.query("SELECT DATABASE() AS databaseName");
console.log(`قاعدة البيانات المتصلة: ${databaseRows[0]?.databaseName ?? "غير معروفة"}`);
const [tableRows] = await db.query("SHOW TABLES LIKE 'testAccounts'");
if (!tableRows.length) {
  await db.end();
  throw new Error("جدول testAccounts غير موجود. نفّذ npx drizzle-kit migrate أولًا على نفس DATABASE_URL.");
}
const [result] = await db.execute(
  "INSERT INTO testAccounts (email, displayName, role, passwordHash, permissionsJson, isActive, restaurantId) VALUES (?, ?, 'admin', ?, ?, 1, NULL) ON DUPLICATE KEY UPDATE displayName = VALUES(displayName), role = 'admin', passwordHash = VALUES(passwordHash), permissionsJson = VALUES(permissionsJson), isActive = 1, restaurantId = NULL",
  [email, "مدير المنصة", passwordHash, allPlatformPermissions]
);
console.log(`تمت إضافة/تحديث صفوف الأدمن: ${result.affectedRows ?? 0}`);
const [accountRows] = await db.query("SELECT id, email, role, isActive, restaurantId FROM testAccounts WHERE email = ? LIMIT 1", [email]);
console.log("الحساب النهائي:", accountRows[0] ?? "غير موجود");
await db.end();
console.log(`تم تثبيت حساب الإدارة: ${email}`);
