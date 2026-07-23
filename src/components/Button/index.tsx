import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface ButtonProps extends Props {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (e: any) => void;
  children?: any;
  ariaLabel?: string;
}

export function Button({
  text = "İncele",
  variant = "PRIMARY",
  link,
  fullWidth = false,
  size = "NORMAL",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  children,
  ariaLabel,
}: ButtonProps) {
  // Read live global settings via getThemeSetting using exact variableNames from prompts/TOKENS.md
  const heightSetting = getThemeSetting(
    size === "LARGE" ? "_RtoVmtuDGF" : "_2xLGYXCG2n"
  );
  const radiusSetting = getThemeSetting("_ZaLXoaaaAA");
  const transitionSetting = getThemeSetting("_bNtMCrOBsE");

  const btnHeight = heightSetting?.value || (size === "LARGE" ? "52px" : "48px");
  const btnRadius = radiusSetting?.value || "0.5rem";
  const btnTransition = transitionSetting?.value || "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

  const variantStr = typeof variant === "string" ? variant : "PRIMARY";
  const variantClass = `ikas-btn--${variantStr.toLowerCase()}`;
  const fullWidthClass = fullWidth ? "ikas-btn--full-width" : "";
  const disabledClass = disabled ? "ikas-btn--disabled" : "";
  const loadingClass = loading ? "ikas-btn--loading" : "";

  // Apply typography global class "_VcfI5D07Nt" (Gövde Metni base) + custom styles
  const combinedClassName = `ikas-btn ${variantClass} _VcfI5D07Nt ${fullWidthClass} ${disabledClass} ${loadingClass} ${className}`.trim();

  const inlineStyles = {
    "--btn-height": btnHeight,
    "--btn-radius": btnRadius,
    "--btn-transition": btnTransition,
  };

  const content = (
    <>
      {loading && <span className="ikas-btn__spinner" aria-hidden="true" />}
      <span>{children || text}</span>
    </>
  );

  // If a valid link prop is provided, render as <a> element
  const linkObj = link as any;
  if (linkObj && (linkObj.href || linkObj.externalLink)) {
    const href = linkObj.href || linkObj.externalLink || "#";
    return (
      <a
        href={href}
        className={combinedClassName}
        style={inlineStyles}
        aria-label={ariaLabel || text}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // Otherwise render as standard <button> element
  return (
    <button
      type="button"
      className={combinedClassName}
      style={inlineStyles}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel || text}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;

