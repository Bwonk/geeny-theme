import {
  getIkasOrderLineBundleVariantMainImage,
  getDefaultSrc,
  IkasOrderLineVariant,
  IkasOrderLineVariantBundleProduct,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";

export interface Props {
  variant?: IkasOrderLineVariant | null;
  qtyLabel?: string;
  className?: string;
}

function CartLineBundleChildren({
  variant,
  qtyLabel = "adet",
  className = "",
}: Props) {
  const raw = variant?.bundleProducts || [];
  const items = raw
    .filter(
      (bp): bp is IkasOrderLineVariantBundleProduct =>
        !!bp && !bp.deleted && !!bp.variant
    )
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (items.length === 0) return null;

  return (
    <ul className={`ikas-cart-bundle ${className}`.trim()} lang="tr">
      {items.map((bp) => {
        const bv = bp.variant;
        const image = getIkasOrderLineBundleVariantMainImage(bv);
        const imgObj = (image as any)?.image || image;
        const imgSrc = imgObj ? getDefaultSrc(imgObj) : null;
        const name = bv.name || "";

        return (
          <li key={bp.id} className="ikas-cart-bundle__item">
            <span className="ikas-cart-bundle__media">
              {imgSrc ? (
                <img src={imgSrc} alt="" loading="lazy" />
              ) : (
                <span
                  className="ikas-cart-bundle__media-fallback"
                  aria-hidden="true"
                />
              )}
            </span>
            <span className="ikas-cart-bundle__name _C0OZ8W7vYS">{name}</span>
            <span className="ikas-cart-bundle__qty _eZyocyyd0F">
              {bp.quantity} {qtyLabel}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default observer(CartLineBundleChildren);
