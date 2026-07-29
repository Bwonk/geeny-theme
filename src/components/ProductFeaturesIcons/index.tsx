import { useRef, useEffect, useState } from "preact/hooks";
import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface ProductFeaturesIconsProps extends Props {
  className?: string;
}

/**
 * ProductFeaturesIcons — 4 Kolonlu Feature Bar (Anasayfa.dc.html Uyumlu)
 *
 * Özellikler:
 * - Tam Genişlik Yatay Bant (İnce üst ve alt kenarlık)
 * - 4 Kolonlu Izgara Yapısı (İnce dikey ayraç çizgileri)
 * - Sol Çizgi İkon + Sağ Üst Monospace Etiket + Ana Başlık
 * - IntersectionObserver ile Scroll-Reveal (fadeUp geçişi)
 * - prefers-reduced-motion Erişilebilirlik Desteği
 * - TOKENS.md cssVar Kullanımı (Ana Lacivert var(--pxNuSoudLn), Saf Beyaz var(--24KlcgGmm9))
 */
export function ProductFeaturesIcons({
  feature1Tag = "TASARIM",
  feature1Title = "Ergonomik Destek",
  feature2Tag = "KUMAŞ",
  feature2Title = "Nefes Alan Örgü",
  feature3Tag = "KULLANIM",
  feature3Title = "Katlanabilir & Hafif",
  feature4Tag = "GARANTİ",
  feature4Title = "2 Yıl Değişim Garantisi",
  backgroundColor,
  className = "",
}: ProductFeaturesIconsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ");
  const maxSiteWidth = siteWidthSetting?.value || "1560px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--max-site-width": maxSiteWidth,
  };

  const features = [
    {
      tag: feature1Tag ? feature1Tag.trim().toLocaleUpperCase("tr-TR") : "TASARIM",
      title: feature1Title,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
        </svg>
      ),
    },
    {
      tag: feature2Tag ? feature2Tag.trim().toLocaleUpperCase("tr-TR") : "KUMAŞ",
      title: feature2Title,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      tag: feature3Tag ? feature3Tag.trim().toLocaleUpperCase("tr-TR") : "KULLANIM",
      title: feature3Title,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M9 4v16M15 4v16M4 9h16M4 15h16" />
        </svg>
      ),
    },
    {
      tag: feature4Tag ? feature4Tag.trim().toLocaleUpperCase("tr-TR") : "GARANTİ",
      title: feature4Title,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  const visibleClass = isVisible ? "ikas-features--visible" : "";

  return (
    <section
      ref={sectionRef}
      className={`ikas-features ${visibleClass} ${className}`.trim()}
      style={inlineStyles}
      lang="tr"
    >
      <div className="ikas-features__container">
        {features.map((feat, idx) => (
          <div key={idx} className="ikas-features__col">
            <div className="ikas-features__icon-wrapper">{feat.icon}</div>
            <div className="ikas-features__text-group">
              {feat.tag && (
                <div className="ikas-features__tag _eZyocyyd0F">
                  {feat.tag}
                </div>
              )}
              {feat.title && (
                <div className="ikas-features__title _AZR1yL8GrK">
                  {feat.title}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductFeaturesIcons;
