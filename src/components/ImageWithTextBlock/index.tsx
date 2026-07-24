import { getThemeSetting, getDefaultSrc, Router } from "@ikas/bp-storefront";
import { formatShadow } from "../../utils/theme";
import { Button } from "../Button";
import { Props } from "./types";

export interface ImageWithTextBlockProps extends Props {
  className?: string;
}

export function ImageWithTextBlock({
  badgeText = "ERGONOMİK MÜKEMMELLİK",
  title = "360° Boyun Desteği İle Seyahat Rahatlığı",
  description = "Özel hafızalı sünger yapısı sayesinde baş ve boyun bölgenize tam uyum sağlar. Uçak, tren veya araba seyahatlerinde omurga duruşunuzu korur.",
  buttonText = "Tasarım Hikayesini Keşfet",
  buttonLink,
  image,
  imagePosition = "LEFT",
  backgroundColor,
  className = "",
}: ImageWithTextBlockProps) {
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

  // Dark background check helper for automatic high contrast readability
  const isDarkBg = Boolean(
    backgroundColor &&
      (backgroundColor.toLowerCase().includes("37435b") ||
        backgroundColor.toLowerCase().includes("000") ||
        backgroundColor.toLowerCase().includes("55, 67, 91") ||
        backgroundColor.toLowerCase().includes("black"))
  );

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    color: isDarkBg ? "var(--24KlcgGmm9)" : "var(--pxNuSoudLn)",
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--media-radius": mediaRadius,
    "--max-site-width": maxSiteWidth,
    "--card-shadow": cardShadow,
    "--text-color": isDarkBg ? "var(--24KlcgGmm9)" : "var(--pxNuSoudLn)",
    "--badge-bg": isDarkBg ? "var(--24KlcgGmm9)" : "var(--pxNuSoudLn)",
    "--badge-color": isDarkBg ? "var(--pxNuSoudLn)" : "var(--sy8ZnXZdoG)",
  };

  const imgSrc = image ? getDefaultSrc(image) : null;
  const isRight = imagePosition === "RIGHT";

  return (
    <section
      className={`ikas-image-text ${className}`.trim()}
      style={inlineStyles}
    >
      <div
        className={`ikas-image-text__container ${
          isRight ? "ikas-image-text__container--reverse" : ""
        }`}
      >
        {/* GÖRSEL KOLONU */}
        <div className="ikas-image-text__media">
          <div className="ikas-image-text__img-wrapper">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={title || "Detay Görseli"}
                className="ikas-image-text__img"
              />
            ) : (
              <div className="ikas-image-text__img-placeholder" />
            )}
          </div>
        </div>

        {/* METİN KOLONU */}
        <div className="ikas-image-text__content">
          {badgeText && (
            <span className="ikas-image-text__badge _eZyocyyd0F">
              {badgeText}
            </span>
          )}

          {title && (
            <h2 className="ikas-image-text__title _sKAMD8d1LA">{title}</h2>
          )}

          {description && (
            <p className="ikas-image-text__desc _VcfI5D07Nt">{description}</p>
          )}

          {buttonText && (
            <Button
              text={buttonText}
              variant="PRIMARY"
              size="LARGE"
              onClick={() => {
                const bLink = buttonLink as any;
                if (bLink?.href) {
                  Router.navigate(bLink.href);
                } else if (bLink?.pageType) {
                  Router.navigateToPage(bLink.pageType, bLink.params);
                } else {
                  Router.navigateToPage("CATEGORY");
                }
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ImageWithTextBlock;
