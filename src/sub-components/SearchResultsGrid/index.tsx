import { getThemeSetting, IkasProduct, IkasProductList, hasProductListNextPage } from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { ProductCard } from "../../components/ProductCard";
import PaginationLoadMore from "../PaginationLoadMore";

export interface Props {
  title?: string;
  searchKeyword?: string;
  productList?: IkasProductList;
  products?: IkasProduct[];
  className?: string;
}


export function SearchResultsGrid({
  searchKeyword,
  title,
  productList,
  products,
  className = "",
}: Props) {
  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)
  const gridGapSetting = getThemeSetting("_4Ud47RIVna"); // Boşluk / Grid Gap (20px)
  const mobileGridGapSetting = getThemeSetting("_dBvnJWALXD"); // Boşluk / Mobil Grid Gap (12px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (32px)

  const maxSiteWidth = siteWidthSetting?.value || "1820px";
  const gridGap = gridGapSetting?.value || "20px";
  const mobileGridGap = mobileGridGapSetting?.value || "12px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";

  const inlineStyles = {
    "--max-site-width": maxSiteWidth,
    "--grid-gap": gridGap,
    "--mobile-grid-gap": mobileGridGap,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
  };

  const displayProducts: IkasProduct[] =
    products || productList?.data || [];
  const totalCount = productList?.count ?? displayProducts.length;
  const hasNextPage = productList ? hasProductListNextPage(productList) : false;

  const keywordText = searchKeyword?.trim()
    ? `"${searchKeyword.trim().toLocaleUpperCase("tr-TR")}"`
    : "";

  const headingText =
    title ||
    (keywordText
      ? `${keywordText} İÇİN ARAMA SONUÇLARI`
      : "ARAMA SONUÇLARI");

  if (displayProducts.length === 0) {
    return null; // Return null if no products so EmptySearchState handles the empty condition
  }

  return (
    <section className={`geeny-search-results ${className}`.trim()} style={inlineStyles} lang="tr">
      <div className="geeny-search-results__header">
        <div className="geeny-search-results__title-wrapper">
          <h2 className="geeny-search-results__title _sKAMD8d1LA">
            {headingText}
          </h2>
          <span className="geeny-search-results__count-badge _eZyocyyd0F">
            {totalCount} ÜRÜN
          </span>
        </div>
      </div>

      <div className="geeny-search-results__grid">
        {displayProducts.map((product) => (
          <div key={product.id} className="geeny-search-results__grid-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {hasNextPage && productList && (
        <div className="geeny-search-results__pagination">
          <PaginationLoadMore productList={productList} />
        </div>
      )}
    </section>
  );
}

export default observer(SearchResultsGrid);

