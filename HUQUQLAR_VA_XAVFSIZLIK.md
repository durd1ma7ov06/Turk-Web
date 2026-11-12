# Huquqlar va kirish tekshiruvi

Tekshiruv sanasi: 2026-11-13. Bu hujjatdagi “tasdiqlanmagan” litsenziya yo‘q degan qat’iy huquqiy xulosa emas; mavjud dalillar yetarli emasligini bildiradi.

## Loyiha egasi va kontent

- Platforma yaratuvchisi sifatida Mansur ko‘rsatildi. Bu yozuv huquqiy ro‘yxatdan o‘tkazish yoki tashqi materiallar huquqini o‘tkazish hisoblanmaydi.
- Original ilova kodi va original o‘quv matnlari shu loyiha uchun yaratilgan. Uchinchi tomonning kitoblari, ovoz xizmatlari va kutubxonalariga avtomatik egalik da’vo qilinmaydi.
- Yedi İklim: 146 MP3 va 5 PDF rasmiy Yunus Emre nashrlaridan olingan lokal nusxalar. Rasmiy nashr sahifasi yuklash imkonini beradi, lekin bu tekshiruvda boshqa tijoriy saytda qayta joylash uchun aniq litsenziya topilmadi. Ommaviy/tijoriy chiqarishdan oldin nashriyot ruxsati yoki mos litsenziya kerakligi aniqlashtiriladi.
- Sintetik ovoz: 84 original matn uchun tr-TR-EmelNeural ishlatilgan. edge-tts kodi litsenziyasi ovoz xizmatining tijoriy huquqiga teng emas. Microsoft Q&A javobi ham bu bo‘yicha aniq ommaviy hujjat mavjud emasligini va rasmiy aniqlashtirish kerakligini bildiradi; bu forum javobi huquqiy litsenziya emas.
- Tashqi Telegram fayllari yuklanmagan; ularning foydalanish huquqlari tasdiqlanmagan.
- Google Fonts importi olib tashlandi. Interfeys qurilmadagi mavjud shriftlardan foydalanadi.

Manbalar:

- https://www.yee.org.tr/en/yayinlar/yedi-iklim-turkce-a1-ders-kitabi
- https://learn.microsoft.com/en-us/answers/questions/5925556/commercial-use-of-edge-read-aloud-voices-via-edge
- https://www.microsoft.com/en-us/servicesagreement

## Tuzatilgan kirish va yuklash joylari

- MP3, PDF, mikrofon yozuvi va ZIP yuklash havolalari interfeysdan olib tashlandi.
- HTML audio boshqaruvida nodownload va noremoteplayback qo‘yildi. Bu brauzer interfeysi cheklovi, DRM emas.
- PDF ko‘ruvchi paneli yashirildi. Bu PDF nusxalashni mutlaq taqiqlamaydi.
- HTTP orqali ZIP arxivlari, package.json, audit hujjatlari, Python/Node xizmat kodlari, JSON manifestlar va .tools katalogi ochilmaydi. Faqat aniq belgilangan frontend fayllari va manifestdagi media uzatiladi.
- Audio uchun HTTP Range saqlandi: tinglash va oldinga-orqaga yurish ishlashi kerak.
- Server faqat 127.0.0.1 da tinglaydi. Bu internetga chiqarilgan sayt emas.

## Hisoblar va vakolatlar (v2)

Hisob ochish, server sessiyasi, SQLite o‘quv natijalari va student/owner rollari qo‘shildi. Owner statistikasi server tekshiruvi bilan cheklangan; brauzerdagi yaratuvchi yozuvi huquq bermaydi. Owner mahalliy CLI orqali oldindan ro‘yxatdan o‘tgan hisobga tayinlanadi. Standart admin yoki parol yo‘q.

Parollar scrypt xeshida, sessiya tokenlari bazada SHA-256 xeshida saqlanadi. Cookie HttpOnly va SameSite=Lax; HTTPS muhitida COOKIE_SECURE=true talab etiladi. Origin, CSRF, so‘rov hajmi, tezlik va holat versiyasi tekshiruvlari bor. Hisoblar ma’lumotlari alohida. Mehmon localStorage ma’lumotlari umumiy brauzer profilida ko‘rinishi mumkin. data/ va backend/ HTTP allowlistga kirmaydi.

Email tasdiqlash, parol tiklash, kontent boshqaruv CRUD va ommaviy joylashtirish hali bajarilmagan. Mashq natijalari mijoz hisoblagan o‘quv natijalari; rasmiy imtihon bahosi sifatida ishlatilmaydi. Mikrofon yozuvi serverga yuborilmaydi.

Tugmalarni yashirish mutlaq yuklash himoyasi emas. Audio/PDF hozir lokal saytning mehmon rejimida ham ko‘riladi; akkaunt qo‘shilishi mediani pullik yoki yopiq qilmaydi. Tijoriy chiqarish uchun litsenziya va media kirish siyosati alohida hal qilinadi.
