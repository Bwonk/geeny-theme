import { observer } from "@ikas/component-utils";

export interface Props {
  ariaLabel: string;
  onClick?: (e: any) => void;
  className?: string;
  tone?: "default" | "onDark";
  type?: "button" | "submit";
}

function CloseIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * CloseButton — dismiss control with details-icon motion.
 * Idle: bordered chip + X. Hover/focus: rotate(135°) + accent fill.
 */
export function CloseButton({
  ariaLabel,
  onClick,
  className = "",
  tone = "default",
  type = "button",
}: Props) {
  const isOnDark = tone === "onDark";
  const btnClass = [
    "ikas-close-btn",
    // Çip 34×34 kalır; dokunmatikte isabet alanı 44×44'e genişler (WCAG 2.5.8).
    "ikas-tap-44",
    isOnDark ? "ikas-close-btn--on-dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const chipClass = [
    "ikas-icon-chip",
    isOnDark ? "ikas-icon-chip--on-dark" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={btnClass}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className={chipClass} aria-hidden="true">
        <CloseIcon />
      </span>
    </button>
  );
}

export default observer(CloseButton);
