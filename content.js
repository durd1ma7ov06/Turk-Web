const LEVELS=['A1','A2','B1','B2','C1'];

const COURSES={
A1:[
['Alifbo va unli uyg‘unligi','Türk alfabesi','Turk tilida 29 ta harf bor. Qalin unlilar: a, ı, o, u; ingichka unlilar: e, i, ö, ü. Ko‘plik qo‘shimchasi oxirgi unliga moslashadi: qalin unlidan keyin -lar, ingichka unlidan keyin -ler ishlatiladi.','kitap → kitaplar; ev → evler','Kitob → kitoblar; uy → uylar','“Göz” (ko‘z) so‘zining ko‘plik shaklini tanlang.',['gözlar','gözler','gözs'],'gözler','Ö ingichka unli bo‘lgani uchun -ler qo‘shiladi.'],
['Tanishuv va salomlashish','Tanışma ve Selamlaşma','Salomlashishda Merhaba (salom), Günaydın (xayrli tong), İyi akşamlar (xayrli kech) ishlatiladi. Hol-ahvol so‘rashda: Nasılsınız? (Qandaysiz?), İyiyim, teşekkür ederim (Yaxshiman, rahmat). Xayrlashuvda: Hoşça kalın (Xayr, qoling), Güle güle (Yaxshi boring).','Benim adım Kerem. Memnun oldum.','Mening ismim Kerem. Tanishganimdan xursandman.','“Xayrli tong” turk tilida qanday bo‘ladi?',['Günaydın','İyi akşamlar','İyi geceler'],'Günaydın','Tonggi salomlashuv uchun Günaydın ishlatiladi.'],
['Men talabaman','İsim cümleleri','Ot kesimli gaplarda fe’l bo‘lmaydi, shaxs qo‘shimchalari qo‘shiladi: ben öğrenciyim (men talabaman), sen öğrencisin (sen talabasan), o öğrenci (u talaba). Inkor shakli emas ma’nosidagi değil so‘zi orqali yasaladi: Ben doktor değilim.','Ben öğretmenim. Sen mimarsın.','Men o‘qituvchiman. Sen me’morsan.','“Men shifokor emasman” jumlasi qaysi?',['Ben doktor değilim.','Ben doktorum.','Sen doktor değilsin.'],'Ben doktor değilim.','Birinchi shaxs inkori uchun değilim ishlatiladi.'],
['Bu nima? Kim bu?','İşaret zamirleri','Yaqin narsalar uchun Bu (bu), biroz uzoqdagilar uchun Şu (shu), uzoqdagilar uchun O (u) ishlatiladi. Savol berishda: Bu ne? (Bu nima?), Bu kim? (Bu kim?). Ko‘plik shakllari: Bunlar, Şunlar, Onlar.','Bu bir masa. Şunlar kitap.','Bu stol. Shular kitob.','Yaqindagi narsa haqida “Bu nima?” deb qanday so‘raladi?',['Bu ne?','Bu kim?','O nerede?'],'Bu ne?','Narsalar uchun Bu ne? savoli beriladi.'],
['Hozir nima qilyapsiz?','Şimdiki zaman','Hozir davom etayotgan harakat -(ı/i/u/ü)yor bilan ifodalanadi. Unli bilan tugasa, unli tushib qolishi mumkin: oku-yor, yaz-ıyor. Shaxs qo‘shimchasi oxirida keladi: Geliyorum, Geliyorsun, Geliyor. So‘roq: Geliyor musun?','Şimdi Türkçe öğreniyorum.','Hozir turk tilini o‘rganyapman.','“Biz kelyapmiz” turkchada qanday?',['Geliyoruz','Geliyorsunuz','Geliyorlar'],'Geliyoruz','Biz uchun -uz shaxs qo‘shimchasi qo‘shiladi: geliyor-uz.'],
['Qayerda? (Joylashuv)','Bulunma hali (-da/-de)','Joylashuv o‘rni -da/-de (jarangsiz undoshlardan keyin -ta/-te) orqali ifodalanadi: evde (uyda), okulda (maktabda), sokakta (ko‘chada). Qayerda? savoli turkchada Nerede? deb so‘raladi.','Ali şu an kütüphanede.','Ali ayni damda kutubxonada.','“Kitob stolda” jumlasi qaysi?',['Kitap masada.','Kitap masaya.','Kitap masadan.'],'Kitap masada.','Joylashuv uchun -da qo‘shimchasi kerak: masada.'],
['Qayerga? (Yo‘nalish)','Yönelme hali (-a/-e)','Harakatning biror tarafga yo‘nalganini -a/-e qo‘shimchasi bildiradi. Unli bilan tugasa y oraliq undoshi kiradi: sinema-y-a, araba-y-a. Qayerga? savoli Nereye? bo‘ladi.','Yarın işe gidiyorum.','Ertaga ishga boryapman.','“Uyga ketyapman” qanday aytiladi?',['Eve gidiyorum.','Evde gidiyorum.','Evden gidiyorum.'],'Eve gidiyorum.','Ev so‘ziga ingichka unli -e yo‘nalish qo‘shimchasi qo‘shiladi: eve.'],
['Qayerdan? (Chiqish)','Ayrılma hali (-dan/-den)','Harakatning boshlanish nuqtasi yoki biror joydan chiqish -dan/-den (-tan/-ten) bilan yasaladi: okuldan (maktabdan), marketten (do‘kondan). Qayerdan? savoli Nereden? deb beriladi.','Tashkent’ten geliyorum.','Toshkentdan kelyapman.','“Ishdan chiqyapti” turkchada qanday?',['İşten çıkıyor.','İşte çıkıyor.','İşe çıkıyor.'],'İşten çıkıyor.','İş jarangsiz undosh bilan tugagani uchun -ten qo‘shiladi: işten.'],
['Buyruq va iltimos','Emir ve rica','Buyruq mayli fe’l o‘zagiga tayanadi: Gel! (Kel!), Git! (Ket!). Sen uchun qo‘shimcha yo‘q. Siz uchun: Gelin yoki Geliniz. Iltimos qilishda Lütfen so‘zi va so‘roq shakllari ishlatiladi.','Lütfen kapıyı kapatınız.','Iltimos, eshikni yopingiz.','Ko‘pchilikka qaratilgan “Kiringiz” buyrug‘i qaysi?',['Girin / Giriniz','Gir','Girme'],'Girin / Giriniz','Siz (ko‘plik/hurmat) uchun -(y)in qo‘shimchasi ishlatiladi.'],
['Soatlar va vaqt','Saatler ve zaman','Soat nechchi? — Saat kaç? Soat 3: Saat üç. Yarim — buçuk: Saat iki buçuk (2:30). O‘tgan vaqt: Saat üçü on geçiyor (3 dan 10 o‘tdi). Qolgan vaqt: Saate dörde yirmi var (4 ga 20 ta bor).','Film saat sekizde başlıyor.','Film soat sakkizda boshlanadi.','“Soat bir yarim (1:30)” qanday aytiladi?',['Saat bir buçuk.','Saat bir çeyrek.','Saat bir tamam.'],'Saat bir buçuk.','Yarim soat uchun buçuk ishlatiladi.']
],
A2:[
['Kecha nima bo‘ldi?','Belirli geçmiş zaman','O‘tgan, ko‘rilgan aniq harakat -dı/-di/-du/-dü (-tı/-ti) bilan yasaladi. Inkor: -ma/-me: gitmedim (ketmadim). Shaxs qo‘shimchalari: geldim, geldin, geldi, geldik, geldiniz, geldiler.','Dün çok güzel bir film izledim.','Kecha juda chiroyli film ko‘rdim.','“Biz kecha keldik” jumlasi qaysi?',['Dün geldik.','Dün geliyoruz.','Dün geleceğiz.'],'Dün geldik.','Biz uchun -k qo‘shimchasi: geldi-k.'],
['Rejalar va kelajak','Gelecek zaman','Kelajak harakati -acak/-ecek bilan ifodalanadi. Birinchi shaxsda k harfi ğ ga aylanadi: yap-acağ-ım → yapacağım. Inkor: yapmayacağım.','Gelecek ay tatile gideceğiz.','Kelasi oy ta’tilga boramiz.','“Men ertaga yozaman” qanday bo‘ladi?',['Yarın yazacağım.','Yarın yazdım.','Yarın yazıyorum.'],'Yarın yazacağım.','Yozmoq (yazmak) kelajak zamoni: yaz-acağ-ım.'],
['Narsalar kimniki?','İyelik ekleri','Egalik qo‘shimchalari: evim (uyim), evin (uying), evi (uyi), evimiz (uyimiz), eviniz (uyingiz), evleri (uylari). Unli bilan tugasa 3-shaxsda s kiradi: araba-s-ı.','Bu benim arabam, şu senin bisikletin.','Bu mening mashinam, anavi sening velosipeding.','“Bizning shahrimiz” qaysi variantda to‘g‘ri?',['Şehrimiz','Şehriniz','Şehirimiz'],'Şehrimiz','Şehir so‘zida unli tushishi yuz berib, -imiz qo‘shiladi: şehrimiz.'],
['Tushum kelishigi','Belirtme hali (-(y)ı/-(y)i)','Aniq vositasiz to‘ldiruvchi (Nimaniki? Kimni?) -(y)ı/-(y)i/-(y)u/-(y)ü bilan yasaladi: Kitabı okudum (Kitobni o‘qidim). Noma’lum bo‘lsa qo‘shimcha olinmaydi: Kitap okudum (Kitob o‘qidim).','Lütfen suyu bana uzatır mısın?','Iltimos, suvni menga uzatib yubora olasizmi?','“Eshikni ochdim” jumlasi qaysi?',['Kapıyı açtım.','Kapı açtım.','Kapıda açtım.'],'Kapıyı açtım.','Aniq eshik bo‘lgani uchun tushum qo‘shimchasi -(y)ı qo‘shiladi: kapı-y-ı.'],
['Qiyoslash va orttirma','Karşılaştırma (Daha / En)','Qiyoslashda sifatdan oldin daha (yana ham, -roq) yoki chiqish kelishigi -dan bilan: Ali Ahmet’ten daha uzun (Ali Ahmetdan uzunroq). Eng yuqori darajada esa sifat oldiga en (eng) qo‘yiladi: en güzel gün.','Türkiye Özbekistan’dan daha uzakta.','Turkiya O‘zbekistondan uzoqroqda.','“Eng yaxshi kitob” qanday ifodalanadi?',['En iyi kitap','Daha iyi kitap','Çok iyi kitap'],'En iyi kitap','Eng yuqori daraja uchun en ishlatiladi.'],
['Tavsif va yo‘qlik','-lı / -siz ekleri','-lı/-li mavjudlikni (bilan, -li): şekerli çay (shirin choy), sütlü kahve. -sız/-siz esa yo‘qlikni (-siz): şekersiz çay (shakarsiz choy), tuzsuz çorba (tuzsiz sho‘rva).','Ben şekersiz kahve tercih ederim.','Men shakarsiz qahvani afzal ko‘raman.','“Tuzli bodring” turkchada qanday?',['Tuzlu salatalık','Tuzsuz salatalık','Tuzda salatalık'],'Tuzlu salatalık','Mavjudlik uchun -lu qo‘shiladi: tuz-lu.'],
['Istak mayli','İstek kipi (-(y)ayım / -(y)alım)','Istak va taklifni bildiradi. Men uchun -(y)ayım: Bakayım (Qaray-chi), O‘rganay. Biz uchun -(y)alım: Gidelim (Yuring, boraylik), Başlayalım (Boshlaylik).','Hadi, derse başlayalım!','Qani, darsni boshlaylik!','“Keling, birga choy ichaylik” qaysi?',['Birlikte çay içelim.','Birlikte çay içtik.','Birlikte çay iç.'],'Birlikte çay içelim.','Biz uchun taklif qo‘shimchasi -elim: iç-elim.'],
['Birikmali otlar','İsim tamlamaları','Aniq birikmada ikkala so‘z ham qo‘shimcha oladi: kapının kolu (eshikning tutqichi). Noaniq birikmada faqat ikkinchi so‘z qo‘shimcha oladi: çay bardağı (choy stakani), Türkçe kitabı (turk tili kitobi).','İstanbul Boğazı harika bir manzara sunuyor.','Istanbul bo‘g‘ozi ajoyib manzara taqdim etadi.','“Turk tili darsi” qanday aytiladi?',['Türkçe dersi','Türkçenin dersi','Türkçe ders'],'Türkçe dersi','Noaniq ot birikmasida ikkinchi so‘zga -i/-si qo‘shiladi: ders-i.']
],
B1:[
['Qila olish va imkoniyat','Yeterlilik fiili (-(y)abil)','Qobiliyat va imkoniyat -(y)abil/-ebil orqali yasaladi: yüzebilirim (suza olaman). Qobiliyatsizlikda va imkonsizlikda esa -(y)ama/-eme: gelemem (kela olmayman). Ruxsat so‘rashda: Girebilir miyim? (Kirsam maylimi?).','Türkçe akıcı konuşabiliyorum.','Turkcha ravon gapira olaman.','“Men bu og‘ir yukni ko‘tara olmayman” qaysi?',['Bu yükü kaldıramam.','Bu yükü kaldırabilirim.','Bu yükü kaldırmam.'],'Bu yükü kaldıramam.','Imkonsizlik uchun -(y)ama ishlatiladi: kaldır-ama-m.'],
['Eshitilgan o‘tgan zamon','Öğrenilen geçmiş zaman (-mış)','Birovdan eshitilgan, keyin bilib olingan yoki kutilmaganda sodir bo‘lgan harakat -mış/-miş/-muş/-müş bilan yasaladi: Kar yağmış (Qor yoqqan ekan). Bevosita ko‘rmagan voqealar shunday bayon qilinadi.','Ali sınavı birincilikle kazanmış.','Ali imtihondan birinchi o‘rin bilan o‘tibdi.','“Dars bekor bo‘libdi (eshitdim)” qanday ifodalanadi?',['Ders iptal olmuş.','Ders iptal oldu.','Ders iptal olacak.'],'Ders iptal olmuş.','Keyin bilib olingan holat uchun -muş ishlatiladi.'],
['Shart va natija','Şart kipi (-sa/-se)','Shart ma’nosi -sa/-se qo‘shimchasi orqali beriladi: Yağmur yağarsa şemsiye alırım (Yomg‘ir yog‘sa, soyabon olaman). Real shart hozirgi/keng zamonga qo‘shiladi: Gelirse (Kelsa). Noreal shart: Param olsa (Pulim bo‘lganda edi).','Eğer vaktin varsa kahve içelim.','Agar vaqting bo‘lsa, qahva ichaylik.','“Ko‘p ishlasang, muvaffaqiyatga erishasan” qaysi?',['Çok çalışırsan başarılı olursun.','Çok çalıştın başarılı oldun.','Çok çalış başarılı ol.'],'Çok çalışırsan başarılı olursun.','Shart qo‘shimchasi -sa/-se: çalış-ır-sa-n.'],
['Keng zamon (Odat tusidagi harakat)','Geniş zaman (-r, -ar, -er)','Har kuni qilinadigan, umumiy haqiqat bo‘lgan harakatlar keng zamonda aytiladi: Her sabah erken kalkarım (Har tong erta turaman). Inkor shakli juda o‘ziga xos: gelmem, gelmezsin, gelmez. So‘roq: Çay içer misiniz?','Dünya güneşin etrafında döner.','Yer quyosh atrofida aylanadi.','“U har doim haqiqatni aytadi” jumlasi qaysi?',['O her zaman doğruyu söyler.','O her zaman doğruyu söyledi.','O her zaman doğruyu söylüyor.'],'O her zaman doğruyu söyler.','Doimiy odat va haqiqat keng zamonda beriladi: söyle-r.'],
['Majburiyat mayli','Gereklilik kipi (-malı/-meli)','Zarurat, mas’uliyat va qat’iy tavsiya -malı/-meli orqali ifodalanadi: Çok çalışmalısın (Ko‘p ishlashing kerak). Kuchsiz tavsiya yoki maslahat: Doktora gitmelisin. Taxmin ma’nosida ham keladi: Şimdi evde olmalı.','Sağlığımız için düzenli spor yapmalıyız.','Salomatligimiz uchun muntazam sport bilan shug‘ullanishimiz kerak.','“Vaqtni qadrlashingiz kerak” qanday aytiladi?',['Zamanın değerini bilmelisiniz.','Zamanın değerini biliyorsunuz.','Zamanın değerini bildiniz.'],'Zamanın değerini bilmelisiniz.','Majburiyat va tavsiya uchun -meli qo‘shiladi.'],
['Harakat nomi (Infinitiv)','İsim-fiiller (-mak, -ma, -ış)','Fe’ldan ot yasashda uch asosiy shakl bor: -mak (umumiy harakat: yüzmek), -ma (aniqroq jarayon: yüzme havuzu, öğrenme isteği), -ış (harakat uslubi: gülüş, bakış).','Yabancı dil öğrenmek sabır gerektirir.','Chet tilini o‘rganish sabr talab qiladi.','“Uning kulishi juda chiroyli” qaysi variantda to‘g‘ri?',['Onun gülüşü çok güzel.','Onun gülmek çok güzel.','Onun gülme çok güzel.'],'Onun gülüşü çok güzel.','Harakatning uslubi va xarakteri uchun -üş/-iş qo‘shiladi: gül-üş-ü.'],
['Sabab va maqsad bog‘lovchilari','Neden ve amaç bağlaçları','Sabab bildirish: çünkü (chunki), bu yüzden / bu nedenle (shu sababli), -dığı için (sababli: yorulduğum için). Maqsad bildirish: için (uchun: öğrenmek için), amacıyla / gayesiyle.','Geç kaldım çünkü trafik çok yoğundu.','Kech qoldim, chunki tirbandlik juda kuchli edi.','“O‘qish uchun Turkiyaga bordi” jumlasi qaysi?',['Okumak için Türkiye’ye gitti.','Okudu çünkü Türkiye’ye gitti.','Okuduğu için Türkiye’de.'],'Okumak için Türkiye’ye gitti.','Maqsad ma’nosi uchun -mak için tuzilmasi ishlatiladi.'],
['Vaqt bog‘lovchilari','Zaman zarf-fiilleri (-ken, -ınca)','-ken ayni bir harakat davom etayotgan paytni bildiradi: Ders çalışırken müzik dinlemem (Dars qilayotgan paytda musiqa eshitmayman). -ınca esa harakat sodir bo‘lishi bilanoq: Eve varınca beni ara (Uyga yetgach, menga qo‘ng‘iroq qil).','İstanbul’a gelince Boğaz turu yaptık.','Istanbulga kelgach bo‘g‘oz sayrini qildik.','“Qo‘ng‘iroq chalinganda dars tugadi” qanday bo‘ladi?',['Zil çalınca ders bitti.','Zil çalırken ders bitti.','Zil çaldı ders bitti.'],'Zil çalınca ders bitti.','Bir harakat tugashi bilan yuz bergani uchun -ınca ishlatiladi.']
],
B2:[
['Harakatni sifatlash','Sıfat-fiiller (-an, -dık, -acak)','-an/-en hozirgi/odatdagi harakat egasini sifatlaydi: koşan çocuk (yugurayotgan bola). -dık o‘tgan zamon nisbiy gapini yasaydi: tanıdığım insan (men tanigan inson). -acak kelasi sifatdosh: yapılacak işler.','Gelecekte yapılacak projeleri konuştuk.','Kelajakda qilinadigan loyihalar haqida gaplashdik.','“Kutubxonada ishlayotgan talaba” qaysi?',['Kütüphanede çalışan öğrenci','Kütüphanede çalıştı öğrenci','Kütüphanede çalışacak öğrenci'],'Kütüphanede çalışan öğrenci','Faol harakat qilayotgan shaxsni sifatlash uchun -an qo‘shiladi: çalış-an.'],
['Majhul nisbat','Edilgen çatı (-ıl, -ın)','Harakatning bajaruvchisi emas, balki obyektning o‘zi markazda bo‘lganda majhul nisbat qo‘llanadi: -(ı/i/u/ü)l, unli yoki l bilan tugasa -n: yazıldı (yozildi), temizlendi (tozalandi), yapıldı (qilindi).','Toplantı saat üçe ertelendi.','Yig‘ilish soat uchga qoldirildi.','“Hujjatlar imzolandi” jumlasi qaysi?',['Belgeler imzalandı.','Belgeler imzaladı.','Belgeleri imzaladı.'],'Belgeler imzalandı.','Majhul nisbat: imza-la-n-dı.'],
['Orttirma nisbat','Ettirgen çatı (-dır, -t, -ır)','Boshqa birovga bajartirish yoki sababchi bo‘lish ma’nosi: -dır/-dir, ko‘p bo‘g‘inli unlidan keyin -t: yaptırmak (qildirish), temizletmek (tozalattirish), okutmak (o‘qitish).','Arabayı dün tamir ettirdim.','Mashinani kecha tuzattirdim.','“Maktubni kotibga yozdirdi” qanday bo‘ladi?',['Mektubu sekretere yazdırdı.','Mektubu sekreter yazdı.','Mektup yazıldı.'],'Mektubu sekretere yazdırdı.','Boshqa shaxsga bajartirish uchun -dır orttirma qo‘shimchasi qo‘shiladi.'],
['Uzluksiz va holat ravishdoshlari','Zarf-fiiller (-erek, -dıkça)','-erek harakat qanday usulda bajarilganini ko‘rsatadi: gülerek anlattı (kulib aytdi). -dıkça harakat davomiyligi va mutanosiblikni bildiradi: yaşadıkça öğreniriz (yashaganimiz sari o‘rganamiz).','Haberleri dinleyerek işe gidiyordu.','Xabarlarni tinglagan holda ishga ketyapti edi.','“Yugurib keldi” qanday ifodalanadi?',['Koşarak geldi.','Koşup geldi.','Koşunca geldi.'],'Koşarak geldi.','Harakat holati va usuli uchun -(y)arak/-erek qo‘shiladi: koş-arak.'],
['Zidlik va yon berish','-dığı hâlde / -masına rağmen','Kutilgan natijaga zid ravishda yuz bergan holat: -masına rağmen (qaramasdan) yoki -dığı hâlde: Yağmur yağmasına rağmen maça gittik (Yomg‘ir yog‘ishiga qaramay o‘yinga bordik).','Hasta olduğu hâlde işe geldi.','Kasal bo‘lishiga qaramay ishga keldi.','“Barcha qiyinchiliklarga qaramay yutdik” qaysi?',['Tüm zorluklara rağmen kazandık.','Tüm zorluklar için kazandık.','Tüm zorluklarla kazandık.'],'Tüm zorluklara rağmen kazandık.','Zidlik va yon berish uchun rağmen/hâlde ishlatiladi.'],
['Birgalik va o‘zlik nisbati','İşteş ve dönüşlü çatı','Birgalik (-ış/-iş): birga yoki o‘zaro bajarish: selamlaşmak (salomlashmoq), yazışmak (yozishmoq). O‘zlik (-ın/-in): harakat o‘z ustida bajarilishi: giyinmek (kiyinmoq), yıkanmak (yuvinmoq).','Eski arkadaşlar sokakta karşılaştılar.','Eski do‘stlar ko‘chada ro‘baro‘ kelishdi (uchrashishdi).','“Ikki rahbar uchrashib qo‘l berib ko‘rishdi” qaysi fe’l bilan ifodalanadi?',['Tokalaştılar','Tokaladılar','Tokalandılar'],'Tokalaştılar','O‘zaro hamkorlik harakati uchun -laş/-ış birgalik nisbati ishlatiladi.'],
['Taqoslash va o‘xshatish','Gibi, kadar, sanki','Gibi (kabi, xuddi): Su gibi akıyor (Suv kabi oqyapti). Kadar (qadar, -dek darajada): Senin kadar çalışkan (Sendek tirishqoq). Sanki (go‘yo): Sanki her şeyi biliyor (Go‘yo hamma narsani biladigandek).','Bugün hava yaz gibi sıcaktı.','Bugun ob-havo yozdek issiq edi.','“Men ham sizdek hayajondaman” qanday aytiladi?',['Ben de sizin kadar heyecanlıyım.','Ben de size gibi heyecanlıyım.','Ben de sizin için heyecanlıyım.'],'Ben de sizin kadar heyecanlıyım.','Darajaviy o‘xshatish uchun kadar ishlatiladi.']
],
C1:[
['Akademik va rasmiy uslub','Akademik anlatım ve bağlaçlar','Ilmiy va rasmiy nutqda fikrlar aniq bog‘lovchilar bilan ulanadi: Dolayısıyla (shu munosabat bilan), Buna mukabil (bunga javoban), Nitekim (haqiqatan ham), Bunun yanı sıra (buning yonida, bundan tashqari). Matn hissiyotdan xoli bo‘ladi.','Araştırma sonuçları, nitekim bu teoriyi doğrulamaktadır.','Tadqiqot natijalari, darhaqiqat ushbu nazariyani tasdiqlamoqda.','Sabab-oqibat xulosasini ko‘rsatuvchi rasmiy bog‘lovchi qaysi?',['Dolayısıyla','Oysa','Mamafih'],'Dolayısıyla','Dolayısıyla — bir holatdan kelib chiqadigan mantiqiy oqibatni ifodalaydi.'],
['Nozik qarama-qarshilik va yon berish','Ödünleme yapıları','C1 darajasida qarama-qarshilik nozik vositalar bilan ifodalanadi: -sa dahi / -sa bile (bo‘lsa ham hatto), Her ne kadar ... ise de (garchi ... bo‘lsa ham). Masalan: Her ne kadar zor görünse de imkânsız değildir.','Tüm tedbirlere karşın beklenmedik sorunlar çıktı.','Barcha choralarga qaramay, kutilmagan muammolar yuzaga keldi.','“Garchi erta kelgan bo‘lsa ham, kira olmadi” qaysi?',['Her ne kadar erken geldiyse de içeri giremedi.','Erken geldiği için içeri girdi.','Erken gelince içeri girebildi.'],'Her ne kadar erken geldiyse de içeri giremedi.','Her ne kadar ... -se de klassik nozik yon berish uslubidir.'],
['Bilvosita nutq (Ko‘chirma gap)','Dolaylı anlatım','Birovning so‘zini uchinchi shaxsga yetkazish: -dığını / -acağını söylemek/belirtmek. Ali: “Yarın gelmeyeceğim” → Ali ertesi gün gelmeyeceğini belirtti. Shaxs va zamon mantiqan qayta quriladi.','Bakan, görüşmelerin olumlu geçtiğini ifade etti.','Vazir muzokaralar ijobiy o‘tganini ma’lum qildi.','“Hasan kelyapman dedi” bilvosita nutqda qanday bo‘ladi?',['Hasan geldiğini söyledi.','Hasan geliyorum dedi.','Hasan gelerek söyledi.'],'Hasan geldiğini söyledi.','Hozirgi/o‘tgan harakat bilvosita yetkazilganda -dığını shakli olinadi.'],
['Murakkab qo‘shma gaplar','Karmaşık cümle yapıları','Bir necha o‘rindi fe’llardan iborat sintaktik tuzilmalar: -dığı takdirde (agar shunday qilingan taqdirda), -meksizin (hech ikkilanmay / qilmasdan), -dığı sürece (modomiki davom etar ekan).','Kurallara uyulmadığı takdirde cezai işlem uygulanır.','Qoidalarga rioya etilmagan taqdirda jarima choralari qo‘llanadi.','“Tinchlik saqlanib turgan muddatda taraqqiyot bo‘ladi” qaysi?',['Barış korunduğu sürece kalkınma gerçekleşir.','Barış korundu bu yüzden kalkındık.','Barış korunarak kalkındık.'],'Barış korunduğu sürece kalkınma gerçekleşir.','Davomiylik sharti uchun -dığı sürece qo‘llanadi.'],
['Turg‘un iboralar va idiomatik boylik','Deyimler ve atasözleri','Turk tili majoz va idiomalarga nihoyatda boy. Masalan: Göze girmek (e’tibor qozonmoq), Kulak kabartmak (bildirmasdan quloq solmoq), İçi içine sığmamak (quvonchdan to‘lib-toshmoq), Taş üstünde taş bırakmamak.','Yeni projedeki başarısıyla müdürün gözüne girdi.','Yangi loyihadagi muvaffaqiyati bilan u rahbarning e’tiboriga tushdi (ishonchini qozondi).','“Kutilmagan xushxabardan haddan tashqari quvonmoq” qaysi idioma?',['İçi içine sığmamak','Gözden düşmek','Can kulağıyla dinlemek'],'İçi içine sığmamak','İçi içine sığmamak — quvonch va hayajonni ifodalovchi turg‘un iboradir.'],
['Retorik va publitsistik matn tahlili','Retorik ve üslup özellikleri','Publitsistik va tahliliy maqolalarda mantiqiy dalillash, ritorik savollar, inversiya (devrik cümle) va sinonimik boylik orqali ta’sirchanlik oshiriladi. Matnning sarlavhasi, kirish va xulosa uyg‘unligi tahlil qilinadi.','Gelişen teknoloji insanoğluna özgürlük mü sunuyor, yoksa onu bağımlı mı kılıyor?','Rivojlanayotgan texnologiya insoniyatga erkinlik taqdim etyaptimi yoki uni qaram qilib qo‘yyaptimi?','Ritorik uslubning asosiy maqsadi nima?',['O‘quvchini chuqur fikrlashga va xulosaga undash','Faqat grammatika qoidasini yodlatish','So‘zlarning lug‘aviy ma’nosini sanash'],'O‘quvchini chuqur fikrlashga va xulosaga undash','Ritorik uslubiy vositalar o‘quvchi ongini tahlil va mulohazaga chorlaydi.']
]};

const WORDS={
A1:[
['merhaba','salom','Merhaba, nasılsınız?'],
['arkadaş','do‘st','Benim arkadaşım Ankara’da yaşıyor.'],
['güzel','chiroyli; yaxshi','Bugün hava çok güzel.'],
['öğrenmek','o‘rganmoq','Türkçe öğrenmek istiyorum.'],
['teşekkürler','rahmat','Yardımınız için çok teşekkürler.'],
['kitap','kitob','Bu kitap bana çok faydalı oldu.'],
['günaydın','xayrli tong','Günaydın, hayırlı sabahlar!'],
['hoş geldiniz','xush kelibsiz','Evimize hoş geldiniz, buyrun.'],
['öğrenci','talaba; o‘quvchi','Kardeşim üniversitede öğrenci.'],
['öğretmen','o‘qituvchi','Türkçe öğretmenimiz çok nazik.'],
['aile','oila','Geniş ve samimi bir ailem var.'],
['yemek','ovqat; yemoq','Akşam birlikte yemek yiyelim.'],
['su','suv','Lütfen bir bardak soğuk su verir misiniz?'],
['ev','uy','Yeni evimiz metroya çok yakın.'],
['kapı','eshik','Lütfen çıkarken kapıyı kapatın.'],
['masa','stol','Kitaplar masanın üzerinde duruyor.'],
['araba','mashina','Babam yeni bir beyaz araba aldı.'],
['zaman','vaqt','Zaman su gibi akıp geçiyor.'],
['sabah','tong; ertalab','Her sabah düzenli yürüyüş yaparım.'],
['akşam','oqshom; kechqurun','Akşam saat sekizde buluşalım.']
],
A2:[
['yolculuk','sayohat; safar','İstanbul yolculuğu çok keyifliydi.'],
['ihtiyaç','ehtiyoj','Biraz dinlenmeye gerçekten ihtiyacım var.'],
['hatırlamak','eslamoq','Eski arkadaşımın adını hemen hatırladım.'],
['karar','qaror','Geleceğim hakkında önemli bir karar verdim.'],
['şehir','shahar','Bursa çok tarihî ve sakin bir şehir.'],
['sağlık','salomatlik','Hayatta en büyük zenginlik sağlıktır.'],
['tatil','ta’til; dam olish','Yaz tatilinde Antalya’ya gitmeyi planlıyoruz.'],
['alışveriş','bozorlik; xarid','Hafta sonu markete gidip alışveriş yaptık.'],
['tren','poyezd','Ankara hızlı treni tam vaktinde kalktı.'],
['doktor','shifokor','Doktor bana dinlenmemi tavsiye etti.'],
['pahalı','qimmat','Bu telefon diğer mağazada daha pahalıydı.'],
['ucuz','arzon','Semt pazarında meyveler oldukça ucuzdu.'],
['lezzetli','mazali','Annemin yaptığı yemekler çok lezzetlidir.'],
['temiz','toza; ozoda','Otel odası tertemiz ve konforluydu.'],
['soğuk','sovuq','Kış mevsiminde buralar oldukça soğuk olur.'],
['sıcak','issiq','Yazın sıcak havalarda bol su içmeliyiz.'],
['yardım','yordam','Zor anımda bana uzatılan yardımı unutmam.'],
['başlamak','boshlamoq','Pazartesi günü yeni işe başlıyorum.'],
['bitirmek','tugatmoq','Bugün verilen ödevi erkenden bitirdim.'],
['dinlemek','tinglamoq','Ders sırasında öğretmeni dikkatle dinlemeliyiz.']
],
B1:[
['deneyim','tajriba','Bu proje benim için unutulmaz bir deneyim oldu.'],
['başarmak','muvaffaq bo‘lmoq; uddalamoq','Çok çalışarak sınavı başarıyla tamamladı.'],
['fırsat','imkoniyat','Bu harika kariyer fırsatını kaçırmamalısın.'],
['gelişmek','rivojlanmoq; o‘smoq','Yabancı dil pratik yaptıkça hızla gelişir.'],
['özgürlük','erkinlik','Düşünce özgürlüğü toplumlar için değerlidir.'],
['alışkanlık','odat','Erken kalkmak insan sağlığı için iyi bir alışkanlıktır.'],
['iletişim','muloqot; aloqa','Sosyal medyada etkili iletişim kurmak önemlidir.'],
['etkilemek','ta’sir qilmoq','Okuduğum bu makale düşüncelerimi derinden etkiledi.'],
['güvenmek','ishonmoq','Dürüst insanlara her konuda güvenebilirsiniz.'],
['hedef','maqsad','Bu yılki en büyük hedefim C1 sertifikası almak.'],
['gelecek','kelajak','Gençlerimizin parlak bir geleceğe sahip olmasını diliyorum.'],
['kültür','madaniyat','Anadolu toprakları zengin bir kültüre sahiptir.'],
['araştırmak','tadqiq qilmoq; izlanmoq','Konuyu internetten detaylıca araştırdım.'],
['açıklamak','tushuntirmoq; bayon qilmoq','Öğretmen konuyu anlaşılır örneklerle açıkladı.'],
['katılmak','qatnashmoq; qo‘shilmoq','Yarınki uluslararası seminere ben de katılacağım.'],
['tercih etmek','afzal ko‘rmoq','Kalabalık şehirler yerine sakin kasabayı tercih ederim.'],
['fark etmek','sezmoq; payqamoq','Zamanın nasıl geçtiğini hiç fark etmemişim.'],
['zorluk','qiyinchilik','Her zorluğun ardından muhakkak bir kolaylık gelir.'],
['çözüm','yechim','Bu karmaşık probleme birlikte mantıklı bir çözüm bulduk.'],
['destek','qo‘llab-quvvatlash','Ailemin bana verdiği manevi destek paha biçilemez.']
],
B2:[
['sürdürülebilir','barqaror','Geleceğimiz için sürdürülebilir enerji kaynaklarına yönelmeliyiz.'],
['önyargı','oldindan noto‘g‘ri hukm chiqarish','Farklı kültürlere karşı önyargıları kırmak gerekir.'],
['katkı','hissa; ulush','Bilimsel araştırmalara sağladığı katkı takdire şayandır.'],
['yaklaşım','yondashuv','Bu eğitsel soruna yenilikçi bir yaklaşım geliştirdik.'],
['nitelik','sifat; fazilat','Eğitimde nicelikten ziyade nitelik ön planda tutulmalıdır.'],
['farkındalık','onglilik; voqiflik','Çevre kirliliği konusunda toplumsal farkındalık artmalı.'],
['girişimcilik','tadbirkorlik','Genç girişimcilik ekonomiyi canlandıran mühim unsurdur.'],
['rekabet','raqobat','Küresel pazarda başarılı olmak güçlü rekabet gücü gerektirir.'],
['temsil etmek','vakillik qilmoq','Yarışmada ülkemizi onurla temsil etti.'],
['uyarlamak','moslashtirmoq','Eski eseri modern tiyatro sahnesine başarıyla uyarladılar.'],
['çelişki','ziddiyat; qarama-qarshilik','Verilen ifadeler arasında bariz bir çelişki vardı.'],
['varsaymak','taxmin qilmoq; faraz etmoq','Her şeyin yolunda gittiğini varsayarak hareket ediyoruz.'],
['kapsam','qamrov','Araştırmanın kapsamı tüm bölgeyi içine alacak şekilde genişletildi.'],
['kaynak','manba','Bilimsel yazılarda güvenilir kaynaklara atıf yapılmalıdır.'],
['yansıtmak','aks ettirmoq','Yazar toplumun gerçeklerini eserine ustalıkla yansıtmış.'],
['müdahale','aralashuv','Hızlı müdahale sayesinde büyük bir tehlikenin önüne geçildi.'],
['sorumluluk','mas’uliyat','Gelecek nesillere temiz bir doğa bırakmak ortak sorumluluğumuzdur.'],
['öncelik','ustuvorlik','Şirketimiz müşteri memnuniyetini daima birinci öncelik sayar.'],
['dönüşüm','o‘zgarish; transformatsiya','Dijital dönüşüm iş yapış modellerini kökten değiştirdi.'],
['kavram','tushuncha','Felsefi kavramları günlük dille açıklamak ustalık ister.']
],
C1:[
['varsayım','faraz; gipoteza','Bilimsel varsayım henüz yeterli veriyle doğrulanmadı.'],
['tutarlılık','izchillik; mantiqiy uyg‘unlik','Akademik tezin bölümleri arasındaki tutarlılık esastır.'],
['kapsamlı','keng qamrovli','Sektör üzerine son derece kapsamlı ve derinlikli bir rapor hazırlandı.'],
['çıkarım','mantiqiy xulosa chiqarish','Elde edilen istatistiksel verilerden somut bir çıkarım yapabiliriz.'],
['özümsemek','o‘zlashtirmoq; singdirmoq','Yeni edinilen bilgiyi sadece ezberlemek değil, özümsemek şarttır.'],
['bağlam','kontekst','Sözcüklerin gerçek anlamı ancak metnin bağlamında anlaşılır.'],
['yadsımak','inkor etmoq; rad qilmoq','Teknolojinin hayatımıza getirdiği kolaylıkları yadsıyamayız.'],
['öngörü','oldindan ko‘ra bilish; bashorat','Stratejik öngörü kriz anlarında doğru karar vermeyi sağlar.'],
['etki alanı','ta’sir doirasi','Yazarın düşünce dünyasındaki etki alanı kıtaları aşmıştır.'],
['özgünlük','betakrorlik; o‘ziga xoslik','Sanat eserini kalıcı kılan yegâne vasıf onun özgünlüğüdür.'],
['sentez','sintez; birlashtirish','Doğu ve batı felsefesini mükemmel bir sentezle buluşturdu.'],
['meşruiyet','qonuniylik; legitimlik','Toplum nezdinde kabul görmeyen kararlar meşruiyetini yitirir.'],
['nüans','nozik farq; qirra','Çeviride iki dil arasındaki kültürel nüansları gözetmek zorunludur.'],
['irdelemek','sinchiklab o‘rganmoq','Sorunu tüm boyutlarıyla enine boyuna irdelemek gerekir.'],
['uzlaşı','murosaga kelish; konsensus','Uzun müzakerelerin ardından taraflar nihai bir uzlaşıya vardı.'],
['paradigma','qarashlar tizimi; paradigma','Bilimsel keşifler insanlığın evren algısında paradigma değişimine yol açtı.'],
['yetkinlik','kompetensiya; yetuklik','Alanında yüksek yetkinliğe sahip uzmanlarla çalışıyoruz.'],
['vurgulamak','alohida ta’kidlamoq','Konuşmacı eğitimin sürekliliği hususunu hassasiyette vurguladı.'],
['ihtiyatlı','ehtiyotkor; bosiq','Böylesine hassas piyasa şartlarında ihtiyatlı adım atmak elzemdir.'],
['özveri','fidoyilik; jonkuyarlik','Doktorlarımızın salgın dönemindeki özverisi her türlü övgünün üstündedir.']
]
};

const READINGS={
A1:['Benim günüm','Benim adım Elif. Ankara’da yaşıyorum. Her sabah saat yedide kalkıyorum. Kahvaltıda peynir, ekmek ve zeytin yiyorum. Saat sekizde okula gidiyorum. Akşamları Türkçe kitap okuyorum.','Elif hangi şehirde yaşıyor?',['İstanbul','Ankara','İzmir'],'Ankara'],
A2:['Hafta sonu gezisi','Geçen hafta sonu arkadaşlarımla Bursa’ya gittik. Sabah erken yola çıktık. Önce tarihî çarşıyı gezdik, sonra küçük bir lokantada yemek yedik. Hava yağmurlu olduğu için dağa çıkamadık. Akşam eve döndük.','Neden dağa çıkamadılar?',['Vakitleri yoktu.','Hava yağmurluydu.','Yol kapalıydı.'],'Hava yağmurluydu.'],
B1:['Yeni bir alışkanlık','Eskiden işe arabayla giderdim. Trafikte çok zaman kaybettiğimi fark edince bisiklet kullanmaya başladım. İlk günler yoruldum ama zamanla alıştım. Artık hem daha az para harcıyorum hem de kendimi daha enerjik hissediyorum. Yağmurlu günlerde ise otobüse biniyorum.','Yazar neden bisiklete binmeye başlamış?',['Trafikte zaman kaybettiği için.','Arabası bozulduğu için.','Otobüs olmadığı için.'],'Trafikte zaman kaybettiği için.'],
B2:['Dijital öğrenme','Dijital araçlar öğrenme kaynaklarına erişimi kolaylaştırmaktadır. Bununla birlikte, kaynakların çokluğu her zaman öğrenmenin niteliğini artırmaz. Öğrencilerin güvenilir bilgiyi seçebilmesi ve düzenli bir çalışma planı oluşturması gerekir. Teknoloji, bilinçli kullanıldığında öğretmenin yerini almaktan çok öğrenme sürecini destekler.','Metnin temel düşüncesi nedir?',['Teknoloji öğretmenleri gereksiz kılar.','Kaynak sayısı tek başına yeterlidir.','Bilinçli teknoloji kullanımı öğrenmeyi destekler.'],'Bilinçli teknoloji kullanımı öğrenmeyi destekler.'],
C1:['Kent ve ortak yaşam','Kentlerin yaşanabilirliği yalnızca altyapı yatırımlarıyla açıklanamaz. Kamusal alanların farklı toplumsal gruplara açık olması, aidiyet duygusunu güçlendirebilir. Bununla birlikte, bu alanların fiziksel olarak erişilebilir olması, herkesin karar süreçlerinde eşit biçimde temsil edildiği anlamına gelmez. Dolayısıyla kapsayıcı bir kent politikası, mekânsal düzenlemelerin yanı sıra katılım mekanizmalarını da gözetmelidir.','Yazar hangi ayrımı vurguluyor?',['Fiziksel erişim ile karar süreçlerine katılım arasındaki ayrımı.','Kırsal yaşam ile ulaşım arasındaki ayrımı.','Altyapının hiçbir önemi olmadığını.'],'Fiziksel erişim ile karar süreçlerine katılım arasındaki ayrımı.']
};

const LISTENINGS={
A1:['Kafede','Merhaba. Bir çay ve bir simit istiyorum. Çay şekerli olmasın lütfen. Teşekkür ederim.','Müşteri ne içmek istiyor?',['Kahve','Çay','Su'],'Çay'],
A2:['Tren duyurusu','Sayın yolcular, Ankara’ya gidecek trenimiz saat on dört otuzda üçüncü perondan hareket edecektir. Lütfen biletlerinizi hazır bulundurunuz.','Tren hangi perondan kalkacak?',['Birinci','İkinci','Üçüncü'],'Üçüncü'],
B1:['Telefon mesajı','Merhaba Deniz, toplantımız yarın saat onda başlayacaktı ama müdürümüzün programı değişti. Bu yüzden toplantıyı öğleden sonra saat ikiye aldık. Sunumunu yanında getirmeyi unutma.','Toplantının yeni saati kaç?',['10.00','14.00','16.00'],'14.00'],
B2:['Çalışma düzeni','Uzaktan çalışma, çalışanlara esneklik sağlarken iş ve özel yaşam arasındaki sınırları belirsizleştirebilir. Bu nedenle bazı şirketler, çalışanların haftanın belirli günlerinde ofise geldiği karma bir modeli tercih ediyor.','Şirketlerin tercih ettiği model hangisi?',['Yalnızca ofisten çalışma','Karma çalışma modeli','Çalışma saatlerini kaldırma'],'Karma çalışma modeli'],
C1:['Araştırma notu','Araştırmanın bulguları iki değişken arasında bir ilişki olduğunu gösterse de bu durum doğrudan nedensellik olarak yorumlanmamalıdır. Örneklemin sınırlılığı ve diğer olası etkenler göz önünde bulundurulduğunda, sonuçların farklı gruplarla yeniden sınanması gerekmektedir.','Konuşmacının temel uyarısı nedir?',['İlişkinin doğrudan nedensellik sayılmaması.','Araştırmanın kesin olarak yanlış olması.','Örneklem büyüklüğünün önemsizliği.'],'İlişkinin doğrudan nedensellik sayılmaması.']
};

const WRITING={
A1:['Kendini tanıt','O‘zingizni tanishtiring: ismingiz, yashash joyingiz, o‘qishingiz va sevimli mashg‘ulotingiz.',30,['Benim adım…','…yaşıyorum.','…seviyorum.']],
A2:['Bir arkadaşına e-posta yaz','Do‘stingizni dam olish kuniga taklif qiling. Qayerda, qachon va nima qilishingizni yozing.',60,['Merhaba…','Hafta sonu…','Görüşmek üzere!']],
B1:['Unutamadığın bir gün','Esingizda qolgan bir kunni tasvirlang. Voqealar ketma-ketligi va hislaringizni yozing.',100,['Önce…','Daha sonra…','Bu deneyim…']],
B2:['Uzaktan eğitim','Masofaviy ta’limning afzalliklari va qiyinchiliklarini muhokama qiling. Fikringizga misol keltiring.',150,['Bir yandan…','Bununla birlikte…','Sonuç olarak…']],
C1:['Kentlerde sürdürülebilir yaşam','Shaharlarda barqaror turmush uchun shaxs va davlat mas’uliyatini tahlil qiling. Qarshi fikrni ham ko‘rib chiqing.',200,['İleri sürülebilir ki…','Bu görüşe karşın…','Dolayısıyla…']]
};

const SPEAKING={
A1:['Kendini tanıt. Nerede yaşıyorsun? Neler yapmayı seviyorsun?','O‘zingiz, oilangiz va qiziqishlaringiz haqida 30–60 soniya gapiring.'],
A2:['Geçen hafta sonu ne yaptın?','O‘tgan dam olish kuningiz haqida gapiring. O‘tgan zamon shakllarini ishlating.'],
B1:['Yeni bir dil öğrenirken hangi yöntemleri kullanıyorsun?','Usullarni tushuntiring va o‘z tajribangizdan misol keltiring.'],
B2:['Sence sosyal medya insan ilişkilerini nasıl etkiliyor?','Ijobiy va salbiy tomonlarni solishtiring. Fikringizni asoslang.'],
C1:['Teknolojik gelişmeler toplumsal eşitsizliği azaltır mı, artırır mı?','Kamida ikki nuqtayi nazarni ko‘rib chiqing va asoslangan xulosa bering.']
};
