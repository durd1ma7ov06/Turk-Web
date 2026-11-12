# ECC — barcha loyihalar uchun global o‘rnatish

Sana: 2026-11-13, Asia/Tashkent.
Reliz: v2.2.3. Manba: https://github.com/affaan-m/ECC
Commit: c05b2d6614f62f6db0047669aa4eefb223d478f9.

## Codex — global, o‘rnatilgan va faol

Native plugin `ecc@ecc`, versiya 2.2.3, installed=true, enabled=true.
Kesh: `C:\Users\Mansur\.codex\plugins\cache\ecc\ecc\2.2.3`.
293 skill katalogi, 68 agent ta’rifi mavjud. Agent ta’riflari alohida native Codex agentlari ro‘yxati degani emas.
Plugin holati Turk tili loyihasidan tashqaridagi katalogdan ham tekshirildi. Rasmiy cache validator barcha manifest manzillarini tasdiqladi.
Codex hooklari hostning trust siyosatiga bo‘ysunadi; himoya va tasdiqlash siyosati o‘chirilmadi.

## Antigravity — global, barcha loyihalar

Manzil: `C:\Users\Mansur\.gemini\config`.
281 skill, 68 moslashtirilgan agent, 122 qoida, 94 workflow.
707 boshqariladigan faylning SHA-256 summasi mustaqil qayta tekshirildi — barchasi mos.
Global fayllar ro‘yxati: `C:\Users\Mansur\.gemini\config\ecc-managed-files.json`.
Global maqsad fayllari bilan farqli to‘qnashuv bo‘lmasa o‘rnatildi; mavjud konfiguratsiya fayllari almashtirilmadi.
Faqat shu ishda yaratilgan va global nusxasi tasdiqlangan loyiha dublikatlari tozalandi. Sayt kodi va o‘quv materiallari o‘zgartirilmadi.

## Ishlatish

Codex va Antigravity’da yangi chat oching yoki dasturni qayta oching. Yangi va mavjud istalgan loyihada global ECC mavjud bo‘ladi; uni har bir loyihaga qayta nusxalash kerak emas. Maxsus loyiha sozlamalari yoki tashkilot siyosati global imkoniyatlarni cheklashi mumkin.
Misol: “ECC yordamida loyihani tahlil qil, reja tuz, o‘zgartirishlarni bajar va tekshir.”

## Imkoniyat chegaralari

Barqaror relizdagi haqiqiy sonlar yuqorida. Reklamadagi 314 skill/71 agent asosiy tarmoqning boshqa tarkibiga tegishli.
Antigravity adapteri hooks-runtime, media-generation va orchestration modullarini qo‘llamaydi; ular majburan yoqilmadi. Har ikki dasturda barcha Claude imkoniyatlari bir xil bo‘lishi kafolatlanmaydi.
O‘rnatish va fayl yaxlitligi tasdiqlandi; Antigravity ichidagi yangi agent suhbatini bajarib tekshirish amalga oshirilmadi. API kalitlari va model obunalari o‘zgartirilmadi.

## Tekshiruv dalillari

- `.tools/ecc-global-verification.json`: global fayllar va tarkib sonlari.
- `.tools/ecc-antigravity-global-install.json`: o‘rnatilgan fayllar va tekshiruv summalari.
- `.tools/ecc-antigravity-doctor.json`: globalga ko‘chirishdan oldingi rasmiy doctor tekshiruvi, xatosiz.
- Dastlabki avtomatik tasdiqlash rad javobidan so‘ng foydalanuvchi barcha loyihalar uchun global ulashga aniq ruxsat berdi. Global ulash shundan keyin muvaffaqiyatli bajarildi.

Rasmiy yo‘riqnomalar:
- https://learn.chatgpt.com/docs/plugins
- https://antigravity.google/docs/customization-discovery
- https://antigravity.google/docs/skills
