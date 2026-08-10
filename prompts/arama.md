# FLOW PROMPT: Arama Sayfası Geliştirme Akışı (`prompts/arama.md`)

> **Talimat:** Bu flow prompt'u çalıştırıldığında ajan, Arama Sayfası'nda (Search Page) yer alan her bileşen için `prompts/arama/` alt klasöründe BİLEŞEN PROMPT ŞABLONU'na göre AYRI detaylı bileşen prompt dosyalarını sırayla üretecektir.

---

## 1. Sayfa Şablonu ve Amaç
- **Sayfa:** Arama Sayfası (`Search Page`)
- **Amaç:** Kullanıcının site içi ürün aramalarını gerçekleştirmesini, canlı arama sonuçlarını veya sonuç bulunamadığında önerileri sunmak.
- **Bölüm Sırası (Yukarıdan Aşağıya):**
  1. Header & Navigasyon *(Ortak)*
  2. Button Bileşeni *(Ortak Referans)*
  3. Search Bar Input
  4. Product Card *(Ortak Bağımlılık)*
  5. Search Results Grid (Durum 1: Sonuç Var)
  6. Empty Search State (Durum 2: Sonuç Yok)
  7. Slide-Out Cart Drawer *(Ortak)*
  8. Footer *(Ortak)*

---

## 2. FLOW SIRASI ve Bağımlılık Mantığı

1. `prompts/ortak/header.md` — *(Ortak Referans)*
2. `prompts/ortak/button.md` — *(Ortak Referans - Buton bağımlılığı)*
3. `prompts/arama/01-search-bar-input.md` — Arama girdi alanı ve arama butonu (`prompts/ortak/button.md`)
4. `prompts/ortak/product-card.md` — *(Ortak Referans - Izgara bağımlılığı)*
5. `prompts/arama/02-search-results-grid.md` — Arama sonuçları ürün ızgarası
6. `prompts/arama/03-empty-search-state.md` — Sonuç bulunamadı boş durumu ve popüler kelime önerileri
7. `prompts/ortak/cart-drawer.md` — *(Ortak Referans)*
8. `prompts/ortak/footer.md` — *(Ortak Referans)*

---

## 3. Üretim Talimatı

Ajan aşağıdaki adımları sırayla uygulayacaktır:

### Adım 1: Dosya Listesi Onayı
Önce `prompts/arama/` klasöründe üretilecek bileşen prompt dosyalarının listesini göster ve **KULLANICI ONAYI BEKLE**.

### Adım 2: Bileşen Prompt Dosyalarını Oluşturma
Onay geldikten sonra aşağıdaki dosyaları `prompts/arama/` dizininde tek tek oluştur:

1. **`prompts/arama/01-search-bar-input.md`**:
   - İçerik: Sayfa üstü arama kutusu (`input[type="search"]`, `height: 48px`, `border-radius: 8px`), arama butonu (`prompts/ortak/button.md` kullanımı) ve aramayı temizleme (`X`) ikonu.
2. **`prompts/arama/02-search-results-grid.md`**:
   - İçerik: `prompts/ortak/product-card.md` bileşenlerini listeleyen 4 sütunlu arama sonuç ızgarası. Aranan kelime başlığı ("'pillow' için 4 sonuç bulundu").
3. **`prompts/arama/03-empty-search-state.md`**:
   - İçerik: Sonuç bulunamadığında beliren mesaj ("'xyz' için sonuç bulunamadı. Lütfen kelimelerinizi kontrol edin.") ve altında popüler kategoriler/ürünler öneri blokları.

---

## 4. Sayfa Düzeyi Kurallar ve Token'lar
- **Container Genişliği:** `1820px`.
- **Storefront API:** `@ikas/bp-storefront` `apiSearchProducts`.
- **Renkler:** `#37435B`, `#C8CFD0`.
