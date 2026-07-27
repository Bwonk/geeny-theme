import { cartStore, Router, getThemeSetting } from "@ikas/bp-storefront";
import CartItemsList from "../../sub-components/CartItemsList";
import CartOrderNote from "../../sub-components/CartOrderNote";
import CartSummaryCard from "../../sub-components/CartSummaryCard";
import Button from "../../sub-components/Button";
import { Props } from "./types";

export interface CartPageSectionProps extends Props {
  cart?: any;
  className?: string;
}

export function CartPageSection({
  cart,
  title = "Alışveriş Sepetiniz",
  emptyCartTitle = "Sepetiniz Şu Anda Boş",
  emptyCartButtonText = "Alışverişe Başla",
  backgroundColor,
  className = "",
}: CartPageSectionProps) {
  // Read live global settings via getThemeSetting
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const mediaRadiusSetting = getThemeSetting("_YFQAxlLvZl"); // Radius / Medya (32px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const mediaRadius = mediaRadiusSetting?.value || "32px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--media-radius": mediaRadius,
    "--max-site-width": maxSiteWidth,
  };

  const activeCart = cart || cartStore.cart;
  const lineItems = activeCart?.orderLineItems ?? [];
  const itemCount = lineItems.reduce((acc: number, item: any) => acc + (item.quantity ?? 1), 0);

  const isEmpty = itemCount === 0;

  return (
    <section
      className={`ikas-cart-page ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <div className="ikas-cart-page__container">
        {/* SAYFA ANA BAŞLIĞI */}
        <h1 className="ikas-cart-page__title _DusX6I08Pv">
          {title} {!isEmpty && `(${itemCount})`}
        </h1>

        {/* DOLU VE BOŞ SEPET GÖRÜNÜMÜ */}
        {!isEmpty ? (
          <div className="ikas-cart-page__grid">
            {/* SOL KOLON: ÜRÜN TABLOSU & NOT ALANI */}
            <div className="ikas-cart-page__left">
              <CartItemsList cart={activeCart} />
              <CartOrderNote />
            </div>

            {/* SAĞ KOLON: SİPARİŞ ÖZET KARTI (STICKY) */}
            <div className="ikas-cart-page__right">
              <CartSummaryCard cart={activeCart} />
            </div>
          </div>
        ) : (
          /* BOŞ SEPET GÖRÜNÜMÜ (EMPTY CART STATE) */
          <div className="ikas-cart-page__empty">
            <svg
              className="ikas-cart-page__empty-icon"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h2 className="ikas-cart-page__empty-title _AHnMWYqzuI">
              {emptyCartTitle}
            </h2>
            <Button
              text={emptyCartButtonText}
              variant="PRIMARY"
              size="LARGE"
              onClick={() => {
                Router.navigateToPage("CATEGORY");
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPageSection;
