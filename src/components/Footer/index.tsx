import { useState } from "preact/hooks";
import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface FooterProps extends Props {
  className?: string;
}

/**
 * Footer — Tasarıma Sadık 4-Kolonlu Zengin Footer (Anasayfa.dc.html Uyumlu)
 *
 * Özellikler:
 * - Açık gri zemin (`var(--cdFDkBbKkc)` / `#F4F5F5`) & Koyu lacivert tipografi (`var(--pxNuSoudLn)`)
 * - Sol Marka Bloğu: INFINITY başlığı, marka hikayesi ve accent sarı alt çizgili 7/24 canlı destek etiketi
 * - 4 Link Kolonu (MAĞAZA, REHBER, KURUMSAL, YARDIM)
 * - Alt Ayraç Çizgisi: Copyright ("© 2026 INFINITY SLEEP GOODS · TÜM HAKLARI SAKLIDIR")
 * - Dairesel Pill Sosyal Medya İkonları: Hover'da Accent Sarı zemin (`var(--sy8ZnXZdoG)`) + translateY(-2px)
 * - Ödeme Rozetleri: VISA, MASTERCARD, TROY, 3D SECURE
 * - Mobilde akordeon (Accordion) katlanabilir kolon mantığı (<768px)
 * - prefers-reduced-motion Erişilebilirlik Desteği
 */
export function Footer({
  brandTitle = "INFINITY",
  brandDescription = "İyi tasarlanmış seyahat ve uyku ürünleri. İzmir'de dokundu, İstanbul'da tasarlandı — her ürün gönderilmeden önce elden geçiyor.",
  supportBadgeText = "DESTEK: 7/24 CANLI",
  col1Title = "MAĞAZA",
  quickLinks,
  col2Title = "REHBER",
  col2Links,
  col3Title = "KURUMSAL",
  customerServiceLinks,
  col4Title = "YARDIM",
  col4Links,
  copyrightText = "© 2026 INFINITY SLEEP GOODS · TÜM HAKLARI SAKLIDIR",
  instagramUrl = "https://instagram.com",
  youtubeUrl = "https://youtube.com",
  pinterestUrl = "https://pinterest.com",
  showPaymentIcons = true,
  backgroundColor,
  className = "",
}: FooterProps) {
  // Mobile accordion state (<768px)
  const [openCols, setOpenCols] = useState<{ [key: string]: boolean }>({});

  const toggleCol = (colId: string) => {
    setOpenCols((prev) => ({
      ...prev,
      [colId]: !prev[colId],
    }));
  };

  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ");
  const maxSiteWidth = siteWidthSetting?.value || "1560px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--max-site-width": maxSiteWidth,
  };

  // Fallback 4 Kolon Bağlantı Listeleri (Tasarım Birebir Uyumlu)
  const defaultCol1 = [
    { label: "Boyun Yastıkları", href: "/#urunler" },
    { label: "Uyku Bandı", href: "/#urunler" },
    { label: "Aksesuar", href: "/#urunler" },
    { label: "Hediye Kartı", href: "/#urunler" },
  ];

  const defaultCol2 = [
    { label: "Doğru Beden Seçimi", href: "/#hikaye" },
    { label: "Uçakta Uyku Notları", href: "/#hikaye" },
    { label: "Yıkama & Bakım", href: "/#hikaye" },
    { label: "Malzeme Sözlüğü", href: "/#hikaye" },
  ];

  const defaultCol3 = [
    { label: "Hakkımızda", href: "/#hikaye" },
    { label: "İletişim", href: "/#hikaye" },
    { label: "Sürdürülebilirlik", href: "/#hikaye" },
    { label: "Kurumsal Satış", href: "/#hikaye" },
  ];

  const defaultCol4 = [
    { label: "Kargo & Teslimat", href: "/#hikaye" },
    { label: "İade & Değişim", href: "/#hikaye" },
    { label: "Sipariş Takibi", href: "/#hikaye" },
    { label: "SSS", href: "/#hikaye" },
  ];

  const linksCol1 = quickLinks?.links && quickLinks.links.length > 0 ? quickLinks.links : defaultCol1;
  const linksCol2 = col2Links?.links && col2Links.links.length > 0 ? col2Links.links : defaultCol2;
  const linksCol3 = customerServiceLinks?.links && customerServiceLinks.links.length > 0 ? customerServiceLinks.links : defaultCol3;
  const linksCol4 = col4Links?.links && col4Links.links.length > 0 ? col4Links.links : defaultCol4;

  return (
    <footer
      className={`ikas-footer ${className}`.trim()}
      style={inlineStyles}
      lang="tr"
    >
      <div className="ikas-footer__container">
        {/* ÜST BÖLÜM: SOL MARKA & 4 LİNK KOLONU */}
        <div className="ikas-footer__main">
          {/* SOL MARKA BLOĞU */}
          <div className="ikas-footer__brand">
            {brandTitle && (
              <div className="ikas-footer__brand-title _sKAMD8d1LA">
                {brandTitle}
              </div>
            )}
            {brandDescription && (
              <p className="ikas-newsletter__subtitle _VcfI5D07Nt">
                {brandDescription}
              </p>
            )}
            {supportBadgeText && (
              <a href="#hikaye" className="ikas-footer__support-link _eZyocyyd0F">
                {supportBadgeText}
              </a>
            )}
          </div>

          {/* 4 LİNK KOLONU ĞIZGARASI */}
          <div className="ikas-footer__nav-grid">
            {/* KOLON 1 */}
            <div className="ikas-footer__col">
              <button
                type="button"
                className="ikas-footer__col-header _eZyocyyd0F"
                onClick={() => toggleCol("col1")}
                aria-expanded={openCols["col1"] ? "true" : "false"}
              >
                <span>{col1Title}</span>
                <svg
                  className={`ikas-footer__chevron ${openCols["col1"] ? "ikas-footer__chevron--open" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`ikas-footer__col-content ${openCols["col1"] ? "ikas-footer__col-content--open" : ""}`}>
                <ul className="ikas-footer__menu">
                  {linksCol1.map((item: any, idx: number) => (
                    <li key={idx}>
                      <a href={item.href || item.externalLink || "#"} className="ikas-footer__link">
                        {item.label || item.title || "Bağlantı"}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* KOLON 2 */}
            <div className="ikas-footer__col">
              <button
                type="button"
                className="ikas-footer__col-header _eZyocyyd0F"
                onClick={() => toggleCol("col2")}
                aria-expanded={openCols["col2"] ? "true" : "false"}
              >
                <span>{col2Title}</span>
                <svg
                  className={`ikas-footer__chevron ${openCols["col2"] ? "ikas-footer__chevron--open" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`ikas-footer__col-content ${openCols["col2"] ? "ikas-footer__col-content--open" : ""}`}>
                <ul className="ikas-footer__menu">
                  {linksCol2.map((item: any, idx: number) => (
                    <li key={idx}>
                      <a href={item.href || item.externalLink || "#"} className="ikas-footer__link">
                        {item.label || item.title || "Bağlantı"}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* KOLON 3 */}
            <div className="ikas-footer__col">
              <button
                type="button"
                className="ikas-footer__col-header _eZyocyyd0F"
                onClick={() => toggleCol("col3")}
                aria-expanded={openCols["col3"] ? "true" : "false"}
              >
                <span>{col3Title}</span>
                <svg
                  className={`ikas-footer__chevron ${openCols["col3"] ? "ikas-footer__chevron--open" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`ikas-footer__col-content ${openCols["col3"] ? "ikas-footer__col-content--open" : ""}`}>
                <ul className="ikas-footer__menu">
                  {linksCol3.map((item: any, idx: number) => (
                    <li key={idx}>
                      <a href={item.href || item.externalLink || "#"} className="ikas-footer__link">
                        {item.label || item.title || "Bağlantı"}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* KOLON 4 */}
            <div className="ikas-footer__col">
              <button
                type="button"
                className="ikas-footer__col-header _eZyocyyd0F"
                onClick={() => toggleCol("col4")}
                aria-expanded={openCols["col4"] ? "true" : "false"}
              >
                <span>{col4Title}</span>
                <svg
                  className={`ikas-footer__chevron ${openCols["col4"] ? "ikas-footer__chevron--open" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`ikas-footer__col-content ${openCols["col4"] ? "ikas-footer__col-content--open" : ""}`}>
                <ul className="ikas-footer__menu">
                  {linksCol4.map((item: any, idx: number) => (
                    <li key={idx}>
                      <a href={item.href || item.externalLink || "#"} className="ikas-footer__link">
                        {item.label || item.title || "Bağlantı"}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ALT AYRAÇ BÖLÜMÜ: TELİF, SOSYAL MEDYA VE ÖDEME ROZETLERİ */}
        <div className="ikas-footer__bottom">
          {/* TELİF METNİ */}
          <div className="ikas-footer__copyright _eZyocyyd0F">
            {copyrightText}
          </div>

          {/* SOSYAL MEDYA İKONLARI */}
          <div className="ikas-footer__socials">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="ikas-footer__social-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="16.8" cy="7.2" r=".9" fill="currentColor" stroke="none" />
                </svg>
              </a>
            )}

            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="ikas-footer__social-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="6" width="18" height="12" rx="3.4" />
                  <path d="m11 9.6 4 2.4-4 2.4z" />
                </svg>
              </a>
            )}

            {pinterestUrl && (
              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="ikas-footer__social-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="8.4" />
                  <path d="M10.4 19.2 12.6 11" />
                  <path d="M9.4 13.4c-.5-2.6.9-4.6 3-4.6 1.7 0 2.9 1.1 2.9 2.8 0 2-1.2 3.6-2.8 3.6-.9 0-1.5-.6-1.4-1.4" />
                </svg>
              </a>
            )}
          </div>

          {/* ÖDEME KARTI ROZETLERİ */}
          {showPaymentIcons && (
            <div className="ikas-footer__payments" aria-label="Ödeme yöntemleri">
              <span className="ikas-footer__payment-card _eZyocyyd0F">VISA</span>
              <span className="ikas-footer__payment-card _eZyocyyd0F">MASTERCARD</span>
              <span className="ikas-footer__payment-card _eZyocyyd0F">TROY</span>
              <span className="ikas-footer__payment-card _eZyocyyd0F">3D SECURE</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
