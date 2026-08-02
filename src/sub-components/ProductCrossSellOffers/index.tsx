import {
  acceptProductOffer,
  rejectProductOffer,
  isAcceptedProductOffer,
  getSelectedProductVariant,
  getProductVariantMainImage,
  getDefaultSrc,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  hasProductVariantDiscount,
  IkasProduct,
  IkasProductOffer,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";

export interface Props {
  product?: IkasProduct | null;
  showCrossSell?: boolean;
  title?: string;
  subtitle?: string;
  addedText?: string;
  selectLabel?: string;
  selectedLabel?: string;
  className?: string;
}

function offerKey(offer: IkasProductOffer): string {
  return `${offer.campaignOfferId}-${offer.campaignOfferProductId}`;
}

function OfferRowInner({
  offer,
  addedText,
  selectLabel,
  selectedLabel,
}: {
  offer: IkasProductOffer;
  addedText: string;
  selectLabel: string;
  selectedLabel: string;
}) {
  const offerProduct = offer.product;
  if (!offerProduct) return null;

  const variant = getSelectedProductVariant(offerProduct);
  const mainImage = variant ? getProductVariantMainImage(variant) : null;
  const imageSrc = mainImage?.image ? getDefaultSrc(mainImage.image) : null;
  const finalPrice = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const sellPrice = variant ? getProductVariantFormattedSellPrice(variant) : "";
  const hasDiscount = variant ? hasProductVariantDiscount(variant) : false;

  const alreadyInCart = isAcceptedProductOffer(offer);
  const isSelected = !!offer.isSelected && !alreadyInCart;
  const locked = alreadyInCart;

  const displayTitle = offer.title || offerProduct.name || "";
  const displayDescription = offer.description || "";

  const handleToggle = () => {
    if (locked) return;
    if (isSelected) {
      rejectProductOffer(offer);
    } else {
      acceptProductOffer(offer);
    }
  };

  const statusLabel = locked
    ? addedText
    : isSelected
      ? selectedLabel
      : selectLabel;

  return (
    <div
      className={`ikas-cross-sell__item${
        isSelected ? " ikas-cross-sell__item--selected" : ""
      }${locked ? " ikas-cross-sell__item--locked" : ""}`}
    >
      <button
        type="button"
        className="ikas-cross-sell__toggle"
        onClick={handleToggle}
        disabled={locked}
        aria-pressed={isSelected || locked}
        aria-label={`${displayTitle} — ${statusLabel}`}
      >
        <span className="ikas-cross-sell__check" aria-hidden="true">
          {(isSelected || locked) && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m5 12 5 5L19 7" />
            </svg>
          )}
        </span>

        <span className="ikas-cross-sell__media">
          {imageSrc ? (
            <img src={imageSrc} alt="" loading="lazy" />
          ) : (
            <span className="ikas-cross-sell__media-fallback" aria-hidden="true" />
          )}
        </span>

        <span className="ikas-cross-sell__body">
          <span className="ikas-cross-sell__name">{displayTitle}</span>
          {displayDescription && (
            <span className="ikas-cross-sell__desc">{displayDescription}</span>
          )}
          <span className="ikas-cross-sell__prices">
            <span className="ikas-cross-sell__final">{finalPrice}</span>
            {hasDiscount && sellPrice && (
              <span className="ikas-cross-sell__sell">{sellPrice}</span>
            )}
          </span>
        </span>

        <span
          className={`ikas-cross-sell__status${
            locked ? " ikas-cross-sell__status--locked" : ""
          }${isSelected ? " ikas-cross-sell__status--on" : ""}`}
        >
          {statusLabel}
        </span>
      </button>
    </div>
  );
}

const OfferRow = observer(OfferRowInner);

export function ProductCrossSellOffers({
  product,
  showCrossSell = true,
  title = "Birlikte Al",
  subtitle = "Bu ürünle birlikte sık alınanlar.",
  addedText = "Sepete eklendi",
  selectLabel = "Birlikte ekle",
  selectedLabel = "Seçildi",
  className = "",
}: Props) {
  if (!showCrossSell || !product) return null;

  const offers = (product.offers || []).filter(
    (offer): offer is IkasProductOffer => !!offer?.product
  );

  if (offers.length === 0) return null;

  return (
    <div className={`ikas-cross-sell ${className}`.trim()} lang="tr">
      <div className="ikas-cross-sell__header">
        {title && <h2 className="ikas-cross-sell__title">{title}</h2>}
        {subtitle && <p className="ikas-cross-sell__subtitle">{subtitle}</p>}
      </div>

      <div className="ikas-cross-sell__list" role="group" aria-label={title}>
        {offers.map((offer) => (
          <OfferRow
            key={offerKey(offer)}
            offer={offer}
            addedText={addedText}
            selectLabel={selectLabel}
            selectedLabel={selectedLabel}
          />
        ))}
      </div>
    </div>
  );
}

export default observer(ProductCrossSellOffers);
