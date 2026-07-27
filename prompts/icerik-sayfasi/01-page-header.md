# BİLEŞEN PROMPT: Page Header (`prompts/icerik-sayfasi/01-page-header.md`)

## 1. Genel Bilgiler
- **Bileşen Adı:** PageHeader
- **Sayfa:** Kurumsal & İçerik Sayfaları (`About`, `Contact`, `Terms`, `Shipping`, `Refund`)
- **İşlev:** Sayfa H1 başlığını ve opsiyonel dikey alt açıklamayı gösteren hero/banner alanı.

---

## 2. Prop Tanımları
- **`title`** (`TEXT`, Varsayılan: `"SAYFA BAŞLIĞI"`): H1 Başlık Metni.
- **`description`** (`TEXT`, Opsiyonel): Başlık altındaki açıklama metni.
- **`alignment`** (`SELECT`, Seçenekler: `left`, `center`, Varsayılan: `center`): Hizalama.
- **`backgroundColor`** (`COLOR`, Varsayılan: `#f4f6f8`): Arka plan rengi.

---

## 3. Canlı Token Eşleşmeleri (`prompts/TOKENS.md`)
- `Tipografi / Başlık H1`: `_DusX6I08Pv` (TOKENS.md Satır 27)
- `Tipografi / Gövde Metni (base)`: `_VcfI5D07Nt` (TOKENS.md Satır 32)
- `Renkler / Ana Lacivert`: `var(--pxNuSoudLn)` (TOKENS.md Satır 10)
- `Renkler / Açık Gri Mavi`: `var(--cdFDkBbKkc)` (TOKENS.md Satır 12)
- `Boşluk / Spacing`: `_5Fdl1j6UHQ` (Mobil), `_Kl0my3VVMA` (Masaüstü) (TOKENS.md Satır 45-46)
- `Boşluk / Yatay Padding`: `_Nd1XnRyZlx` (Masaüstü), `_uRDipxnxkx` (Mobil) (TOKENS.md Satır 43-44)
- `Boşluk / Site Maks. Genişliği`: `_l6CcMRzdeZ` (TOKENS.md Satır 42)

---

## 4. Gotcha & Kurallar
1. **Türkçe Uppercase:** Metinler CSS `text-transform` ile değil, JS `.toLocaleUpperCase("tr-TR")` ile dönüştürülmelidir (`gotchas.md #5`).
2. **Token türetme yok:** `cssVar` ve `className` değerleri `TOKENS.md`'den birebir alınacaktır (`gotchas.md #1`).
3. **Responsive Container:** `max-width: 1200px; margin: 0 auto;` okuma kolaylığı sağlar.
