# Mehmet Medya — Site Tasarım Belgesi (Spec)

- Tarih: 2026-10-23
- Alan adı: mehmetmedya.com.tr
- Sahip: Mehmet Dayan (Mehmet Medya — Reklam & Prodüksiyon)
- Proje yürütücüsü: Enes
- Durum: Onay bekliyor

## 1. Amaç ve başarı ölçütü

Mehmet Medya'nın vitrini olacak, 3D ve hareketli, hikâyesi olan profesyonel bir ajans sitesi.
Site "AI ile yapılmış şablon" gibi görünmeyecek. Masaüstü ve mobil ayrı ayrı sıra dışı olacak.

Başarı ölçütleri:
1. Ziyaretçi ilk 10 saniyede logonun hikâyesini (iki M, tek kadraj) görür.
2. Gerçek işler (Mehmet'in videoları) sitenin ana vitrinidir.
3. Ziyaretçi en fazla 2 tıkla WhatsApp, telefon veya forma ulaşır.
4. Mehmet yeni işi kod bilmeden `/admin` üzerinden ekler.
5. Mobil 4G'de LCP ≤ 2.5 sn, CLS ≤ 0.1, INP ≤ 200 ms.
6. Kod GitHub'da açık durur. Repoda hiçbir şifre olmaz.

## 2. Marka varlıkları

Kaynak: `Mehmet Medya/unbackground` (13 şeffaf PNG) ve `Mehmet Medya/backgroundmehmet` (13 zeminli PNG). Hepsi 3000×3000 px. Vektör kaynak yok.

- Mavi: `#0B38A9` (sitede tema rengi olarak `#0A38A8` de görülüyor, kaynak olarak `#0B38A9` alınır)
- Krem: `#FCF9F2`
- Ana sembol: **4'lü MM**. Üstte iki M, altta iki ters M, iç içe. Ortada yatay kadraj çizgisi, iki kare boşluk ve dört köşeli yıldız formları. Kaynak dosya: `unbackground/Mehmet Medya/12.png` (konturlu), `11.png` (dolu).
- Diğerleri: tek sıra MM (`2.png`, `4.png`), "mehmet medya" yazısı (`9.png`, `10.png`), alt yazılı tam logo (`5.png`, `6.png`, `13.png`).

Üretilecek set:
- `logo-symbol.svg` — 4'lü MM, 4 ayrı parça olarak gruplanmış (üst-sol M, üst-sağ M, alt-sol ters M, alt-sağ ters M) + kadraj çizgisi.
- `logo-wordmark.svg` — "mehmet medya".
- `logo-full.svg` — sembol + yazı + "REKLAM & PRODÜKSİYON".
- Favicon ve paylaşım görseli (OG) bu SVG'lerden üretilir.

Kural: Logo yeniden çizilmez, AI ile değiştirilmez. SVG çıktısı orijinal PNG ile üst üste konup piksel farkı ölçülür. Kabul eşiği: IoU ≥ %99.

## 3. Deneyim akışı

### 3.1 Masaüstü

0. **Açılış:** Ekran siyah. Timecode `00:00:00:00` sayar, kırmızı REC noktası yanar. Sadece yükleme sürdüğü kadar kalır (≤ 1.5 sn).
1. **Fikir (hero):** 4'lü MM dağınık başlar. Üstteki iki M yukarıda süzülür, alttaki iki ters M aşağıda. Mouse ile 2–5° hafif eğim olur. Başlık: "Fikirden son kareye."
2. **Kadraj:** Scroll ile ortada mavi ışık hattı çizilir. Üst ve alt parçalar gelir, birbirine kilitlenir, logo tamamlanır.
3. **Vizörden geçiş:** Kamera logodaki bir kare boşluğa dalar. Boşluğun içinde showreel döngüsü oynar (WebGL video doku). İçeri girince HTML video tam ekran olur. "Sesli izle" butonu tam showreel oynatıcısını açar.
4. **Kurgu masası (Yaptığımız işler):** Ekran montaj programına döner. Üstte büyük önizleme monitörü, altta timeline: `V1 Reklam`, `V2 Drone`, `V3 Sosyal Medya`, `V4 Web`. Scroll ile oynatma kafası (playhead) sağa akar. Kafa hangi klipteyse monitörde o işin önizlemesi oynar, yanında müşteri, yıl, iş türü yazar. Klibe tıklayınca `/isler/[slug]` açılır. Filtre kurgu dilindedir: bir track'i "solo" yapınca sadece o kategori kalır.
5. **Hizmetler:** Üç kanal: **Video Prodüksiyon**, **Sosyal Medya & Meta**, **Web Sitesi**. Her biri kurgu programındaki "bin" klasörü gibi açılır, içinde alt hizmetler görünür.
   - Video Prodüksiyon: reklam filmi, kurumsal tanıtım, drone / FPV çekim, kurgu ve post prodüksiyon.
   - Sosyal Medya & Meta: içerik üretimi (Reels / kısa video), hesap yönetimi, Meta (Facebook / Instagram) reklam yönetimi.
   - Web Sitesi: tasarım ve geliştirme.
6. **Hikâye:** "İki M, tek kadraj." Aynı 3D sahne geri gelir, parçalar açılır: 01 Fikir (üst M), 02 Görüntü (ters M), 03 Kadraj (çizgi).
7. **Son kare (iletişim):** "Son kare sizin." Büyük çağrı butonu, WhatsApp, Instagram, telefon ve form. Kapanışta ekran kararır.

### 3.2 Mobil (küçültülmüş masaüstü değil)

- Hero aynı hikâyeyi dikey kadrajda (9:16, Reels formatı) anlatır. Dalış efekti mobilde de vardır.
- Kurgu masası dikeydir: timeline aşağı akar, playhead ekranın ortasında yatay çizgidir. Çizgideki klip sessiz oynar. Track filtreleri üstte çip olarak durur.
- Hover yoktur: ilk dokunuş önizleme, ikinci dokunuş iş sayfası.
- Altta sabit WhatsApp butonu durur.

### 3.3 Güvenlik ağı

- `prefers-reduced-motion`: 3D sabit durur, dalış yerine yumuşak kararma geçişi, parallax kapalı.
- WebGL yok veya başlatma hatası: SVG logo + HTML video. Sayfa yine tam çalışır.
- JavaScript yok: tüm metin, işler listesi ve iletişim bilgisi HTML olarak görünür.

## 4. Metinler

- v1 metinleri bu belgedeki metinlerdir ("Fikirden son kareye.", "İki M, tek kadraj.", "Son kare sizin." vb.).
- Metin iyileştirme ayrı bir iştir (Faz F7). Ajans tonuna uygun, logo hikâyesini taşıyan, sektör kelimeleri kullanan seçenekler hazırlanır. Enes ve Mehmet onaylar. Humanizer skill'i ile AI kalıpları temizlenir.
- İletişim bilgileri (mevcut siteden): telefon/WhatsApp +90 552 304 95 72, Instagram @mehmettmedya, X @Mehmettdayan. Adres yok, uydurulmaz.
- Sahte müşteri, sahte referans, sahte ödül, sahte rakam yok.

## 5. Görsel dil

- Tema: koyu "kurgu odası".
- Renk token'ları (kod içinde rastgele hex yok, sadece token):
  - `--surface-0` mavi-siyah zemin (≈ `#05070D`)
  - `--surface-1` panel zemini (≈ `#0B0F1A`)
  - `--brand-blue` `#0B38A9`
  - `--brand-cream` `#FCF9F2`
  - `--rec-red` sadece REC noktası için
  - `--line` ince ayırıcı çizgi (krem %12)
- Yazı: Türkçe karakterlerin tamamını destekleyen, siteye gömülü (self-hosted) değişken fontlar. Başlangıç adayı: Archivo (genişlik ekseni ile geniş başlık, normal gövde) + timecode için bir mono font. Son seçim F1'de görsel testle yapılır. Google Fonts CDN çalışma anında kullanılmaz.
- Doku: ince film greni, sinema bandı (letterbox) çizgileri, timecode etiketleri.
- Cam efekti sadece monitör çerçevesi, menü ve oynatıcı kontrollerinde.
- Yasak: neon, mor-cyan gradyan, her yerde parçacık, her kartta 3D, mouse takip eden balon.

## 6. Teknik mimari

### 6.1 Seçilen yol: Astro sunucu modu + MySQL, Hostinger Node.js

Reddedilen yollar: Astro statik + ayrı PHP admin (iki dil, işler sonradan yüklenir). Next.js (bu site için ağır).

- Hosting: Hostinger Business. Node.js web app (Business'ta 5 Node.js site hakkı, Node 18/20/22/24, GitHub'dan otomatik yayın, istek zaman aşımı 120 sn, gelen WebSocket yok, sürekli çalışan arka plan işi yok).
- Framework: Astro + TypeScript, `@astrojs/node` adaptörü. Statik olabilen sayfalar prerender edilir.
- 3D: saf Three.js (React yok), tek canvas. GSAP + ScrollTrigger ve Lenis.
- 3D varlık: logo SVG → `SVGLoader` → `ExtrudeGeometry` (bevel). Ön yüz krem, kenar mavi. GLB gerekmez. Sahne `client` tarafında, ilk boyamadan sonra yüklenir.
- Mobilde: düşük piksel oranı, gölge yok, post-processing yok. Görünmeyen canvas render etmez.
- Veritabanı: Hostinger MySQL, sorgular parametreli.

### 6.2 Sayfalar

- `/` ana sayfa (bölüm 3'teki akış)
- `/isler/[slug]` iş detayı (video, müşteri, yıl, kategori, ekip/rol, kısa açıklama)
- `/kvkk` aydınlatma metni
- `/admin` giriş, işler (ekle / düzenle / sil / sırala / yayınla), mesajlar
- `404`

### 6.3 Veri modeli

`works`
- `id`, `slug` (benzersiz), `title`, `client`, `category` (`reklam` | `drone` | `sosyal` | `web`), `year`
- `summary`, `credits`
- `poster_path`, `preview_path` (kısa klip), `video_url` (YouTube / Vimeo, opsiyonel)
- `duration_s` (timeline'da klip genişliği için)
- `sort_order`, `is_published`, `created_at`, `updated_at`

`messages`
- `id`, `name`, `email`, `phone`, `company`, `service`, `message`, `kvkk_consent`, `ip_hash`, `is_read`, `created_at`

`admins`
- `id`, `email`, `password_hash` (argon2id), `created_at`, `last_login_at`

`sessions`
- `id` (rastgele 32 bayt), `admin_id`, `expires_at`

`login_attempts`
- `ip_hash`, `attempted_at`

### 6.4 Video

- Kısa önizleme klipleri: ≤ 10 sn, 720p, H.264 MP4 (+ WebM), ≤ 10 MB. Hostinger'da durur, admin'den yüklenir.
- Hero vizör döngüsü: showreel'den kesilmiş ≤ 8 MB döngü. WebGL dokusu olur.
- Tam videolar (showreel, tam reklam filmleri): YouTube "liste dışı". Sitede kendi tasarımımız olan oynatıcı penceresinde, `youtube-nocookie` ile, tıklanınca yüklenir.
- Görünmeyen video yüklenmez (`preload="none"` + IntersectionObserver). Her videonun kapak görseli (poster) vardır.
- İleride: Bunny Stream'e geçiş (v1 kapsamı dışında).

### 6.5 Form ve e-posta

- Alanlar: ad, e-posta, telefon, firma, hizmet, mesaj, KVKK onayı.
- Kayıt DB'ye gider. Mehmet'e Hostinger SMTP ile bildirim e-postası gider (gerekli: domain'de bir bildirim posta kutusu).
- Spam önlemi: gizli tuzak alan, IP başına hız sınırı.

### 6.6 Hata yönetimi

- 3D başlatma hatası → SVG yedek, hata konsola yazılır.
- Video yükleme hatası → poster görseli kalır.
- DB erişim hatası → işler bölümü son yayınlanan `works.json` anlık kopyasından gösterilir. Admin her kayıtta bu kopyayı yeniler. Form hata mesajı + WhatsApp yönlendirmesi gösterir.

### 6.7 Güvenlik

- Şifre ve anahtarlar sadece Hostinger ortam değişkenlerinde (`.env`). `.env` git'e girmez, repoda `.env.example` durur.
- argon2id şifre hash, HttpOnly + Secure + SameSite=Strict oturum çerezi, admin formlarında CSRF token.
- Girişte deneme sınırı (`login_attempts`).
- Yükleme kontrolü: dosya türü içerikten doğrulanır, boyut sınırı, rastgele dosya adı.
- Güvenlik başlıkları: CSP, X-Content-Type-Options, Referrer-Policy.
- DB ve SSH şifreleri sohbete veya AI'a yazılmaz. Kullanıcı kendi girer.

### 6.8 Performans bütçesi

- LCP ≤ 2.5 sn (mobil 4G), CLS ≤ 0.1, INP ≤ 200 ms.
- İlk yüklemede JS ≤ 100 KB gzip (3D hariç). Three.js + sahne kodu ilk boyamadan sonra yüklenir, ≤ 200 KB gzip.
- LCP öğesi HTML başlık veya poster görseli olur, 3D canvas olmaz.
- Görseller AVIF/WebP, boyutlu `srcset`.

### 6.9 Test

- Sunucu mantığı (doğrulama, giriş, oturum, hız sınırı) için birim testleri (Vitest), test önce yazılır.
- Playwright: sayfalar açılıyor mu, konsol hatası var mı, form gönderiliyor mu, admin girişi ve iş ekleme çalışıyor mu.
- Ekran görüntüsü kontrolü: 1440, 1024, 390 px.
- Lighthouse: performans ≥ 85 (mobil), erişilebilirlik ≥ 95.
- Gerçek cihaz: en az bir orta seviye Android ve bir iPhone.

## 7. Repo ve AI hafızası

GitHub'da açık repo. Yerelde: `C:\Users\Enes\Desktop\Projects\Mehmet Medya\site`.

```
AGENTS.md                 tüm AI'ların kalıcı kuralları (kısa, ≤ 150 satır)
docs/PROJECT_STATE.md     şu anki durum, sıradaki 3 iş, engeller (kısa)
docs/DECISIONS.md         alınan kararlar ve nedenleri
docs/DESIGN_SYSTEM.md     token'lar, font, hareket süreleri
docs/ASSET_MANIFEST.md    hangi logo / video nerede
docs/superpowers/specs/   tasarım belgeleri
docs/superpowers/plans/   uygulama planları
src/                      kod
public/                   statik dosyalar
```

Penta arşivi repoya girmez. Gerekirse kısa bir `docs/references/penta.md` notu yazılır.

## 8. AI iş bölümü

### 8.1 Hesaplar

- Claude (bu oturum): mimar ve ana kodcu.
- ChatGPT Plus → Codex: GPT-6 Astra (5 saatte ≈ 5–45 mesaj), GPT-6.1 Sol (≈ 15–160), GPT-6 Luna (≈ 350–3000). Haftalık sınır da olabilir.
- Google AI Pro → Antigravity: Gemini 3.8 Flash, Claude Sonnet 5.5, Claude Opus 5.5. Gemini 4 Argon sadece Antigravity App/CLI'da (IDE'de yok), ayrı haftalık kota.
- Google AI Plus → Antigravity: sadece Gemini 3.8 Flash'a güvenilir. (Claude 4.6 ve GPT-OSS 2 Kasım 2026'da kalkıyor. AI Plus 13 Kasım 2026'da Gemini Pro modellerini kaybediyor.)
- Google AI Studio (iki hesap): Nano Banana (görsel), Veo 3.1 (4–8 sn video).
- PixVerse V6: 1–15 sn, 1080p, ilk kare / son kare geçişi. Döngü özelliği yok, elle kesilir.
- Figma: öğrenci hesabı. Zorunlu değil, Mehmet'e ekran göstermek için.

### 8.2 Fazlar

| Faz | İş | Sahip | Bitti tanımı |
|---|---|---|---|
| F0 | Repo, AGENTS.md, docs, logo SVG, Astro iskeleti, GitHub | Claude | Repo GitHub'da, `npm run build` geçer, SVG IoU ≥ %99 |
| F1 | Tasarım sistemi + statik ana sayfa (3D'siz) | Claude | Tüm bölümler 1440/1024/390'da düzgün, 3D olmadan da yayınlanabilir kalite |
| F2 | 3D vizör hero | Claude | Akış 3.1 madde 0–3 çalışır, mobil ve reduced-motion yedekleri çalışır, bütçe içinde |
| F3 | Kurgu masası (masaüstü + mobil) | Claude | Madde 4 çalışır, solo filtre, dokunma davranışı |
| F4 | DB, admin panel, form, e-posta | Codex GPT-6.1 Sol (prompt: Claude) | Testler geçer, Claude diff incelemesi onaylı |
| F5 | Video işleme: sıkıştırma, poster, döngü, en iyi anların seçimi | Claude + Gemini 4 Argon | Bütçe içinde dosyalar, ASSET_MANIFEST güncel |
| F6 | Grain / ışık sızıntısı döngüleri, OG görseli | AI Studio + PixVerse (prompt: Claude) | Dosyalar onaylı, logo değiştirilmemiş |
| F7 | QA: tarayıcı, mobil, erişilebilirlik, güvenlik, metin cilası | Antigravity Sonnet 5.5 + Codex Sol | Bölüm 6.9 eşikleri geçer |
| F8 | Hostinger'a yayın, domain bağlama | Antigravity Flash + Hostinger skill'leri | Site domain'de, SSL açık, form canlıda çalışır |

F4, F2/F3 ile paralel kendi branch'inde yürür.

### 8.3 Model kuralları

- Flash: ufak düzeltme, metin, içerik girişi. AI Plus hesabı sadece bu işler için.
- Sonnet 5.5: tarayıcıda görsel kontrol, mobil düzeltme.
- Opus 5.5: sadece Claude oturumu limitteyse ve zor 3D hatası varsa.
- Gemini 4 Argon: uzun video izleme ve en iyi anları seçme; büyük refactor için ikinci görüş.
- Codex Luna: tekrar eden ufak işler. Astra: çözülemeyen sorun.

### 8.4 Skill ve MCP eşleşmesi

- Tasarım: impeccable (ana), frontend-design; ui-ux-pro-max sadece araştırma.
- Hareket: motion skill (genel kurallar), GSAP için Context7.
- Test: web-design-guidelines, playwright-cli, chrome-devtools MCP (sadece performans / ağ).
- Metin: humanizer. Güvenlik: code-security. Ufak işler: ponytail.
- Yayın: Hostinger skill'leri (deploy-to-hosting, connect-domain, troubleshoot-website).
- Belgeler: Context7.

### 8.5 Devir kuralı

1. Her AI işe başlamadan `AGENTS.md` ve `docs/PROJECT_STATE.md` okur.
2. Bir oturum = bir iş. Her iş kendi branch'inde.
3. Küçük commit'ler. İş bitince `PROJECT_STATE.md` güncellenir.
4. Başka bir model diff'i inceler, sonra `main`'e birleştirilir.
5. Domain geçişi en sonda: önce geçici Hostinger adresinde test, sonra mehmetmedya.com.tr.

## 9. Kapsam dışı (v1)

- İngilizce sürüm
- Blog
- Bunny Stream / CDN video
- Instagram'dan otomatik iş çekme
- Çok kullanıcılı admin rolleri

## 10. Riskler

- Mehmet'in video dosyalarının boyutu ve formatı bilinmiyor → F5'te ölçülür.
- Hostinger Node.js'te domain için mevcut "yakında" sitesi kaldırılmalı → yayın gününe kadar geçici adres kullanılır.
- Bildirim e-postası için domain'de posta kutusu gerekir → F4 öncesi açılır.
- AI kota sınırları → fazlar küçük, durum her zaman repoda.
