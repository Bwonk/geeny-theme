# BİLEŞEN PROMPTU: FilterAndSortBar (`prompts/koleksiyon/02-filter-and-sort-bar.md`)

## 1. Amaç ve Rol
- **Bileşen:** `FilterAndSortBar` (`src/components/FilterAndSortBar`)
- **Amaç:** Ürün listesini sıralamak (Dropdown) ve filtrelemek (Desktop/Mobile Drawer).

## 2. Tasarım Spesifikasyonları & Token'lar
- **Stil & Hizalama:** `display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--cdFDkBbKkc);`.
- **Dropdown & Filtre Butonu:** `Tipografi / İkincil Metin (sm)` (`C0OZ8W7vYS`), `border-radius: var(--form-radius, 8px)`.
- **Mobil Filtre Drawer:** `<768px` altında ekranı kaplayan slide-out panel, `z-index: var(--z-index-drawer, 10000)`. CartDrawer ile z-index çakışmaması sağlanmalı.

## 3. Veri ve SDK Fonksiyonları
- **SDK Fonksiyonları:**
  - `getProductListSortOptions(productList)`
  - `setSortType(productList, sortType)`
  - `getProductListFilterCategories(productList)`
  - `getSelectedFilterValues(productList)`
  - `handleFilterValueClick(productList, filterValue)`
  - `clearProductListFilters(productList)`
  - `hasProductListAppliedFilters(productList)`
- **Props:** `productList?: IkasProductList`.

## 4. Kodlama Kuralları & Testler
- Filtre tıklandığında sunucu tarafı (server-side) re-fetch gerçekleşir; MobX `productList.data` otomatik yenilenir.
- Mobil filtre panelinde z-index çakışması olmaması için `--z-index-drawer: 10000` kullanılmalı.
