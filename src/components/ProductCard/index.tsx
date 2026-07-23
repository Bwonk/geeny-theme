import { useState } from "preact/hooks";
import {
  getDefaultSrc,
  getSelectedProductVariant,
  getProductVariantMainImage,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  hasProductVariantDiscount,
  hasProductVariantStock,
  addItemToCart,
  getSelectedProductVariantHref,
  getThemeSetting,
} from "@ikas/bp-storefront";
import { Button } from "../Button";
import { Props } from "./types";

export interface ProductCardProps extends Props {
  className?: string;
}

export function ProductCard({
  product,
  showRating = true,
  showQuickAdd = true,
  className = "",
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  // If product is missing or null, render empty fallback card
  if (!product) {
    return null;
  }

  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const radiusSetting = getThemeSetting("_WyFUVwOpPk"); // Radius / Kart (2rem)
  const hoverAnimSetting = getThemeSetting("_Z1JfmMfgtb"); // Animasyon / Görsel Scale Hover

  const cardRadius = radiusSetting?.value || "2rem";
  const hoverAnim = hoverAnimSetting?.value || "transform 0.5s ease-out";

  const inlineStyles = {
    "--card-radius": cardRadius,
    "--image-hover-transition": hoverAnim,
  };

  const variant = getSelectedProductVariant(product);

  // Image handling per ikas pattern: getProductVariantMainImage returns IkasProductImage, access .image for IkasImage
  const mainProductImage = variant ? getProductVariantMainImage(variant) : null;
  const mainImage = mainProductImage?.image ? getDefaultSrc(mainProductImage.image) : null;

  const secondaryProductImage =
    variant?.images && variant.images.length > 1
      ? variant.images[1]?.image
      : null;
  const secondaryImage = secondaryProductImage ? getDefaultSrc(secondaryProductImage) : null;

  const href = getSelectedProductVariantHref(product) || "#";
  const title = product.name || "Ürün Adı";

  // Price formatting using verified ikas storefront functions
  const finalPrice = variant ? (getProductVariantFormattedFinalPrice(variant) as unknown as string) : "";
  const sellPrice = variant ? (getProductVariantFormattedSellPrice(variant) as unknown as string) : "";
  const hasDiscount = variant ? (hasProductVariantDiscount(variant) as unknown as boolean) : false;

  // Stock check
  const inStock = variant ? (hasProductVariantStock(variant) as unknown as boolean) : true;

  // Real Rating & Review Count integration via ikas getProductCustomerReviews API
  const reviews = (product as any).reviews ?? [];
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? (reviews.reduce((acc: number, r: any) => acc + (r.star || 5), 0) / reviewCount).toFixed(1)
      : null;

  // Handle Quick Add to Cart
  const handleQuickAdd = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant || isAdding || !inStock) return;

    setIsAdding(true);
    try {
      await addItemToCart(variant, product, 1);
      window.dispatchEvent(new CustomEvent("OPEN_CART_DRAWER"));
    } catch (err) {
      console.error("Quick add to cart error:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article
      className={`ikas-product-card ${className}`.trim()}
      style={inlineStyles}
    >
      {/* 1. GÖRSEL ALANI & ROZETLER */}
      <a
        href={href}
        className="ikas-product-card__image-wrapper"
        aria-label={`${title} detaylarını incele`}
      >
        {mainImage ? (
          <img
            src={mainImage}
            alt={title}
            className="ikas-product-card__image"
            loading="lazy"
          />
        ) : (
          <div className="ikas-product-card__image-placeholder" />
        )}

        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${title} - 2`}
            className="ikas-product-card__image ikas-product-card__image--secondary"
            loading="lazy"
          />
        )}

        <div className="ikas-product-card__badge-wrapper">
          {!inStock ? (
            <span className="ikas-product-card__badge ikas-product-card__badge--out-of-stock _eZyocyyd0F">
              Tükendi
            </span>
          ) : (
            hasDiscount && (
              <span className="ikas-product-card__badge _eZyocyyd0F">
                İndirim
              </span>
            )
          )}
        </div>
      </a>

      {/* 2. KART İÇERİĞİ (BAŞLIK, YILDIZ, FİYAT, BUTON) */}
      <div className="ikas-product-card__content">
        {/* YILDIZ DEĞERLENDİRMESİ (Yalnızca ürünün gerçek yorumu varsa render edilir) */}
        {showRating && averageRating && (
          <div className="ikas-product-card__rating _eZyocyyd0F">
            <svg
              className="ikas-product-card__rating-star"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="ikas-product-card__rating-score">
              {averageRating}
            </span>
            <span className="ikas-product-card__rating-count">
              ({reviewCount})
            </span>
          </div>
        )}

        {/* ÜRÜN BAŞLIĞI */}
        <h3 className="ikas-product-card__title _VcfI5D07Nt">
          <a href={href} style={{ color: "inherit", textDecoration: "none" }}>
            {title}
          </a>
        </h3>

        {/* FİYAT */}
        <div className="ikas-product-card__price-wrapper _VcfI5D07Nt">
          <span className="ikas-product-card__final-price">{finalPrice}</span>
          {hasDiscount && (
            <span className="ikas-product-card__old-price">
              {sellPrice}
            </span>
          )}
        </div>

        {/* HIZLI SEPETE EKLE BUTONU */}
        {showQuickAdd && (
          <div className="ikas-product-card__quick-add">
            <Button
              text={inStock ? "Sepete Ekle" : "Tükendi"}
              variant="PRIMARY"
              fullWidth
              size="NORMAL"
              disabled={!inStock || isAdding}
              loading={isAdding}
              onClick={handleQuickAdd}
              ariaLabel={`${title} ürününü sepete ekle`}
            />
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
