# FLOW PROMPT: Kurumsal & İçerik Sayfaları Geliştirme Akışı (`prompts/icerik-sayfasi.md`)

> **Talimat:** Bu flow prompt'u çalıştırıldığında ajan, Kurumsal & İçerik Sayfalarında (About Us, Contact Us, Shipping, Terms, Refund Policies) yer alan her bileşen için `prompts/icerik-sayfasi/` alt klasöründe BİLEŞEN PROMPT ŞABLONU'na göre AYRI detaylı bileşen prompt dosyalarını sırayla üretecektir.

---

## 1. Sayfa Şablonu ve Amaç
- **Sayfa:** Kurumsal & İçerik Sayfaları (`About`, `Contact`, `Shipping Policy`, `Terms of Service`, `Refund Policy`)
- **Amaç:** Hakkımızda hikayesini, iletişim formunu ve yasal politika metinlerini okunaklı tipografi ile sunmak.
- **Bölüm Sırası (Yukarıdan Aşağıya):**
  1. Header & Navigasyon *(Ortak)*
  2. Button Bileşeni *(Ortak Referans)*
  3. Page Header (H1 Sayfa Başlığı)
  4. Page Content Wrapper (Zengin Metin Alanı / İletişim Formu)
  5. Footer *(Ortak)*

---

## 2. FLOW SIRASI ve Bağımlılık Mantığı

1. `prompts/ortak/header.md` — *(Ortak Referans)*
2. `prompts/ortak/button.md` — *(Ortak Referans - Buton bağımlılığı)*
3. `prompts/icerik-sayfasi/01-page-header.md` — Sayfa başlık banner'ı
4. `prompts/icerik-sayfasi/02-page-content-wrapper.md` — Zengin HTML metin alanı ve İletişim Formu bileşeni (`prompts/ortak/button.md` kullanımı)
5. `prompts/ortak/footer.md` — *(Ortak Referans)*

---

## 3. Üretim Talimatı

Ajan aşağıdaki adımları sırayla uygulayacaktır:

### Adım 1: Dosya Listesi Onayı
Önce `prompts/icerik-sayfasi/` klasöründe üretilecek bileşen prompt dosyalarının listesini göster ve **KULLANICI ONAYI BEKLE**.

### Adım 2: Bileşen Prompt Dosyalarını Oluşturma
Onay geldikten sonra aşağıdaki dosyaları `prompts/icerik-sayfasi/` dizininde tek tek oluştur:

1. **`prompts/icerik-sayfasi/01-page-header.md`**:
   - İçerik: Sayfa H1 başlığı (`36px`), gri/beyaz zemin banner'ı.
2. **`prompts/icerik-sayfasi/02-page-content-wrapper.md`**:
   - İçerik:
     - ikas `RICH_TEXT` içerik alanı (paragraflar, H2/H3 başlıklar, listeler).
     - İletişim Sayfası için: Ad, Soyad, E-posta, Telefon ve Mesaj girdilerini içeren İletişim Formu (`initContactForm`, `submitContactForm`, Gönder butonu için `prompts/ortak/button.md` kullanımı).

---

## 4. Sayfa Düzeyi Kurallar ve Token'lar
- **Container Genişliği:** `1200px` (Okunabilirlik için sınırlı genişlik).
- **Tipografi:** `Tipografi / Başlık H1` (36px/500), `Tipografi / Gövde Metni (base)` (18px/400).
- **Form Validator:** `@ikas/bp-storefront` `initContactForm` & `submitContactForm`.
