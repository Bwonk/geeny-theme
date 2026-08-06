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
import QuantityStepper from "../QuantityStepper";

export interface Props {
  cart?: any;
  className?: string;
  decreaseQtyLabel?: string;
  increaseQtyLabel?: string;
  removeItemLabel?: string;
}

export function CartItemsList({
  cart,
  className = "",
  decreaseQtyLabel = "Miktarı Azalt",
  increaseQtyLabel = "Miktarı Artır",
  removeItemLabel = "Ürünü Sepetten Çıkar",
}: Props) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const itemImgRadiusSetting = getThemeSetting("_0WnqPU26e8");
  const formRadiusSetting = getThemeSetting("_iI8H4rllzj");

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

            <div className="ikas-cart-table__info">
              <h3 className="ikas-cart-table__name _VcfI5D07Nt">{title}</h3>
              <p className="ikas-cart-table__price _VcfI5D07Nt">{priceText}</p>
            </div>

            <div className="ikas-cart-table__actions">
              <QuantityStepper
                value={item.quantity ?? 1}
                onChange={(next) => handleQtyChange(item, next)}
                min={1}
                disabled={isUpdating}
                decreaseLabel={decreaseQtyLabel}
                increaseLabel={increaseQtyLabel}
                size="sm"
              />

              <button
                type="button"
                className="ikas-cart-table__remove"
                aria-label={removeItemLabel}
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
