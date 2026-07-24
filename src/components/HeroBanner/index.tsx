import { getThemeSetting, getDefaultSrc, Router } from "@ikas/bp-storefront";
import { formatShadow } from "../../utils/theme";
import { Button } from "../Button";
import { Props } from "./types";

export interface HeroBannerProps extends Props {
  className?: string;
}

export function HeroBanner({
  title = "Her Yerde Kusursuz Uyku ve Seyahat Konforu",
  subtitle = "Patentli ergonomik tasarımı ile boynunuzu destekler, seyahatlerinizi keyfe dönüştürür.",
  primaryButtonText = "Şimdi Keşfet",
  primaryButtonLink,
  secondaryButtonText = "Ürünü İncele",
  secondaryButtonLink,
  image,
  backgroundColor,
  className = "",
}: HeroBannerProps) {
  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const mediaRadiusSetting = getThemeSetting("_YFQAxlLvZl"); // Radius / Medya (2rem / 32px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)
  const cardShadowSetting = getThemeSetting("_yyUleMlhR4"); // Gölge / Kart Soft Shadow

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const mediaRadius = mediaRadiusSetting?.value || "32px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";
  const cardShadow = formatShadow(cardShadowSetting?.value, "0 4px 20px rgba(55, 67, 91, 0.08)");

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--media-radius": mediaRadius,
    "--max-site-width": maxSiteWidth,
    "--card-shadow": cardShadow,
  };

  const imgSrc = image ? getDefaultSrc(image) : null;

  return (
    <section
      className={`ikas-hero ${className}`.trim()}
      style={inlineStyles}
    >
      <div className="ikas-hero__container">
        {/* SOL KOLON: HİTAB VE EYLEM */}
        <div className="ikas-hero__content">
          {title && (
            <h1 className="ikas-hero__title _78XkSXv7w4">{title}</h1>
          )}

          {subtitle && (
            <p className="ikas-hero__subtitle _VcfI5D07Nt">{subtitle}</p>
          )}

          <div className="ikas-hero__actions">
            {primaryButtonText && (
              <Button
                text={primaryButtonText}
                variant="PRIMARY"
                size="LARGE"
                onClick={() => {
                  const pLink = primaryButtonLink as any;
                  if (pLink?.href) {
                    Router.navigate(pLink.href);
                  } else if (pLink?.pageType) {
                    Router.navigateToPage(pLink.pageType, pLink.params);
                  } else {
                    Router.navigateToPage("CATEGORY");
                  }
                }}
              />
            )}

            {secondaryButtonText && (
              <Button
                text={secondaryButtonText}
                variant="ACCENT"
                size="LARGE"
                onClick={() => {
                  const sLink = secondaryButtonLink as any;
                  if (sLink?.href) {
                    Router.navigate(sLink.href);
                  } else if (sLink?.pageType) {
                    Router.navigateToPage(sLink.pageType, sLink.params);
                  } else {
                    Router.navigateToPage("PRODUCT");
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* SAĞ KOLON: MEDYA GÖRSELİ */}
        <div className="ikas-hero__media">
          <div className="ikas-hero__img-wrapper">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={title || "Hero Banner Görseli"}
                className="ikas-hero__img"
              />
            ) : (
              <div className="ikas-hero__img-placeholder" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
