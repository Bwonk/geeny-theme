import {
  cartStore,
  getIkasOrderFormattedTotalFinalPrice,
  Router,
  getThemeSetting,
} from "@ikas/bp-storefront";
import { Button } from "../Button";
import { Props } from "./types";

export interface CartSummaryCardProps extends Props {
  className?: string;
}

export function CartSummaryCard({
  cart,
  freeShippingThreshold = 500,
  className = "",
}: CartSummaryCardProps) {
  // Read live global settings via getThemeSetting
  const checkoutBtnHeightSetting = getThemeSetting("_RtoVmtuDGF"); // Boşluk / Checkout Buton Yüksekliği (52px)
  const shippingBarRadiusSetting = getThemeSetting("_6yX0RuKGDr"); // Radius / Kargo İlerleme Çubuğu (4px)
  const mediaRadiusSetting = getThemeSetting("_YFQAxlLvZl"); // Radius / Medya (24px)

  const checkoutBtnHeight = checkoutBtnHeightSetting?.value || "52px";
  const shippingBarRadius = shippingBarRadiusSetting?.value || "4px";
  const mediaRadius = mediaRadiusSetting?.value || "24px";

  const inlineStyles = {
    "--checkout-btn-height": checkoutBtnHeight,
    "--shipping-bar-radius": shippingBarRadius,
    "--media-radius": mediaRadius,
  };

  const activeCart = cart || cartStore.cart;
  const lineItems = activeCart?.orderLineItems ?? [];
  const isEmpty = lineItems.length === 0;

  // Numeric subtotal calculation for free shipping bar
  const totalAmountNum = lineItems.reduce((acc: number, item: any) => {
    const finalPriceVal = item.finalPrice ?? item.variant?.finalPrice ?? 0;
    return acc + finalPriceVal * (item.quantity ?? 1);
  }, 0);

  const freeShippingRatio = Math.min(1, totalAmountNum / freeShippingThreshold);
  const freeShippingPercent = (freeShippingRatio * 100).toFixed(0);
  const remainingAmount = Math.max(0, freeShippingThreshold - totalAmountNum);
  const isFreeShipping = totalAmountNum >= freeShippingThreshold;

  const formattedTotal = activeCart
    ? getIkasOrderFormattedTotalFinalPrice(activeCart)
    : "0 TL";

  return (
    <div
      className={`ikas-cart-summary ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <h3 className="ikas-cart-summary__title _AZR1yL8GrK">
        Sipariş Özeti
      </h3>

      {/* ÜCRETSİZ KARGO İLERLEME BARI */}
      {!isEmpty && (
        <div className="ikas-cart-summary__shipping-bar">
          <p className="ikas-cart-summary__shipping-text _eZyocyyd0F">
            {isFreeShipping
              ? "Tebrikler! Kargonuz ÜCRETSİZ!"
              : `Ücretsiz kargo için ${remainingAmount.toFixed(0)} TL kaldı!`}
          </p>
          <div className="ikas-cart-summary__progress-bg">
            <div
              className="ikas-cart-summary__progress-fill"
              style={{ width: `${freeShippingPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* TUTAR DETAYLARI */}
      <div className="ikas-cart-summary__rows">
        <div className="ikas-cart-summary__row _VcfI5D07Nt">
          <span>Ara Toplam</span>
          <span>{formattedTotal}</span>
        </div>
        <div className="ikas-cart-summary__row _VcfI5D07Nt">
          <span>Kargo Ücreti</span>
          <span>{isFreeShipping ? "Ücretsiz" : "Ödeme Adımında Hesaplanır"}</span>
        </div>
        <div className="ikas-cart-summary__row ikas-cart-summary__row--total _AZR1yL8GrK">
          <span>Genel Toplam</span>
          <span className="ikas-cart-summary__total">{formattedTotal}</span>
        </div>
      </div>

      {/* ÖDEMEYE GEÇ PRIMARY CTA BUTONU */}
      <Button
        text="Ödemeye Geç"
        variant="PRIMARY"
        size="LARGE"
        disabled={isEmpty}
        onClick={() => {
          Router.navigateToPage("CHECKOUT");
        }}
      />
    </div>
  );
}

export default CartSummaryCard;
