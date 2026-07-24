import { getThemeSetting, getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface PressTickerProps extends Props {
  className?: string;
}

export function PressTicker({
  title = "BASINDA BİZ",
  logos,
  speed = 25,
  backgroundColor,
  className = "",
}: PressTickerProps) {
  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const verticalPySetting = getThemeSetting("_5Fdl1j6UHQ"); // Boşluk / Dikey Bölüm Spacing (2rem / 32px)
  const marqueeAnimSetting = getThemeSetting("_NTIrquacoN"); // Animasyon / Marquee Ticker
  const hoverAnimSetting = getThemeSetting("_bNtMCrOBsE"); // Animasyon / Buton ve Hover

  const sectionPy = verticalPySetting?.value || "24px";
  const marqueeAnim = marqueeAnimSetting?.value || `transform ${speed}s linear infinite`;
  const hoverAnim = hoverAnimSetting?.value || "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": "16px",
    "--marquee-animation": marqueeAnim,
    "--hover-transition": hoverAnim,
  };

  const defaultPressLogos = [
    "FORBES",
    "BLOOMBERG",
    "GQ MAGAZINE",
    "VOGUE",
    "WIRED",
    "TRAVEL + LEISURE",
  ];

  const logoAssets = logos?.images || [];
  const hasLogos = logoAssets.length > 0;

  // Duplicate for seamless 100% loop
  const displayItems = hasLogos
    ? [...logoAssets, ...logoAssets]
    : [...defaultPressLogos, ...defaultPressLogos];

  return (
    <section
      className={`ikas-press-ticker ${className}`.trim()}
      style={inlineStyles}
      aria-label="Basın Logoları"
    >
      {title && (
        <span className="ikas-press-ticker__title _eZyocyyd0F">{title}</span>
      )}

      <div className="ikas-press-ticker__track-wrapper">
        <div className="ikas-press-ticker__track">
          {displayItems.map((item, idx) => {
            if (hasLogos && typeof item !== "string") {
              const src = getDefaultSrc(item);
              return (
                <div key={idx} className="ikas-press-ticker__logo-item">
                  {src ? (
                    <img
                      src={src}
                      alt={`Basın Logosu ${idx + 1}`}
                      className="ikas-press-ticker__logo-img"
                    />
                  ) : (
                    <span className="ikas-press-ticker__logo-text">PRESS</span>
                  )}
                </div>
              );
            }

            return (
              <div key={idx} className="ikas-press-ticker__logo-item">
                <span className="ikas-press-ticker__logo-text">
                  {item as string}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PressTicker;
