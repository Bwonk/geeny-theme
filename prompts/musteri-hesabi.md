# FLOW PROMPT: Müşteri Hesabı Sayfası Geliştirme Akışı (`prompts/musteri-hesabi.md`)

> **Talimat:** Bu flow prompt'u çalıştırıldığında ajan, Müşteri Hesabı (Account / Login / Orders / Profile) bölümünde yer alan her bileşen için `prompts/musteri-hesabi/` alt klasöründe BİLEŞEN PROMPT ŞABLONU'na göre AYRI detaylı bileşen prompt dosyalarını sırayla üretecektir.

---

## 1. Sayfa Şablonu ve Amaç
- **Sayfa:** Müşteri Hesabı (`Customer Account / Login / Orders / Profile`)
- **Amaç:** E-posta doğrulamalı kullanıcı girişini, OTP kod doğrulamasını, kullanıcı profil bilgilerini, adres defterini ve sipariş geçmişini yönetmek.
- **Bölüm Sırası (Yukarıdan Aşağıya):**
  1. Header & Navigasyon *(Ortak)*
  2. Button Bileşeni *(Ortak Referans)*
  3. Account Login Form (Giriş Yapılmamışsa)
  4. Account Nav Tabs (Giriş Yapılmışsa: "Orders" / "Profile" Sekmeleri)
  5. Orders History Section (Sipariş Geçmişi Tablosu & Boş Sipariş Durumu)
  6. Profile Details Section (İletişim Bilgileri, Adres Ekleme/Düzenleme Formları, Oturum Kapatma)
  7. Footer *(Ortak)*

---

## 2. FLOW SIRASI ve Bağımlılık Mantığı

1. `prompts/ortak/header.md` — *(Ortak Referans)*
2. `prompts/ortak/button.md` — *(Ortak Referans - Buton bağımlılığı)*
3. `prompts/musteri-hesabi/01-account-login-form.md` — E-posta ve 6 haneli OTP kodu giriş formu (`prompts/ortak/button.md` kullanımı)
4. `prompts/musteri-hesabi/02-account-nav-tabs.md` — "Siparişlerim" ve "Profilim" sekme navigasyonu
5. `prompts/musteri-hesabi/03-orders-history-section.md` — Sipariş geçmişi listesi ve boş sipariş durumu (`prompts/ortak/button.md` kullanımı)
6. `prompts/musteri-hesabi/04-profile-details-section.md` — Profil güncelleme, adres ekleme modali ve çıkış butonları (`prompts/ortak/button.md` kullanımı)
7. `prompts/ortak/footer.md` — *(Ortak Referans)*

---

## 3. Üretim Talimatı

Ajan aşağıdaki adımları sırayla uygulayacaktır:

### Adım 1: Dosya Listesi Onayı
Önce `prompts/musteri-hesabi/` klasöründe üretilecek bileşen prompt dosyalarının listesini göster ve **KULLANICI ONAYI BEKLE**.

### Adım 2: Bileşen Prompt Dosyalarını Oluşturma
Onay geldikten sonra aşağıdaki dosyaları `prompts/musteri-hesabi/` dizininde tek tek oluştur:

1. **`prompts/musteri-hesabi/01-account-login-form.md`**:
   - İçerik: E-posta girdisi (`input[type="email"]`, `height: 48px`, `border-radius: 8px`), Devam Et Butonu (`prompts/ortak/button.md`), 6 Haneli OTP Kod Doğrulama Girdisi (`inputmode="numeric"`, `maxlength="6"`). `@ikas/bp-storefront` `initLoginForm`, `submitLoginForm`, `validateOTPCode`.
2. **`prompts/musteri-hesabi/02-account-nav-tabs.md`**:
   - İçerik: "Siparişlerim" (Orders) ve "Profilim" (Profile) üst/sol sekme navigasyonu.
3. **`prompts/musteri-hesabi/03-orders-history-section.md`**:
   - İçerik: Sipariş listesi tablosu (Sipariş No, Tarih, Durum, Toplam Fiyat, Detay Linki) ve Boş Sipariş Durumu ("Alışverişe Başla" CTA butonu - `prompts/ortak/button.md`).
4. **`prompts/musteri-hesabi/04-profile-details-section.md`**:
   - İçerik: Kullanıcı Adı, Soyadı, E-posta ve Telefon güncelleme formu (`initAccountInfoForm`, `submitAccountInfoForm`), Adres Defteri (Adres Kartı, "Yeni Adres Ekle" modali, `initAddressForm`, `submitAddressForm`) ve "Oturumu Kapat" (Sign Out) aksiyon butonları (`prompts/ortak/button.md`).

---

## 4. Sayfa Düzeyi Kurallar ve Token'lar
- **Container Genişliği:** `1400px`.
- **Storefront SDK:** `@ikas/bp-storefront` `customerStore`, `getOrders()`, `getAccountInfoForm()`, `getEmptyAddressForm()`.
- **Renkler:** `#37435B`, `#C8CFD0`, `#FFFFFF`.
