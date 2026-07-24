import { useState, useEffect } from "preact/hooks";
import {
  getThemeSetting,
  getSelectedProductVariant,
  getProductVariantMainImage,
  getDefaultSrc,
  getProductVariantFormattedFinalPrice,
  hasProductVariantStock,
  isAddToCartEnabled,
  addItemToCart,
  IkasImage,
} from "@ikas/bp-storefront";
import { Button } from "../Button";
import { Props } from "./types";

export interface StickyAddToCartBarProps extends Props {
  className?: string;
}

export function StickyAddToCartBar({
  product,
  targetElementId = "product-buy-box-target",
  className = "",
}: StickyAddToCartBarProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Read theme global settings via getThemeSetting
  const stickyBarHeightSetting = getThemeSetting("_rEYcHCKRvC"); // Boşluk / Sticky Cart Bar Yüksekliği (64px)
  const stickyAnimSetting = getThemeSetting("_z2WqA2GtRY"); // Animasyon / Sticky Bar Belirme
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)

  const stickyBarHeight = stickyBarHeightSetting?.value || "64px";
  const stickyAnim = stickyAnimSetting?.value || "transform 0.3s ease, opacity 0.3s ease";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";

  const inlineStyles = {
    "--sticky-bar-height": stickyBarHeight,
    "--sticky-bar-transition": stickyAnim,
    "--max-site-width": maxSiteWidth,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
  };

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const targetEl = document.getElementById(targetElementId);

    if (targetEl && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // When the buy box target is out of view (scrolled past), show sticky bar
          setIsVisible(!entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(targetEl);
    } else {
      // Fallback scroll listener if target element not found
      const handleScroll = () => {
        setIsVisible(window.scrollY > 450);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      if (observer && targetEl) {
        observer.unobserve(targetEl);
      }
    };
  }, [targetElementId]);

  if (!product) return null;

  const variant = getSelectedProductVariant(product);
  const mainProductImage = variant ? getProductVariantMainImage(variant) : null;
  const mainImage: IkasImage | null = (mainProductImage as any)?.image || (mainProductImage as any) || null;
  const imgSrc = mainImage ? getDefaultSrc(mainImage) : null;
  const finalPriceText = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const inStock = variant ? hasProductVariantStock(variant) : true;
  const canAddToCart = isAddToCartEnabled(product) && inStock;

  const handleAddToCart = async () => {
    if (!variant || isAdding) return;
    setIsAdding(true);
    try {
      await addItemToCart(variant, product, 1);
    } catch (err) {
      console.error("Sticky sepete ekleme hatası:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className={`ikas-sticky-cart ${
        isVisible ? "ikas-sticky-cart--visible" : ""
      } ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <div className="ikas-sticky-cart__container">
        {/* ÜRÜN ÖZET BİLGİSİ */}
        <div className="ikas-sticky-cart__info">
          <div className="ikas-sticky-cart__img-wrapper">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={product.name}
                className="ikas-sticky-cart__img"
              />
            ) : null}
          </div>
          <div className="ikas-sticky-cart__meta">
            <span className="ikas-sticky-cart__name _VcfI5D07Nt">
              {product.name}
            </span>
            <span className="ikas-sticky-cart__price _AZR1yL8GrK">
              {finalPriceText}
            </span>
          </div>
        </div>

        {/* SATIN ALMA BUTONU */}
        <div className="ikas-sticky-cart__action">
          <Button
            text={inStock ? "Sepete Ekle" : "Tükendi"}
            variant="PRIMARY"
            size="NORMAL"
            disabled={!canAddToCart}
            loading={isAdding}
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}

export default StickyAddToCartBar;
