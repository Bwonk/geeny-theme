import { useState } from "preact/hooks";
import {
  getThemeSetting,
  getSelectedProductVariant,
  getDisplayedProductVariantTypes,
  selectVariantValue,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  hasProductVariantDiscount,
  hasProductVariantStock,
  isAddToCartEnabled,
  addItemToCart,
  isColorVariantValue,
  IkasProduct,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { Button } from "../../components/Button";

export interface Props {
  product?: IkasProduct | null;
  showBuyNow?: boolean;
  className?: string;
}

export function ProductBuyBox({
  product,
  showBuyNow = true,
  className = "",
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Read theme global settings via getThemeSetting
  const gridGapSetting = getThemeSetting("_4Ud47RIVna"); // Boşluk / Grid Gap (20px)
  const mobileGridGapSetting = getThemeSetting("_dBvnJWALXD"); // Boşluk / Mobil Grid Gap (12px)
  const swatchRadiusSetting = getThemeSetting("_XYyz9eaKGx"); // Radius / Swatch Dairesel (50%)
  const formRadiusSetting = getThemeSetting("_iI8H4rllzj"); // Radius / Input ve Form (0.5rem)
  const btnHeightSetting = getThemeSetting("_2xLGYXCG2n"); // Boşluk / Buton Yüksekliği (48px)

  const gridGap = gridGapSetting?.value || "20px";
  const mobileGridGap = mobileGridGapSetting?.value || "12px";
  const swatchRadius = swatchRadiusSetting?.value || "50%";
  const formRadius = formRadiusSetting?.value || "0.5rem";
  const btnHeight = btnHeightSetting?.value || "48px";

  const inlineStyles = {
    "--grid-gap": gridGap,
    "--mobile-grid-gap": mobileGridGap,
    "--swatch-radius": swatchRadius,
    "--form-radius": formRadius,
    "--btn-height": btnHeight,
  };

  if (!product) return null;

  const variant = getSelectedProductVariant(product);
  const variantTypes = getDisplayedProductVariantTypes(product) || [];
  const finalPriceText = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const sellPriceText = variant ? getProductVariantFormattedSellPrice(variant) : "";
  const isDiscounted = variant ? hasProductVariantDiscount(variant) : false;
  const inStock = variant ? hasProductVariantStock(variant) : true;
  const canAddToCart = isAddToCartEnabled(product) && inStock;

  const handleAddToCart = async () => {
    if (!variant || isAdding) return;
    setIsAdding(true);
    try {
      await addItemToCart(variant, product, quantity);
    } catch (err) {
      console.error("Sepete ekleme hatası:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className={`ikas-buy-box ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      {/* ÜRÜN BAŞLIĞI */}
      <h1 className="ikas-buy-box__title _sKAMD8d1LA">{product.name}</h1>

      {/* DEĞERLENDİRME VE YILDIZLAR */}
      {typeof product.averageRating === "number" && product.averageRating > 0 && (
        <div className="ikas-buy-box__rating _C0OZ8W7vYS">
          <div className="ikas-buy-box__stars" aria-label={`Puan: ${product.averageRating}`}>
            {"★".repeat(Math.round(product.averageRating))}
            {"☆".repeat(5 - Math.round(product.averageRating))}
          </div>
          <span>({product.reviewCount || 0} Değerlendirme)</span>
        </div>
      )}

      {/* FİYAT BİLGİSİ */}
      <div className="ikas-buy-box__price-wrapper">
        <span className="ikas-buy-box__final-price _AZR1yL8GrK">
          {finalPriceText}
        </span>
        {isDiscounted && sellPriceText && (
          <span className="ikas-buy-box__sell-price _VcfI5D07Nt">
            {sellPriceText}
          </span>
        )}
      </div>

      {/* VARYANT SEÇENEKLERİ (RENK / BEDEN) */}
      {variantTypes.length > 0 && (
        <div className="ikas-buy-box__variants">
          {variantTypes.map((vtItem: any) => {
            const vType = vtItem.variantType || vtItem;
            const values = vtItem.values || vtItem.variantValues || [];
            return (
              <div key={vType.id || vtItem.id} className="ikas-buy-box__variant-type">
                <span className="ikas-buy-box__variant-label _VcfI5D07Nt">
                  {vType.name}:
                </span>
                <div className="ikas-buy-box__swatches">
                  {values.map((vVal: any) => {
                    const isSelected = vVal.isSelected;
                    const isColor = isColorVariantValue(vVal);
                    const colorHex = vVal.colorCode || vVal.hex || "#37435B";

                    if (isColor) {
                      return (
                        <button
                          key={vVal.id}
                          type="button"
                          className={`ikas-buy-box__swatch-btn ${
                            isSelected ? "ikas-buy-box__swatch-btn--selected" : ""
                          }`}
                          onClick={() => selectVariantValue(product, vType, vVal)}
                          aria-label={`${vType.name}: ${vVal.name}`}
                          title={vVal.name}
                        >
                          <span
                            className="ikas-buy-box__swatch-color"
                            style={{ backgroundColor: colorHex }}
                          />
                        </button>
                      );
                    }

                    return (
                      <button
                        key={vVal.id}
                        type="button"
                        className={`ikas-buy-box__text-btn _C0OZ8W7vYS ${
                          isSelected ? "ikas-buy-box__text-btn--selected" : ""
                        }`}
                        onClick={() => selectVariantValue(product, vType, vVal)}
                      >
                        {vVal.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADET SEÇİCİ VE SEPETE EKLE BUTONLARI */}
      <div className="ikas-buy-box__qty-wrapper">
        <div className="ikas-buy-box__qty-picker">
          <button
            type="button"
            className="ikas-buy-box__qty-btn"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Adet Azalt"
          >
            -
          </button>
          <span className="ikas-buy-box__qty-value _VcfI5D07Nt">{quantity}</span>
          <button
            type="button"
            className="ikas-buy-box__qty-btn"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Adet Artır"
          >
            +
          </button>
        </div>
      </div>

      {/* STOK UYARISI */}
      {!inStock && (
        <p className="ikas-buy-box__stock-warning _C0OZ8W7vYS">
          Bu varyant için stok tükenmiştir.
        </p>
      )}

      {/* AKSİYON BUTONLARI */}
      <div className="ikas-buy-box__actions">
        <Button
          text={inStock ? "Sepete Ekle" : "Tükendi"}
          variant="PRIMARY"
          size="LARGE"
          fullWidth
          disabled={!canAddToCart}
          loading={isAdding}
          onClick={handleAddToCart}
        />

        {showBuyNow && inStock && (
          <Button
            text="Hemen Satın Al"
            variant="ACCENT"
            size="LARGE"
            fullWidth
            disabled={!canAddToCart}
            onClick={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
}

export default observer(ProductBuyBox);
