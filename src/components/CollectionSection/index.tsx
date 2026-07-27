import { getThemeSetting } from "@ikas/bp-storefront";
import { CollectionHero } from "../CollectionHero";
import FilterAndSortBar from "../../sub-components/FilterAndSortBar";
import ProductGrid from "../../sub-components/ProductGrid";
import PaginationLoadMore from "../../sub-components/PaginationLoadMore";
import { Props } from "./types";

export interface CollectionSectionProps extends Props {
  className?: string;
}

export function CollectionSection({
  productList,
  title,
  description,
  backgroundColor,
  className = "",
}: CollectionSectionProps) {
  // Read live theme global settings via getThemeSetting
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)
  const maxSiteWidth = siteWidthSetting?.value || "1820px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--max-site-width": maxSiteWidth,
  };

  return (
    <section
      className={`ikas-collection-section ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      {/* 1. KOLEKSİYON HERO BANNER */}
      <CollectionHero
        productList={productList || undefined}
        title={title}
        description={description}
      />

      <div className="ikas-collection-section__container">
        {/* 2. FİLTRELEME VE SIRALAMA BARI */}
        <FilterAndSortBar productList={productList || undefined} />

        {/* 3. ÜRÜN IZGARASI (4 KOLON / 2 KOLON + EMPTY STATE) */}
        <ProductGrid productList={productList || undefined} />

        {/* 4. SAYFALAMA VE DAHA FAZLA YÜKLE CTA */}
        <PaginationLoadMore productList={productList || undefined} />
      </div>
    </section>
  );
}

export default CollectionSection;
