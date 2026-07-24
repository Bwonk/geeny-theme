import { useState } from "preact/hooks";
import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface FooterProps extends Props {
  className?: string;
}

export function Footer({
  copyrightText = "© 2026 Infinity Pillow. Tüm hakları saklıdır.",
  quickLinks,
  customerServiceLinks,
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

  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA"); // Boşluk / Masaüstü Dikey Spacing (48px)
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)

  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
  };

  // Fallback links if editor list is empty
  const defaultQuickLinks = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Tüm Ürünler", href: "/category" },
    { label: "Öne Çıkanlar", href: "/#featured" },
    { label: "Hakkımızda", href: "/about" },
  ];

  const defaultServiceLinks = [
    { label: "Sıkça Sorulan Sorular", href: "/faq" },
    { label: "Kargo ve Teslimat", href: "/shipping" },
    { label: "İade ve Değişim", href: "/refund" },
    { label: "Gizlilik Politikası", href: "/privacy" },
    { label: "İletişim", href: "/contact" },
  ];

  const qLinks = quickLinks?.links && quickLinks.links.length > 0
    ? quickLinks.links
    : defaultQuickLinks;

  const cLinks = customerServiceLinks?.links && customerServiceLinks.links.length > 0
    ? customerServiceLinks.links
    : defaultServiceLinks;

  return (
    <footer
      className={`ikas-footer ${className}`.trim()}
      style={inlineStyles}
    >
      <div className="ikas-footer__container">
        {/* 4-KOLONLU GRID HİYERARŞİSİ */}
        <div className="ikas-footer__grid">
          {/* KOLON 1: MARKA VE HAKKIMIZDA */}
          <div className="ikas-footer__col">
            <h3 className="ikas-footer__brand-title _AZR1yL8GrK">
              Infinity Pillow
            </h3>
            <p className="ikas-footer__brand-desc _C0OZ8W7vYS">
              Ergonomik tasarım ve üstün konfor sunan akıllı seyahat ve uyku yastıkları. Rahatınız için her yerde yanınızda.
            </p>
          </div>

          {/* KOLON 2: HIZLI LİNKLER */}
          <div className="ikas-footer__col">
            <button
              type="button"
              className="ikas-footer__col-header _AZR1yL8GrK"
              onClick={() => toggleCol("col2")}
              aria-expanded={openCols["col2"] ? "true" : "false"}
            >
              <h4 className="ikas-footer__col-title">Hızlı Erişim</h4>
              <svg
                className={`ikas-footer__accordion-icon ${
                  openCols["col2"] ? "ikas-footer__accordion-icon--open" : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`ikas-footer__col-content ${
                openCols["col2"] ? "ikas-footer__col-content--open" : ""
              }`}
            >
              <nav aria-label="Hızlı Erişim Menüsü">
                <ul className="ikas-footer__menu">
                  {qLinks.map((item: any, index: number) => (
                    <li key={index}>
                      <a
                        href={item.href || item.externalLink || "#"}
                        className="ikas-footer__link _C0OZ8W7vYS"
                      >
                        {item.label || item.title || "Bağlantı"}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* KOLON 3: MÜŞTERİ HİZMETLERİ */}
          <div className="ikas-footer__col">
            <button
              type="button"
              className="ikas-footer__col-header _AZR1yL8GrK"
              onClick={() => toggleCol("col3")}
              aria-expanded={openCols["col3"] ? "true" : "false"}
            >
              <h4 className="ikas-footer__col-title">Müşteri Hizmetleri</h4>
              <svg
                className={`ikas-footer__accordion-icon ${
                  openCols["col3"] ? "ikas-footer__accordion-icon--open" : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`ikas-footer__col-content ${
                openCols["col3"] ? "ikas-footer__col-content--open" : ""
              }`}
            >
              <nav aria-label="Müşteri Hizmetleri Menüsü">
                <ul className="ikas-footer__menu">
                  {cLinks.map((item: any, index: number) => (
                    <li key={index}>
                      <a
                        href={item.href || item.externalLink || "#"}
                        className="ikas-footer__link _C0OZ8W7vYS"
                      >
                        {item.label || item.title || "Bağlantı"}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* KOLON 4: SOSYAL MEDYA */}
          <div className="ikas-footer__col">
            <button
              type="button"
              className="ikas-footer__col-header _AZR1yL8GrK"
              onClick={() => toggleCol("col4")}
              aria-expanded={openCols["col4"] ? "true" : "false"}
            >
              <h4 className="ikas-footer__col-title">Bizi Takip Edin</h4>
              <svg
                className={`ikas-footer__accordion-icon ${
                  openCols["col4"] ? "ikas-footer__accordion-icon--open" : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`ikas-footer__col-content ${
                openCols["col4"] ? "ikas-footer__col-content--open" : ""
              }`}
            >
              <p className="ikas-footer__brand-desc _C0OZ8W7vYS">
                Kampanyalar ve yeniliklerden anında haberdar olmak için sosyal medyada bizi takip edin.
              </p>
              <div className="ikas-footer__social-list">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ikas-footer__social-item"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ikas-footer__social-item"
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ikas-footer__social-item"
                  aria-label="Twitter X"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ALT TELİF BANDI (BOTTOM BAR) */}
        <div className="ikas-footer__bottom">
          <p className="ikas-footer__copyright _eZyocyyd0F">
            {copyrightText}
          </p>

          {showPaymentIcons && (
            <div className="ikas-footer__payments" aria-label="Kabul Edilen Ödeme Yöntemleri">
              <span className="ikas-footer__payment-card">VISA</span>
              <span className="ikas-footer__payment-card">MASTERCARD</span>
              <span className="ikas-footer__payment-card">AMEX</span>
              <span className="ikas-footer__payment-card">APPLE PAY</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
