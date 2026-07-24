# BİLEŞEN PROMPTU: ProductGrid (`prompts/koleksiyon/03-product-grid.md`)

## 1. Amaç ve Rol
- **Bileşen:** `ProductGrid` (`src/components/ProductGrid`)
- **Amaç:** Koleksiyondaki ürün kartlarını ızgara (grid) düzeninde sergilemek ve boş filtre sonucunda bilgilendirme sunmak.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Izgara Yapısı:** `display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--grid-gap, 20px);` [Tablet: `repeat(3, minmax(0, 1fr))`, Mobil: `repeat(2, minmax(0, 1fr))`, gap: `12px`].
- **Ortak Bağımlılık:** `ProductCard` bileşeni kullanılacak. CSS en üstünde `@import "../ProductCard/styles.css";` bildirilecek.
- **Boş Sonuç State'i:** Ürün bulunamadığında `Tipografi / Başlık H3` (`AHnMWYqzuI`) ile mesaj ve "Filtreleri Temizle" `Button` CTA'sı.

## 3. Veri ve SDK Fonksiyonları
- **SDK Fonksiyonları:** `hasProductListAppliedFilters(productList)`, `clearProductListFilters(productList)`.
- **Props:** `productList?: IkasProductList`, `products?: IkasProduct[]`.

## 4. Kodlama Kuralları
- `1fr` yerine her zaman `minmax(0, 1fr)` kullanılacak.
- Görsel ve metin konteynerlerine `min-width: 0` taşma koruması eklenecek.
