import { useEffect, useState } from "preact/hooks";
import { getThemeSetting } from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import PortalScope from "../PortalScope";

export interface SizeGuideRow {
  label: string;
  value: string;
}

export interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  intro?: string;
  rows?: SizeGuideRow[];
  note?: string;
  closeLabel?: string;
}

export function SizeGuideDrawer({
  open,
  onClose,
  title = "Ölçü tablosu",
  intro = "İki boyut — boyun çevresi ve taşıma tercihine göre seç.",
  rows = [],
  note = "Emin değilsen Standart ile başla; Mini çocuk ve dar koltuklar için.",
  closeLabel = "Kapat",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const drawerAnimSetting = getThemeSetting("_rTI75Www8J");
  const drawerAnim =
    drawerAnimSetting?.value || "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const visibleRows = (rows || []).filter((r) => r.label && r.value);

  if (!mounted || typeof document === "undefined") return null;

  const content = (
    <div
      className={`ikas-size-guide${open ? " ikas-size-guide--open" : ""}`}
      style={{ "--size-guide-transition": drawerAnim } as any}
      lang="tr"
    >
      <div
        className="ikas-size-guide__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="ikas-size-guide__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ikas-size-guide-title"
        aria-hidden={!open}
      >
        <div className="ikas-size-guide__handle" aria-hidden="true" />

        <div className="ikas-size-guide__header">
          {title && (
            <h2 id="ikas-size-guide-title" className="ikas-size-guide__title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="ikas-size-guide__close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="ikas-size-guide__body">
          {intro && <p className="ikas-size-guide__intro">{intro}</p>}

          {visibleRows.length > 0 && (
            <dl className="ikas-size-guide__rows">
              {visibleRows.map((row) => (
                <div key={row.label} className="ikas-size-guide__row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {note && <p className="ikas-size-guide__note">{note}</p>}
        </div>
      </div>
    </div>
  );

  return <PortalScope name="size-guide">{content}</PortalScope>;
}

export default observer(SizeGuideDrawer);
