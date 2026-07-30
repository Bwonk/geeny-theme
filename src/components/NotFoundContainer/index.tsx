import { getThemeSetting } from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import { Props } from "./types";

export function NotFoundContainer({
  codeText = "404",
  title = "SAYFA BULUNAMADI",
  subtitle = "Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir.",
  buttonText = "ANA SAYFAYA DÖN",
  buttonLink,
  backgroundColor,
}: Props) {
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ");
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx");
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx");
  const verticalPySetting = getThemeSetting("_Kl0my3VVMA");
  const verticalPyMobileSetting = getThemeSetting("_5Fdl1j6UHQ");

  const maxSiteWidth = siteWidthSetting?.value || "1560px";
  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const sectionPy = verticalPySetting?.value || "48px";
  const sectionPyMobile = verticalPyMobileSetting?.value || "32px";

  const containerStyle = {
    backgroundColor: backgroundColor || "var(--24KlcgGmm9)",
    "--max-site-width": maxSiteWidth,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
  };

  const formattedTitle = title ? title.toLocaleUpperCase("tr-TR") : "";
  const effectiveLink = buttonLink || ({ href: "/" } as any);

  return (
    <section className="geeny-not-found" style={containerStyle} lang="tr">
      <div className="geeny-not-found__container">
        <div className="geeny-not-found__code _78XkSXv7w4" aria-hidden="true">
          {codeText}
        </div>

        <h1 className="geeny-not-found__title _DusX6I08Pv">
          {formattedTitle}
        </h1>

        {subtitle && (
          <p className="geeny-not-found__subtitle _VcfI5D07Nt">
            {subtitle}
          </p>
        )}

        <div className="geeny-not-found__action">
          <Button
            text={buttonText}
            link={effectiveLink}
            variant="PRIMARY"
            size="LARGE"
          />
        </div>
      </div>
    </section>
  );
}

export default NotFoundContainer;

