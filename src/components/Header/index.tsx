import { useState, useEffect } from "preact/hooks";
import {
  getDefaultSrc,
  cartStore,
  Router,
  getThemeSetting,
} from "@ikas/bp-storefront";
import { Props } from "./types";

export interface HeaderProps extends Props {
  className?: string;
}

export function Header({
  logo,
  logoWidth = 160,
  navigation,
  stickyHeader = true,
  className = "",
}: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const heightSetting = getThemeSetting("_OQlsoCe9ah"); // Boşluk / Header Yüksekliği (60px)
  const paddingXSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Yatay Bölüm Padding (20px)
  const mobilePaddingXSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const drawerWidthSetting = getThemeSetting("_Bw7ChF0VC8"); // Boşluk / Mobile Drawer Genişliği (320px)
  const underlineAnimSetting = getThemeSetting("_NXa706BcQP"); // Animasyon / Menü Alt Çizgi
  const drawerAnimSetting = getThemeSetting("_rTI75Www8J"); // Animasyon / Drawer ve Modal

  const headerHeight = heightSetting?.value || "60px";
  const sectionPadX = paddingXSetting?.value || "1.25rem";
  const mobilePadX = mobilePaddingXSetting?.value || "16px";
  const drawerWidth = drawerWidthSetting?.value || "320px";
  const underlineAnim = underlineAnimSetting?.value || "transform 0.25s ease";
  const drawerAnim = drawerAnimSetting?.value || "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";

  // Scroll listener for sticky header background / shadow toggle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Cart total item count (reactive read from MobX cartStore)
  const cartItems = cartStore.cart?.orderLineItems ?? [];
  const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity ?? 1), 0);

  const logoSrc = logo ? getDefaultSrc(logo) : null;
  const links = navigation?.links ?? [];

  const inlineStyles = {
    "--header-height": headerHeight,
    "--section-padding-x": sectionPadX,
    "--mobile-padding-x": mobilePadX,
    "--drawer-width": drawerWidth,
    "--underline-transition": underlineAnim,
    "--drawer-transition": drawerAnim,
  };

  const stickyClass = stickyHeader ? "ikas-header--sticky" : "";
  const scrolledClass = isScrolled ? "ikas-header--scrolled" : "";
  const combinedClassName = `ikas-header ${stickyClass} ${scrolledClass} ${className}`.trim();

  return (
    <header className={combinedClassName} style={inlineStyles}>
      <div className="ikas-header__container">
        {/* 1. SOL KOLON: Mobil Hamburger + Logo */}
        <div className="ikas-header__left">
          <button
            type="button"
            className="ikas-header__hamburger"
            aria-label="Menüyü Aç/Kapat"
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setIsDrawerOpen(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <a href="/" className="ikas-header__logo-link" aria-label="Ana Sayfa">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Logo"
                className="ikas-header__logo-img"
                style={{ width: `${logoWidth}px` }}
              />
            ) : (
              <span>INFINITY PILLOW</span>
            )}
          </a>
        </div>

        {/* 2. ORTA KOLON: Masaüstü Navigasyon Menüsü */}
        <nav className="ikas-header__nav" aria-label="Ana Menü">
          <ul className="ikas-header__menu">
            {links.map((item: any, index: number) => {
              const href = item.href || item.externalLink || "#";
              const label = item.label || item.title || "Bağlantı";
              return (
                <li key={index} className="ikas-header__menu-item">
                  <a
                    href={href}
                    className="ikas-header__menu-link _C0OZ8W7vYS"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 3. SAĞ KOLON: Arama, Hesap ve Sepet Butonları */}
        <div className="ikas-header__right">
          {/* Arama İkonu */}
          <button
            type="button"
            className="ikas-header__icon-btn"
            aria-label="Arama Yap"
            onClick={() => Router.navigateToPage("SEARCH")}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Hesap Giriş İkonu */}
          <button
            type="button"
            className="ikas-header__icon-btn"
            aria-label="Müşteri Hesabı"
            onClick={() => Router.navigateToPage("ACCOUNT")}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Sepet İkonu & Sayaç Rozeti */}
          <button
            type="button"
            className="ikas-header__icon-btn"
            aria-label={`Sepet (${itemCount} Ürün)`}
            onClick={() => {
              window.dispatchEvent(new CustomEvent("TOGGLE_CART_DRAWER"));
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="ikas-header__cart-badge">{itemCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* MOBİL SLIDE-OUT DRAWER */}
      <div
        className={`ikas-header__drawer-backdrop ${
          isDrawerOpen ? "ikas-header__drawer-backdrop--open" : ""
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div
        id="mobile-navigation-drawer"
        className={`ikas-header__drawer ${
          isDrawerOpen ? "ikas-header__drawer--open" : ""
        }`}
        aria-hidden={!isDrawerOpen}
      >
        <div className="ikas-header__drawer-header">
          <span className="ikas-header__logo-link">MENÜ</span>
          <button
            type="button"
            className="ikas-header__drawer-close"
            aria-label="Menüyü Kapat"
            onClick={() => setIsDrawerOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="ikas-header__drawer-nav" aria-label="Mobil Menü">
          <ul className="ikas-header__drawer-menu">
            {links.map((item: any, index: number) => {
              const href = item.href || item.externalLink || "#";
              const label = item.label || item.title || "Bağlantı";
              return (
                <li key={index}>
                  <a
                    href={href}
                    className="ikas-header__drawer-link _C0OZ8W7vYS"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
