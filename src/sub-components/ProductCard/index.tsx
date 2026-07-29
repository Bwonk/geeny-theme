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

export interface ColorSwatch {
  color: string;
  label: string;
  active?: boolean;
}

export interface Props {
  product?: IkasProduct | null;
  subtitle?: string;
  badgeText?: string;
  swatches?: ColorSwatch[];
  showRating?: boolean;
  showQuickAdd?: boolean;
  /** Buton görsel üzerinde slide-up overlay olarak belirsin mi? (Anasayfa.dc.html tasarımı) */
  overlayQuickAdd?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  subtitle,
  badgeText,
  swatches,
  showRating = false,
  showQuickAdd = true,
  overlayQuickAdd = true,
  className = "",
}: Props) {
  const [isAdding, setIsAdding] = useState(false);

  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const radiusSetting = getThemeSetting("_WyFUVwOpPk"); // Radius / Kart (24px)
  const hoverAnimSetting = getThemeSetting("_Z1JfmMfgtb"); // Animasyon / Görsel Scale Hover

  const cardRadius = radiusSetting?.value || "24px";
  const hoverAnim = hoverAnimSetting?.value || "transform 0.5s ease-out";

  const inlineStyles = {
    "--card-radius": cardRadius,
    "--image-hover-transition": hoverAnim,
  };

  // Fallback demo card if product is missing
  if (!product) {
    const demoTitle = "Infinity Pillow";
    const demoSubtitle = subtitle || "Klasik boyun ve baş desteği";
    const demoBadge = badgeText || "EN ÇOK SATAN";
    const demoPrice = "₺1.290";
    const demoSwatches: ColorSwatch[] = swatches || [
      { color: "#37435B", label: "LACİVERT", active: true },
      { color: "#385244", label: "ZEYTİN" },
    ];
    const activeSwatch = demoSwatches.find((s) => s.active) || demoSwatches[0];

    return (
      <article
        className={`ikas-product-card ${overlayQuickAdd ? "ikas-product-card--overlay-mode" : ""} ${className}`.trim()}
        style={inlineStyles}
      >
        <div className="ikas-product-card__image-wrapper">
          <div className="ikas-product-card__image-placeholder" style={{ backgroundColor: "#C8CFD0" }} />
          {demoBadge && (
            <div className="ikas-product-card__badge-wrapper">
              <span className="ikas-product-card__badge">{demoBadge}</span>
            </div>
          )}

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
          <div className="ikas-product-card__header-row">
            <h3 className="ikas-product-card__title">{demoTitle}</h3>
            <div className="ikas-product-card__price-wrapper">
              <span className="ikas-product-card__final-price">{demoPrice}</span>
            </div>
          </div>

          {demoSubtitle && (
            <div className="ikas-product-card__subtitle">{demoSubtitle}</div>
          )}

          {demoSwatches && demoSwatches.length > 0 && (
            <div className="ikas-product-card__swatches">
              {demoSwatches.map((swatch, idx) => (
                <span
                  key={idx}
                  className={`ikas-product-card__swatch ${swatch.active ? "ikas-product-card__swatch--active" : ""}`}
                  style={{ backgroundColor: swatch.color }}
                />
              ))}
              {activeSwatch && (
                <span className="ikas-product-card__swatch-label">
                  {activeSwatch.label.toLocaleUpperCase("tr-TR")}
                </span>
              )}
            </div>
          )}
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
  const displaySubtitle = subtitle || (product as any).shortDescription || "";

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

  // Swatches processing
  const activeSwatch = swatches?.find((s) => s.active) || swatches?.[0];

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
          ) : badgeText ? (
            <span className="ikas-product-card__badge">{badgeText}</span>
          ) : (
            hasDiscount && (
              <span className="ikas-product-card__badge">İNDİRİM</span>
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

      {/* 2. KART İÇERİĞİ (BAŞLIK + FİYAT YAN YANA, ALT AÇIKLAMA, COLOR SWATCHES) */}
      <div className="ikas-product-card__content">
        {/* YILDIZ DEĞERLENDİRMESİ */}
        {showRating && averageRating && (
          <div className="ikas-product-card__rating">
            <svg className="ikas-product-card__rating-star" viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="ikas-product-card__rating-score">{averageRating}</span>
            <span className="ikas-product-card__rating-count">({reviewCount})</span>
          </div>
        )}

        {/* BAŞLIK & FİYAT SATIRI (YAN YANA) */}
        <div className="ikas-product-card__header-row">
          <h3 className="ikas-product-card__title">
            <a href={href} style={{ color: "inherit", textDecoration: "none" }}>
              {title}
            </a>
          </h3>
          <div className="ikas-product-card__price-wrapper">
            {hasDiscount && sellPrice && (
              <span className="ikas-product-card__old-price">{sellPrice}</span>
            )}
            <span className="ikas-product-card__final-price">{finalPrice}</span>
          </div>
        </div>

        {/* KISA AÇIKLAMA */}
        {displaySubtitle && (
          <div className="ikas-product-card__subtitle">{displaySubtitle}</div>
        )}

        {/* RENK SWATCH'LARI */}
        {swatches && swatches.length > 0 && (
          <div className="ikas-product-card__swatches">
            {swatches.map((swatch, idx) => (
              <span
                key={idx}
                className={`ikas-product-card__swatch ${swatch.active ? "ikas-product-card__swatch--active" : ""}`}
                style={{ backgroundColor: swatch.color }}
              />
            ))}
            {activeSwatch && (
              <span className="ikas-product-card__swatch-label">
                {activeSwatch.label.toLocaleUpperCase("tr-TR")}
              </span>
            )}
          </div>
        )}

        {/* KLASİK ALT SEPETE EKLE BUTONU (overlayQuickAdd=false ise) */}
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
