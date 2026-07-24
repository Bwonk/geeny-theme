# BİLEŞEN PROMPTU: ProductValueAccordions (`prompts/urun-detay/05-product-value-accordions.md`)

## 1. Amaç ve Rol
- **Bileşen:** `ProductValueAccordions` (`src/components/ProductValueAccordions`)
- **Amaç:** Ürün özellikleri, bakımı, kargo ve iade koşullarını katlanabilir başlıklar (collapsible tabs) altında sunmak.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Başlık:** `Tipografi / Kart ve Alt Başlık (lg)` (`AZR1yL8GrK` - `Onest` 24px/500), sağda `+`/`-` veya ok ikonu.
- **Bölücüler:** `border-bottom: 1px solid #C8CFD0` (`var(--cdFDkBbKkc)`).
- **Animasyon:** `max-height 0.35s ease-in-out` (`Animasyon / Akordiyon Açılış` - `_QzHzEnrknJ`).

## 3. Veri ve SDK Fonksiyonları
- **Props:** `items?: Array<{ title: string; content: string }>`, `product?: IkasProduct`.

## 4. Kodlama Kuralları
- Tek seferde bir akordiyonun veya birden fazla akordiyonun açılması desteklenmeli.
- CSS overflow: hidden ile yumuşak yükseklik geçişi sağlanmalı.
