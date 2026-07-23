import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface AnnouncementBarProps extends Props {
  className?: string;
}

export function AnnouncementBar({
  text = "500 TL Üzeri Siparişlerde Ücretsiz Kargo",
  link,
  autoRotate = true,
  className = "",
}: AnnouncementBarProps) {
  // Edge Case: If text is empty or missing, do not render announcement bar
  if (!text || text.trim() === "") {
    return null;
  }

  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const heightSetting = getThemeSetting("_YvGykMxQWI"); // Boşluk / Announcement Bar Yüksekliği (38px)
  const paddingXSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Yatay Bölüm Padding (20px)
  const mobilePaddingXSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const transitionSetting = getThemeSetting("_AwVN6G9Zib"); // Animasyon / Fade Yumuşak (opacity 0.3s ease-in-out)

  const barHeight = heightSetting?.value || "38px";
  const sectionPadX = paddingXSetting?.value || "1.25rem";
  const mobilePadX = mobilePaddingXSetting?.value || "16px";
  const barTransition = transitionSetting?.value || "opacity 0.3s ease-in-out";

  const inlineStyles = {
    "--announcement-height": barHeight,
    "--section-padding-x": sectionPadX,
    "--mobile-padding-x": mobilePadX,
    "--announcement-transition": barTransition,
  };

  // Check link property safely
  const linkObj = link as any;
  const href = linkObj?.href || linkObj?.externalLink || null;

  // A11y: Both visual paragraphs have aria-hidden="true" to prevent screen reader duplication.
  // The outer <aside> carries the exact announcement text in aria-label for single screen reader reading.
  // Desktop Announcement Bar typography: _eZyocyyd0F (Etiket ve Rozet xs -> 13.5px/14px, weight: 500 per DESIGN.md)
  // Mobile Announcement Bar typography: _8BUF3YKi2n (Mobil Duyuru Metni -> 12px, weight: 500)
  const visualContent = (
    <>
      <p
        className="ikas-announcement-bar__text ikas-announcement-bar__text--desktop _eZyocyyd0F"
        aria-hidden="true"
      >
        {text}
      </p>
      <p
        className="ikas-announcement-bar__text ikas-announcement-bar__text--mobile _8BUF3YKi2n"
        aria-hidden="true"
      >
        {text}
      </p>
    </>
  );

  return (
    <aside
      className={`ikas-announcement-bar ${className}`.trim()}
      style={inlineStyles}
      aria-label={`Duyuru Bandı: ${text}`}
    >
      {href ? (
        <a
          href={href}
          className="ikas-announcement-bar__link"
          aria-label={text}
        >
          {visualContent}
        </a>
      ) : (
        visualContent
      )}
    </aside>
  );
}

export default AnnouncementBar;
