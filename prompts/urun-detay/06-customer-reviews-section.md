# BİLEŞEN PROMPTU: CustomerReviewsSection (`prompts/urun-detay/06-customer-reviews-section.md`)

## 1. Amaç ve Rol
- **Bileşen:** `CustomerReviewsSection` (`src/components/CustomerReviewsSection`)
- **Amaç:** Ürün değerlendirme puan istatistiğini (`#E3E062` yıldızlar) ve müşteri yorum kartları ızgarasını sunmak.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Yıldız Rengi:** `#E3E062` (`var(--cGupQGnbYq)`).
- **Yorum Kartı:** `border-radius: var(--media-radius, 32px)`, `background: #FFFFFF` (`var(--24KlcgGmm9)`), `padding: 24px`, `box-shadow: var(--card-shadow)`.
- **Izgara:** `display: grid`, `grid-template-columns: repeat(3, minmax(0, 1fr))` [Mobil: `1fr`].

## 3. Veri ve SDK Fonksiyonları
- **Props:** `product: IkasProduct`.
- **Veri Alanları:** `product.averageRating`, `product.reviewCount`, `product.stars`.

## 4. Kodlama Kuralları
- Izgaralarda `1fr` yerine `minmax(0, 1fr)` kullanılmalı.
- Yorum metinlerinde `word-break: break-word` ile uzun kelimelerin taşması önlenmeli.
