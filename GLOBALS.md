# GLOBALS.md — Tema Global Token Kurulum Dokümanı

## Amaç
Bu dosya, ikas MCP ile hangi global'in hangi değerle, hangi araçla oluşturulacağını ve bileşenlerde nasıl entegre edileceğini tarif eden tek kaynaktır. [DESIGN.md](file:///root/geeny/DESIGN.md)'deki analizden türetilmiştir; prompts/ klasöründeki tüm bileşen prompt'ları bu dosyadaki token adlarını ve değerlerini birebir referans alır.

## Durum
Global'ler henüz canlı oluşturulmadı — canlı kurulum ayrı bir onaylı adımda, aşağıdaki tablolara birebir uyularak `create_theme_global` ile yapılacak.

## Temel İlkeler
1. **Global-first:** Her renk, tipografi, boşluk, radius, gölge ve animasyon bir global token'dır. Bileşenler asla ham değer kullanmaz — renk `var(--<id>)`, tipografi `className="_<id>"`, globalVariable'lar `getThemeSetting` ile okunup inline CSS değişkenine aktarılır (`style={{ "--token": setting.value }}`).
2. **Türkçe zorunluluğu:** Token adları Türkçe ve `/` ile gruplu. Prop `displayName`/`description`/grup adları Türkçe.
3. **Uppercase & Türkçe Harf Uyumu:** Metin büyük veya küçük harf serbestçe kullanılabilir; ANCAK Türkçe i/İ/ı/I harflerinin doğru dönüşmesi için HTML kök elementinde `lang="tr"` ZORUNLUDUR. Tipografi token'larında `text-transform` tanımlanmaz.
4. **Font:** `Jost, sans-serif` — [DESIGN.md](file:///root/geeny/DESIGN.md)'den alınmıştır, ağırlık aralığı `400` (Regular) - `600` (Semi-Bold).
5. **Kod İngilizce / Editör Türkçe:** Kod tanımlayıcıları İngilizce; editörde görünen her şey Türkçe.
6. **cssVar Kuralı:** Renklerde `id` ile `cssVar` farklı büyük/küçük harf kullanabilir; bileşenler `list_theme_globals` çıktısındaki `cssVar` TAM değerini kullanır, id'den elle türetmez.

---

## Token Grupları

### B1. Renkler — `create_theme_global` · `kind: color`
> **Bağlama Kuralı:** Bileşenlerde CSS rengi olarak `var(--<cssVar>)` şeklinde tüketilir. `list_theme_globals` çıktısındaki tam `cssVar` adı kullanılacaktır. `kind: color` çağrılarında `value` olarak somut Hex/RGBA string'i verilir (`var(...)` referansı verilemez).

| Ad | Değer | Kullanım |
| :--- | :--- | :--- |
| `Renkler / Ana Lacivert` | `#37435B` | Ana metinler, birincil butonlar, koyu arka plan bölümleri (Scheme 3/4), başlıklar, PDP fiyatı, kart başlıkları |
| `Renkler / Accent Sarı` | `#E3E045` | Öne çıkan butonlar, indirim/promosyon rozetleri, vurgu alanları (Scheme 4), menü hover, buton hover arka planı |
| `Renkler / Açık Gri Mavi` | `#C8CFD0` | İkincil arka planlar (Scheme 2), kart zeminleri, böleçler, input ve adet seçici kenarlıkları |
| `Renkler / Yıldız Sarısı` | `#E3E062` | Ürün kartları ve PDP değerlendirme yıldızları (`--jdgm-star-color`) |
| `Renkler / Saf Beyaz` | `#FFFFFF` | Ana sayfa varsayılan arka planı (Scheme 1), kart içerikleri, buton yazı renkleri, header zemin rengi |
| `Renkler / Saf Siyah` | `#000000` | Yüksek kontrastlı metinler, alt çizgi vurguları, ikincil durumlar, Scheme 5 siyah zemin |
| `Renkler / Overlay Siyah` | `rgba(55, 67, 91, 0.75)` | Drawer ve modal arkasındaki karartma katmanı (backdrop overlay) |
| `Renkler / Şeffaf` | `transparent` | Saydam buton, kaplama zeminleri ve kenarlıklar |
| `Renkler / Sticky Header Çizgisi` | `rgba(0, 0, 0, 0.08)` | Sayfa kaydırıldığında sabit duran header alt ayırıcı çizgisi |
| `Renkler / İndirim Rozet Metni` | `#37435B` | İndirim badge rozeti üzerindeki yüksek kontrastlı metin rengi |
| `Renkler / Swatch Ring` | `#37435B` | PDP seçili varyant renk swatch'ı etrafındaki halkanın rengi |
| `Renkler / Kargo İlerleme Çubuğu` | `#E3E045` | Cart drawer içindeki ücretsiz kargo kalan tutar ilerleme çubuğu dolgu rengi |

---

### B2. Tipografi — `create_theme_global` · `kind: typography`
> **Bağlama Kuralı:** Bileşenlerde ikas framework tarafında oluşturulan `className="_<id>"` stil sınıfı doğrudan elemana uygulanır. Font ailesi `Jost, sans-serif` olarak sabittir. `font_weight` sayısal değerdir (400, 500, 600).

| Ad | Değer (Size / Weight / Line-Height) | Kullanım |
| :--- | :--- | :--- |
| `Tipografi / Display Hero` | Size: `54px`, Weight: `500`, Line-Height: `64.8px` | Masaüstü büyük sloganlar (Hero ana başlığı) |
| `Tipografi / Başlık H1` | Size: `36px`, Weight: `500`, Line-Height: `46.8px` | Standard H1 başlıkları, PDP ürün başlığı, sayfa başlıkları |
| `Tipografi / Başlık H2` | Size: `48px`, Weight: `500`, Line-Height: `62.5px` | H2 ve Hero alt bölüm ana başlıkları |
| `Tipografi / Başlık H3` | Size: `30.2px`, Weight: `500`, Line-Height: `39.3px` | Akordiyon başlıkları, mobil modal başlıkları |
| `Tipografi / Başlık H4` | Size: `27px`, Weight: `500`, Line-Height: `35.1px` | Öne çıkan bölüm alt başlıkları |
| `Tipografi / Kart ve Alt Başlık (lg)` | Size: `24px`, Weight: `500`, Line-Height: `31.2px` | Alt başlıklar, kart başlıkları, PDP fiyat etiketi |
| `Tipografi / Gövde Metni (base)` | Size: `18px`, Weight: `400`, Line-Height: `25.2px` | Paragraf ve gövde metinleri, ürün kartı başlığı, CTA buton metni |
| `Tipografi / İkincil Metin (sm)` | Size: `16px`, Weight: `400`, Line-Height: `22.4px` | İkincil açıklamalar, input metinleri, footer alt bağlantıları, menü linkleri (`weight: 500`) |
| `Tipografi / Etiket ve Rozet (xs)` | Size: `13.5px`, Weight: `500`, Line-Height: `18.9px` | Alt etiketler, küçük indirim rozetleri, kargo bildirimleri |
| `Tipografi / Mobil Duyuru Metni` | Size: `12px`, Weight: `500`, Line-Height: `16.8px` | Mobil breakpoint announcement bar duyuru metni |

---

### B3. Boşluklar / Spacing — `create_theme_global` · `kind: globalVariable` · `type: TEXT`
> **Bağlama Kuralı:** Bileşenlerde `getThemeSetting` ile okunup konteynırlara `style={{ "--section-x-padding": setting.value }}` veya inline padding/gap CSS değişkeni şeklinde aktarılır.

| Ad | Değer | Kullanım |
| :--- | :--- | :--- |
| `Boşluk / Site Maksimum Genişliği` | `1820px` | Site container maksimum genişlik sınırı (`--max-site-width`) |
| `Boşluk / Yatay Bölüm Padding` | `1.25rem` (`20px`) | Masaüstü/Tablet yatay bölüm padding değeri (`--section-x-padding`) |
| `Boşluk / Mobil Yatay Padding` | `16px` | Mobil cihazlar için yatay bölüm padding değeri |
| `Boşluk / Dikey Bölüm Spacing` | `2rem` (`32px`) | Mobil/Tablet dikey bölüm aralığı (`--section-vertical-spacing`) |
| `Boşluk / Masaüstü Dikey Spacing` | `48px` | Masaüstü cihazlar için dikey bölüm aralığı |
| `Boşluk / Grid Gap` | `1.25rem` (`20px`) | Masaüstü ızgara ve kartlar arası boşluk (`--grid-gap`) |
| `Boşluk / Mobil Grid Gap` | `12px` | Mobil ürün kartı ızgarası aralığı |
| `Boşluk / Tablet Grid Gap` | `16px` | Tablet ürün kartı ızgarası aralığı |
| `Boşluk / Header Yüksekliği` | `60px` | Sabit header yüksekliği (`--header-height`) |
| `Boşluk / Announcement Bar Yüksekliği` | `38px` | Üst duyuru bandı yüksekliği |
| `Boşluk / Buton Yüksekliği` | `48px` | Primary ve secondary buton yüksekliği |
| `Boşluk / Checkout Buton Yüksekliği` | `52px` | Cart drawer ve sepet ödeme butonu yüksekliği |
| `Boşluk / Sticky Cart Bar Yüksekliği` | `64px` | PDP scroll tetiklemeli sabit alt bar yüksekliği |
| `Boşluk / Cart Drawer Genişliği` | `420px` | Masaüstü slide-out cart drawer genişliği |
| `Boşluk / Mobile Drawer Genişliği` | `320px` | Mobil navigasyon slide-out drawer genişliği |

---

### B4. Radius — `create_theme_global` · `kind: globalVariable` · `type: TEXT`
> **Bağlama Kuralı:** Bileşenlerde `getThemeSetting` ile okunup elemanlara `style={{ borderRadius: setting.value }}` şeklinde aktarılır.

| Ad | Değer | Kullanım |
| :--- | :--- | :--- |
| `Radius / Kart` | `2rem` (`32px`) | Yuvarlatılmış organik ürün kartı ve medya kapsayıcı radius'u (`--card-border-radius`) |
| `Radius / Medya` | `2rem` (`32px`) | Görsel ve video blokları köşe yuvarlama radius'u (`--media-border-radius`) |
| `Radius / Buton` | `0.5rem` (`8px`) | Primary, secondary ve CTA buton radius'u (`--button-border-radius`) |
| `Radius / Input ve Form` | `0.5rem` (`8px`) | Form girdileri, textarea ve adet seçici radius'u (`--textarea-border-radius`) |
| `Radius / Sepet İtem Görseli` | `12px` | Cart drawer ürün görseli köşe yuvarlama radius'u |
| `Radius / Swatch Dairesel` | `50%` | PDP renk / varyant swatch dairesel buton radius'u |
| `Radius / Kargo İlerleme Çubuğu` | `4px` | Free shipping bar köşe yuvarlama radius'u |

---

### B5. Gölge / Shadow — `create_theme_global` · `kind: globalVariable` · `type: SHADOW`
> **Bağlama Kuralı:** Bileşenlerde `getThemeSetting` ile okunup `boxShadow` özelliğine aktarılır. Değerler ikas `SHADOW` JSON obje şemasına göredir (`x`, `y`, `blur`, `spread`, `color`, `position`).

| Ad | Değer (JSON Obje) | Kullanım |
| :--- | :--- | :--- |
| `Gölge / Buton Drop Shadow` | `{"x":0, "y":-1, "blur":1, "spread":0, "color":"rgba(227, 224, 69, 0.5)", "position":"outside"}` | Buton hover ve drop-shadow efekti (`--button-drop-shadow`) |
| `Gölge / Kart Soft Shadow` | `{"x":0, "y":4, "blur":20, "spread":0, "color":"rgba(55, 67, 91, 0.08)", "position":"outside"}` | Ürün kartı ve modal yumuşak gölgesi |
| `Gölge / Sticky Header Shadow` | `{"x":0, "y":2, "blur":8, "spread":0, "color":"rgba(0, 0, 0, 0.05)", "position":"outside"}` | Kaydırılan sticky header alt gölgesi |
| `Gölge / Swatch Odak Gölgesi` | `{"x":0, "y":0, "blur":0, "spread":2, "color":"rgba(55, 67, 91, 1)", "position":"outside"}` | PDP seçili varyant swatch etrafındaki 2px dış halka gölgesi |

---

### B6. Animasyon — `create_theme_global` · `kind: globalVariable` · `type: TEXT`
> **Bağlama Kuralı:** Bileşenlerde `transition` CSS özelliğine veya `style={{ transition: setting.value }}` şeklinde uygulanır.

| Ad | Değer | Kullanım |
| :--- | :--- | :--- |
| `Animasyon / Buton ve Hover` | `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Primary buton hover, background renk değişimi ve `translateY(-1px)` yükselme efekti |
| `Animasyon / Drawer ve Modal` | `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)` | Cart drawer ve mobil menü drawer soldan/sağdan kayarak açılış/kapanış geçişi |
| `Animasyon / Görsel Scale Hover` | `transform 0.5s ease-out` | Ürün kartı görsel hover `scale(1.05)` büyüme geçişi |
| `Animasyon / Menü Alt Çizgi` | `transform 0.25s ease` | Header menü linkleri hover alt çizgi (`scaleX(1)`) genişleme geçişi |
| `Animasyon / Akordiyon Açılış` | `max-height 0.35s ease-in-out` | PDP collapsible tabs ve akordiyon içerik açılış yüksekliği geçişi |
| `Animasyon / Sticky Bar Belirme` | `transform 0.3s ease, opacity 0.3s ease` | PDP scroll edildiğinde sabit alt barın alttan belirmesi geçişi |
| `Animasyon / Fade Yumuşak` | `opacity 0.3s ease-in-out` | Announcement bar metin değişimi ve thumbnail switch yumuşak görünürlük geçişi |

#### Sürekli Keyframe Animasyonları
- **`Animasyon / Marquee Ticker`**: `transform 25s linear infinite`
  - **Bileşen Notu:** `<press-ticker>` medya logoları bandında `@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }` biçiminde CSS utility ile veya inline style olarak ele alınacaktır.

---

## Kapsama Kontrolü (Coverage Audit)

[DESIGN.md](file:///root/geeny/DESIGN.md)'deki Bileşen Envanteri'nde yer alan tüm bileşenlerin kullandığı token'lar eşleştirilmiştir:

- **`<announcement-bar>`** → Kullanılan token'lar: `Renkler / Ana Lacivert`, `Renkler / Saf Beyaz`, `Tipografi / Mobil Duyuru Metni`, `Boşluk / Announcement Bar Yüksekliği`, `Animasyon / Fade Yumuşak`
- **`<site-header>`** → Kullanılan token'lar: `Renkler / Saf Beyaz`, `Renkler / Ana Lacivert`, `Renkler / Accent Sarı`, `Renkler / Sticky Header Çizgisi`, `Tipografi / İkincil Metin (sm)`, `Boşluk / Header Yüksekliği`, `Boşluk / Mobile Drawer Genişliği`, `Animasyon / Menü Alt Çizgi`, `Animasyon / Drawer ve Modal`, `Gölge / Sticky Header Shadow`
- **`<hero-banner>`** → Kullanılan token'lar: `Renkler / Saf Beyaz`, `Renkler / Ana Lacivert`, `Renkler / Accent Sarı`, `Tipografi / Display Hero`, `Tipografi / Başlık H2`, `Tipografi / Gövde Metni (base)`, `Radius / Buton`, `Boşluk / Buton Yüksekliği`, `Animasyon / Buton ve Hover`
- **`<product-card>`** → Kullanılan token'lar: `Radius / Kart`, `Renkler / Accent Sarı`, `Renkler / İndirim Rozet Metni`, `Renkler / Yıldız Sarısı`, `Renkler / Ana Lacivert`, `Tipografi / Gövde Metni (base)`, `Tipografi / Etiket ve Rozet (xs)`, `Boşluk / Grid Gap`, `Animasyon / Görsel Scale Hover`, `Gölge / Kart Soft Shadow`
- **`<product-detail-page>` (PDP)** → Kullanılan token'lar: `Tipografi / Başlık H1`, `Tipografi / Kart ve Alt Başlık (lg)`, `Renkler / Ana Lacivert`, `Renkler / Accent Sarı`, `Renkler / Swatch Ring`, `Radius / Swatch Dairesel`, `Radius / Medya`, `Boşluk / Buton Yüksekliği`, `Boşluk / Sticky Cart Bar Yüksekliği`, `Animasyon / Sticky Bar Belirme`, `Animasyon / Akordiyon Açılış`, `Gölge / Swatch Odak Gölgesi`
- **`<cart-drawer>`** → Kullanılan token'lar: `Boşluk / Cart Drawer Genişliği`, `Renkler / Kargo İlerleme Çubuğu`, `Radius / Kargo İlerleme Çubuğu`, `Radius / Sepet İtem Görseli`, `Boşluk / Checkout Buton Yüksekliği`, `Renkler / Overlay Siyah`, `Animasyon / Drawer ve Modal`
- **`<customer-account-login>`** → Kullanılan token'lar: `Renkler / Açık Gri Mavi`, `Renkler / Ana Lacivert`, `Radius / Input ve Form`, `Boşluk / Buton Yüksekliği`, `Tipografi / İkincil Metin (sm)`, `Gölge / Swatch Odak Gölgesi`
- **`<site-footer>`** → Kullanılan token'lar: `Renkler / Ana Lacivert`, `Renkler / Saf Beyaz`, `Renkler / Açık Gri Mavi`, `Tipografi / İkincil Metin (sm)`, `Radius / Input ve Form`, `Boşluk / Yatay Bölüm Padding`
- **`<press-ticker>`** → Kullanılan token'lar: `Animasyon / Marquee Ticker`, `Boşluk / Yatay Bölüm Padding`
- **`<search-and-404-pages>`** → Kullanılan token'lar: `Tipografi / Başlık H1`, `Tipografi / Gövde Metni (base)`, `Renkler / Ana Lacivert`, `Radius / Buton`

---
*GLOBALS.md dosyası DESIGN.md ve IKAS.md dokümanlarına %100 sadık kalınarak güncellenmiştir.*
