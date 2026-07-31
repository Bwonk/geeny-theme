import { useEffect, useState } from "preact/hooks";
import {
  getThemeSetting,
  getProductCustomerReviews,
  getIkasCustomerReviewFormattedDate,
  IkasCustomerReview,
} from "@ikas/bp-storefront";
import { Props } from "./types";

export interface CustomerReviewsSectionProps extends Props {
  className?: string;
}

function authorLabel(review: IkasCustomerReview): string {
  const first = (review.firstName || "").trim();
  const last = (review.lastName || "").trim();
  if (first && last) return `${first} ${last.charAt(0).toLocaleUpperCase("tr-TR")}.`;
  if (first) return first;
  if (review.email) return review.email.split("@")[0] || "";
  return "";
}

function isVerified(review: IkasCustomerReview): boolean {
  return !!(review.orderId || review.orderNumber);
}

export function CustomerReviewsSection({
  tag = "02 · YORUMLAR",
  heading = "Müşteri değerlendirmeleri",
  countSuffix = "doğrulanmış yorum",
  verifiedBuyerText = "Doğrulanmış alıcı",
  emptyText = "Bu ürün için henüz yorum yok.",
  loadingText = "Yorumlar yükleniyor...",
  product,
  backgroundColor,
  className = "",
}: CustomerReviewsSectionProps) {
  const [reviews, setReviews] = useState<IkasCustomerReview[]>([]);
  const [listCount, setListCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ");
  const fadeAnimSetting = getThemeSetting("_AwVN6G9Zib");
  const maxSiteWidth = siteWidthSetting?.value || "1560px";
  const fadeEase = fadeAnimSetting?.value || "0.6s cubic-bezier(0.22, 1, 0.36, 1)";

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!product) {
        setReviews([]);
        setListCount(0);
        return;
      }

      setLoading(true);
      try {
        const list = await getProductCustomerReviews(product, 6, 1);
        if (cancelled) return;
        setReviews(list?.data || []);
        setListCount(list?.count ?? list?.data?.length ?? 0);
      } catch (err) {
        console.error("Yorumlar yüklenemedi:", err);
        if (!cancelled) {
          setReviews([]);
          setListCount(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [product?.id]);

  const avgRating =
    typeof product?.averageRating === "number" && product.averageRating > 0
      ? product.averageRating
      : reviews.length > 0
        ? reviews.reduce((sum, r) => sum + (r.star || 0), 0) / reviews.length
        : 0;

  const totalReviews = product?.reviewCount || listCount || reviews.length;
  const starFilled = avgRating > 0 ? Math.round(avgRating) : 0;

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--max-site-width": maxSiteWidth,
    "--reviews-fade": fadeEase,
  } as any;

  return (
    <section
      className={`ikas-reviews ${className}`.trim()}
      style={inlineStyles}
      lang="tr"
    >
      <div className="ikas-reviews__container">
        <header className="ikas-reviews__header">
          <div className="ikas-reviews__header-left">
            {tag && <div className="ikas-reviews__tag">{tag}</div>}
            {heading && <h2 className="ikas-reviews__heading">{heading}</h2>}
          </div>

          {(avgRating > 0 || totalReviews > 0) && (
            <div className="ikas-reviews__summary">
              {avgRating > 0 && (
                <span className="ikas-reviews__score">
                  {avgRating.toLocaleString("tr-TR", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                </span>
              )}
              {avgRating > 0 && (
                <span
                  className="ikas-reviews__stars"
                  aria-label={`${avgRating.toLocaleString("tr-TR")} / 5`}
                >
                  {"★".repeat(Math.min(5, Math.max(0, starFilled)))}
                  {"☆".repeat(Math.max(0, 5 - starFilled))}
                </span>
              )}
              {totalReviews > 0 && countSuffix && (
                <span className="ikas-reviews__count">
                  {totalReviews.toLocaleString("tr-TR")} {countSuffix}
                </span>
              )}
            </div>
          )}
        </header>

        {loading && loadingText && (
          <p className="ikas-reviews__status">{loadingText}</p>
        )}

        {!loading && reviews.length === 0 && emptyText && (
          <p className="ikas-reviews__status">{emptyText}</p>
        )}

        {!loading && reviews.length > 0 && (
          <div className="ikas-reviews__grid">
            {reviews.map((rev) => {
              const author = authorLabel(rev);
              const verified = isVerified(rev);
              const dateStr = getIkasCustomerReviewFormattedDate(rev);
              const rating = Math.min(5, Math.max(0, Math.round(rev.star || 0)));

              return (
                <article key={rev.id} className="ikas-reviews__card">
                  <div className="ikas-reviews__card-top">
                    {author && <span className="ikas-reviews__author">{author}</span>}
                    {verified && verifiedBuyerText && (
                      <span className="ikas-reviews__badge">{verifiedBuyerText}</span>
                    )}
                  </div>

                  <div className="ikas-reviews__card-stars" aria-hidden="true">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                  </div>

                  {rev.title && <h3 className="ikas-reviews__card-title">{rev.title}</h3>}

                  {rev.comment && (
                    <p className="ikas-reviews__card-text">{rev.comment}</p>
                  )}

                  {dateStr && (
                    <time className="ikas-reviews__card-date">{dateStr}</time>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomerReviewsSection;
