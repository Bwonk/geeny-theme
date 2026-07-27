import { useState } from "preact/hooks";
import {
  cartStore,
  changeItemQuantity,
  removeItem,
  getOrderLineItemFormattedFinalPrice,
  getIkasOrderLineVariantMainImage,
  getDefaultSrc,
  getThemeSetting,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";

export interface Props {
  cart?: any;
  className?: string;
}

export function CartItemsList({ cart, className = "" }: Props) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Read live global settings via getThemeSetting
  const itemImgRadiusSetting = getThemeSetting("_0WnqPU26e8"); // Radius / Sepet İtem Görseli (12px)
  const formRadiusSetting = getThemeSetting("_iI8H4rllzj"); // Radius / Input ve Form (8px)

  const itemImgRadius = itemImgRadiusSetting?.value || "12px";
  const formRadius = formRadiusSetting?.value || "8px";

  const inlineStyles = {
    "--item-img-radius": itemImgRadius,
    "--form-radius": formRadius,
  };

  const activeCart = cart || cartStore.cart;
  const lineItems = activeCart?.orderLineItems ?? [];

  if (lineItems.length === 0) return null;

  const handleQtyChange = async (item: any, newQty: number) => {
    if (newQty < 1 || updatingId === item.id) return;
    setUpdatingId(item.id);
    try {
      await changeItemQuantity(item, newQty);
    } catch (err) {
      console.error("Sepet miktar güncelleme hatası:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (item: any) => {
    if (updatingId === item.id) return;
    setUpdatingId(item.id);
    try {
      await removeItem(item);
    } catch (err) {
      console.error("Sepetten ürün silme hatası:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div
      className={`ikas-cart-table ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      {lineItems.map((item: any) => {
        const variantImage = item.variant
          ? getIkasOrderLineVariantMainImage(item.variant)
          : null;
        const imgObj = (variantImage as any)?.image || variantImage;
        const imgSrc = imgObj ? getDefaultSrc(imgObj) : null;

        const title = item.variant?.name || "Ürün";
        const priceText = getOrderLineItemFormattedFinalPrice(item);
        const isUpdating = updatingId === item.id;

        return (
          <div key={item.id} className="ikas-cart-table__item">
            {/* ÜRÜN GÖRSELİ */}
            <div className="ikas-cart-table__img-wrapper">
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={title}
                  className="ikas-cart-table__img"
                />
              ) : (
                <div className="ikas-cart-table__img-placeholder" />
              )}
            </div>

            {/* ÜRÜN BİLGİSİ */}
            <div className="ikas-cart-table__info">
              <h3 className="ikas-cart-table__name _VcfI5D07Nt">
                {title}
              </h3>
              <p className="ikas-cart-table__price _VcfI5D07Nt">
                {priceText}
              </p>
            </div>

            {/* MİKTAR VE SİLME BUTONLARI */}
            <div className="ikas-cart-table__actions">
              <div className="ikas-cart-table__qty">
                <button
                  type="button"
                  className="ikas-cart-table__qty-btn"
                  aria-label="Miktarı Azalt"
                  disabled={item.quantity <= 1 || isUpdating}
                  onClick={() => handleQtyChange(item, item.quantity - 1)}
                >
                  -
                </button>
                <span className="ikas-cart-table__qty-val _eZyocyyd0F">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  className="ikas-cart-table__qty-btn"
                  aria-label="Miktarı Artır"
                  disabled={isUpdating}
                  onClick={() => handleQtyChange(item, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="ikas-cart-table__remove"
                aria-label="Ürünü Sepetten Çıkar"
                disabled={isUpdating}
                onClick={() => handleRemove(item)}
              >
                <svg
                  width="20"
                  height="20"
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
        );
      })}
    </div>
  );
}

export default observer(CartItemsList);
