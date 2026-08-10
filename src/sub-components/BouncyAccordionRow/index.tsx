import { useEffect, useRef, useState } from "preact/hooks";
import { normalizeSvg } from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import AccordionToggleIcon from "../AccordionToggleIcon";
import { ThemeType } from "../../utils/themeTokens";
import {
  isFaqOpen,
  subscribeFaqGroup,
  toggleFaqItem,
} from "../../utils/faqAccordionGroup";

export interface Props {
  icon?: string;
  question: string;
  answer?: string;
  className?: string;
}

const FAQ_GROUP_ATTR = "data-faq-group";

/** Module counter — useId resets per IkasComponentRenderer root and collides. */
let nextFaqRowUid = 0;

function resolveGroupId(el: HTMLElement | null): string | null {
  return el?.closest(`[${FAQ_GROUP_ATTR}]`)?.getAttribute(FAQ_GROUP_ATTR) ?? null;
}

export const BouncyAccordionRow = observer(function BouncyAccordionRow({
  icon,
  question,
  answer,
  className = "",
}: Props) {
  const uidRef = useRef(`faq-row-${++nextFaqRowUid}`);
  const uid = uidRef.current;
  const itemKey = uid;
  const buttonId = `faq-btn-${uid}`;
  const panelId = `faq-panel-${uid}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const resolved = resolveGroupId(rootRef.current);
    setGroupId(resolved);
    if (!resolved) return;

    setIsOpen(isFaqOpen(resolved, itemKey));
    return subscribeFaqGroup(resolved, () => {
      setIsOpen(isFaqOpen(resolved, itemKey));
    });
  }, [itemKey]);

  const iconHtml =
    icon &&
    normalizeSvg(icon, {
      idPrefix: `faq-icon-${uid}`,
      color: "currentColor",
    });

  const handleToggle = () => {
    const id = groupId ?? resolveGroupId(rootRef.current);
    if (!id) {
      // Fallback: local toggle if group root not found
      setIsOpen((prev) => !prev);
      return;
    }
    if (!groupId) setGroupId(id);
    toggleFaqItem(id, itemKey);
  };

  return (
    <div
      ref={rootRef}
      className={`ikas-faq-row${isOpen ? " ikas-faq-row--open" : ""} ${className}`.trim()}
    >
      <button
        type="button"
        className="ikas-faq-row__btn"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <span className="ikas-faq-row__leading">
          {iconHtml ? (
            <span
              className="ikas-faq-row__icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: iconHtml }}
            />
          ) : (
            <span className="ikas-faq-row__icon ikas-faq-row__icon--empty" aria-hidden="true" />
          )}
          <span className={`ikas-faq-row__question ${ThemeType.h3}`}>{question}</span>
        </span>
        <AccordionToggleIcon isOpen={isOpen} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="ikas-faq-row__panel"
      >
        <div className="ikas-faq-row__panel-inner">
          {answer ? (
            <div
              className={`ikas-faq-row__answer ${ThemeType.bodySm}`}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default BouncyAccordionRow;
