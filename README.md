# Madam Saye — ilk Android prototipi

Madam Saye, kahve falı, tarot ve günlük sembolik yorum sunan kurgusal yapay zekâ karakteridir.

## Görsel yön
İnsan yüzü, göz, el veya insan silüeti kullanılmaz. Koyu mürdüm, şampanya altını ve fildişi; fincan, geometrik tarot kartları, hilal ve ince duman. Başlık: “Niyetini tut. Saye anlatsın.” Eylem: “Falımı aç”. Kimlikte gizem, arayüzde okunaklılık.

## Bu sürüm
- Android için Flutter uygulaması ve fotoğraf seçimi.
- Kahve, üç kart seçimi ve günlük yorum ekranları.
- Konu ve isteğe bağlı soru seçimi.
- Sunucu adresi verilmezse açıkça etiketlenmiş yerel demo. Demo fotoğrafı analiz etmez, fotoğrafı veya soruyu dışarı göndermez.
- HTTPS sunucu yapılandırılırsa Gemini görüntü/metin yorumuna bağlanır.
- GDELT üzerinden son 24 saat için Türkçe kültür/sanat/astronomi haber başlıkları aranır. Makalelerin tamamı okunmaz. Başlıklar 30 dakika önbelleğe alınır; haber alınamazsa güncel veri varmış gibi davranılmaz. Kaynak zamanı GDELT indekslenme zamanıdır.
- Sunucu fotoğraf ve soruları diske yazmaz. Gemini sağlayıcısının kendi veri politikaları ayrıca geçerlidir.
- Satın alma, reklam, hesap, kalıcı geçmiş, kullanıcı doğrulaması ve mağaza yayını bu prototipte yoktur. Tarot başlangıç destesi 10 karttır; tam 78 kartlık deste değildir.

## Çalıştırma
Flutter projesi bu klasördedir. `flutter pub get`, `flutter test`, `flutter analyze` ve `flutter build apk --debug` komutları kullanılır.

Bu Windows ortamında Java yerel soket hatası için yalnızca derleme oturumunda şu ortam değişkeni kullanıldı:
`JAVA_TOOL_OPTIONS=-Djdk.net.unixdomain.tmpdir=C:/Users/evren.gurkan/Documents/Codex/2026-09-07/ye/work`
Başka bilgisayarda kendi mevcut, kısa geçici klasörünüzü seçin veya gerekmiyorsa bu değişkeni kullanmayın.

## Canlı API kurulumu
Node.js 22 veya üzeri gerekir; ek npm bağımlılığı yoktur.
1. Google AI Studio hesabında ücretsiz katmana uygun, görüntü girişi kabul eden güncel model seçin. Model ve ülke bazında kotaları kontrol edin.
2. `GEMINI_API_KEY` ve `GEMINI_MODEL` değerlerini yalnızca sunucu ortamına kaydedin. Anahtarı sohbete, Git'e veya APK içine yazmayın.
3. `node server/server.mjs` ile yerel sunucuyu başlatın. Sunucu varsayılan olarak sadece 127.0.0.1:8787 üzerinde dinler. `node --test server/server.test.mjs` doğrulama testlerini çalıştırır.
4. Canlı dağıtım için HTTPS, kimlik doğrulama, kalıcı kullanıcı kotası ve kötüye kullanım koruması ekleyin. Bu geliştirme sunucusunu doğrudan internete açmayın. Mevcut günlük toplam 100 istek limiti bellektedir ve yeniden başlatmada sıfırlanır; ticari kota sistemi değildir.
5. Uygulamayı `flutter build apk --debug --dart-define=READING_API_URL=https://SUNUCUNUZ/reading` ile derleyin. API anahtarı derleme parametresi değildir.
6. Fotoğraf, soru ve kaynaklı yorum akışını gerçek cihazda doğrulayın. Şu ana kadar canlı Gemini çağrısı API anahtarı olmadığı için test edilmedi.

## Gelir modeli taslağı
İlk deneme için sınırlı ücretsiz kısa yorum; ücretli detaylı kahve/tarot yorumu. Kullanıcı satın almadan önce içerik kapsamını görmeli. Fiyat henüz belirlenmedi; önce gerçek yorum maliyeti, ödeme dönüşümü ve tekrar kullanım ölçülmeli. Abonelik ancak tekrar kullanım kanıtlanınca değerlendirilmeli. Korku yaratan mesajlar, uydurma kullanıcı yorumları ve sahte geri sayımlar kullanılmaz.

Ücretsiz API, sınırsız ve kalıcı ücretsiz işletme maliyeti anlamına gelmez. Gemini ücretsiz katmanında içeriklerin ürün geliştirmede kullanımı söz konusu olabilir. Ticari yayından önce seçilen sağlayıcı/modelin güncel veri koşullarına göre gizlilik metni tamamlanmalıdır.

## Araştırma kaynakları
- Gemini fiyatlandırma ve ücretsiz katman: https://ai.google.dev/gemini-api/docs/pricing
- Gemini görüntü anlama: https://ai.google.dev/gemini-api/docs/generate-content/image-understanding
- GDELT açık veri: https://gdeltproject.org/data.html
- GDELT DOC API: https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/
- Alternatif metin sağlayıcısı Groq ücretsiz katman: https://community.groq.com/t/is-there-a-free-tier-and-what-are-its-limits/790

7 Eylül 2026 tarihli ilk web taramasında Madam Saye için doğrudan aynı adlı fal uygulaması bulunmadı. Bu, marka tescili veya mağaza adı uygunluğu onayı değildir.

## Yayın durumu
Bu bir geliştirme prototipidir. Yayın imzası, Play Console ürünleri, gerçek ödeme sistemi, barındırma ve canlı API hesabı kurulmamıştır. Genel yayın yapılmamıştır. APK derlemesi ve test sonuçları teslim mesajında ayrıca belirtilir.

## Sesli ve abonelikli akış

Bu sürümde uygulama açılınca Madam Saye Türkçe sesli karşılama yapar. Kullanıcı e-posta ile abonelik/giriş ekranından geçer; ilk prototipte bu kayıt cihazda `shared_preferences` ile tutulur. Yayın sürümünde aynı ekran Firebase Authentication ile gerçek hesaba bağlanmalıdır.

Abone kullanıcı Kahve falı, Tarot ve Burç yorumu seçeneklerine geçebilir. Kahve falında fincan fotoğrafı istenir; demo modunda canlı API bağlı değilse örnek yorum üretilir ve Madam Saye bunu sesli okur. API endpoint verildiğinde mevcut backend akışı fincan görselini analiz edip sonucu döndürür; sonuç ayrıca geçmişe kaydedilir.

Gerçek zamanlı canlı konuşma modu için önerilen ticari yapı: ücretsiz kullanıcıya kısa karşılama ve yazılı/sesli okunan yorum, abonelere OpenAI Realtime tabanlı canlı Madam Saye sohbeti. Bu mod ücretli API hesabı gerektirir ve sınırsız ücretsiz çalıştırılmamalıdır.

## Supabase SQL/Auth bağlantısı

Bu sürüm Supabase hazır destekle derlenir. `SUPABASE_URL` ve `SUPABASE_PUBLISHABLE_KEY` verilirse e-posta/şifre hesabı Supabase Auth ile açılır, fal geçmişi PostgreSQL `public.readings` tablosunda saklanır. Anahtar verilmezse demo APK cihaz içi kayıtla çalışmaya devam eder.

Supabase kurulumu:

1. https://supabase.com üzerinde ücretsiz proje oluştur.
2. Proje Dashboard > SQL Editor içinde `supabase_schema.sql` dosyasındaki SQL'i çalıştır.
3. Dashboard > Project Settings > API ekranından Project URL ve publishable key değerlerini al.
4. APK'yı bu değerlerle derle:

```powershell
flutter build apk --debug --dart-define=SUPABASE_URL=https://YOUR_PROJECT.supabase.co --dart-define=SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Canlı yapay zeka yorumu için ayrıca backend adresi verilir:

```powershell
flutter build apk --debug --dart-define=SUPABASE_URL=https://YOUR_PROJECT.supabase.co --dart-define=SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY --dart-define=READING_API_URL=https://YOUR_BACKEND_DOMAIN/reading
```

Supabase free plan bu prototip için uygundur; 500 MB Postgres, 50.000 aylık aktif kullanıcı, 1 GB dosya depolama ve 5 GB egress içerir. Yayın aşamasında RLS politikaları, veri saklama metni ve KVKK/aydınlatma metni eklenmelidir.
