import { observer } from "@ikas/component-utils";

export interface Props {
  isOpen?: boolean;
  className?: string;
}

function PlusIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/**
 * AccordionToggleIcon — dekoratif plus chip.
 * Parent accordion button içinde kullanılır; isOpen → rotate(135°) + accent fill.
 */
export function AccordionToggleIcon({ isOpen = false, className = "" }: Props) {
  const combined = [
    "ikas-icon-chip",
    "ikas-accordion-toggle",
    isOpen ? "ikas-icon-chip--active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={combined} aria-hidden="true">
      <PlusIcon />
    </span>
  );
}

export default observer(AccordionToggleIcon);
