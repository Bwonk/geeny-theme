import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import type { ComponentChildren } from "preact";

interface ScopeAttrs {
  className?: string;
  "data-cc-scope"?: string;
}

interface Props {
  children: ComponentChildren;
  /** Debug / query selector hook, e.g. "cart-drawer" */
  name: string;
}

/**
 * Portals children to document.body while preserving ikas CSS scope.
 *
 * Component CSS is compiled as `.cc_<Component> .selector` and global CSS as
 * `:where([data-cc-scope~="<projectId>"]) .selector`. A raw body portal escapes
 * both, so fixed drawers/overlays render unstyled at the page bottom.
 *
 * This wrapper copies the nearest `cc_*` class + `data-cc-scope` onto a portal
 * host so scoped rules match again.
 */
export function PortalScope({ children, name }: Props) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [scopeAttrs, setScopeAttrs] = useState<ScopeAttrs | null>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor || typeof document === "undefined") return;

    const scopeEl = anchor.closest("[data-cc-scope]");
    const ccEl = anchor.closest("[class*='cc_']");
    const ccClass = ccEl
      ? Array.from(ccEl.classList).find((c) => c.startsWith("cc_"))
      : undefined;

    setScopeAttrs({
      className: ccClass,
      "data-cc-scope": scopeEl?.getAttribute("data-cc-scope") ?? undefined,
    });
  }, []);

  const portal =
    typeof document !== "undefined" &&
    document.body &&
    scopeAttrs != null
      ? createPortal(
          <div
            className={scopeAttrs.className}
            data-cc-scope={scopeAttrs["data-cc-scope"]}
            data-geeny-portal={name}
          >
            {children}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        ref={anchorRef}
        hidden
        aria-hidden="true"
        data-geeny-portal-anchor={name}
      />
      {portal}
    </>
  );
}

export default PortalScope;
