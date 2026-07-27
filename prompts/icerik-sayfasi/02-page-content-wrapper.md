# BİLEŞEN PROMPT: Page Content Wrapper (`prompts/icerik-sayfasi/02-page-content-wrapper.md`)

## 1. Genel Bilgiler
- **Bileşen Adı:** PageContentWrapper
- **Sayfa:** Kurumsal & İçerik Sayfaları (`About`, `Contact`, `Terms`, `Shipping`, `Refund`)
- **İşlev:** İçerik sayfalarında Zengin Metin (RICH_TEXT) ve İletişim Formu alanlarını sunan ana gövde sarmalayıcısı.

---

## 2. Prop Tanımları
- **`content`** (`RICH_TEXT`): ikas zengin metin editör içeriği (paragraflar, H2/H3 başlıklar, listeler).
- **`showContactForm`** (`BOOLEAN`, Varsayılan: `false`): İletişim formu gösterilsin mi?
- **`formTitle`** (`TEXT`, Varsayılan: `"İLETİŞİME GEÇİN"`): Form başlığı.
- **`formDescription`** (`TEXT`, Varsayılan: `"Sorularınız ve önerileriniz için aşağıdaki formu doldurabilirsiniz."`): Form açıklaması.
- **`submitButtonText`** (`TEXT`, Varsayılan: `"GÖNDER"`): Gönder buton metni.
- **`successMessage`** (`TEXT`, Varsayılan: `"Mesajınız başarıyla iletilmiştir. En kısa sürede dönüş yapacağız."`): Başarı mesajı.
- **`errorMessage`** (`TEXT`, Varsayılan: `"Lütfen tüm zorunlu alanları eksiksiz ve doğru doldurunuz."`): Hata mesajı.

---

## 3. SDK & API Kullanımı (MCP Doğrulanmış)
- `@ikas/bp-storefront` paketinden:
  - `customerStore`
  - `getContactForm(customerStore)`
  - `initContactForm(contactForm)`
  - `submitContactForm(contactForm)`
  - `setContactFormFirstName(contactForm, value)`
  - `setContactFormLastName(contactForm, value)`
  - `setContactFormEmail(contactForm, value)`
  - `setContactFormPhone(contactForm, value)`
  - `setContactFormMessage(contactForm, value)`

---

## 4. Canlı Token Eşleşmeleri (`prompts/TOKENS.md`)
- `Tipografi / Başlık H2`: `_sKAMD8d1LA` (TOKENS.md Satır 28)
- `Tipografi / Başlık H3`: `_AHnMWYqzuI` (TOKENS.md Satır 29)
- `Tipografi / Gövde Metni (base)`: `_VcfI5D07Nt` (TOKENS.md Satır 32)
- `Tipografi / İkincil Metin (sm)`: `C0OZ8W7vYS` (TOKENS.md Satır 33)
- `Renkler / Saf Beyaz`: `var(--24KlcgGmm9)` (TOKENS.md Satır 14)
- `Renkler / Saf Siyah`: `var(--vluFeuIeFs)` (TOKENS.md Satır 15)
- `Renkler / Koyu Zemin Çizgisi`: `var(--pFqY0XGdSq)` (TOKENS.md Satır 19)
- `Radius / Input ve Form`: `_iI8H4rllzj` (TOKENS.md Satır 66)
- `Boşluk / Site Maks. Genişliği`: `_l6CcMRzdeZ` (TOKENS.md Satır 42)
- `Boşluk / Dikey Spacing`: `_5Fdl1j6UHQ` / `_Kl0my3VVMA` (TOKENS.md Satır 45-46)
- `Boşluk / Grid Gap`: `_4Ud47RIVna` / `_dBvnJWALXD` (TOKENS.md Satır 47-48)

---

## 5. Gotcha & Kurallar
1. **Ortak Buton:** Gönder butonu için ortak `Button` bileşeni kullanılmalıdır (`prompts/ortak/button.md`).
2. **Çift Tıklama Koruması:** `submitContactForm` sırasında `isSubmitting` state'i ile buton kilitlenmelidir (`gotchas.md #10`).
3. **Form Grid:** Ad ve Soyad alanları grid içinde `minmax(0, 1fr)` ve `min-width: 0` ile hizalanmalıdır (`gotchas.md #3`).
4. **Türkçe Uppercase:** Form başlığı ve buton JS `.toLocaleUpperCase("tr-TR")` ile dönüştürülmelidir (`gotchas.md #5`).
