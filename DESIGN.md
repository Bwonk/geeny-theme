# DESIGN.md — Infinity Pillow Tema Tasarım Dokümanı

> **Not:** Bu doküman `https://infinitypillow.co/` referans sitesinin Playwright ile 375px (Mobil), 768px (Tablet) ve 1440px (Masaüstü) breakpoint'lerinde DOM computed style, layout ve etkileşim analizlerinden elde edilen **tek tasarım kaynağıdır (Single Source of Truth)**. ikas Theme Store geliştirmelerinde tüm bileşenler, stiller ve animasyonlar bu kılavuza ve [IKAS.md](file:///root/geeny/IKAS.md) altyapı yeteneklerine göre inşa edilecektir. Merchant içerikleri (metinler, görseller, ürün fiyatları) dinamik/editable prop olarak kurgulanacaktır.

---

## 1. Genel Tasarım Dili

### Karakter ve Estetik Yaklaşım
Infinity Pillow tasarımı; modern, ferah, seyahat ve konfor odaklı, premium bir e-ticaret estetiğine sahiptir. Tasarım dili yumuşatılmış köşeler (2rem/32px radius kartlar ve medya blokları), yüksek kontrastlı tipografi (`Jost` font ailesi), derin lacivert ve canlı limon sarısı accent renk ikilisi ile dinamik mikro-etkileşimler üzerine kuruludur.

### Renk Paleti (Exact Hex Listesi)
Tüm renkler DOM computed style okumalarından elde edilmiştir:

| Renk Tanımı | RGB Değeri | Hex Kodu | ikas Bağlama Karşılığı ([IKAS.md](file:///root/geeny/IKAS.md)) | Kullanım Alanı |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Navy (Derin Lacivert)** | `rgb(55, 67, 91)` | `#37435B` | `kind: color` (`var(--color_37435b)`) | Ana metinler, birincil butonlar, koyu arka plan bölümleri (Scheme 3/4), başlıklar |
| **Accent Yellow (Limon Sarısı)** | `rgb(227, 224, 69)` | `#E3E045` | `kind: color` (`var(--color_e3e045)`) | Öne çıkan butonlar, indirim/promosyon rozetleri, vurgu alanları (Scheme 4) |
| **Light Slate Gray (Açık Gri/Mavi)**| `rgb(200, 207, 208)`| `#C8CFD0` | `kind: color` (`var(--color_c8cfd0)`) | İkincil arka planlar (Scheme 2), kart zeminleri, böleçler |
| **Review Star Yellow (Yıldız Sarısı)**| `rgb(227, 224, 98)`| `#E3E062` | `kind: color` (`--jdgm-star-color`) | Ürün kartları ve değerlendirme yıldızları (`--jdgm-star-color`) |
| **Pure White (Saf Beyaz)** | `rgb(255, 255, 255)` | `#FFFFFF` | `kind: color` | Ana sayfa arka planı (Scheme 1), kart içerikleri, buton yazı renkleri |
| **Pure Black (Siyah)** | `rgb(0, 0, 0)` | `#000000` | `kind: color` | Yüksek kontrastlı metinler, alt çizgi vurguları, ikincil durumlar |
| **Overlay Black (%75)** | `rgba(55, 67, 91, 0.75)` | `#37435BBF` | `kind: color` | Drawer ve modal arkasındaki karartma katmanı (backdrop overlay) |

#### Color Scheme Yapısı
Site 6 farklı tema şeması (`colorScheme`) kullanmaktadır:
- **Scheme 1 (Light Default):** Arka plan `#FFFFFF`, Metin `#37435B`, Accent 1 `#37435B`, Accent 2 `#E3E045`
- **Scheme 2 (Light Slate):** Arka plan `#C8CFD0`, Metin `#37435B`, Accent 1 `#37435B`
- **Scheme 3 (Dark Navy):** Arka plan `#37435B`, Metin `#C8CFD0`, Accent 1 `#E3E045`
- **Scheme 4 (Accent Yellow Block):** Arka plan `#37435B`, Metin `#E3E045`, Accent 1 `#E3E045`
- **Scheme 5 (Dark Black):** Arka plan `#000000`, Metin `#FFFFFF`
- **Scheme 6 (Clean White):** Arka plan `#FFFFFF`, Metin `#000000`

---

### Tipografi Sistemi (`Jost, sans-serif`)
Tipografi temel font ailesi `Jost, sans-serif` üzerinedir. Taban font boyutu varsayılan `18px` (`112.5%`) ve line-height `1.4` (`25.2px`) değerindedir.

#### Type Scale (Tipografi Ölçeği)
- **`xs` (13.5px / `0.749rem`):** Alt etiketler, küçük rozetler, kargo bildirimleri
- **`sm` (16px / `0.891rem`):** İkincil açıklamalar, input metinleri, footer alt bağlantıları
- **`base` (18px / `1rem`):** Paragraf ve gövde metinleri (`line-height: 25.2px`)
- **`lg` (24px / `1.335rem`):** Alt başlıklar, kart başlıkları, fiyat etiketi
- **`xl` (27px / `1.498rem`):** Öne çıkan bölüm alt başlıkları
- **`2xl` (30.2px / `1.682rem`):** Akordiyon başlıkları, mobil modal başlıkları
- **`3xl` (36px / `2rem`):** Standard H1 başlıkları (`line-height: 46.8px`, `font-weight: 500`)
- **`4xl` (48px / `2.67rem`):** H2 ve Hero ana başlıkları (`line-height: 62.5px`, `font-weight: 500`)
- **`5xl` (54px / `3rem`):** Masaüstü büyük sloganlar

---

### Spacing (Boşluk) Ritmi
- **Site Container Maksimum Genişliği (`--max-site-width`):** `1820px`
- **Yatay Bölüm Padding (`--section-x-padding`):** `1.25rem` (`20px`) [Mobil: `16px`]
- **Dikey Bölüm Aralığı (`--section-vertical-spacing`):** `2rem` (`32px`) [Masaüstü: `48px` - `64px`]
- **Grid Gap (`--grid-gap`):** `1.25rem` (`20px`)

---

### Radius (Köşe Yuvarlama) ve Gölge Dili
- **Kart Radius (`--card-border-radius`):** `2rem` (`32px`) — Yuvarlatılmış organik kart yapısı
- **Medya/Görsel Radius (`--media-border-radius`):** `2rem` (`32px`)
- **Buton Radius (`--button-border-radius`):** `0.5rem` (`8px`)
- **Input / Form Radius (`--input-border-width` / radius):** `0.5rem` (`8px`)
- **Gölge Dili:** Soft drop-shadow ve solid offset gölgeler. Buton hover durumlarında `translateY(-1px)` ve hafif renk yumuşaması.

---

### Animasyon Dili
- **Varsayılan Transition:** `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Drawer / Modal Geçişi:** `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)` (Slide-in/out)
- **Görsel Hover Scale:** `transform 0.5s ease-out` (`scale(1.05)` veya `scale(1.08)`)
- **Marquee / Continuous Ticker:** `linear infinite 25s`

---

## 2. Bileşen Envanteri (Component Inventory)

### 1. Announcement Bar (`<announcement-bar>`)
- **Amaç:** Ücretsiz kargo veya promosyon duyurularını sayfanın en üstünde gösterir.
- **Yapı:** Esnek merkezlenmiş flex container. İsteğe bağlı sağ/sol ok navigasyonu veya döner carousel.
- **Stil Değerleri:** Arka plan `#37435B`, Yükseklik `36px` - `40px`, Yazan metin renk `#FFFFFF`, Font boyutu `14px`, `font-weight: 500`.
- **ikas Karşılığı:** ikas `isHeader: true` section, `TEXT` / `RICH_TEXT` prop tipi.
- **Durumlar & Animasyonlar:** Otomatik metin geçişinde `opacity 0.3s ease-in-out` fade.
- **Responsive:** Mobil breakpoint'te metin boyutu `12px` - `13px` olarak küçülür.

### 2. Header & Main Navigation Bar (`<site-header>`)
- **Amaç:** Marka logosu, ana sayfa navigasyon menüsü, arama, hesap ve sepet butonlarını barındırır.
- **Yapı:** 3 Kolonlu Flex Layout (`Logo Sol/Orta`, `Menü Orta/Sol`, `Icons Sağ`). Sabit Yükseklik `--header-height: 60px`.
- **Stil Değerleri:** Background `#FFFFFF` (scroll edildiğinde `sticky` ve alt çizgi `1px solid rgba(0,0,0,0.08)`). Menü linkleri `Jost`, `16px`, `#37435B`, `font-weight: 500`.
- **ikas Karşılığı:** ikas `IMAGE` prop (Logo) + `@ikas/bp-storefront` `getDefaultSrc`, `LINK` / `LIST_OF_LINK` prop tipleri.
- **Hover/Active:** Menü linki hover'da `color: #E3E045` veya alt çizgi `scaleX(1)` animasyonu (`transition: transform 0.25s ease`).
- **Responsive Davranışı (375px / 768px / 1440px):**
  - **1440px:** Yatay menü açık.
  - **768px / 375px:** Menü gizlenir, sol tarafa Hamburger İkonu (`<svg>`) yerleşir. Hamburger tıklanınca soldan açılan Slide-out Drawer tetiklenir (`width: 320px`, `transition: transform 0.35s ease`).

### 3. Hero Banner Section (`<hero-banner>`)
- **Amaç:** Ana sayfada ürünü öne çıkaran görsel/video alanı ve ana aksiyon butonu (CTA).
- **Yapı:** Split layout (Sol metin & CTA, Sağ büyük ürün görseli/videosu) veya arkası medya kaplı overlay düzeni.
- **Stil Değerleri:** Arka plan `Scheme 1 (#FFFFFF)` veya `Scheme 3 (#37435B)`. H1 Başlık `48px` (`line-height: 62.5px`), Alt paragraf `18px`.
- **Buton Yapısı:** Primary Button (`bg: #37435B`, `text: #FFFFFF`, `height: 48px`, `border-radius: 8px`, `text-transform: uppercase`).
- **ikas Karşılığı:** ikas `IMAGE` / `VIDEO` prop tipi, `TEXT` başlık prop'ları.
- **Hover Etkisi:** Butona gelindiğinde `background: #E3E045`, `color: #37435B`, `transform: translateY(-2px)` (`transition: all 0.3s ease`).

### 4. Product Card (`<product-card>`)
- **Amaç:** Koleksiyon ve ızgara listelerinde ürünü sergilemek.
- **Yapı:** 
  1. Görsel Konteyneri (`border-radius: 32px`, `overflow: hidden`, `aspect-ratio: 1/1`)
  2. İndirim / Badge Rozeti (Sol Üst: `#E3E045`, `text: #37435B`, `font-size: 12px`, `padding: 4px 8px`)
  3. Yıldız Puanı (Star Rating: `#E3E062` yıldızlar + sayısal yorum sayısı)
  4. Ürün Başlığı (`18px`, `font-weight: 500`, `#37435B`)
  5. Fiyat (`18px`, `font-weight: 600`, indirimli fiyat yanında üzeri çizili eski fiyat)
  6. Variant Quick Swatch & "Add to Cart" Hızlı Ekle Butonu
- **ikas Karşılığı:** ikas `PRODUCT` veya `PRODUCT_LIST` prop tipleri + `IkasProduct` objesi.
- **Hover Davranışı:** Kart üstüne gelindiğinde ikincil ürün görseli yumuşakça belirir (`opacity: 1`, `transition: opacity 0.4s ease`). Görsel `scale(1.04)` büyür.
- **Responsive:**
  - 1440px: 3 veya 4 sütunlu ızgara (`gap: 20px`).
  - 768px: 2 sütunlu ızgara (`gap: 16px`).
  - 375px: 1 veya 2 sütunlu kaydırılabilir carousel/grid (`gap: 12px`).

### 5. Product Detail Page (PDP) Layout
- **Amaç:** Tekil ürün satışı ve varyant seçimi.
- **Bileşen İç Yapısı:**
  - **Medya Galerisi (Sol):** Ana büyük görsel (`border-radius: 32px`) + Altta thumbnail slider (`gap: 12px`). Thumbnail seçildiğinde yumuşak fade geçişi.
  - **Satın Alma Bloğu (Sağ):**
    - Ürün Başlığı (H1, `36px`)
    - Yıldız Değerlendirmesi & Yorum Bağlantısı
    - Fiyat Ekranı (`24px`, `#37435B`)
    - Renk / Varyant Swatch'ları: Yuvarlak butonlar (`width: 36px`, `height: 36px`, `border-radius: 50%`). Seçili swatch etrafında `#37435B` ring (`border: 2px solid #37435B`).
    - Adet Seçici (Quantity Picker): `-` ve `+` butonları, ortada sayı girdisi (`height: 48px`, `border: 1px solid #C8CFD0`, `border-radius: 8px`).
    - CTA Butonları: "Add to Cart" (Primary Navy `#37435B`) ve "Buy It Now" (Accent Yellow `#E3E045`).
    - **Sticky Add to Cart Bar:** Sayfa aşağı kaydırıldığında ekrandan çıkan satın alma alanının yerine ekranın en altında beliren sabit bar (`position: fixed`, `bottom: 0`, `height: 64px`, `bg: #FFFFFF`, `z-index: 90`).
    - Ürün Özellik Akordiyonları (Collapsible Tabs): Başlık, sağda `+`/`-` veya ok ikonu. Tıklanınca yumuşak yükseklik animasyonu (`max-height 0.35s ease-in-out`).
- **ikas Karşılığı:** ikas `IkasProduct.variantTypes` + `IkasVariantValue` (`isColorVariantValue`), `COMPONENT_LIST` ile akordiyon içerikleri.

### 6. Slide-Out Cart Drawer & Cart Page (`<cart-drawer>`)
- **Amaç:** Sepetteki ürünleri göstermek ve hızlı ödemeye yönlendirmek.
- **Yapı:** Sağdan kayarak açılan panel (`width: 420px` [mobil: `%100` genişlik]).
- **Bileşenler:**
  - **Free Shipping Bar:** Üstte kalan tutarı gösteren ilerleme çubuğu (`height: 8px`, `border-radius: 4px`, `background: #E3E045`).
  - **Sepet İtem Listesi:** Görsel (`80x80px`, `radius: 12px`), Ürün Başlığı, Seçili Varyant, Adet Butonları, Fiyat ve Sil İkonu.
  - **Sipariş Notu (Order Note):** Tıklanınca açılan metin alanı (`textarea`, `border-radius: 8px`).
  - **Alt Toplam & Checkout Butonu:** Toplam fiyat, "Checkout" butonu (`height: 52px`, `bg: #37435B`, `color: #FFFFFF`, `font-size: 16px`, `uppercase`).
- **Boş Sepet Durumu (Empty Cart State):** Sepet boşken illüstrasyon/ikon, "Your cart is currently empty" metni ve "Continue Shopping" CTA butonu.
- **ikas Karşılığı:** `@ikas/bp-storefront` `cartStore` (`addItemToCart`, `changeCartItemQuantity`, `removeItem`).

### 7. Customer Account / Login Bileşenleri
- **Amaç:** Kullanıcı girişi, sipariş geçmişi ve profil yönetimi.
- **Giriş Formu:** Email girdisi (`input[type="email"]`, `height: 48px`, `border-radius: 8px`, `border: 1px solid #C8CFD0`) + OTP 6 Haneli Doğrulama Kodu Girdisi (`inputmode="numeric"`, `maxlength="6"`).
- **Profil & Sipariş Sayfası:** Sol/Üst sekme navigasyonu ("Orders", "Profile"). Boş sipariş durumunda "Ready to shop?" mesajı ve "Shop Now" butonu.
- **ikas Karşılığı:** `@ikas/bp-storefront` `customerStore` + Form validator'lar (`initAccountInfoForm`, `initAddressForm`).

### 8. Footer (`<site-footer>`)
- **Amaç:** Alt gezinti, bülten aboneliği, sosyal medya ve ödeme ikonları.
- **Stil Değerleri:** Arka plan `Scheme 3 (#37435B)`, Metin ve link renkleri `#FFFFFF` veya `#C8CFD0`.
- **Bölümler:**
  1. Newsletter Form (Email Input + Arrow Submit Button)
  2. Quick Links Kolonları (About, Reviews, Shipping, Terms)
  3. Social Media Linkleri (Instagram, Facebook, Pinterest vb.)
  4. Copyright & Ödeme İkonları (Visa, Mastercard, Amex, Apple Pay)
- **ikas Karşılığı:** ikas `isFooter: true` section, `LIST_OF_LINK` prop tipleri.

---

## 3. Sayfa Şablonları (Page Templates)

### 1. Ana Sayfa (Homepage Template)
1. `<announcement-bar>`
2. `<site-header>`
3. `<hero-banner>` (Hero Ürün Tanıtımı & Primary CTA)
4. `<press-ticker>` (As-Seen-In Logolar Marquee Bandı)
5. `<featured-collection-grid>` (Öne Çıkan Ürün Kartları Izgarası)
6. `<image-with-text-block>` (Görsel ve Metin Karşılıklı Blok - Left/Right)
7. `<product-features-icons>` (Ücretsiz Kargo, Garantili İade, Hijyenik Kumaş İkon Izgarası)
8. `<testimonials-carousel>` (Müşteri Yorumları & Yıldız Kartları)
9. `<video-demo-section>` (Ürün Kullanım Videosu / Autoplay Banner)
10. `<newsletter-section>` (E-Bülten Kayıt Alanı)
11. `<site-footer>`

### 2. Koleksiyon Sayfası (Collection / Shop All Template)
1. `<site-header>`
2. `<collection-hero>` (Koleksiyon Başlığı, Kısa Açıklama, Arka Plan Banner)
3. `<filter-and-sort-bar>` (Filtreleme & Sıralama Dropdown Menüsü: "Sort by: Featured, Price Low-High, etc.")
4. `<product-grid>` (ProductCard Izgarası — Masaüstü: 4 Kolon, Mobil: 2 Kolon)
5. `<pagination-or-load-more>` ("Load More" Butonu veya Sayfalama Numaraları)
6. `<site-footer>`

### 3. Ürün Detay Sayfası (PDP Template)
1. `<site-header>`
2. `<breadcrumb-nav>` (Home / Products / Infinity Pillow)
3. `<product-main-section>` (Sol: Galeri Slider, Sağ: Varyant Seçimi, Adet, Sepete Ekle Butonları)
4. `<sticky-add-to-cart-bar>` (Scroll Tetiklemeli Sabit Alt Bar)
5. `<product-value-accordions>` (Features, Care Instructions, Shipping & Returns Akordiyonları)
6. `<customer-reviews-section>` (Judge.me Yıldız İstatistiği, Yorum Yaz Butonu ve Yorum Kartları Grid'i)
7. `<related-products-carousel>` ("You May Also Like" Ürün Kartları Carousel'i)
8. `<site-footer>`

### 4. Sepet Sayfası (Cart Page Template)
1. `<site-header>`
2. `<cart-page-container>` (Sepet Ürün Tablosu, Miktar Güncelleme, Sipariş Notu, Ödeme Özeti ve Checkout Butonu)
3. `<site-footer>`

### 5. Arama Sayfası (Search Template)
1. `<site-header>`
2. `<search-bar-input>` (Arama Girdisi Alanı ve Temizle Butonu)
3. **Durum 1 (Sonuç Var):** `<search-results-grid>` (Bulunan ürün kartları)
4. **Durum 2 (Boş Arama):** `<empty-search-state>` ("No results found for 'xyz'. Check your spelling or search for another term." + Popüler Arama Önerileri)
5. `<site-footer>`

### 6. Kurumsal & İçerik Sayfaları (About / Contact / Policies Template)
1. `<site-header>`
2. `<page-header>` (Sayfa Başlığı H1 - `36px`)
3. `<page-content-wrapper>` (Tipografik Zengin Metin Alanı / İletişim Formu)
4. `<site-footer>`

### 7. 404 Bulunamadı Sayfası (404 Template)
1. `<site-header>`
2. `<404-container>` (Görsel/İllüstrasyon, "404 - Page Not Found", "The page you are looking for does not exist", Primary Button: "Return to Home")
3. `<site-footer>`

### 8. Müşteri Hesabı (Account / Orders / Profile Template)
1. `<site-header>`
2. `<account-nav-tabs>` ("Orders" ve "Profile" Sekmeleri)
3. `<orders-section>` / `<profile-section>` (Kullanıcı İletişim Bilgileri, Adres Ekleme/Düzenleme Formları, Sipariş Geçmişi)
4. `<site-footer>`

---

## 4. Animasyon Kataloğu (Animation Catalog)

Sitedeki tüm animasyonlar ve mikro-etkileşimler DOM computed style okumalarıyla tek yerde listelenmiştir:

| Eleman | Tetikleyici (Trigger) | Süre & Easing | Değişen CSS Property'leri | Efekt / Davranış Açıklaması |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Butonlar** | Hover / Focus | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | `background-color`, `color`, `transform` | Arka plan sarıya/laciverte döner, buton `translateY(-1px)` hafifçe yükselir. |
| **Ürün Kartı Görseli**| Hover | `0.5s ease-out` | `transform`, `opacity` | Ana görsel `scale(1.05)` büyür, ikincil görsel `opacity: 1` ile görünür. |
| **Menü Linkleri** | Hover | `0.25s ease` | `color`, `border-bottom` / `scaleX` | Alt çizgi soldan sağa doğru uzayarak belirir (`transform-origin: left`). |
| **Cart Drawer** | Cart Butonu Tıklama | `0.4s cubic-bezier(0.16, 1, 0.3, 1)` | `transform: translateX(0)` | Panel sağ dışarıdan ekranın içine kayar. Backing overlay `opacity: 1` olur. |
| **Mobil Nav Drawer** | Hamburger Tıklama | `0.35s ease-in-out` | `transform: translateX(0)` | Menü soldan kayarak açılır. |
| **Akordiyon (Collapsible)**| Tıklama | `0.35s ease-in-out` | `max-height`, `opacity`, `rotate` | İçerik alanı aşağı doğru esneyerek açılır, sağdaki `+` ikonu 45/180 derece döner. |
| **Sticky Add to Cart**| Page Scroll (PDP) | `0.3s ease` | `transform: translateY(0)`, `opacity` | Ana satın alma butonu görüş alanından çıktığında alttan yukarı yumuşakça kayar. |
| **Logo Ticker (Marquee)**| Otomatik (Continuous)| `25s linear infinite` | `transform: translateX(-100%)` | Basın/Medya logoları kesintisiz olarak soldan sağa akar. |
| **Thumbnail Switch** | Thumbnail Tıklama | `0.2s ease-in-out` | `opacity`, `border-color` | Seçilen küçük görsel etrafında belirgin çerçeve oluşur, ana görsel `opacity` ile güncellenir. |
| **OTP Code Input Focus**| Focus / Input | `0.2s ease` | `border-color`, `box-shadow` | Girdi kutusu etrafında lacivert odaklama halkası oluşur. |

---

## 5. Ziyaret Edilen ve Keşfedilen URL'ler

### Başlangıç ve Keşfedilen Tüm URL Listesi

#### 1. Ana Sayfa
- `https://infinitypillow.co/`

#### 2. Koleksiyon Sayfaları
- `https://infinitypillow.co/collections/all`

#### 3. Ürün Detay Sayfaları (PDP)
- `https://infinitypillow.co/products/infinity-pillow`
- `https://infinitypillow.co/products/packable-blanket`
- `https://infinitypillow.co/products/packable-travel-bag`

#### 4. Kurumsal ve İçerik Sayfaları
- `https://infinitypillow.co/pages/about`
- `https://infinitypillow.co/pages/reviews`
- `https://infinitypillow.co/pages/contact`
- `https://infinitypillow.co/pages/affiliation`
- `https://infinitypillow.co/pages/wholesale`

#### 5. Yasal ve Politika Sayfaları
- `https://infinitypillow.co/policies/shipping-policy`
- `https://infinitypillow.co/policies/refund-policy`
- `https://infinitypillow.co/policies/terms-of-service`
- `https://infinitypillow.co/policies/contact-information`

#### 6. Arama Sayfaları (Arama & Boş Durum)
- `https://infinitypillow.co/search?q=pillow`
- `https://infinitypillow.co/search?q=xyz12345nonexistent`

#### 7. Sepet ve Drawer
- `https://infinitypillow.co/cart`

#### 8. Hata ve Sistem Durumları
- `https://infinitypillow.co/404`

#### 9. Kullanıcı Girişi ve Müşteri Hesabı (Doğrulanmış & Analiz Edilmiş)
- `https://infinitypillow.co/account/login` -> `https://account.infinitypillow.co/authentication/login`
- `https://account.infinitypillow.co/orders`
- `https://account.infinitypillow.co/profile`

---
*DESIGN.md dokümanı referans sitenin eksiksiz analizi ve IKAS.md teknik yetenekleri ile sıfırdan oluşturulmuştur.*
