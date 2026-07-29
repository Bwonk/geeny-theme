import { useRef, useEffect, useState } from "preact/hooks";
import { getThemeSetting, Router } from "@ikas/bp-storefront";
import ProductCard from "../../sub-components/ProductCard";
import { Props } from "./types";

export interface FeaturedCollectionGridProps extends Props {
  tag?: string;
  viewAllText?: string;
  viewAllUrl?: string;
  className?: string;
}

/**
 * FeaturedCollectionGrid — 01 · ÖNE ÇIKANLAR 4'lü Ürün Izgarası (Anasayfa.dc.html Uyumlu)
 *
 * Özellikler:
 * - Üst Monospace Etiket ("01 · ÖNE ÇIKANLAR") + H2 Başlık ("En çok yola çıkan dördü") + Sağ Link ("TÜM ÜRÜNLER (8)")
 * - 4 Kolonlu Ürün Izgarası
 * - ProductCard Görsel Üstünde Slide-Up "SEPETE EKLE" Buton Hover Efekti
 * - Başlık & Fiyat Yan Yana, Alt Açıklama ve Renk Swatch'ları
 * - IntersectionObserver ile Kademeli Fade-Up (Stagger ~70ms) Animasyonu
 * - prefers-reduced-motion Erişilebilirlik Desteği
 * - TOKENS.md cssVar Kullanımı (Ana Lacivert var(--pxNuSoudLn), Accent Sarı var(--sy8ZnXZdoG))
 */
export function FeaturedCollectionGrid({
  tag = "01 · ÖNE ÇIKANLAR",
  title = "En çok yola çıkan dördü",
  viewAllText = "TÜM ÜRÜNLER (8)",
  viewAllUrl = "/products",
  products,
  itemCount = 4,
  backgroundColor,
  className = "",
}: FeaturedCollectionGridProps) {
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
      { threshold: 0.1 }
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

  const productList = products?.data || [];
  const displayProducts = productList.slice(0, itemCount);

  // Demo fallback cards if product list is empty in editor (Anasayfa.dc.html birebir demoları)
  const hasProducts = displayProducts.length > 0;
  const demoFallbackCards = [
    {
      subtitle: "Klasik boyun ve baş desteği",
      badgeText: "EN ÇOK SATAN",
      swatches: [
        { color: "#37435B", label: "LACİVERT", active: true },
        { color: "#385244", label: "ZEYTİN" },
      ],
    },
    {
      subtitle: "Çocuklar için mini boy",
      swatches: [
        { color: "#37435B", label: "LACİVERT", active: true },
        { color: "#C05638", label: "Kiremit" },
      ],
    },
    {
      subtitle: "%100 ışık geçirmez, ipek astar",
      badgeText: "YENİ",
      swatches: [
        { color: "#101418", label: "SİYAH", active: true },
        { color: "#DCD8CD", label: "Krem" },
      ],
    },
    {
      subtitle: "Pamuklu büzgülü kese",
      swatches: [
        { color: "#E0DDD5", label: "HAM BEZ", active: true },
        { color: "#37435B", label: "Lacivert" },
      ],
    },
  ];

  const visibleClass = isVisible ? "ikas-featured-grid--visible" : "";

  return (
    <section
      ref={sectionRef}
      id="urunler"
      className={`ikas-featured-grid ${visibleClass} ${className}`.trim()}
      style={inlineStyles}
      lang="tr"
    >
      <div className="ikas-featured-grid__container">
        {/* BÖLÜM BAŞLIĞI */}
        <div className="ikas-featured-grid__header">
          <div className="ikas-featured-grid__header-left">
            {tag && (
              <div className="ikas-featured-grid__tag _eZyocyyd0F">
                {tag}
              </div>
            )}
            {title && (
              <h2 className="ikas-featured-grid__title _sKAMD8d1LA">
                {title}
              </h2>
            )}
          </div>

          {viewAllText && (
            <a
              href={viewAllUrl || "#urunler"}
              className="ikas-featured-grid__link _eZyocyyd0F"
              onClick={(e) => {
                if (viewAllUrl && viewAllUrl !== "#urunler" && !viewAllUrl.startsWith("http")) {
                  e.preventDefault();
                  Router.navigateToPage("CATEGORY");
                }
              }}
            >
              {viewAllText}
            </a>
          )}
        </div>

        {/* ÜRÜN IZGARASI (STAGGER ANIMATION) */}
        <div className="ikas-featured-grid__grid">
          {hasProducts
            ? displayProducts.map((prod, idx) => (
                <div
                  key={prod.id || idx}
                  className="ikas-featured-grid__item"
                  style={{ transitionDelay: `${idx * 70}ms` }}
                >
                  <ProductCard
                    product={prod}
                    showRating={false}
                    showQuickAdd={true}
                    overlayQuickAdd={true}
                  />
                </div>
              ))
            : demoFallbackCards.slice(0, itemCount).map((demo, idx) => (
                <div
                  key={idx}
                  className="ikas-featured-grid__item"
                  style={{ transitionDelay: `${idx * 70}ms` }}
                >
                  <ProductCard
                    subtitle={demo.subtitle}
                    badgeText={demo.badgeText}
                    swatches={demo.swatches}
                    showRating={false}
                    showQuickAdd={true}
                    overlayQuickAdd={true}
                  />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollectionGrid;
