# Mocklife asosida turk tili platformasi

Manba: `C:\Users\Mansur\Desktop\Mocklife\IELTIX_platform`.
Tahlil sanasi: 2026-11-12. Kod va loyiha hujjatlari ko‘rib chiqildi; ishlayotgan servislar va to‘lovlar sinovdan o‘tkazilmadi.

## Mavjud tuzilma

- Frontend: React 18, TypeScript, Vite, Tailwind, Lucide va Three.js.
- Backend: Express, TypeScript, PostgreSQL; Supabase integratsiyasi ham mavjud.
- App.tsx sahifalarni holat orqali almashtiradi va asosiy sahifalarni lazy-load qiladi.
- Sahifalar: bosh sahifa, o‘quv rejasi, mashqlar, grammatika, reading, listening, writing, speaking, AI suhbat, mock arena, natijalar, tariflar va admin.
- Auth, foydalanuvchi, mavzu va imtihon holati alohida React contextlarda.
- Backendda autentifikatsiya, testlar, obunalar, ovoz va mijozlarni qo‘llab-quvvatlash xizmatlari bor. Ularning mavjudligi ishlash kafolati sifatida tekshirilmagan.

## Qayta foydalaniladigan qismlar

Mocklife ko‘rinishining asosi — krem fon, qizil aksent, to‘q matn, yumaloq kartalar, sidebar va yuqori panel. Shu dizaynni saqlab, yangi loyiha sifatida ajratish mumkin.

Navigatsiya, taymer, test konstruktori, savol komponentlari, audio pleer, matn muharriri, progress ko‘rinishi va admin tuzilmasi qayta foydalanish uchun asos bo‘ladi. Har birining ichidagi IELTSga bog‘langan shartlar alohida tekshiriladi.

## Qayta ishlanadigan qismlar

| Mocklife | Turk tili varianti |
| --- | --- |
| Reading | Okuma — turkcha matnlar va savollar |
| Listening | Dinleme — turkcha audio va savollar |
| Writing | Yazma — tanlangan yo‘nalishga mos yozma topshiriqlar |
| Speaking / AI chat | Konuşma — turkcha suhbat va ovoz |
| Grammar Lab | Dil bilgisi — o‘zbekcha tushuntirish, turkcha misollar |
| IELTS band 0–9 | Tanlangan imtihon yoki o‘quv rejimining baholashi |
| IELTS mock testlar | Turk tili uchun yangi test banki |

`frontend/src/utils/ieltsScoring.ts` IELTS xom ballini bandga aylantiradi. Uni oddiy nom almashtirish bilan turk tili mezoni sifatida ishlatib bo‘lmaydi. A1–C1 chegaralari ham o‘zboshimchalik bilan belgilanmaydi.

`frontend/src/data/grammar.ts` ingliz grammatikasi, inglizcha misollar va British Council manbalariga bog‘langan. Turkcha alifbo, unli uyg‘unligi, kelishiklar, egalik, zamonlar va qo‘shimchalar uchun yangi kontent zarur.

`backend/src/services/writingEvaluatorService.ts` ko‘rilgan holatida so‘z soni va inglizcha iboralarni qidiradigan evristik baholovchi. Unda oldindan yozilgan fikrlar ham bor. Buni turkcha haqiqiy AI baholash deb ko‘rsatish mumkin emas.

`backend/src/services/aiExaminerService.ts` ko‘rilgan qismida inglizcha belgilar va IELTS mezonlariga asoslangan ball hisoblash bor. Turkcha suhbat, talaffuz va yozma baholash uchun yangi mezonlar kerak; matndan audio talaffuzini ishonchli baholab bo‘lmaydi.

## Amalga oshirish tartibi

1. Maqsadni aniqlash: umumiy A1–C1, milliy sertifikat yoki TYS.
2. Mocklife interfeysini ushbu papkada alohida loyiha sifatida moslashtirish.
3. Brend, o‘zbekcha navigatsiya va turkcha modul nomlarini kiritish.
4. Ishlaydigan namunaviy Okuma, Dinleme, Yazma, Konuşma va Dil bilgisi mashqlarini tayyorlash.
5. Test holati, natijalar va progressni yangi ma’lumot modeliga ulash.
6. Admin konstruktori, autentifikatsiya va backendni yangi loyiha sozlamalari bilan ulash.
7. AI va obunalarni haqiqiy integratsiya holatiga qarab ishga tushirish.
8. Build, asosiy foydalanuvchi oqimlari va mobil ko‘rinishni tekshirish.

## Ajratish shartlari

Manba loyihadagi `.env`, SSH kalitlari, foydalanuvchi ma’lumotlari, haqiqiy obuna yozuvlari va deployment sozlamalari yangi loyiha uchun ko‘chirilmaydi. Yangi loyiha o‘z konfiguratsiyasi va bo‘sh ma’lumotlar bazasi bilan ishlaydi.

Maqsad imtihoni tanlangach, uning amaldagi formati va rasmiy baholash talablari birlamchi manbalardan tekshiriladi. Hozircha TYS yoki milliy sertifikat savol sonlari, vaqt chegaralari va o‘tish ballari belgilanmagan.
