# BİLEŞEN PROMPTU: SearchResultsGrid (`prompts/arama/02-search-results-grid.md`)

## 1. Amaç ve Rol
- **Bileşen:** `SearchResultsGrid` (`src/components/SearchResultsGrid`)
- **Amaç:** Arama araması gerçekleştirildiğinde bulunan ürünleri 4 sütunlu `ProductCard` ızgarasında sunmak, aranan kelime başlığını ve dinamik sonuç sayısını göstermek.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Site Maksimum Genişliği:** `1820px` (`_l6CcMRzdeZ`).
- **Izgara Aralığı (Grid Gap):** `20px` (`_4Ud47RIVna`).
- **Başlık H2:** `Tipografi / Başlık H2` (`sKAMD8d1LA` / `_sKAMD8d1LA`), `color: var(--pxNuSoudLn)`.
- **Sonuç Sayısı Rozeti:** `Tipografi / Etiket ve Rozet (xs)` (`eZyocyyd0F` / `_eZyocyyd0F`), `color: var(--vluFeuIeFs)`.
- **Kart Köşe Yuvarlama:** `2rem` (`32px`) (`_WyFUVwOpPk`).
- **Renkler:** `Saf Beyaz` (`24klcgGMM9` / `var(--24KlcgGmm9)`), `Ana Lacivert` (`PxNuSoudLN` / `var(--pxNuSoudLn)`).

## 3. Veri ve SDK Fonksiyonları
- **Props:** `productList?: IkasProductList`, `searchKeyword?: string`.
- **Ürün Verisi:** `productList?.products` dizisindeki her ürün için `ProductCard` render edilir.
- **Sayfalama:** `PaginationLoadMore` bileşeni ile `productList?.hasMore` ve `productList?.loadMore` entegre edilir.

## 4. Kodlama Kuralları
- `lang="tr"` attribute'u `<section lang="tr">` elemanına eklenecek.
- MobX `observer` ile sarmalanacak.
