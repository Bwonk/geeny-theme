# BİLEŞEN PROMPTU: ProductBuyBox (`prompts/urun-detay/03-product-buy-box.md`)

## 1. Amaç ve Rol
- **Bileşen:** `ProductBuyBox` (`src/components/ProductBuyBox`)
- **Amaç:** Sağ taraftaki satın alma bloğu: Ürün başlığı, fiyat, varyant swatch seçimi, adet belirleme ve "Sepete Ekle" CTA butonları.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Ürün Başlığı:** `Tipografi / Başlık H2` (`sKAMD8d1LA` - `Onest` 36px/500).
- **Fiyat:** `Tipografi / Kart ve Alt Başlık (lg)` (`AZR1yL8GrK` - `Onest` 24px/500), indirimli fiyat yanında üzeri çizili eski fiyat (`#C8CFD0`).
- **Renk Swatches:** `36x36px` dairesel butonlar (`border-radius: 50%`), seçili swatch etrafında `#37435B` 2px ring (`border: 2px solid #37435B`).
- **Adet Seçici:** `-` ve `+` butonları, ortada adet girdisi (`height: 48px`, `border: 1px solid #C8CFD0`, `border-radius: 8px`).
- **CTA Butonları:** `Button` ortak bileşeni (`@import "../Button/styles.css";`). "Sepete Ekle" (`PRIMARY`), "Hemen Satın Al" (`ACCENT`).

## 3. Veri ve SDK Fonksiyonları
- **SDK Fonksiyonları:**
  - `getDisplayedProductVariantTypes(product)`
  - `selectVariantValue(product, variantType, value)`
  - `getSelectedProductVariant(product)`
  - `getProductVariantFormattedFinalPrice(variant)`
  - `getProductVariantFormattedSellPrice(variant)`
  - `hasProductVariantDiscount(variant)`
  - `hasProductVariantStock(variant)`
  - `isAddToCartEnabled(product)`
  - `addItemToCart(variant, product, quantity)`
- **Props:** `product: IkasProduct`.

## 4. Kodlama Kuralları & İmzalar
- **SDK İmzası:** `addItemToCart(variant, product, quantity)` doğrulanmış imzası kullanılacak.
- `lang="tr"` özniteliği eklenecek, JS metin büyük harf dönüşümlerinde `.toLocaleUpperCase("tr-TR")` uygulanacak.
