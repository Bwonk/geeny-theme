# FLOW PROMPT: Sepet Sayfası Geliştirme Akışı (`prompts/sepet.md`)

> **Talimat:** Bu flow prompt'u çalıştırıldığında ajan, Sepet Sayfası'nda (Cart Page) yer alan her bileşen için `prompts/sepet/` alt klasöründe BİLEŞEN PROMPT ŞABLONU'na göre AYRI detaylı bileşen prompt dosyalarını sırayla üretecektir.

---

## 1. Sayfa Şablonu ve Amaç
- **Sayfa:** Sepet Sayfası (`Cart Page`)
- **Amaç:** Kullanıcının sepetindeki ürünleri detaylı tablo formatında incelemesini, adet güncellemesini, sipariş notu eklemesini ve doğrudan kasaya (Checkout) geçmesini sağlamak.
- **Bölüm Sırası (Yukarıdan Aşağıya):**
  1. Header & Navigasyon *(Ortak)*
  2. Button Bileşeni *(Ortak Referans)*
  3. Cart Page Container (Ürün Tablosu, Adetler, Not Alanı, Sipariş Özeti & Checkout)
  4. Slide-Out Cart Drawer *(Ortak)*
  5. Footer *(Ortak)*

---

## 2. FLOW SIRASI ve Bağımlılık Mantığı

1. `prompts/ortak/header.md` — *(Ortak Referans)*
2. `prompts/ortak/button.md` — *(Ortak Referans - Buton bağımlılığı)*
3. `prompts/sepet/01-cart-page-container.md` — Sepet sayfası ana tablo ve ödeme özeti prompt'u (`prompts/ortak/button.md` kullanımı)
4. `prompts/ortak/cart-drawer.md` — *(Ortak Referans)*
5. `prompts/ortak/footer.md` — *(Ortak Referans)*

---

## 3. Üretim Talimatı

Ajan aşağıdaki adımları sırayla uygulayacaktır:

### Adım 1: Dosya Listesi Onayı
Önce `prompts/sepet/` klasöründe üretilecek bileşen prompt dosyasının listesini göster ve **KULLANICI ONAYI BEKLE**.

### Adım 2: Bileşen Prompt Dosyasını Oluşturma
Onay geldikten sonra aşağıdaki dosyayı `prompts/sepet/` dizininde oluştur:

1. **`prompts/sepet/01-cart-page-container.md`**:
   - İçerik:
     - Sol Kolon: Sepet ürün tablosu (Görsel `80x80px`, Ürün Adı, Varyant, Birim Fiyat, Miktar Seçici `-`/`+`, Toplam Fiyat, Silme Butonu).
     - Sipariş Notu Metin Alanı (`textarea`, `border-radius: 8px`).
     - Sağ Kolon: Sipariş Özet Kartı (Ara Toplam, Kargo Hesaplaması, "Kasaya Git" Primary CTA Butonu `prompts/ortak/button.md` kullanımı, `height: 52px`, `#37435B`).
     - Boş Sepet Görünümü: Sepet boşken illüstrasyon, "Sepetiniz Boş" mesajı ve "Alışverişe Devam Et" butonu.

---

## 4. Sayfa Düzeyi Kurallar ve Token'lar
- **Container Genişliği:** `1820px`.
- **Storefront SDK:** `@ikas/bp-storefront` `cartStore` (`getCart()`, `changeCartItemQuantity()`, `removeItem()`).
- **Renkler:** `#37435B` (Primary Navy), `#E3E045` (Accent Yellow).
