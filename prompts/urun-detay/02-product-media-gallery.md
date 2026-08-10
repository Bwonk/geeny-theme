# BİLEŞEN PROMPTU: ProductMediaGallery (`prompts/urun-detay/02-product-media-gallery.md`)

## 1. Amaç ve Rol
- **Bileşen:** `ProductMediaGallery` (`src/components/ProductMediaGallery`)
- **Amaç:** Ürün görsellerini sergileyen sol büyük görsel alanı (`32px` radius) ve alttaki thumbnail slider bileşeni.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Görsel Konteyneri:** `border-radius: var(--media-radius, 32px)`, `overflow: hidden`, `aspect-ratio: 1 / 1` (square) veya `4 / 3`. `display: block` verilecek.
- **Thumbnail Slider:** `gap: 12px`, thumbnail `width: 72px`, `height: 72px`, `border-radius: 12px`, aktif thumbnail etrafında `border: 2px solid #37435B` (`var(--pxNuSoudLn)`).
- **Gölge:** `Gölge / Kart Soft Shadow` (`_yyUleMlhR4`).

## 3. Veri ve SDK Fonksiyonları
- **SDK Fonksiyonları:** `getSelectedProductVariant(product)`, `getProductVariantMainImage(variant)`, `getDefaultSrc(image)`, `getSrc(image, width)`, `getThumbnailSrc(image)`.
- **Props:** `product: IkasProduct`.

## 4. Kodlama Kuralları & MobX Reaktivitesi
- Kullanıcı renk/beden seçtiğinde MobX `getSelectedProductVariant` otomatik değişir; ana görsel ve thumbnail listesi anında güncellenir.
- CSS `aspect-ratio` inline elemanlarda çalışmayacağı için resim sarmalayıcısına `display: block` verilecek.
