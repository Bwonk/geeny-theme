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
  IkasProduct,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import Button from "../Button";

export interface Props {
  product?: IkasProduct | null;
  showRating?: boolean;
  showQuickAdd?: boolean;
  /** Buton görsel üzerinde slide-up overlay olarak belirsin mi? (Anasayfa.dc.html tasarımı) */
  overlayQuickAdd?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  showRating = false,
  showQuickAdd = true,
  overlayQuickAdd = true,
  className = "",
}: Props) {
  const [isAdding, setIsAdding] = useState(false);

  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const radiusSetting = getThemeSetting("_WyFUVwOpPk"); // Radius / Kart (24px / 2rem)
  const hoverAnimSetting = getThemeSetting("_Z1JfmMfgtb"); // Animasyon / Görsel Scale Hover

  const cardRadius = radiusSetting?.value || "24px";
  const hoverAnim = hoverAnimSetting?.value || "transform 0.5s ease-out";

  const inlineStyles = {
    "--card-radius": cardRadius,
    "--image-hover-transition": hoverAnim,
  };

  // If product is missing or null, render high quality demo product card
  if (!product) {
    return (
      <article
        className={`ikas-product-card ${overlayQuickAdd ? "ikas-product-card--overlay-mode" : ""} ${className}`.trim()}
        style={inlineStyles}
      >
        <div className="ikas-product-card__image-wrapper">
          <div className="ikas-product-card__image-placeholder" style={{ backgroundColor: "#C8CFD0" }} />
          <div className="ikas-product-card__badge-wrapper">
            <span className="ikas-product-card__badge">EN ÇOK SATAN</span>
          </div>

          {showQuickAdd && overlayQuickAdd && (
            <div className="ikas-product-card__overlay-quick-add">
              <button
                type="button"
                className="ikas-product-card__overlay-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent("geeny:cart-drawer:open"));
                }}
              >
                <span>SEPETE EKLE</span>
              </button>
            </div>
          )}
        </div>

        <div className="ikas-product-card__content">
          <h3 className="ikas-product-card__title">Infinity Pillow · Klasik</h3>
          <div className="ikas-product-card__price-wrapper">
            <span className="ikas-product-card__final-price">₺1.290</span>
          </div>
        </div>
      </article>
    );
  }

  const variant = getSelectedProductVariant(product);

  // Image handling per ikas pattern
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

  // Rating & Review Count integration
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
      window.dispatchEvent(new CustomEvent("geeny:cart-drawer:open"));
    } catch (err) {
      console.error("Quick add to cart error:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article
      className={`ikas-product-card ${overlayQuickAdd ? "ikas-product-card--overlay-mode" : ""} ${className}`.trim()}
      style={inlineStyles}
    >
      {/* 1. GÖRSEL ALANI, OVERLAY BUTON & ROZETLER */}
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

        {/* ROZETLER (Sol Üst) */}
        <div className="ikas-product-card__badge-wrapper">
          {!inStock ? (
            <span className="ikas-product-card__badge ikas-product-card__badge--out-of-stock">
              TÜKENDİ
            </span>
          ) : (
            hasDiscount && (
              <span className="ikas-product-card__badge">
                İNDİRİM
              </span>
            )
          )}
        </div>

        {/* HOVER SLIDE-UP SEPETE EKLE BUTONU (Görsel Üstünde) */}
        {showQuickAdd && overlayQuickAdd && (
          <div className="ikas-product-card__overlay-quick-add">
            <button
              type="button"
              className="ikas-product-card__overlay-btn"
              disabled={!inStock || isAdding}
              onClick={handleQuickAdd}
              aria-label={`${title} ürününü sepete ekle`}
            >
              <span>{isAdding ? "EKLENİYOR..." : inStock ? "SEPETE EKLE" : "TÜKENDİ"}</span>
            </button>
          </div>
        )}
      </a>

      {/* 2. KART İÇERİĞİ (BAŞLIK, FİYAT, OPSİYONEL ALT BUTON) */}
      <div className="ikas-product-card__content">
        {/* YILDIZ DEĞERLENDİRMESİ */}
        {showRating && averageRating && (
          <div className="ikas-product-card__rating">
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
        <h3 className="ikas-product-card__title">
          <a href={href} style={{ color: "inherit", textDecoration: "none" }}>
            {title}
          </a>
        </h3>

        {/* FİYAT ALANI */}
        <div className="ikas-product-card__price-wrapper">
          <span className="ikas-product-card__final-price">{finalPrice}</span>
          {hasDiscount && sellPrice && (
            <span className="ikas-product-card__old-price">
              {sellPrice}
            </span>
          )}
        </div>

        {/* KLASİK ALT SEPETE EKLE BUTONU (overlayQuickAdd=false ise gösterilir) */}
        {showQuickAdd && !overlayQuickAdd && (
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

export default observer(ProductCard);
