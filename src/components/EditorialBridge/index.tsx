import { useRef, useEffect, useState } from "preact/hooks";
import { applyLayoutTokens } from "../../utils/themeTokens";
import { Props } from "./types";

export interface EditorialBridgeProps extends Props {
  className?: string;
}

/**
 * EditorialBridge — YENİ Section (Hero ile Devamı Arasında Editorial Köprü)
 *
 * Özellikler:
 * - Üstte İnce Çizgi (`ruleIn` animasyonu: scaleX 0 → 1)
 * - 2 Kolonlu Düzen: Sol Editorial Slogan (Onest 500), Sağ Tarih/Künye (Roboto Mono)
 * - Hero & Featured Grid ile Aynı Genişlik ve Hizalama (1560px Kapsayıcı)
 * - IntersectionObserver ile Görünürlükte Tetiklenen Geçişler
 * - prefers-reduced-motion Erişilebilirlik Desteği
 */
export function EditorialBridge({
  descriptionText = "İyi tasarlanmış seyahat ve uyku ürünleri — İzmir'de dokundu, İstanbul'da tasarlandı.",
  metaText = "TEMMUZ 2026 · INFINITY SLEEP GOODS",
  backgroundColor,
  className = "",
}: EditorialBridgeProps) {
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
  const layoutTokens = applyLayoutTokens({ includePy: true, includePx: true, includeSiteWidth: true });

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    ...layoutTokens,
  };

  const visibleClass = isVisible ? "ikas-editorial-bridge--visible" : "";
  const formattedMeta = metaText ? metaText.trim().toLocaleUpperCase("tr-TR") : "";

  return (
    <section
      ref={sectionRef}
      className={`ikas-editorial-bridge ${visibleClass} ${className}`.trim()}
      style={inlineStyles}
      lang="tr"
    >
      <div className="ikas-editorial-bridge__container">
        {/* ÜST İNCE ÇİZGİ (ruleIn) */}
        <div className="ikas-editorial-bridge__line" aria-hidden="true" />

        {/* İKİ KOLONLU İÇERİK (fadeUp) */}
        <div className="ikas-editorial-bridge__body">
          {descriptionText && (
            <p className="ikas-editorial-bridge__desc">
              {descriptionText}
            </p>
          )}

          {formattedMeta && (
            <div className="ikas-editorial-bridge__meta _eZyocyyd0F">
              {formattedMeta}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EditorialBridge;
