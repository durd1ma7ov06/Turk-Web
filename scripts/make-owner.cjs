'use strict';
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const email = (process.argv[2] || '').trim().toLowerCase();
if (!email) {
  console.error("Foydalanish: npm run make-owner <email>");
  console.error("Misol: npm run make-owner mansur@example.com");
  process.exit(1);
}

const dbPath = process.env.TURKCE_DB_PATH || path.join(__dirname, '../data/turkce.sqlite');
const db = new DatabaseSync(dbPath);

const user = db.prepare('SELECT id, name, email, role FROM users WHERE LOWER(email) = ?').get(email);
if (!user) {
  console.error(`Xatolik: '${email}' emailiga ega foydalanuvchi topilmadi.`);
  console.error("Avval platformada ushbu email bilan ro‘yxatdan o‘ting.");
  db.close();
  process.exit(1);
}

db.prepare("UPDATE users SET role = 'owner' WHERE id = ?").run(user.id);
console.log(`✓ Muvaffaqiyatli: ${user.name} (${user.email}) 'owner' (loyiha egasi) roliga o‘tkazildi.`);
console.log("Endi saytga kirib 'Boshqaruv paneli (CMS)' dan foydalanishingiz mumkin.");
db.close();
