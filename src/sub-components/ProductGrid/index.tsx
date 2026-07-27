import {
  getThemeSetting,
  hasProductListAppliedFilters,
  clearProductListFilters,
  IkasProduct,
  IkasProductList,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import ProductCard from "../ProductCard";
import Button from "../Button";

export interface Props {
  productList?: IkasProductList;
  products?: IkasProduct[];
  emptyMessage?: string;
  className?: string;
}

export function ProductGrid({
  productList,
  products,
  emptyMessage = "Aradığınız kriterlere uygun ürün bulunamadı.",
  className = "",
}: Props) {
  // Read live theme global settings via getThemeSetting
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const gridGapSetting = getThemeSetting("_4Ud47RIVna"); // Boşluk / Grid Gap (20px)
  const mobileGridGapSetting = getThemeSetting("_dBvnJWALXD"); // Boşluk / Mobil Grid Gap (12px)
  const mediaRadiusSetting = getThemeSetting("_YFQAxlLvZl"); // Radius / Medya (32px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)

  const sectionPy = verticalPySetting?.value || "32px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "24px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const gridGap = gridGapSetting?.value || "20px";
  const mobileGridGap = mobileGridGapSetting?.value || "12px";
  const mediaRadius = mediaRadiusSetting?.value || "32px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";

  const inlineStyles = {
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--grid-gap": gridGap,
    "--mobile-grid-gap": mobileGridGap,
    "--media-radius": mediaRadius,
    "--max-site-width": maxSiteWidth,
  };

  const displayProducts: IkasProduct[] =
    products || productList?.data || [];
  const hasApplied = productList ? hasProductListAppliedFilters(productList) : false;

  const handleClearFilters = () => {
    if (productList) {
      clearProductListFilters(productList);
    }
  };

  return (
    <section
      className={`ikas-product-grid ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <div className="ikas-product-grid__container">
        {displayProducts.length > 0 ? (
          <div className="ikas-product-grid__list">
            {displayProducts.map((prod: IkasProduct, idx: number) => (
              <ProductCard key={prod.id || idx} product={prod} />
            ))}
          </div>
        ) : (
          /* BOŞ SONUÇ STATE'İ (EMPTY STATE) */
          <div className="ikas-product-grid__empty">
            <h3 className="ikas-product-grid__empty-title _AHnMWYqzuI">
              Sonuç Bulunamadı
            </h3>
            <p className="ikas-product-grid__empty-text _VcfI5D07Nt">
              {emptyMessage}
            </p>
            {hasApplied && (
              <Button
                text="Filtreleri Temizle"
                variant="PRIMARY"
                size="NORMAL"
                onClick={handleClearFilters}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default observer(ProductGrid);
