import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface AnnouncementBarProps extends Props {
  className?: string;
}

/**
 * AnnouncementBar — Sayfa Üstü Duyuru Bandı (Anasayfa.dc.html referansına uygun)
 *
 * Özellikler:
 * - Koyu lacivert zemin (var(--pxNuSoudLn)), beyaz metin (var(--24KlcgGmm9))
 * - Roboto Mono font (11px, 0.14em tracking)
 * - 3 duyuru mesajı desteği (noktalı ayraç `·` ile ayrılmış)
 * - 3. duyuru mesajında Accent Sarı (var(--sy8ZnXZdoG)) vurgusu
 * - Türkçe karakter dostu toLocaleUpperCase("tr-TR") dönüşümü
 */
export function AnnouncementBar({
  text = "500 ₺ ÜZERİ ÜCRETSİZ KARGO",
  text2 = "30 GÜN KOŞULSUZ İADE",
  text3 = "2 YIL GARANTİ",
  link,
  className = "",
}: AnnouncementBarProps) {
  const msg1 = text?.trim() ? text.trim().toLocaleUpperCase("tr-TR") : "";
  const msg2 = text2?.trim() ? text2.trim().toLocaleUpperCase("tr-TR") : "";
  const msg3 = text3?.trim() ? text3.trim().toLocaleUpperCase("tr-TR") : "";

  // Eğer hiçbir duyuru metni girilmemişse bileşeni işleme
  if (!msg1 && !msg2 && !msg3) {
    return null;
  }

  // Live theme settings
  const heightSetting = getThemeSetting("_YvGykMxQWI");
  const barHeight = heightSetting?.value || "38px";

  const inlineStyles = {
    "--announcement-height": barHeight,
  };

  const linkObj = link as any;
  const href = linkObj?.href || linkObj?.externalLink || null;

  const activeMessages = [
    msg1 ? { text: msg1, isHighlight: false } : null,
    msg2 ? { text: msg2, isHighlight: false } : null,
    msg3 ? { text: msg3, isHighlight: true } : null,
  ].filter(Boolean) as { text: string; isHighlight: boolean }[];

  const fullText = activeMessages.map((m) => m.text).join(" · ");

  const innerContent = (
    <div className="ikas-announcement-bar__content">
      {activeMessages.map((msg, index) => (
        <span key={index} className="ikas-announcement-bar__item">
          {index > 0 && (
            <span className="ikas-announcement-bar__dot" aria-hidden="true">
              ·
            </span>
          )}
          <span
            className={
              msg.isHighlight
                ? "ikas-announcement-bar__msg ikas-announcement-bar__msg--highlight"
                : "ikas-announcement-bar__msg"
            }
          >
            {msg.text}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <aside
      className={`ikas-announcement-bar ${className}`.trim()}
      style={inlineStyles}
      aria-label={`Duyuru Bandı: ${fullText}`}
    >
      {href ? (
        <a
          href={href}
          className="ikas-announcement-bar__link"
          aria-label={fullText}
        >
          {innerContent}
        </a>
      ) : (
        innerContent
      )}
    </aside>
  );
}

export default AnnouncementBar;
