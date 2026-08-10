# FLOW PROMPT: Ürün Detay Sayfası Geliştirme Akışı (`prompts/urun-detay.md`)

> **Talimat:** Bu flow prompt'u çalıştırıldığında ajan, Ürün Detay Sayfası'nda (PDP) yer alan her bileşen için `prompts/urun-detay/` alt klasöründe BİLEŞEN PROMPT ŞABLONU'na göre AYRI detaylı bileşen prompt dosyalarını sırayla üretecektir.

---

## 1. Sayfa Şablonu ve Amaç
- **Sayfa:** Ürün Detay Sayfası (`Product Detail Page - PDP`)
- **Amaç:** Ürün görsellerini, renk varyantlarını, adet seçimini, fiyatı, müşteri değerlendirmelerini ve ürün avantajlarını sunarak hızlı satın almayı sağlamak.
- **Bölüm Sırası (Yukarıdan Aşağıya):**
  1. Header & Navigasyon *(Ortak)*
  2. Button Bileşeni *(Ortak Referans)*
  3. Breadcrumb Nav
  4. Product Media Gallery (Sol)
  5. Product Buy Box / Variant Selector (Sağ)
  6. Sticky Add to Cart Bar (Scroll Tetiklemeli)
  7. Product Value Accordions (Collapsible Tabs)
  8. Customer Reviews Section (Judge.me Yıldızlar & Grid)
  9. Product Card *(Ortak Bağımlılık)*
  10. Related Products Carousel ("You May Also Like")
  11. Slide-Out Cart Drawer *(Ortak)*
  12. Footer *(Ortak)*

---

## 2. FLOW SIRASI ve Bağımlılık Mantığı

1. `prompts/ortak/header.md` — *(Ortak Referans)*
2. `prompts/ortak/button.md` — *(Ortak Referans - Buton bağımlılığı)*
3. `prompts/urun-detay/01-breadcrumb-nav.md` — Yol haritası navigasyonu
4. `prompts/urun-detay/02-product-media-gallery.md` — Sol büyük görsel galeri & thumbnail slider
5. `prompts/urun-detay/03-product-buy-box.md` — Sağ satın alma alanı: Başlık, fiyat, varyant swatch'ları, adet ve CTA butonları (`prompts/ortak/button.md`)
6. `prompts/urun-detay/04-sticky-add-to-cart-bar.md` — Scroll edildiğinde alttan çıkan sabit satın alma barı (`prompts/ortak/button.md`)
7. `prompts/urun-detay/05-product-value-accordions.md` — Özellik, kumaş ve kargo akordiyonları
8. `prompts/urun-detay/06-customer-reviews-section.md` — Müşteri yorumları & yıldız değerlendirmeleri
9. `prompts/ortak/product-card.md` — *(Ortak Referans - Öneri carousel bağımlılığı)*
10. `prompts/urun-detay/07-related-products-carousel.md` — İlişkili ürün önerileri carousel'i
11. `prompts/ortak/cart-drawer.md` — *(Ortak Referans)*
12. `prompts/ortak/footer.md` — *(Ortak Referans)*

---

## 3. Üretim Talimatı

Ajan aşağıdaki adımları sırayla uygulayacaktır:

### Adım 1: Dosya Listesi Onayı
Önce `prompts/urun-detay/` klasöründe üretilecek bileşen prompt dosyalarının listesini göster ve **KULLANICI ONAYI BEKLE**.

### Adım 2: Bileşen Prompt Dosyalarını Oluşturma
Onay geldikten sonra aşağıdaki dosyaları `prompts/urun-detay/` dizininde tek tek oluştur:

1. **`prompts/urun-detay/01-breadcrumb-nav.md`**:
   - İçerik: `Home / Products / Infinity Pillow` gezinti adımları.
2. **`prompts/urun-detay/02-product-media-gallery.md`**:
   - İçerik: Ana büyük görsel (`32px` radius) + thumbnail slider. `@ikas/bp-storefront` `getSrc` ve `getDefaultSrc` kullanımı.
3. **`prompts/urun-detay/03-product-buy-box.md`**:
   - İçerik: Ürün Başlığı (H1 `36px`), Fiyat (`24px`), Renk Swatch'ları (`36x36px` dairesel butonlar, `#37435B` seçili ring), Adet Seçici (`-`/`+`), "Add to Cart" & "Buy It Now" butonları (`prompts/ortak/button.md` kullanımı).
4. **`prompts/urun-detay/04-sticky-add-to-cart-bar.md`**:
   - İçerik: Ana satın alma butonu ekrandan kaybolduğunda alt tarafta beliren sabit bar (`position: fixed`, `bottom: 0`, `height: 64px`, `bg: #FFFFFF`, `z-index: 90`, `prompts/ortak/button.md` kullanımı).
5. **`prompts/urun-detay/05-product-value-accordions.md`**:
   - İçerik: Yıkama Talimatları, Kargo ve İade Koşulları akordiyonları (`max-height 0.35s ease-in-out`).
6. **`prompts/urun-detay/06-customer-reviews-section.md`**:
   - İçerik: Judge.me puan istatistiği (`#E3E062` yıldızlar) ve yorum kartları ızgarası.
7. **`prompts/urun-detay/07-related-products-carousel.md`**:
   - İçerik: `prompts/ortak/product-card.md` bileşenini içeren kaydırılabilir carousel.

---

## 4. Sayfa Düzeyi Kurallar ve Token'lar
- **Container Genişliği:** `1820px`.
- **Yatay Padding:** `20px` (Mobil: `16px`).
- **Media Radius:** `Radius / Medya` (`2rem` / `32px`).
- **Sticky Bar Yüksekliği:** `Boşluk / Sticky Cart Bar Yüksekliği` (`64px`).
