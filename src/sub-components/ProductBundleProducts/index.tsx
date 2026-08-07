import { useEffect } from "preact/hooks";
import {
  getSelectedProductVariant,
  hasBundleSettings,
  initBundleProducts,
  getDisplayedProductVariantTypes,
  selectVariantValue,
  isColorVariantValue,
  getProductVariantMainImage,
  getDefaultSrc,
  setBundleProductQuantity,
  isBundleProductQuantityEditable,
  shouldDisplayBundleProductPrice,
  getBundleProductFormattedFinalPrice,
  IkasProduct,
  IkasBundleProduct,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import QuantityStepper from "../QuantityStepper";

export interface Props {
  product?: IkasProduct | null;
  title?: string;
  subtitle?: string;
  qtyDecreaseLabel?: string;
  qtyIncreaseLabel?: string;
  qtyLabel?: string;
  className?: string;
}

function BundleItemRowInner({
  bundleProduct,
  qtyDecreaseLabel,
  qtyIncreaseLabel,
  qtyLabel,
}: {
  bundleProduct: IkasBundleProduct;
  qtyDecreaseLabel: string;
  qtyIncreaseLabel: string;
  qtyLabel: string;
}) {
  const nested = bundleProduct.product;
  if (!nested) return null;

  const variant = getSelectedProductVariant(nested);
  const mainImage = variant ? getProductVariantMainImage(variant) : null;
  const imageSrc = mainImage?.image ? getDefaultSrc(mainImage.image) : null;
  const showPrice = shouldDisplayBundleProductPrice(bundleProduct);
  const priceText = showPrice
    ? getBundleProductFormattedFinalPrice(bundleProduct)
    : "";
  const qtyEditable = isBundleProductQuantityEditable(bundleProduct);
  const variantTypes = getDisplayedProductVariantTypes(nested) || [];
  const hasVariantChoices = variantTypes.some(
    (vt) => (vt.displayedVariantValues || []).length > 1
  );

  const minQty = bundleProduct.minQuantity ?? 0;
  const maxQty =
    typeof bundleProduct.maxQuantity === "number"
      ? bundleProduct.maxQuantity
      : undefined;

  return (
    <div className="ikas-bundle__item">
      <div className="ikas-bundle__row">
        <span className="ikas-bundle__media">
          {imageSrc ? (
            <img src={imageSrc} alt="" loading="lazy" />
          ) : (
            <span className="ikas-bundle__media-fallback" aria-hidden="true" />
          )}
        </span>

        <div className="ikas-bundle__body">
          <span className="ikas-bundle__name">{nested.name}</span>
          {showPrice && priceText ? (
            <span className="ikas-bundle__price">{priceText}</span>
          ) : null}
        </div>

        {qtyEditable ? (
          <QuantityStepper
            value={bundleProduct.quantity}
            onChange={(next) => setBundleProductQuantity(bundleProduct, next)}
            min={minQty}
            max={maxQty}
            decreaseLabel={qtyDecreaseLabel}
            increaseLabel={qtyIncreaseLabel}
            size="sm"
            className="ikas-bundle__qty"
          />
        ) : (
          <span className="ikas-bundle__qty-static _eZyocyyd0F">
            {bundleProduct.quantity} {qtyLabel}
          </span>
        )}
      </div>

      {hasVariantChoices ? (
        <div className="ikas-bundle__variants">
          {variantTypes.map((vtItem) => {
            const vType = vtItem.variantType;
            const values = vtItem.displayedVariantValues || [];
            if (values.length <= 1) return null;

            const isColorType = values.some((v) =>
              isColorVariantValue(v.variantValue)
            );

            return (
              <div key={vType.id} className="ikas-bundle__variant-block">
                <span className="ikas-bundle__variant-label">{vType.name}</span>
                <div
                  className={
                    isColorType
                      ? "ikas-bundle__swatches"
                      : "ikas-bundle__pills"
                  }
                >
                  {values.map((dvv) => {
                    const vVal = dvv.variantValue;
                    const selectedOn = dvv.isSelected;
                    const disabled = !dvv.hasStock && !selectedOn;

                    if (isColorVariantValue(vVal)) {
                      const hex = vVal.colorCode || "#37435B";
                      return (
                        <button
                          key={vVal.id}
                          type="button"
                          className={`ikas-bundle__swatch${
                            selectedOn ? " ikas-bundle__swatch--selected" : ""
                          }`}
                          style={{ backgroundColor: hex }}
                          disabled={disabled}
                          aria-label={`${vType.name}: ${vVal.name}`}
                          aria-pressed={selectedOn}
                          onClick={() => selectVariantValue(nested, vVal)}
                        />
                      );
                    }

                    return (
                      <button
                        key={vVal.id}
                        type="button"
                        className={`ikas-bundle__pill${
                          selectedOn ? " ikas-bundle__pill--selected" : ""
                        }`}
                        disabled={disabled}
                        aria-pressed={selectedOn}
                        onClick={() => selectVariantValue(nested, vVal)}
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
      ) : null}
    </div>
  );
}

const BundleItemRow = observer(BundleItemRowInner);

export function ProductBundleProducts({
  product,
  title = "Paket içeriği",
  subtitle = "Bu pakette yer alan ürünler.",
  qtyDecreaseLabel = "Adet azalt",
  qtyIncreaseLabel = "Adet artır",
  qtyLabel = "adet",
  className = "",
}: Props) {
  const variant = product ? getSelectedProductVariant(product) : null;
  const variantId = variant?.id ?? null;

  useEffect(() => {
    if (!product || !variant) return;
    if (!hasBundleSettings(variant)) return;
    void initBundleProducts(product);
  }, [product, variantId]);

  if (!product || !variant || !hasBundleSettings(variant)) return null;

  const bundleProducts = (variant.bundleSettings?.products || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .filter((bp): bp is IkasBundleProduct => !!bp?.product);

  if (bundleProducts.length === 0) return null;

  return (
    <div className={`ikas-bundle ${className}`.trim()} lang="tr">
      <div className="ikas-bundle__header">
        {title ? <h2 className="ikas-bundle__title">{title}</h2> : null}
        {subtitle ? (
          <p className="ikas-bundle__subtitle">{subtitle}</p>
        ) : null}
      </div>

      <div
        className="ikas-bundle__list"
        role="group"
        aria-label={title || undefined}
      >
        {bundleProducts.map((bp) => (
          <BundleItemRow
            key={bp.id}
            bundleProduct={bp}
            qtyDecreaseLabel={qtyDecreaseLabel}
            qtyIncreaseLabel={qtyIncreaseLabel}
            qtyLabel={qtyLabel}
          />
        ))}
      </div>
    </div>
  );
}

export default observer(ProductBundleProducts);
