import { getThemeSetting, Router } from "@ikas/bp-storefront";
import { ProductCard } from "../ProductCard";
import { Button } from "../Button";
import { Props } from "./types";

export interface FeaturedCollectionGridProps extends Props {
  className?: string;
}

export function FeaturedCollectionGrid({
  title = "En Çok Tercih Edilen Ürünlerimiz",
  subtitle = "Seyahatlerinizde maksimum boyun desteği sağlayan patentli modellerimiz.",
  products,
  itemCount = 4,
  showViewAllButton = true,
  viewAllButtonText = "Tüm Modelleri İncele",
  backgroundColor,
  className = "",
}: FeaturedCollectionGridProps) {
  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const gridGapSetting = getThemeSetting("_4Ud47RIVna"); // Boşluk / Grid Gap (20px)
  const tabletGapSetting = getThemeSetting("_mfIn0YsoTT"); // Boşluk / Tablet Grid Gap (16px)
  const mobileGapSetting = getThemeSetting("_dBvnJWALXD"); // Boşluk / Mobil Grid Gap (12px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const gridGap = gridGapSetting?.value || "20px";
  const tabletGap = tabletGapSetting?.value || "16px";
  const mobileGap = mobileGapSetting?.value || "12px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--grid-gap": gridGap,
    "--tablet-gap": tabletGap,
    "--mobile-gap": mobileGap,
    "--max-site-width": maxSiteWidth,
  };

  const productList = products?.data || [];
  const displayProducts = productList.slice(0, itemCount);

  // Fallback demo cards if editor product list is empty
  const hasProducts = displayProducts.length > 0;
  const fallbackList = Array.from({ length: itemCount }).map((_, i) => i);

  return (
    <section
      className={`ikas-featured-grid ${className}`.trim()}
      style={inlineStyles}
    >
      <div className="ikas-featured-grid__container">
        {/* BÖLÜM BAŞLIĞI */}
        <div className="ikas-featured-grid__header">
          {title && (
            <h2 className="ikas-featured-grid__title _sKAMD8d1LA">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="ikas-featured-grid__subtitle _VcfI5D07Nt">
              {subtitle}
            </p>
          )}
        </div>

        {/* ÜRÜN IZGARASI */}
        <div className="ikas-featured-grid__grid">
          {hasProducts
            ? displayProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  showRating
                  showQuickAdd
                />
              ))
            : fallbackList.map((id) => (
                <ProductCard key={id} showRating showQuickAdd />
              ))}
        </div>

        {/* TÜMÜNÜ GÖR BUTONU */}
        {showViewAllButton && viewAllButtonText && (
          <div className="ikas-featured-grid__footer">
            <Button
              text={viewAllButtonText}
              variant="SECONDARY"
              size="LARGE"
              onClick={() => Router.navigateToPage("CATEGORY")}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedCollectionGrid;
