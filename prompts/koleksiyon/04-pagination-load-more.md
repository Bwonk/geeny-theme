# BİLEŞEN PROMPTU: PaginationLoadMore (`prompts/koleksiyon/04-pagination-load-more.md`)

## 1. Amaç ve Rol
- **Bileşen:** `PaginationLoadMore` (`src/components/PaginationLoadMore`)
- **Amaç:** Ürün listesinin altında "Daha Fazla Göster" CTA yükleme butonu veya klasik sayfa numaralarını sunmak.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Yerleşim:** `display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; margin-top: 32px;`.
- **Ortak Bağımlılık:** `Button` bileşeni kullanılacak (`@import "../Button/styles.css";`).
- **Sayfa Bilgisi:** `Tipografi / İkincil Metin (sm)` (`C0OZ8W7vYS`), "Gösterilen: X / Y Ürün".

## 3. Veri ve SDK Fonksiyonları
- **SDK Fonksiyonları:** `hasProductListNextPage(productList)`, `getProductListNextPage(productList)`, `getProductListPage(productList, page)`.
- **Props:** `productList?: IkasProductList`.

## 4. Kodlama Kuralları
- "Daha Fazla Göster" tıklandığında `isLoading` state'i aktif edilerek mükerrer tıklamalar engellenecek.
- Sonraki sayfa kalmadığında buton gizlenecek veya pasife alınacak.
