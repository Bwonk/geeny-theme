# BİLEŞEN PROMPTU: SearchBarInput (`prompts/arama/01-search-bar-input.md`)

## 1. Amaç ve Rol
- **Bileşen:** `SearchBarInput` (`src/components/SearchBarInput`)
- **Amaç:** Arama sayfasında kullanıcının site içi ürün aramalarını gerçekleştirmesini sağlayan, temizleme (`X`) ikonu ve arama butonu barındıran girdi alanı.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Input Girdi Alanı:** Yükseklik `48px` (`_2xLGYXCG2n`), köşe yuvarlama `8px` (`_iI8H4rllzj`).
- **Arka Plan:** `Saf Beyaz` (`24klcgGMM9` / `var(--24KlcgGmm9)`).
- **Kenarlık (Border):** Varsayılan `Açık Gri Mavi` (`cdFDkBbKKC` / `var(--cdFDkBbKkc)`), Aktif/Focus `Ana Lacivert` (`PxNuSoudLN` / `var(--pxNuSoudLn)`).
- **Yazı Rengi:** `Ana Lacivert` (`PxNuSoudLN` / `var(--pxNuSoudLn)`).
- **Placeholder:** `Tipografi / İkincil Metin (sm)` (`C0OZ8W7vYS` / `_C0OZ8W7vYS`).
- **Input Metni:** `Tipografi / Gövde Metni (base)` (`VcfI5D07Nt` / `_VcfI5D07Nt`).
- **Buton & İkonlar:** `Button` bileşeni entegrasyonu (Accent Sarı `SY8znXZdoG` / `var(--sy8ZnXZdoG)`).

## 3. Veri ve SDK Fonksiyonları
- **Props:** `productList?: IkasProductList`, `placeholder?: string`, `onSearch?: (keyword: string) => void`.
- **SDK Fonksiyonu:** `import { searchProductList } from "@ikas/bp-storefront";`
- **Etkileşim:** Kullanıcı metin girdikçe `X` temizleme ikonu belirir. Metin temizlendiğinde filtre sıfırlanır. Enter tuşu veya arama butonuna tıklama ile `searchProductList(productList, keyword)` tetiklenir.

## 4. Kodlama Kuralları
- `lang="tr"` attribute'u `<form lang="tr">` veya root elemente eklenecek.
- Türkçe karakterler için `.toLocaleLowerCase("tr-TR")` duyarlılığı gözetilecek.
- MobX `observer` ile sarmalanacak.
