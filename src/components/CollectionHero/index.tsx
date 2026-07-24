import { getThemeSetting, getDefaultSrc, IkasImage } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface CollectionHeroProps extends Props {
  image?: IkasImage | null;
  className?: string;
}

export function CollectionHero({
  title,
  description,
  image,
  productList,
  backgroundColor,
  className = "",
}: CollectionHeroProps) {
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

  // Determine category title and description
  const cat = (productList as any)?.category;
  const displayTitle = title || cat?.name || "Tüm Ürünler";
  const displayDesc =
    description ||
    cat?.description ||
    "Patentli ergonomik tasarıma sahip seyahat ve uyku yastığı koleksiyonunu keşfedin.";

  const categoryImage = image || cat?.image;
  const imgSrc = categoryImage ? getDefaultSrc(categoryImage) : null;

  return (
    <section
      className={`ikas-collection-hero ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <div className="ikas-collection-hero__container">
        {displayTitle && (
          <h1 className="ikas-collection-hero__title _DusX6I08Pv">
            {displayTitle}
          </h1>
        )}

        {displayDesc && (
          <p className="ikas-collection-hero__desc _VcfI5D07Nt">
            {displayDesc}
          </p>
        )}
      </div>
    </section>
  );
}

export default CollectionHero;
