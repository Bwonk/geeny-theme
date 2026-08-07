import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import {
  ThemeSetting,
  ThemeKeyframeRef,
  readSetting,
} from "../../utils/themeTokens";

export interface PressTickerProps extends Props {
  className?: string;
}

function resolveMarqueeDuration(speed: number, marqueeSetting: string): string {
  // TEXT setting shape: "transform 25s linear infinite" — keep prop `speed` as override source of truth when set.
  if (typeof speed === "number" && speed > 0) return `${speed}s`;
  const match = marqueeSetting.match(/(\d+(?:\.\d+)?)s/);
  return match ? `${match[1]}s` : "25s";
}

export function PressTicker({
  title = "BASINDA BİZ",
  logos,
  speed = 25,
  backgroundColor,
  className = "",
}: PressTickerProps) {
  const sectionPy = readSetting(ThemeSetting.sectionPyMobile, "24px");
  const marqueeAnim = readSetting(
    ThemeSetting.marquee,
    `transform ${speed}s linear infinite`
  );
  const hoverAnim = readSetting(
    ThemeSetting.buttonTransition,
    "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  );

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--section-py": sectionPy,
    "--section-py-mobile": "16px",
    "--marquee-duration": resolveMarqueeDuration(speed, marqueeAnim),
    "--hover-transition": hoverAnim,
  } as Record<string, string | undefined>;

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
      lang="tr"
    >
      {title && (
        <span className="ikas-press-ticker__title _eZyocyyd0F" lang="tr">
          {typeof title === "string" ? title.toLocaleUpperCase("tr-TR") : title}
        </span>
      )}

      <div className="ikas-press-ticker__track-wrapper">
        <div
          className="ikas-press-ticker__track"
          style={{ animationName: ThemeKeyframeRef.marquee }}
        >
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
