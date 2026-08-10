# BİLEŞEN PROMPTU: BreadcrumbNav (`prompts/urun-detay/01-breadcrumb-nav.md`)

## 1. Amaç ve Rol
- **Bileşen:** `BreadcrumbNav` (`src/components/BreadcrumbNav`)
- **Amaç:** Ürün detay sayfasında kullanıcının konumunu gösteren `Home / Kategoriler / Ürün Adı` navigasyon adımlarını sunmak.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Genişlik & Boşluk:** `max-width: var(--max-site-width, 1820px)`, `padding: 16px var(--section-px, 20px)`.
- **Tipografi:** `Tipografi / İkincil Metin (sm)` (`C0OZ8W7vYS` - `Roboto Flex` 16px/400).
- **Renkler:** Pasif linkler `#37435B` opacity 0.7 (`var(--pxNuSoudLn)`), Aktif ürün adı `#37435B` font-weight 500, Ayırıcı `/` rengi `#C8CFD0` (`var(--cdFDkBbKkc)`).

## 3. Veri ve SDK Fonksiyonları
- **SDK Fonksiyonları:** `getProductCategoryPath(product)`, `getIkasCategoryPathItemHref(categoryItem)`.
- **Props:** `product: IkasProduct`, `homepageText?: string` ("Ana Sayfa").

## 4. Kodlama Kuralları & Güvenlik
- `lang="tr"` attribute'u root `<nav lang="tr">` elemanına eklenecek.
- Inline CSS veya uydurma token kullanılmayacak.
- Tekil eleman taşmalarına karşı `white-space: nowrap`, `overflow-x: auto` mobil scroll koruması eklenecek.
