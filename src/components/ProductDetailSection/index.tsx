import { getThemeSetting } from "@ikas/bp-storefront";
import BreadcrumbNav from "../../sub-components/BreadcrumbNav";
import ProductMediaGallery from "../../sub-components/ProductMediaGallery";
import ProductBuyBox from "../../sub-components/ProductBuyBox";
import StickyAddToCartBar from "../../sub-components/StickyAddToCartBar";
import ProductValueAccordions from "../../sub-components/ProductValueAccordions";
import { CustomerReviewsSection } from "../CustomerReviewsSection";
import { RelatedProductsCarousel } from "../RelatedProductsCarousel";
import { Props } from "./types";

export interface ProductDetailSectionProps extends Props {
  className?: string;
}

export function ProductDetailSection({
  product,
  relatedProducts,
  backgroundColor,
  className = "",
}: ProductDetailSectionProps) {
  // Read live theme global settings via getThemeSetting
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--max-site-width": maxSiteWidth,
  };

  if (!product) return null;

  return (
    <section
      className={`ikas-pdp ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      {/* NAVİGASYON BREADCRUMB */}
      <BreadcrumbNav product={product} />

      <div className="ikas-pdp__container">
        {/* ANA SPLIT GRID: SOL GALERİ, SAĞ BUY BOX */}
        <div className="ikas-pdp__main-grid">
          {/* SOL KOLON: GÖRSEL GALERİSİ */}
          <div className="ikas-pdp__left">
            <ProductMediaGallery product={product} />
          </div>

          {/* SAĞ KOLON: SATIN ALMA ALANI & AKORDİYONLAR */}
          <div className="ikas-pdp__right" id="product-buy-box-target">
            <ProductBuyBox product={product} />
            <ProductValueAccordions product={product} />
          </div>
        </div>
      </div>

      {/* MÜŞTERİ YORUMLARI BÖLÜMÜ */}
      <CustomerReviewsSection product={product} />

      {/* İLİŞKİLİ ÖNERİLEN ÜRÜNLER CAROUSEL'İ */}
      <RelatedProductsCarousel productList={relatedProducts || undefined} />

      {/* STICKY SEPETE EKLE BARI */}
      <StickyAddToCartBar product={product} targetElementId="product-buy-box-target" />
    </section>
  );
}

export default ProductDetailSection;
