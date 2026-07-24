# BİLEŞEN PROMPTU: CollectionHero (`prompts/koleksiyon/01-collection-hero.md`)

## 1. Amaç ve Rol
- **Bileşen:** `CollectionHero` (`src/components/CollectionHero`)
- **Amaç:** Koleksiyon sayfasının en üstünde kategori adını (H1), kısa açıklama metnini ve isteğe bağlı zemin banner görselini sunmak.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Arka Plan:** `Scheme 2` (Light Slate `#C8CFD0` / `var(--cdFDkBbKkc)`) veya custom `backgroundColor`.
- **Başlık H1:** `Tipografi / Başlık H1` (`DusX6I08Pv` - `Onest` 48px/500), `color: var(--pxNuSoudLn)`.
- **Açıklama:** `Tipografi / Gövde Metni (base)` (`VcfI5D07Nt` - `Roboto Flex` 18px/400), `max-width: 680px`.
- **Boşluklar:** `padding: var(--section-py, 48px) var(--section-px, 20px)` [Mobil: `32px 16px`].

## 3. Veri ve SDK Fonksiyonları
- **Props:** `title?: string`, `description?: string`, `image?: IkasImage`, `productList?: IkasProductList`.
- **Veri Alma:** `productList?.category?.name`, `productList?.category?.description`, `productList?.category?.image`.

## 4. Kodlama Kuralları
- `lang="tr"` attribute'u root `<section lang="tr">` elemanına eklenecek.
- Metin büyük harf dönüşümü gerekirse JS tarafında `.toLocaleUpperCase("tr-TR")` kullanılacak.
