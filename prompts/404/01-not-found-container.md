# BİLEŞEN PROMPT: Not Found Container (`prompts/404/01-not-found-container.md`)

## 1. Genel Bilgiler
- **Bileşen Adı:** NotFoundContainer
- **Sayfa:** 404 Bulunamadı Sayfası (`404 Page Not Found`)
- **İşlev:** Kullanıcı var olmayan bir adrese ulaştığında gösterilen merkezlenmiş 404 hata mesajı ve ana sayfaya dönüş butonu.

---

## 2. Prop Tanımları
- **`codeText`** (`TEXT`, Varsayılan: `"404"`): Büyük hata kodu / rozeti.
- **`title`** (`TEXT`, Varsayılan: `"SAYFA BULUNAMADI"`): H1 Hata başlığı.
- **`subtitle`** (`TEXT`, Varsayılan: `"Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir."`): Alt açıklama paragrafı.
- **`buttonText`** (`TEXT`, Varsayılan: `"ANA SAYFAYA DÖN"`): Ana sayfaya dönüş buton metni.
- **`buttonLink`** (`LINK`): Ana sayfa yönlendirme bağlantısı.
- **`backgroundColor`** (`COLOR`): Arka plan rengi.

---

## 3. Canlı Token Eşleşmeleri (`prompts/TOKENS.md`)
- `Tipografi / Display Hero`: `_78XkSXv7w4` (TOKENS.md Satır 26)
- `Tipografi / Başlık H1`: `_DusX6I08Pv` (TOKENS.md Satır 27)
- `Tipografi / Gövde Metni (base)`: `_VcfI5D07Nt` (TOKENS.md Satır 32)
- `Renkler / Ana Lacivert`: `var(--pxNuSoudLn)` (TOKENS.md Satır 10)
- `Renkler / Accent Sarı`: `var(--sy8ZnXZdoG)` (TOKENS.md Satır 11)
- `Renkler / Açık Gri Mavi`: `var(--cdFDkBbKkc)` (TOKENS.md Satır 12)
- `Renkler / Saf Beyaz`: `var(--24KlcgGmm9)` (TOKENS.md Satır 14)
- `Boşluk / Site Maks. Genişliği`: `_l6CcMRzdeZ` (TOKENS.md Satır 42)
- `Boşluk / Dikey Spacing`: `_5Fdl1j6UHQ` / `_Kl0my3VVMA` (TOKENS.md Satır 45-46)
- `Boşluk / Yatay Padding`: `_Nd1XnRyZlx` / `_uRDipxnxkx` (TOKENS.md Satır 43-44)
- `Radius / Buton`: `_ZaLXoaaaAA` (TOKENS.md Satır 65)

---

## 4. Gotcha & Kurallar
1. **Ortak Buton:** "Ana Sayfaya Dön" butonu için ortak `Button` bileşeni kullanılmalıdır (`prompts/ortak/button.md`).
2. **Türkçe Uppercase:** Başlık ve buton metninde JS `.toLocaleUpperCase("tr-TR")` tercih edilmelidir (`gotchas.md #5`).
3. **Merkezlenmiş Layout:** 1200px container içinde `display: flex; flex-direction: column; align-items: center; text-align: center;`.
