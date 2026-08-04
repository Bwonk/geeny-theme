import { useState, useEffect, useRef } from "preact/hooks";
import {
  getDefaultSrc,
  cartStore,
  customerStore,
  hasCustomer,
  Router,
  getThemeSetting,
} from "@ikas/bp-storefront";
import { Props } from "./types";
import CartDrawer from "../../sub-components/CartDrawer";
import SearchOverlay from "../../sub-components/SearchOverlay";
import { formatShadow } from "../../utils/theme";

/** Hero vb. bileşenlerin kalan viewport hesabı için gerçek header yüksekliği. */
const HEADER_OFFSET_VAR = "--ikas-header-height";

export interface HeaderProps extends Props {
  className?: string;
}

/**
 * Header — Floating Pill Navbar (Anasayfa.dc.html referansına uygun)
 *
 * Özellikler:
 * - Koyu lacivert (var(--pxNuSoudLn)) pill container (9999px radius)
 * - Sağ tarafa hizalı floating pill (çevre şeffaf — tam genişlik scrim yok)
 * - Sticky; elevation token shadow (scroll'da hafif güçlenir)
 * - Logo (Onest 700 + tracking), navigasyon linkleri (hover: accent sarı)
 * - İkonlar: Arama, Hesap ve Accent Sarı Sepet — ortak interaction sistemi
 * - Entegre CartDrawer ve SearchOverlay tetikleyicileri
 */
export function Header({
  logo,
  logoWidth = 160,
  navigation,
  stickyHeader = true,
  backgroundColor,
  brandText,
  mobileMenuTitle,
  menuLabel,
  searchLabel,
  accountLabel,
  cartLabel,
  cartDrawerTitle,
  emptyCartTitle,
  emptyCartButtonText,
  closeCartLabel,
  freeShippingAchievedText,
  freeShippingRemainingText,
  freeShippingThreshold,
  upsellTitle,
  addOfferText,
  promoTitle,
  promoPlaceholder,
  promoApplyText,
  promoRemoveText,
  discountsLabel,
  totalLabel,
  taxNoteText,
  checkoutButtonText,
  decreaseQtyLabel,
  increaseQtyLabel,
  prevOfferLabel,
  nextOfferLabel,
  cartUpsellProduct1,
  cartUpsellProduct2,
  cartUpsellProduct3,
  cartUpsellProduct4,
  className = "",
}: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Read live global settings via getThemeSetting
  const heightSetting = getThemeSetting("_OQlsoCe9ah");
  const paddingXSetting = getThemeSetting("_Nd1XnRyZlx");
  const mobilePaddingXSetting = getThemeSetting("_uRDipxnxkx");
  const drawerWidthSetting = getThemeSetting("_Bw7ChF0VC8");
  const drawerAnimSetting = getThemeSetting("_rTI75Www8J");
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ");
  const stickyShadowSetting = getThemeSetting("_iSJXfL0J5I"); // Gölge / Sticky Header Shadow
  const softShadowSetting = getThemeSetting("_yyUleMlhR4"); // Gölge / Kart Soft Shadow
  const actionAnimSetting = getThemeSetting("_bNtMCrOBsE"); // Animasyon / Buton ve Hover

  const maxSiteWidth = siteWidthSetting?.value || "1560px";
  const headerHeight = heightSetting?.value || "60px";
  const sectionPadX = paddingXSetting?.value || "1.25rem";
  const mobilePadX = mobilePaddingXSetting?.value || "16px";
  const drawerWidth = drawerWidthSetting?.value || "320px";
  const drawerAnim = drawerAnimSetting?.value || "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
  const pillShadowRest = formatShadow(
    softShadowSetting?.value,
    "0 8px 24px color-mix(in srgb, var(--vluFeuIeFs) 14%, transparent)"
  );
  const pillShadowScrolled = formatShadow(
    stickyShadowSetting?.value,
    "0 12px 32px color-mix(in srgb, var(--vluFeuIeFs) 20%, transparent)"
  );
  const actionTransition = actionAnimSetting?.value || "180ms ease";

  // Gerçek layout yüksekliğini yayınla → Hero kalan 100dvh alanını hesaplar
  useEffect(() => {
    const root = document.documentElement;
    const el = headerRef.current;
    if (!el) return;

    const publishHeight = () => {
      // getBoundingClientRect: padding + border dahil gerçek görsel yükseklik
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) root.style.setProperty(HEADER_OFFSET_VAR, `${h}px`);
    };

    publishHeight();
    // Font / sticky padding oturuncaya kadar bir frame daha ölç
    const raf = requestAnimationFrame(() => {
      publishHeight();
      requestAnimationFrame(publishHeight);
    });

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(publishHeight) : null;
    observer?.observe(el);
    window.addEventListener("resize", publishHeight);
    document.fonts?.ready?.then?.(publishHeight);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("resize", publishHeight);
      root.style.setProperty(HEADER_OFFSET_VAR, "0px");
    };
  }, []);

  // Scroll listener for sticky shadow/state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search overlay açık/kapalı — search butonu active + ikon X
  useEffect(() => {
    const onOpen = () => setIsSearchOpen(true);
    const onClose = () => setIsSearchOpen(false);
    const onToggle = () => setIsSearchOpen((v) => !v);
    window.addEventListener("geeny:search-overlay:open", onOpen);
    window.addEventListener("geeny:search-overlay:close", onClose);
    window.addEventListener("geeny:search-overlay:toggle", onToggle);
    return () => {
      window.removeEventListener("geeny:search-overlay:open", onOpen);
      window.removeEventListener("geeny:search-overlay:close", onClose);
      window.removeEventListener("geeny:search-overlay:toggle", onToggle);
    };
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

  // Reactive cart item count read
  const cartItems = cartStore.cart?.orderLineItems ?? [];
  const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity ?? 1), 0);

  const logoSrc = logo ? getDefaultSrc(logo) : null;
  const links = (navigation?.links ?? []).filter(
    (item: any) => Boolean(item?.label || item?.title)
  );

  const inlineStyles = {
    // backgroundColor prop API'de kalır; floating island için tam genişlik boyanmaz.
    "--max-site-width": maxSiteWidth,
    "--header-height": headerHeight,
    "--section-padding-x": sectionPadX,
    "--mobile-padding-x": mobilePadX,
    "--drawer-width": drawerWidth,
    "--drawer-transition": drawerAnim,
    "--header-pill-shadow": pillShadowRest,
    "--header-pill-shadow-scrolled": pillShadowScrolled,
    "--nav-action-transition": actionTransition,
  };

  const stickyClass = stickyHeader ? "ikas-header--sticky" : "";
  const scrolledClass = isScrolled ? "ikas-header--scrolled" : "";
  const combinedClassName = `ikas-header ${stickyClass} ${scrolledClass} ${className}`.trim();

  return (
    <header ref={headerRef} className={combinedClassName} style={inlineStyles}>
      <div className="ikas-header__wrapper">
        <div className="ikas-header__pill-wrapper">
          <div className="ikas-header__pill">
            
            {/* SOL ALAN: Mobil Hamburger + Logo + Masaüstü Navigasyon */}
            <div className="ikas-header__left-section">
              {/* Mobil Hamburger Butonu */}
              <button
                type="button"
                className="ikas-header__hamburger"
                aria-label={menuLabel}
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-navigation-drawer"
                onClick={() => setIsDrawerOpen(true)}
              >
                <svg
                  width="20"
                  height="20"
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

              {/* Logo Linki */}
              <a href="/" className="ikas-header__logo-link" aria-label={brandText}>
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={brandText}
                    className="ikas-header__logo-img"
                    style={{ width: `${logoWidth}px` }}
                  />
                ) : (
                  <span className="ikas-header__logo-text">{brandText}</span>
                )}
              </a>

              {/* Masaüstü Navigasyon Menüsü */}
              <nav className="ikas-header__nav" aria-label={menuLabel}>
                <ul className="ikas-header__menu">
                  {links.map((item: any, index: number) => {
                    const href = item.href || item.externalLink || "#";
                    const label = item.label || item.title;
                    return (
                      <li key={index} className="ikas-header__menu-item">
                        <a href={href} className="ikas-header__menu-link">
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* SAĞ ALAN: Arama, Hesap ve Sepet Butonları */}
            <div className="ikas-header__right-section">
              {/* Arama Butonu — açıkken active + X */}
              <button
                type="button"
                className={`ikas-header__icon-btn${isSearchOpen ? " ikas-header__icon-btn--active" : ""}`}
                aria-label={searchLabel}
                aria-expanded={isSearchOpen}
                title={searchLabel}
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent(
                      isSearchOpen ? "geeny:search-overlay:close" : "geeny:search-overlay:open"
                    )
                  );
                }}
              >
                {isSearchOpen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.6-3.6" />
                  </svg>
                )}
              </button>

              {/* Müşteri Hesabı / Giriş */}
              <button
                type="button"
                className="ikas-header__icon-btn"
                aria-label={accountLabel}
                title={accountLabel}
                onClick={() =>
                  Router.navigateToPage(
                    hasCustomer(customerStore) ? "ACCOUNT" : "LOGIN"
                  )
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.6" />
                  <path d="M4.5 20c.6-3.8 3.8-5.8 7.5-5.8s6.9 2 7.5 5.8" />
                </svg>
              </button>

              {/* Accent Sarı Sepet Butonu */}
              <button
                type="button"
                className="ikas-header__cart-btn"
                aria-label={`${cartLabel} (${itemCount})`}
                title={cartLabel}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("geeny:cart-drawer:toggle"));
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 7.5h12l1 12.5H5z" />
                  <path d="M9.2 7.5a2.8 2.8 0 0 1 5.6 0" />
                </svg>
                {itemCount > 0 && (
                  <span className="ikas-header__cart-badge">{itemCount}</span>
                )}
              </button>
            </div>

          </div>
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
          <span className="ikas-header__logo-text">{mobileMenuTitle}</span>
          <button
            type="button"
            className="ikas-header__drawer-close"
            aria-label={menuLabel}
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
        <nav className="ikas-header__drawer-nav" aria-label={mobileMenuTitle}>
          <ul className="ikas-header__drawer-menu">
            {links.map((item: any, index: number) => {
              const href = item.href || item.externalLink || "#";
              const label = item.label || item.title;
              return (
                <li key={index}>
                  <a
                    href={href}
                    className="ikas-header__drawer-link"
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

      {/* ENTEGRE ALT BİLEŞENLER */}
      <CartDrawer
        cartDrawerTitle={cartDrawerTitle}
        emptyCartTitle={emptyCartTitle}
        emptyCartButtonText={emptyCartButtonText}
        closeCartLabel={closeCartLabel}
        freeShippingAchievedText={freeShippingAchievedText}
        freeShippingRemainingText={freeShippingRemainingText}
        freeShippingThreshold={freeShippingThreshold}
        upsellTitle={upsellTitle}
        addOfferText={addOfferText}
        promoTitle={promoTitle}
        promoPlaceholder={promoPlaceholder}
        promoApplyText={promoApplyText}
        promoRemoveText={promoRemoveText}
        discountsLabel={discountsLabel}
        totalLabel={totalLabel}
        taxNoteText={taxNoteText}
        checkoutButtonText={checkoutButtonText}
        decreaseQtyLabel={decreaseQtyLabel}
        increaseQtyLabel={increaseQtyLabel}
        prevOfferLabel={prevOfferLabel}
        nextOfferLabel={nextOfferLabel}
        cartUpsellProduct1={cartUpsellProduct1}
        cartUpsellProduct2={cartUpsellProduct2}
        cartUpsellProduct3={cartUpsellProduct3}
        cartUpsellProduct4={cartUpsellProduct4}
      />
      <SearchOverlay />
    </header>
  );
}

export default Header;
