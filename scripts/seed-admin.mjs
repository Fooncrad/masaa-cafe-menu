import mysql from "mysql2/promise";
import { randomBytes, scryptSync } from "node:crypto";

const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";
if (!email || !password) throw new Error("ضع ADMIN_EMAIL و ADMIN_PASSWORD قبل التشغيل.");
if (password.length < 8) console.warn("تحذير: كلمة المرور قصيرة؛ غيّرها فورًا بعد أول دخول.");
const salt = randomBytes(16).toString("base64");
const passwordHash = `scrypt$${salt}$${scryptSync(password, Buffer.from(salt, "base64"), 64).toString("base64")}`;
const allPlatformPermissions = JSON.stringify({ scope: "platform", all: true, permissions: ["*", "orders.read", "orders.update", "orders.cancel", "kds.manage", "menu.read", "menu.manage", "inventory.manage", "reservations.manage", "waiter_calls.read", "waiter_calls.update", "notifications.read", "studio.manage", "reports.read", "finance.read", "team.manage", "customers.read", "customers.password_reset", "settings.manage", "printers.manage", "translations.manage"] });
const db = await mysql.createConnection(process.env.DATABASE_URL);
await db.execute(
  "INSERT INTO testAccounts (email, displayName, role, passwordHash, permissionsJson, isActive, restaurantId) VALUES (?, ?, 'admin', ?, ?, 1, NULL) ON DUPLICATE KEY UPDATE displayName = VALUES(displayName), role = 'admin', passwordHash = VALUES(passwordHash), permissionsJson = VALUES(permissionsJson), isActive = 1, restaurantId = NULL",
  [email, "مدير المنصة", passwordHash, allPlatformPermissions]
);
await db.end();
console.log(`تم تثبيت حساب الإدارة: ${email}`);
