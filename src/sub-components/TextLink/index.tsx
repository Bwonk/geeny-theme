import { getThemeSetting, IkasNavigationLink } from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";

export type TextLinkTone = "LABEL" | "BODY" | "INLINE";

export interface Props {
  text?: string;
  children?: any;
  tone?: TextLinkTone;
  link?: IkasNavigationLink | null;
  /** Plain href when a full IkasNavigationLink is unavailable */
  href?: string;
  onClick?: (e: any) => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

/**
 * TextLink — Site-wide accent-bar underline.
 *
 * Stil Theme Settings’ten gelir (renk / kalınlık / offset).
 * Merchant stil prop’u yok — tek kontrol yüzeyi theme globals.
 */
export function TextLink({
  text,
  children,
  tone = "BODY",
  link,
  href,
  onClick,
  className = "",
  ariaLabel,
  disabled = false,
  type = "button",
}: Props) {
  const thicknessSetting = getThemeSetting("_mKSzZQXicb");
  const offsetSetting = getThemeSetting("_yVBERhD1nQ");

  const thickness = thicknessSetting?.value || "2px";
  const offset = offsetSetting?.value || "2px";

  const toneClass =
    tone === "LABEL"
      ? "ikas-text-link--label"
      : tone === "INLINE"
        ? "ikas-text-link--inline"
        : "ikas-text-link--body";

  const combinedClassName = [
    "ikas-text-link",
    toneClass,
    disabled ? "ikas-text-link--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyles: Record<string, string> = {
    "--tl-thickness": String(thickness),
    "--tl-offset": String(offset),
  };

  const content = children ?? text ?? "";
  const label =
    ariaLabel || (typeof content === "string" ? content : undefined);

  const linkObj = link as any;
  const resolvedHref =
    href ||
    (linkObj && (linkObj.href || linkObj.externalLink)) ||
    null;

  if (resolvedHref) {
    return (
      <a
        href={resolvedHref}
        className={combinedClassName}
        style={inlineStyles}
        lang="tr"
        aria-label={label}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // Hedefi de eylemi de olmayan bir metin interaktif olamaz: ölü link/buton
  // yerine düz metin basılır (WCAG 2.4.4 · 4.1.2).
  if (!onClick && type === "button") {
    return (
      <span className={combinedClassName} style={inlineStyles} lang="tr">
        {content}
      </span>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      style={inlineStyles}
      lang="tr"
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={label}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default observer(TextLink);
