# FLOW PROMPT: Koleksiyon Sayfası Geliştirme Akışı (`prompts/koleksiyon.md`)

> **Talimat:** Bu flow prompt'u çalıştırıldığında ajan, Koleksiyon Sayfası'nda (Shop All) yer alan her bileşen için `prompts/koleksiyon/` alt klasöründe BİLEŞEN PROMPT ŞABLONU'na göre AYRI detaylı bileşen prompt dosyalarını sırayla üretecektir.

---

## 1. Sayfa Şablonu ve Amaç
- **Sayfa:** Koleksiyon Sayfası (`Collection / Shop All`)
- **Amaç:** Mağazadaki tüm seyahat ürünlerini sıralamak, filtrelemek ve liste halinde kullanıcıya sunmak.
- **Bölüm Sırası (Yukarıdan Aşağıya):**
  1. Header & Navigasyon *(Ortak)*
  2. Button Bileşeni *(Ortak Referans)*
  3. Collection Hero Banner
  4. Filter & Sort Bar
  5. Product Card *(Ortak Bağımlılık)*
  6. Product Grid
  7. Pagination / Load More Button
  8. Slide-Out Cart Drawer *(Ortak)*
  9. Footer *(Ortak)*

---

## 2. FLOW SIRASI ve Bağımlılık Mantığı

1. `prompts/ortak/header.md` — *(Ortak Referans)*
2. `prompts/ortak/button.md` — *(Ortak Referans - Buton bağımlılığı)*
3. `prompts/koleksiyon/01-collection-hero.md` — Koleksiyon başlığı & açıklama banner'ı
4. `prompts/koleksiyon/02-filter-and-sort-bar.md` — Filtre ve sıralama barı
5. `prompts/ortak/product-card.md` — *(Ortak Referans - Izgara bağımlılığı)*
6. `prompts/koleksiyon/03-product-grid.md` — Ürün kartları ızgarası
7. `prompts/koleksiyon/04-pagination-load-more.md` — Sayfalama ve daha fazla yükle butonu
8. `prompts/ortak/cart-drawer.md` — *(Ortak Referans)*
9. `prompts/ortak/footer.md` — *(Ortak Referans)*

---

## 3. Üretim Talimatı

Ajan aşağıdaki adımları sırayla uygulayacaktır:

### Adım 1: Dosya Listesi Onayı
Önce `prompts/koleksiyon/` klasöründe üretilecek bileşen prompt dosyalarının listesini göster ve **KULLANICI ONAYI BEKLE**.

### Adım 2: Bileşen Prompt Dosyalarını Oluşturma
Onay geldikten sonra aşağıdaki dosyaları `prompts/koleksiyon/` dizininde tek tek oluştur:

1. **`prompts/koleksiyon/01-collection-hero.md`**:
   - İçerik: Koleksiyon H1 başlığı (`36px`), açıklama metni (`18px`) ve arka plan zemin rengi (`Scheme 2 #C8CFD0`).
2. **`prompts/koleksiyon/02-filter-and-sort-bar.md`**:
   - İçerik: Ürün sıralama dropdown menüsü ("Fiyat: Düşükten Yükseğe", "Öne Çıkanlar" vb.) ve filtreleme seçenekleri.
3. **`prompts/koleksiyon/03-product-grid.md`**:
   - İçerik: `prompts/ortak/product-card.md` kartlarını 4 sütunlu (Masaüstü) / 2 sütunlu (Mobil) düzende listeleyen ürün ızgarası. ikas `PRODUCT_LIST` prop tipi.
4. **`prompts/koleksiyon/04-pagination-load-more.md`**:
   - İçerik: "Daha Fazla Göster" CTA butonu (`prompts/ortak/button.md` kullanımı) veya sayfa numaraları navigasyonu.

---

## 4. Sayfa Düzeyi Kurallar ve Token'lar
- **Container Genişliği:** `Boşluk / Site Maksimum Genişliği` (`1820px`).
- **Yatay Padding:** `Boşluk / Yatay Bölüm Padding` (`20px` / `16px`).
- **Grid Gap:** Masaüstü `20px`, Tablet `16px`, Mobil `12px`.
