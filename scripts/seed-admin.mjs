import mysql from "mysql2/promise";
import { randomBytes, scryptSync } from "node:crypto";

const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";
if (!email || !password) throw new Error("ضع ADMIN_EMAIL و ADMIN_PASSWORD قبل التشغيل.");
if (password.length < 8) console.warn("تحذير: كلمة المرور قصيرة؛ غيّرها فورًا بعد أول دخول.");
const salt = randomBytes(16).toString("base64");
const passwordHash = `scrypt$${salt}$${scryptSync(password, Buffer.from(salt, "base64"), 64).toString("base64")}`;
const db = await mysql.createConnection(process.env.DATABASE_URL);
await db.execute(
  "INSERT INTO testAccounts (email, displayName, role, passwordHash, isActive, restaurantId) VALUES (?, ?, 'admin', ?, 1, (SELECT id FROM restaurants WHERE status IN ('active','trial') ORDER BY id LIMIT 1)) ON DUPLICATE KEY UPDATE displayName = VALUES(displayName), role = 'admin', passwordHash = VALUES(passwordHash), isActive = 1, restaurantId = COALESCE(testAccounts.restaurantId, VALUES(restaurantId))",
  [email, "مدير الموقع", passwordHash]
);
await db.end();
console.log(`تم تثبيت حساب الإدارة: ${email}`);
