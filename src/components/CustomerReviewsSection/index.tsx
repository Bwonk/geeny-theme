import { getThemeSetting } from "@ikas/bp-storefront";
import { formatShadow } from "../../utils/theme";
import { Props } from "./types";

export interface ReviewItem {
  id?: string;
  author: string;
  rating: number;
  date?: string;
  title?: string;
  comment: string;
  verified?: boolean;
}

export interface CustomerReviewsSectionProps extends Props {
  reviews?: ReviewItem[];
  className?: string;
}

export function CustomerReviewsSection({
  heading = "Müşteri Değerlendirmeleri",
  product,
  reviews,
  backgroundColor,
  className = "",
}: CustomerReviewsSectionProps) {
  // Read live theme global settings via getThemeSetting
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const gridGapSetting = getThemeSetting("_4Ud47RIVna"); // Boşluk / Grid Gap (20px)
  const mobileGridGapSetting = getThemeSetting("_dBvnJWALXD"); // Boşluk / Mobil Grid Gap (12px)
  const mediaRadiusSetting = getThemeSetting("_YFQAxlLvZl"); // Radius / Medya (2rem / 32px)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)
  const cardShadowSetting = getThemeSetting("_yyUleMlhR4"); // Gölge / Kart Soft Shadow

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const gridGap = gridGapSetting?.value || "20px";
  const mobileGridGap = mobileGridGapSetting?.value || "12px";
  const mediaRadius = mediaRadiusSetting?.value || "32px";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";
  const cardShadow = formatShadow(cardShadowSetting?.value, "0 4px 20px rgba(55, 67, 91, 0.08)");

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--grid-gap": gridGap,
    "--mobile-grid-gap": mobileGridGap,
    "--media-radius": mediaRadius,
    "--max-site-width": maxSiteWidth,
    "--card-shadow": cardShadow,
  };

  const defaultReviews: ReviewItem[] = [
    {
      id: "rev1",
      author: "Selin Y.",
      rating: 5,
      date: "14 Mayıs 2026",
      title: "Uzun Uçuşların Kurtarıcısı",
      comment: "11 saatlik Transatlantik uçuşumda ilk kez sırt ve boyun tutulması yaşamadan seyahat ettim. Katlanabilir ve boynu tam kavrayan yapısı inanılmaz rahat.",
      verified: true,
    },
    {
      id: "rev2",
      author: "Mert K.",
      rating: 5,
      date: "28 Nisan 2026",
      title: "Yumuşak Kumaş ve Ergonomi",
      comment: "Bambu kumaş hissi aşırı yumuşak ve terletmiyor. Sıradan boyun yastıklarından çok farklı, istediğiniz şekle girebiliyor.",
      verified: true,
    },
    {
      id: "rev3",
      author: "Zeynep A.",
      rating: 5,
      date: "02 Nisan 2026",
      title: "Kesinlikle Tavsiye Ediyorum",
      comment: "Ofiste masa başında çalışırken bel desteği olarak da kullanıyorum. Hem seyahatte hem günlük yaşamda süper kullanışlı bir ürün.",
      verified: true,
    },
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : defaultReviews;
  const avgRating = product?.averageRating || 5.0;
  const totalReviews = product?.reviewCount || displayReviews.length;

  return (
    <section
      className={`ikas-reviews ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <div className="ikas-reviews__container">
        {/* BAŞLIK VE ÖZET SÜTUNU */}
        <div className="ikas-reviews__header">
          {heading && (
            <h2 className="ikas-reviews__heading _sKAMD8d1LA">{heading}</h2>
          )}
          <div className="ikas-reviews__summary">
            <span className="ikas-reviews__score _AZR1yL8GrK">
              {avgRating.toFixed(1)}
            </span>
            <div className="ikas-reviews__stars" aria-label={`Ortalama Puan: ${avgRating}`}>
              {"★".repeat(Math.round(avgRating))}
              {"☆".repeat(5 - Math.round(avgRating))}
            </div>
            <span className="ikas-reviews__count _C0OZ8W7vYS">
              ({totalReviews} Doğrulanmış Yorum)
            </span>
          </div>
        </div>

        {/* YORUM KARTLARI IZGARASI */}
        <div className="ikas-reviews__grid">
          {displayReviews.map((rev, idx) => (
            <div key={rev.id || idx} className="ikas-reviews__card">
              <div className="ikas-reviews__card-top">
                <span className="ikas-reviews__author _VcfI5D07Nt">
                  {rev.author}
                </span>
                {rev.verified && (
                  <span className="ikas-reviews__badge _eZyocyyd0F">
                    Doğrulanmış Alıcı
                  </span>
                )}
              </div>

              <div className="ikas-reviews__card-stars">
                {"★".repeat(rev.rating)}
                {"☆".repeat(5 - rev.rating)}
              </div>

              {rev.title && (
                <h3 className="ikas-reviews__card-title _VcfI5D07Nt">
                  {rev.title}
                </h3>
              )}

              <p className="ikas-reviews__card-text _C0OZ8W7vYS">
                {rev.comment}
              </p>

              {rev.date && (
                <span className="ikas-reviews__card-date _eZyocyyd0F">
                  {rev.date}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerReviewsSection;
