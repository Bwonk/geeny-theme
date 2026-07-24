# BİLEŞEN PROMPTU: CartPageSection (`prompts/sepet/01-cart-page-container.md`)

## 1. Amaç ve Rol
- **Bileşen:** `CartPageSection` (`src/components/CartPageSection`)
- **Amaç:** Sepetteki ürünlerin detaylı tablosunu, sipariş notu yazma alanını ve sipariş özet kartını (ara toplam, kargo barı, ödemeye geç CTA) sunmak.

## 2. Tasarım Spesifikasyonları & Token'lar
- **Düzen:** Masaüstünde 2 Kolon Split Layout (Sol %65 ürün tablosu + not alanı, Sağ %35 `CartSummaryCard` [sticky]). Mobilde (`<991px`) 1 Kolon düzeni.
- **Ürün Görseli:** `80x80px`, `border-radius: var(--item-img-radius, 12px)` (`_0WnqPU26e8`).
- **Ödemeye Geç Butonu:** `height: var(--checkout-btn-height, 52px)` (`_RtoVmtuDGF`), `background: #37435B` (`PxNuSoudLN`), `color: #FFFFFF`.
- **Kargo İlerleme Çubuğu:** `border-radius: var(--shipping-bar-radius, 4px)` (`_6yX0RuKGDr`).
- **Boş Sepet Durumu:** Sepet boşken illüstrasyon, "Sepetiniz Boş" başlığı (`_AHnMWYqzuI`) ve "Alışverişe Başla" CTA butonu.

## 3. Veri ve SDK Fonksiyonları
- **SDK Store:** `cartStore.cart`.
- **SDK Fonksiyonları:**
  - `changeItemQuantity(item, newQuantity)`
  - `removeItem(item)`
  - `getOrderLineItemFormattedFinalPrice(item)`
  - `getIkasOrderLineVariantMainImage(item.variant)`
  - `getIkasOrderFormattedTotalFinalPrice(cart)`
  - `Router.navigateToPage("CHECKOUT")`
  - `Router.navigateToPage("CATEGORY")`

## 4. Kodlama Kuralları
- `cartStore.cart` MobX autorun reaktivitesine abonedir. `CartDrawer` ile 100% senkronize çalışır.
- Miktar eksi (`-`) butonunda minimum 1 adedi zorunlu kılınacaktır.
