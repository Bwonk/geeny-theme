import { getThemeSetting, IkasProduct } from "@ikas/bp-storefront";
import { ProductCard } from "../ProductCard";
import { Props } from "./types";

export interface RelatedProductsCarouselProps extends Props {
  products?: IkasProduct[];
  className?: string;
}

export function RelatedProductsCarousel({
  title = "Bunları da Beğenebilirsiniz",
  productList,
  products,
  backgroundColor,
  className = "",
}: RelatedProductsCarouselProps) {
  // Read live theme global settings via getThemeSetting
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const gridGapSetting = getThemeSetting("_4Ud47RIVna"); // Boşluk / Grid Gap (20px)
  const mobileGridGapSetting = getThemeSetting("_dBvnJWALXD"); // Boşluk / Mobil Grid Gap (12px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const gridGap = gridGapSetting?.value || "20px";
  const mobileGridGap = mobileGridGapSetting?.value || "12px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--grid-gap": gridGap,
    "--mobile-grid-gap": mobileGridGap,
    "--max-site-width": maxSiteWidth,
  };

  const displayProducts = products || (productList as any)?.data || [];

  if (!displayProducts || displayProducts.length === 0) return null;

  return (
    <section
      className={`ikas-related-products ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <div className="ikas-related-products__container">
        {title && (
          <h2 className="ikas-related-products__title _sKAMD8d1LA">
            {title}
          </h2>
        )}

        <div className="ikas-related-products__grid">
          {displayProducts.slice(0, 4).map((productItem: any, idx: number) => (
            <ProductCard key={productItem.id || idx} product={productItem} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProductsCarousel;
