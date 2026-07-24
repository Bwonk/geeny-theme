import { getThemeSetting } from "@ikas/bp-storefront";
import { formatShadow } from "../../utils/theme";
import { Props } from "./types";

export interface TestimonialsCarouselProps extends Props {
  className?: string;
}

export function TestimonialsCarousel({
  title = "Kullanıcılarımızın Deneyimleri",
  subtitle = "Binlerce mutlu gezginin seyahat deneyimleri hakkındaki görüşleri.",
  testimonial1Text = "12 saatlik uçak yolculuğunda ilk defa boyun ağrısı çekmeden uyudum. Harika bir tasarım!",
  testimonial1Author = "Zeynep A. — Doğrulanmış Alıcı",
  testimonial2Text = "Kumaş kalitesi ve katlanabilir olması çok pratik. Çantamdan hiç ayırmıyorum.",
  testimonial2Author = "Caner T. — Sık Seyahat Eden",
  backgroundColor,
  className = "",
}: TestimonialsCarouselProps) {
  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const cardRadiusSetting = getThemeSetting("_WyFUVwOpPk"); // Radius / Kart (2rem / 32px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)
  const cardShadowSetting = getThemeSetting("_yyUleMlhR4"); // Gölge / Kart Soft Shadow

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const cardRadius = cardRadiusSetting?.value || "32px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";
  const cardShadow = formatShadow(cardShadowSetting?.value, "0 4px 20px rgba(55, 67, 91, 0.08)");

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--card-radius": cardRadius,
    "--max-site-width": maxSiteWidth,
    "--card-shadow": cardShadow,
  };

  const reviews = [
    { text: testimonial1Text, author: testimonial1Author },
    { text: testimonial2Text, author: testimonial2Author },
  ];

  return (
    <section
      className={`ikas-testimonials ${className}`.trim()}
      style={inlineStyles}
    >
      <div className="ikas-testimonials__container">
        {/* BÖLÜM BAŞLIĞI */}
        <div className="ikas-testimonials__header">
          {title && (
            <h2 className="ikas-testimonials__title _sKAMD8d1LA">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="ikas-testimonials__subtitle _VcfI5D07Nt">
              {subtitle}
            </p>
          )}
        </div>

        {/* YORUM KARTLARI */}
        <div className="ikas-testimonials__grid">
          {reviews.map((rev, idx) => (
            <div key={idx} className="ikas-testimonials__card">
              {/* 5 YILDIZ PUAN */}
              <div className="ikas-testimonials__stars" aria-label="5 Yıldız">
                {Array.from({ length: 5 }).map((_, sIdx) => (
                  <svg key={sIdx} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {rev.text && (
                <p className="ikas-testimonials__text _VcfI5D07Nt">
                  "{rev.text}"
                </p>
              )}

              {rev.author && (
                <span className="ikas-testimonials__author _eZyocyyd0F">
                  {rev.author}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
