# BİLEŞEN PROMPTU: EmptySearchState (`prompts/arama/03-empty-search-state.md`)

## 1. Amaç ve Rol
- **Bileşen:** `EmptySearchState` (`src/components/EmptySearchState`)
- **Amaç:** Arama sonucu 0 veya geçersiz olduğunda kullanıcıya bilgilendirme mesajı ("... için sonuç bulunamadı"), popüler arama etiketleri (clickable chips) ve önerilen popüler ürünler bloğunu göstermek.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Mesaj Başlık:** `Tipografi / Başlık H2` (`sKAMD8d1LA` / `_sKAMD8d1LA`), `color: var(--pxNuSoudLn)`.
- **Açıklama & Etiketler:** `Tipografi / İkincil Metin (sm)` (`C0OZ8W7vYS` / `_C0OZ8W7vYS`).
- **Chip / Etiket Radius:** `8px` (`_ZaLXoaaaAA`).
- **Chip Background:** `Açık Gri Mavi` (`cdFDkBbKKC` / `var(--cdFDkBbKkc)`), Hover `Accent Sarı` (`SY8znXZdoG` / `var(--sy8ZnXZdoG)`).
- **Renkler:** `Ana Lacivert` (`PxNuSoudLN` / `var(--pxNuSoudLn)`), `Saf Beyaz` (`24klcgGMM9` / `var(--24KlcgGmm9)`).

## 3. Veri ve SDK Fonksiyonları
- **Props:** `searchKeyword?: string`, `suggestedCategories?: string[]`, `recommendedProducts?: IkasProduct[]`.
- **Etkileşim:** Öneri etiketine tıklandığında ilgili kelime için arama tetiklenir veya yönlendirilir.

## 4. Kodlama Kuralları
- `lang="tr"` attribute'u `<div lang="tr">` elemanına eklenecek.
- MobX `observer` sarmalaması eklenecek.
