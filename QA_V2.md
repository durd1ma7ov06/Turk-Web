# v2 tekshiruv — 2026-11-13

ECC frontend-design-direction, backend-patterns, security-review, browser-qa va agent-self-evaluation ishlatildi.

- npm run check: barcha JavaScript sintaksis tekshiruvlari o‘tdi.
- npm test: 11/11 backend testlari o‘tdi: auth, CSRF/Origin, bazaga yozish, revision, hisoblar izolatsiyasi, role, rate limit, logout, qayta ulanish.
- Alohida QA bazasi/5175: hisob ochildi, A2 tanlandi, saqlangani ko‘rildi, reload bilan serverdan tiklandi, logout mehmon rejimiga qaytdi.
- Responsive DOM: haqiqiy CSS viewport 375, 767, 1440 px; scrollWidth mos ravishda 356, 767, 1440. Gorizontal overflow topilmadi. 375 da mobil menyu va grammatika navigatsiyasi ishladi. 468 px mobil va odatiy desktop ko‘rinish vizual ko‘rildi.
- Mobil hisob tugmasining accessible nomi yo‘qligi tuzatildi, qayta DOM tekshiruvida Hisobga kirish nomi chiqdi.
- Browser console: tekshirilgan main tabda error yo‘q.
- HTTP: data/turkce.sqlite, backend/api.cjs, package.json, ZIP 404.
- Yakuniy screenshot eksporti brauzer vositasi tomonidan bajarilmadi; eski surat yangi dizayn dalili sifatida ishlatilmadi. To‘liq axe/WCAG yoki visual baseline audit bajarilmadi.

## O‘z-o‘zini baholash

| Mezon | Baho | Dalil va yaxshilash |
|---|---|---|
| Aniqlik | 4/5 | 11 test va UI oqimi ishladi; formal a11y/visual audit hali yo‘q. |
| To‘liqlik | 4/5 | Dizayn va haqiqiy backend qo‘shildi; email verification/reset va kontent CRUD alohida qolgan. |
| Tushunarlilik | 4/5 | Hisob saqlanish holati va mehmon rejimi ajratilgan; hujjatlardagi deploy qadamlari kengaytirilishi mumkin. |
| Ishlatish imkoniyati | 4/5 | localhost5174 tayyor, owner CLI bor; ommaviy HTTPS deploy qilinmagan. |
| Ixchamlik | 4/5 | Tashqi runtime dependency yo‘q; ayrim eski buildless kod zich yozilgan. |

O‘rtacha: 4.0/5. Keyingi ustuvorliklar: email verification/reset; litsenziya va HTTPS deploy; formal accessibility audit. Bu o‘z-o‘zini baholash, mustaqil sertifikat emas. Foydalanuvchi bahosi dizaynni ko‘rib tasdiqlagandan keyin ma’lum bo‘ladi.
