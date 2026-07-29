import { useRef, useEffect } from "preact/hooks";
import { getThemeSetting, getDefaultSrc, Router } from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import { Props } from "./types";

export interface HeroBannerProps extends Props {
  className?: string;
}

/**
 * HeroBanner — SS26 Seyahat Serisi Ana Hero Bölümü (Anasayfa.dc.html Uyumlu)
 *
 * Özellikler:
 * - 2 Kolonlu Responsive Izgara (Sol Metin, Sağ 4:5 Dikey Medya)
 * - Kelime Bazlı Word Reveal Animasyonu (@keyframes wordReveal + stagger gecikme)
 * - İki Tonlu H1 Başlık (İlk kelime Ana Lacivert, kalan kelimeler Soft Gri Mavi)
 * - Scroll Parallax Efekti (Sağ medya görseli scroll'a bağlı ±22px yumuşak hareket)
 * - Sosyal Kanıt Overlay Kartı (Avatar Stack + Yıldız Puanı + Müşteri Adedi)
 * - PILL_PRIMARY ve Çizgili İkincil Eylem Butonu
 * - prefers-reduced-motion Erişilebilirlik Desteği
 */
export function HeroBanner({
  tagText = "SS26 · SEYAHAT SERİSİ",
  title = "Uykunu yanında taşı.",
  subtitle = "Tek parça, katlanabilir boyun desteği. Uçakta, trende ve arada kalan her yerde omurganı hizada tutar — sekiz saatlik bir yolculuktan sonra bile.",
  primaryButtonText = "KEŞFET",
  primaryButtonLink,
  secondaryButtonText = "NASIL ÇALIŞIR",
  secondaryButtonLink,
  socialProofTitle = "140.000+ mutlu yolcu",
  socialProofSubtitle = "4,8 / 5 · 2.412 DEĞERLENDİRME",
  image,
  backgroundColor,
  className = "",
}: HeroBannerProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax Efekti (GSAP Yok, Native IntersectionObserver + requestAnimationFrame)
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;

    // Azaltılmış hareket tercihi varsa parallax çalışmasın
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrameId: number;
    let queued = false;

    const paint = () => {
      queued = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Görsel ekranda değilse performans için hesaplama yapma
      if (rect.bottom < -80 || rect.top > vh + 80) return;
      const k = (vh * 0.5 - (rect.top + rect.height / 2)) / vh;
      el.style.transform = `translate3d(0, ${(k * -22).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!queued) {
        queued = true;
        animationFrameId = requestAnimationFrame(paint);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Live global settings
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Site Maksimum Genişliği (1560px)
  const maxSiteWidth = siteWidthSetting?.value || "1560px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--max-site-width": maxSiteWidth,
  };

  const imgSrc = image ? getDefaultSrc(image) : null;

  // Başlığı kelimelerine bölerek Word Reveal & İki Tonlama yapısı oluşturma
  const titleWords = title ? title.split(" ") : [];

  return (
    <section
      id="top"
      className={`ikas-hero ${className}`.trim()}
      style={inlineStyles}
      lang="tr"
    >
      <div className="ikas-hero__container">
        {/* 1. SOL KOLON: Metin, H1 Word Reveal, CTA Butonları */}
        <div className="ikas-hero__content">
          {tagText && (
            <div className="ikas-hero__tag _eZyocyyd0F">
              {tagText.toLocaleUpperCase("tr-TR")}
            </div>
          )}

          {title && (
            <h1 className="ikas-hero__title">
              {titleWords.map((word, idx) => {
                // İlk kelime ana lacivert, sonrakiler soft gri-mavi
                const isFirstWord = idx === 0;
                const wordClass = isFirstWord
                  ? "ikas-hero__word ikas-hero__word--primary"
                  : "ikas-hero__word ikas-hero__word--muted";

                return (
                  <span
                    key={idx}
                    className={wordClass}
                    style={{ animationDelay: `${60 + idx * 90}ms` }}
                  >
                    {word}{idx < titleWords.length - 1 ? "\u00A0" : ""}
                  </span>
                );
              })}
            </h1>
          )}

          {subtitle && (
            <p className="ikas-hero__subtitle _VcfI5D07Nt">
              {subtitle}
            </p>
          )}

          <div className="ikas-hero__actions">
            {primaryButtonText && (
              <Button
                text={primaryButtonText}
                variant="PILL_PRIMARY"
                size="LARGE"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                }
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
              <button
                type="button"
                className="ikas-hero__secondary-link"
                onClick={() => {
                  const sLink = secondaryButtonLink as any;
                  if (sLink?.href) {
                    Router.navigate(sLink.href);
                  } else if (sLink?.pageType) {
                    Router.navigateToPage(sLink.pageType, sLink.params);
                  } else {
                    const el = document.getElementById("hikaye");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {secondaryButtonText.toLocaleUpperCase("tr-TR")}
              </button>
            )}
          </div>
        </div>

        {/* 2. SAĞ KOLON: 4:5 Dikey Görsel + Parallax + Sosyal Kanıt Kartı */}
        <div className="ikas-hero__media-column">
          <div
            ref={parallaxRef}
            className="ikas-hero__media-wrapper"
            data-hero-par="1"
          >
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={title || "SS26 Seyahat Serisi Hero Görseli"}
                className="ikas-hero__img"
              />
            ) : (
              <div className="ikas-hero__img-placeholder" />
            )}
          </div>

          {/* Sosyal Kanıt Floating Kartı */}
          {(socialProofTitle || socialProofSubtitle) && (
            <div className="ikas-hero__social-proof-card">
              {/* Avatarlar */}
              <div className="ikas-hero__avatar-stack">
                <span className="ikas-hero__avatar ikas-hero__avatar--1" />
                <span className="ikas-hero__avatar ikas-hero__avatar--2" />
                <span className="ikas-hero__avatar ikas-hero__avatar--3" />
              </div>

              {/* Bilgi Metinleri */}
              <div className="ikas-hero__social-proof-info">
                {socialProofTitle && (
                  <div className="ikas-hero__social-proof-title">
                    {socialProofTitle}
                  </div>
                )}
                {socialProofSubtitle && (
                  <div className="ikas-hero__social-proof-subtitle _eZyocyyd0F">
                    {socialProofSubtitle.toLocaleUpperCase("tr-TR")}
                  </div>
                )}
              </div>

              {/* Yıldız Puanı */}
              <span
                className="ikas-hero__stars"
                aria-label="5 üzerinden 5 yıldız"
              >
                ★★★★★
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
