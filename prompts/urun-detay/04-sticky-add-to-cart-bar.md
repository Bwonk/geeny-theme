# BİLEŞEN PROMPTU: StickyAddToCartBar (`prompts/urun-detay/04-sticky-add-to-cart-bar.md`)

## 1. Amaç ve Rol
- **Bileşen:** `StickyAddToCartBar` (`src/components/StickyAddToCartBar`)
- **Amaç:** Kullanıcı sayfayı aşağı kaydırdığında ana satın alma alanı görünmez olunca ekranın en altına sabitlenen hızlı satın alma barı.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Yerleşim:** `position: fixed`, `bottom: 0`, `left: 0`, `right: 0`, `z-index: 90`.
- **Boyut & Arka Plan:** `height: var(--_rEYcHCKRvC, 64px)`, `background: #FFFFFF` (`var(--24KlcgGmm9)`), `border-top: 1px solid rgba(0,0,0,0.08)`, `box-shadow: 0 -4px 12px rgba(0,0,0,0.05)`.
- **İçerik:** Küçük görsel (`48x48px`), Ürün Adı, Fiyat, Varyant Seçimi özeti ve "Sepete Ekle" `Button` bileşeni (`@import "../Button/styles.css";`).

## 3. Veri ve SDK Fonksiyonları
- **SDK Fonksiyonları:** `getSelectedProductVariant(product)`, `getProductVariantFormattedFinalPrice(variant)`, `addItemToCart(variant, product, 1)`.
- **Props:** `product: IkasProduct`, `targetElementId?: string` (IntersectionObserver için izlenecek eleman).

## 4. Kodlama Kuralları
- `IntersectionObserver` veya scroll listener ile ana "Sepete Ekle" butonu viewport dışına çıkınca `transform: translateY(0)` / `opacity: 1` animasyonu yapılmalı.
