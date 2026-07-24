import { useState } from "preact/hooks";
import {
  getThemeSetting,
  hasProductListNextPage,
  getProductListNextPage,
} from "@ikas/bp-storefront";
import { Button } from "../Button";
import { Props } from "./types";

export interface PaginationLoadMoreProps extends Props {
  className?: string;
}

export function PaginationLoadMore({
  productList,
  loadMoreText = "Daha Fazla Göster",
  loadingText = "Yükleniyor...",
  className = "",
}: PaginationLoadMoreProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Read live theme global settings via getThemeSetting
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)

  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";

  const inlineStyles = {
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--max-site-width": maxSiteWidth,
  };

  if (!productList) return null;

  const hasNext = hasProductListNextPage(productList);
  const currentCount = productList.data?.length || 0;
  const totalCount = (productList as any).totalCount ?? currentCount;
  const progressPercent = totalCount > 0 ? Math.min(100, (currentCount / totalCount) * 100) : 100;

  const handleLoadMore = async () => {
    if (!productList || isLoading || !hasNext) return;
    setIsLoading(true);
    try {
      await getProductListNextPage(productList);
    } catch (err) {
      console.error("Daha fazla ürün yükleme hatası:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasNext && currentCount === totalCount) return null;

  return (
    <div
      className={`ikas-pagination ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <div className="ikas-pagination__container">
        {/* ÜRÜN İLERLEME ÇUBUĞU VE METNİ */}
        <p className="ikas-pagination__info _C0OZ8W7vYS">
          Gösterilen: {currentCount} / {totalCount} Ürün
        </p>

        <div className="ikas-pagination__progress-bar">
          <div
            className="ikas-pagination__progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* YÜKLE CTA BUTONU */}
        {hasNext && (
          <Button
            text={isLoading ? loadingText : loadMoreText}
            variant="SECONDARY"
            size="NORMAL"
            loading={isLoading}
            onClick={handleLoadMore}
          />
        )}
      </div>
    </div>
  );
}

export default PaginationLoadMore;
