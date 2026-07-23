import { useState, useEffect } from "preact/hooks";
import { createPortal } from "preact/compat";
import {
  cartStore,
  changeItemQuantity,
  removeItem,
  getOrderLineItemFormattedFinalPrice,
  getIkasOrderLineVariantMainImage,
  getIkasOrderFormattedTotalFinalPrice,
  getDefaultSrc,
  Router,
  getThemeSetting,
} from "@ikas/bp-storefront";
import { Button } from "../Button";
import { Props } from "./types";

export interface CartDrawerProps extends Props {
  isOpen?: boolean;
  className?: string;
  onClose?: () => void;
}

export function CartDrawer({
  freeShippingThreshold = 500,
  emptyCartTitle = "Sepetiniz Şu Anda Boş",
  emptyCartButtonText = "Alışverişe Başla",
  isOpen = false,
  className = "",
  onClose,
}: CartDrawerProps) {
  const [activeOpen, setActiveOpen] = useState(isOpen);

  // Sync prop isOpen with internal state
  useEffect(() => {
    setActiveOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setActiveOpen(false);
    if (onClose) onClose();
  };

  // Custom Event listeners for inter-component communication (Header, ProductCard, PDP)
  useEffect(() => {
    const handleOpen = () => setActiveOpen(true);
    const handleToggle = () => setActiveOpen((prev: boolean) => !prev);
    const handleClose = () => setActiveOpen(false);

    window.addEventListener("geeny:cart-drawer:open", handleOpen);
    window.addEventListener("geeny:cart-drawer:toggle", handleToggle);
    window.addEventListener("geeny:cart-drawer:close", handleClose);

    return () => {
      window.removeEventListener("geeny:cart-drawer:open", handleOpen);
      window.removeEventListener("geeny:cart-drawer:toggle", handleToggle);
      window.removeEventListener("geeny:cart-drawer:close", handleClose);
    };
  }, []);

  // Keyboard ESC listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOpen]);

  // Body scroll lock when drawer is open
  useEffect(() => {
    if (activeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeOpen]);

  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const drawerWidthSetting = getThemeSetting("_YDHxutBHyk"); // Boşluk / Cart Drawer Genişliği (420px)
  const checkoutBtnHeightSetting = getThemeSetting("_RtoVmtuDGF"); // Boşluk / Checkout Buton Yüksekliği (52px)
  const itemImgRadiusSetting = getThemeSetting("_0WnqPU26e8"); // Radius / Sepet İtem Görseli (12px)
  const shippingBarRadiusSetting = getThemeSetting("_6yX0RuKGDr"); // Radius / Kargo İlerleme Çubuğu (4px)
  const drawerAnimSetting = getThemeSetting("_rTI75Www8J"); // Animasyon / Drawer ve Modal

  const drawerWidth = drawerWidthSetting?.value || "420px";
  const checkoutBtnHeight = checkoutBtnHeightSetting?.value || "52px";
  const itemImgRadius = itemImgRadiusSetting?.value || "12px";
  const shippingBarRadius = shippingBarRadiusSetting?.value || "4px";
  const drawerAnim = drawerAnimSetting?.value || "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";

  const inlineStyles = {
    "--drawer-width": drawerWidth,
    "--checkout-btn-height": checkoutBtnHeight,
    "--item-img-radius": itemImgRadius,
    "--shipping-bar-radius": shippingBarRadius,
    "--drawer-transition": drawerAnim,
  };

  // Cart Data Reads (MobX reactive)
  const cart = cartStore.cart;
  const lineItems = cart?.orderLineItems ?? [];
  const itemCount = lineItems.reduce((acc, item) => acc + (item.quantity ?? 1), 0);
  const isEmpty = itemCount === 0;

  // Calculate numeric total price for free shipping bar
  const totalAmountNum = lineItems.reduce((acc, item) => {
    const finalPriceVal = (item as any).finalPrice ?? (item.variant as any)?.finalPrice ?? 0;
    return acc + finalPriceVal * (item.quantity ?? 1);
  }, 0);

  const freeShippingRatio = Math.min(1, totalAmountNum / freeShippingThreshold);
  const freeShippingPercent = (freeShippingRatio * 100).toFixed(0);
  const remainingAmount = Math.max(0, freeShippingThreshold - totalAmountNum);
  const isFreeShipping = totalAmountNum >= freeShippingThreshold;

  const formattedTotal = cart ? getIkasOrderFormattedTotalFinalPrice(cart) : "0 TL";

  const content = (
    <>
      {/* BACKDROP OVERLAY */}
      <div
        className={`ikas-cart-drawer__backdrop ${
          activeOpen ? "ikas-cart-drawer__backdrop--open" : ""
        }`}
        onClick={handleClose}
      />

      {/* DRAWER DIALOG PANEL */}
      <div
        className={`ikas-cart-drawer ${
          activeOpen ? "ikas-cart-drawer--open" : ""
        } ${className}`.trim()}
        style={inlineStyles}
        role="dialog"
        aria-modal="true"
        aria-label="Alışveriş Sepeti"
      >
        {/* 1. HEADER */}
        <div className="ikas-cart-drawer__header">
          <div className="ikas-cart-drawer__title-group">
            <h2 className="ikas-cart-drawer__title _AHnMWYqzuI">Sepetiniz</h2>
            <span className="ikas-cart-drawer__count _C0OZ8W7vYS">
              ({itemCount} Ürün)
            </span>
          </div>
          <button
            type="button"
            className="ikas-cart-drawer__close-btn"
            aria-label="Sepeti Kapat"
            onClick={handleClose}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 2. FREE SHIPPING PROGRESS BAR */}
        {!isEmpty && (
          <div className="ikas-cart-drawer__shipping-bar">
            <p className="ikas-cart-drawer__shipping-text _eZyocyyd0F">
              {isFreeShipping
                ? "Tebrikler! Kargonuz ÜCRETSİZ!"
                : `Ücretsiz kargo için ${remainingAmount.toFixed(0)} TL kaldı!`}
            </p>
            <div className="ikas-cart-drawer__progress-bg">
              <div
                className="ikas-cart-drawer__progress-fill"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* 3. ITEM LIST OR EMPTY STATE */}
        {isEmpty ? (
          <div className="ikas-cart-drawer__empty">
            <svg
              className="ikas-cart-drawer__empty-icon"
              width="64"
              height="64"
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
            <h3 className="ikas-cart-drawer__empty-title _AHnMWYqzuI">
              {emptyCartTitle}
            </h3>
            <Button
              text={emptyCartButtonText}
              variant="PRIMARY"
              size="LARGE"
              onClick={() => {
                handleClose();
                Router.navigateToPage("CATEGORY");
              }}
            />
          </div>
        ) : (
          <div className="ikas-cart-drawer__items-container">
            {lineItems.map((item) => {
              const variantImage = item.variant
                ? getIkasOrderLineVariantMainImage(item.variant)
                : null;
              const imgObj = (variantImage as any)?.image || variantImage;
              const imgSrc = imgObj ? getDefaultSrc(imgObj) : null;

              const title = item.variant?.name || "Ürün";
              const price = getOrderLineItemFormattedFinalPrice(item);

              return (
                <div key={item.id} className="ikas-cart-drawer__item">
                  <div className="ikas-cart-drawer__item-img-wrapper">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={title}
                        className="ikas-cart-drawer__item-img"
                      />
                    ) : (
                      <div className="ikas-cart-drawer__item-img-placeholder" />
                    )}
                  </div>

                  <div className="ikas-cart-drawer__item-info">
                    <h4 className="ikas-cart-drawer__item-title _VcfI5D07Nt">
                      {title}
                    </h4>

                    <div className="ikas-cart-drawer__item-bottom">
                      {/* MİKTAR DEĞİŞTİRME */}
                      <div className="ikas-cart-drawer__quantity">
                        <button
                          type="button"
                          className="ikas-cart-drawer__qty-btn"
                          aria-label="Adet Azalt"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            changeItemQuantity(item, Math.max(1, item.quantity - 1))
                          }
                        >
                          -
                        </button>
                        <span className="ikas-cart-drawer__qty-val _eZyocyyd0F">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="ikas-cart-drawer__qty-btn"
                          aria-label="Adet Artır"
                          onClick={() =>
                            changeItemQuantity(item, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <span className="ikas-cart-drawer__item-price _VcfI5D07Nt">
                        {price}
                      </span>

                      {/* SİL BUTONU */}
                      <button
                        type="button"
                        className="ikas-cart-drawer__item-remove"
                        aria-label="Ürünü Sepetten Çıkar"
                        onClick={() => removeItem(item)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. FOOTER AREA & CHECKOUT */}
        {!isEmpty && (
          <div className="ikas-cart-drawer__footer">
            <div className="ikas-cart-drawer__summary-row _VcfI5D07Nt">
              <span>Ara Toplam:</span>
              <span className="ikas-cart-drawer__summary-total">
                {formattedTotal}
              </span>
            </div>

            <Button
              text="Ödemeye Geç"
              variant="PRIMARY"
              fullWidth
              size="LARGE"
              onClick={() => {
                handleClose();
                Router.navigateToPage("CHECKOUT");
              }}
            />
          </div>
        )}
      </div>
    </>
  );

  if (typeof document !== "undefined" && document.body) {
    return createPortal(content, document.body);
  }

  return content;
}

export default CartDrawer;
