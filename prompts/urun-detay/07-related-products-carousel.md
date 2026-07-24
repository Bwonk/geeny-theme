# BİLEŞEN PROMPTU: RelatedProductsCarousel (`prompts/urun-detay/07-related-products-carousel.md`)

## 1. Amaç ve Rol
- **Bileşen:** `RelatedProductsCarousel` (`src/components/RelatedProductsCarousel`)
- **Amaç:** "Bunları da Beğenebilirsiniz" başlığı altında önerilen ürünleri carousel/grid formatında sunmak.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Bölüm Başlığı:** `Tipografi / Başlık H2` (`sKAMD8d1LA` - `Onest` 36px/500).
- **Konteyner:** `max-width: var(--max-site-width, 1820px)`, `padding: var(--section-py, 48px) var(--section-px, 20px)`.
- **Ürün Kartı Bağımlılığı:** `ProductCard` ortak bileşeni kullanılacak. CSS en üstünde `@import "../ProductCard/styles.css";` bildirimi olacak.
- **Izgara / Carousel:** 4 Sütun Masaüstü (`minmax(0, 1fr)`), 2 Sütun Mobil (`gap: 16px`).

## 3. Veri ve SDK Fonksiyonları
- **Props:** `title?: string`, `productList?: IkasProductList`, `products?: IkasProduct[]`.

## 4. Kodlama Kuralları
- `ProductCard` bileşeni import edilecek; CSS `.tsx` içinde DEĞİL, `styles.css` içinde `@import` edilecek.
