import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export function PageHeader({ title = "SAYFA BAŞLIĞI", description, backgroundColor }: Props) {
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
    backgroundColor: backgroundColor || "var(--cdFDkBbKkc)",
    "--max-site-width": maxSiteWidth,
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--section-py": sectionPy,
    "--section-py-mobile": sectionPyMobile,
  };

  const formattedTitle = title ? title.toLocaleUpperCase("tr-TR") : "";

  return (
    <section className="geeny-page-header" style={containerStyle} lang="tr">
      <div className="geeny-page-header__container">
        <h1 className="geeny-page-header__title _DusX6I08Pv">
          {formattedTitle}
        </h1>
        {description && (
          <p className="geeny-page-header__description _VcfI5D07Nt">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHeader;

