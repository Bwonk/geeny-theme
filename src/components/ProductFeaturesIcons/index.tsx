import { getThemeSetting } from "@ikas/bp-storefront";
import { formatShadow } from "../../utils/theme";
import { Props } from "./types";

export interface ProductFeaturesIconsProps extends Props {
  className?: string;
}

export function ProductFeaturesIcons({
  feature1Title = "Ergonomik Destek",
  feature1Desc = "Patentli form yapısı ile omurga duruşunuzu destekler.",
  feature2Title = "Nefes Alabilir Kumaş",
  feature2Desc = "Terletmeyen kılıf yapısı ile her mevsim ferah kullanım.",
  feature3Title = "Hızlı & Ücretsiz Kargo",
  feature3Desc = "500 TL üzeri siparişlerde aynı gün kargo avantajı.",
  backgroundColor,
  className = "",
}: ProductFeaturesIconsProps) {
  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const cardRadiusSetting = getThemeSetting("_WyFUVwOpPk"); // Radius / Kart (2rem / 32px)
  const gridGapSetting = getThemeSetting("_4Ud47RIVna"); // Boşluk / Grid Gap (20px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)
  const cardShadowSetting = getThemeSetting("_yyUleMlhR4"); // Gölge / Kart Soft Shadow
  const hoverAnimSetting = getThemeSetting("_bNtMCrOBsE"); // Animasyon / Buton ve Hover

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const cardRadius = cardRadiusSetting?.value || "32px";
  const gridGap = gridGapSetting?.value || "20px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";
  const cardShadow = formatShadow(cardShadowSetting?.value, "0 4px 20px rgba(55, 67, 91, 0.08)");
  const hoverTransition = hoverAnimSetting?.value || "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--card-radius": cardRadius,
    "--grid-gap": gridGap,
    "--max-site-width": maxSiteWidth,
    "--card-shadow": cardShadow,
    "--hover-transition": hoverTransition,
  };

  const features = [
    {
      title: feature1Title,
      desc: feature1Desc,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: feature2Title,
      desc: feature2Desc,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
    },
    {
      title: feature3Title,
      desc: feature3Desc,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className={`ikas-features ${className}`.trim()}
      style={inlineStyles}
    >
      <div className="ikas-features__container">
        {features.map((feat, idx) => (
          <div key={idx} className="ikas-features__card">
            <div className="ikas-features__icon-circle">{feat.icon}</div>
            {feat.title && (
              <h3 className="ikas-features__title _AZR1yL8GrK">
                {feat.title}
              </h3>
            )}
            {feat.desc && (
              <p className="ikas-features__desc _C0OZ8W7vYS">{feat.desc}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductFeaturesIcons;
