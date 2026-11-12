# Turix

Mocklife va IELTIX uslubidan ilhomlangan, o‘zbek tilida izohlanadigan A1–C1 turk tili ta’limi va Mock Arena platformasi.

## Ishga tushirish

Node.js 22.13 yoki yangiroq versiya bilan `npm start` yoki `start.bat` faylini oching.
Manzil: http://127.0.0.1:5174
Tashqi paket o‘rnatish talab etilmaydi. Internet bo‘lmasa tizim shriftlaridan foydalanadi.

## Ishlaydigan imkoniyatlar

- Dashboard, barcha sahifalar va A1–C1 daraja tanlash.
- 16 grammatika darsi, misollar va javobi izohlanadigan mashqlar.
- 22 lug‘at kartasi, tarjima, misol, talaffuz, yodlangan so‘zlar.
- Har bir darajaga 2 tadan o‘qish, tinglash, yozish va gapirish mashqi — jami 40 ta.
- Yozish topshiriqlari, qoralama, so‘z sanash va tuzilma bo‘yicha oddiy kuzatuv.
- Gapirish topshiriqlari, mahalliy mikrofon yozuvi, ichki tinglash.
- 10 savollik diagnostik test va yakuniy natija.
- localStorage orqali mashqlar, so‘zlar, qoralamalar va faoliyat tarixi.
- Mobil va desktop maketlari.

## Chegaralar

Bu to‘liq A1–C1 kurs emas, har bir darajaga namunaviy kontent berilgan MVP. Diagnostik test rasmiy CEFR darajasini aniqlamaydi. Yozish kuzatuvi grammatika yoki mazmunni AI orqali baholamaydi. Yedi İklim A1–C1 rasmiy kitob va MP3 audiolari `assets/yedi-iklim/` ichida lokal saqlanadi. Audio va kitoblar bo‘limida ichki pleer, qidiruv, daraja filtri, tezlik, takrorlash va ichki PDF ko‘rish bor. Manbalar, fayl hajmi va SHA-256 tekshiruv summalari `assets/yedi-iklim/manifest.json` ichida. Telegram fayllari tekshirilmagan va yuklanmagan. Jonli AI va to‘lovlar ulanmagan. Hisob ochish, kirish, SQLite bazasi va egasi uchun statistik kabinet ishlaydi. Asosiy Dinleme kutubxonasi haqiqiy lokal MP3 fayllardan foydalanadi va internet talab qilmaydi. Qo‘shimcha original mashqlar va lug‘at talaffuzi ham oldindan tr-TR-EmelNeural ovozida yaratilgan lokal MP3 fayllardan foydalanadi. Inglizcha yoki qurilmadagi standart ovozga o‘tish yo‘q. Mikrofon ruxsat talab qiladi. Ovoz serverga yuborilmaydi va sahifa yangilanganda yo‘qoladi. Mehmon natijalari shu brauzerda saqlanadi. Hisobga kirilganda natijalar serverdagi shaxsiy hisobga saqlanadi.

## Nashriyot materiallari

Muallif/nashriyot: Yunus Emre Enstitüsü. Ochiq rasmiy yuklash sahifalaridan shaxsiy mahalliy ta’lim nusxalari olindi. Ommaviy qayta tarqatish litsenziyasi tasdiqlanmagan. Ushbu materiallar uchun mualliflik da’vo qilinmaydi. Asl nashrlar va mualliflik belgilari o‘zgartirilmagan.

## Mock testlar

A1–C1 uchun darajasiga 2 tadan, jami 10 original o‘quv mock. Har birida 3 okuma, 3 dinleme, 4 grammatika savoli va bittadan yozma/og‘zaki topshiriq bor: jami 100 obyektiv savol va 20 produktiv topshiriq.

Variantlar alohida qoralama saqlaydi; sahifa yangilanganda Mock testlar bo‘limidan Davom ettirish orqali qaytiladi. O‘quv taymeri davom etadi, tugaganda avtomatik yuborish yo‘q. Natijalar savollar kesimida o‘zbekcha izohlar bilan saqlanadi. Yozma javob va gapirish rejasi saqlanadi; ovoz yozuvi sahifa ichida tinglanadi, doimiy saqlanmaydi.

Yangi mock listening matnlari original yozilgan va turkcha tr-TR-EmelNeural ovozida oldindan MP3 shaklida tayyorlangan. Ular Yedi İklim MP3 fayllariga javob kaliti sifatida biriktirilmagan. Yozish va gapirish avtomatik baholanmaydi. Mock foizi rasmiy CEFR darajasini tasdiqlamaydi.

## Turkcha talaffuz

84 ta original matn va so‘z uchun `assets/turkish-speech/` papkasida tr-TR Emel ovozli MP3 fayllar mavjud. `speech-data.js` matnni audio bilan bog‘laydi. `speech.js` yagona pleer, tezlik va to‘xtatish boshqaruvini beradi. Har qanday inglizcha avtomatik fallback olib tashlangan. Yangi matn audio manifestida bo‘lmasa, boshqa tilda o‘qish o‘rniga xabar ko‘rsatiladi. Bu sintetik turkcha ovoz, inson tomonidan yozilgan ovoz emas.

## Huquqlar va kirish

Platforma yaratuvchisi: Mansur. Batafsil tekshiruv `HUQUQLAR_VA_XAVFSIZLIK.md` faylida. Saytdagi MP3/PDF/ZIP va mikrofon yozuvini yuklash tugmalari olib tashlangan. Audio boshqaruvida nodownload qo‘yilgan; bu DRM emas. ZIP, JSON manifestlar va xizmat kodi HTTP orqali berilmaydi. Tashqi nashriyot va sintetik ovozning tijoriy tarqatish huquqlari hali tasdiqlanmagan. Student va owner rollari serverda tekshiriladi; egasi statistikani ko‘radi. Kontentni tahrirlash paneli hali yo‘q.


## Hisob va backend (v2)

`data/turkce.sqlite` avtomatik yaratiladi. Bu fayl, WAL/SHM fayllari va zaxiralar maxfiy: HTTP orqali berilmaydi, arxivga kirmaydi. Mehmon va har bir hisob alohida saqlanadi; mehmon natijalari yangi hisobga avtomatik ko‘chirilmaydi. Bir vaqtda ikki oynadan yozilganda eskirgan nusxa yangisini o‘chirmaydi: ilova qayta yuklash yoki qayta urinishni taklif qiladi.

Parollar scrypt bilan xeshlanadi. Sessiya HttpOnly/SameSite cookie orqali yuradi, o‘zgartirishlarda Origin va CSRF tekshiriladi. Login urinishlari cheklangan. Egasi bo‘lish uchun avval sayt ichida o‘z hisobingizni oching, keyin mahalliy terminalda:

```powershell
node backend/manage.cjs make-owner sizning-emailingiz@example.com
```

Standart admin paroli yo‘q. Email tasdiqlash va parol tiklash hali ulanmagan. Natijalar o‘quv mashqlari uchun; rasmiy imtihonning serverda tasdiqlangan bahosi emas. `npm run check` sintaksisni, `npm test` izolyatsiyalangan bazada 11 ta backend sinovini bajaradi. Internetga chiqarish alohida ish: HTTPS, COOKIE_SECURE=true, zaxiralash va kontent litsenziyalari hal qilinishi kerak. Hozir server localhost bilan cheklangan.
