import { useEffect, useRef, useState } from "preact/hooks";
import {
  customerStore,
  hasCustomer,
  isFavoriteIkasProduct,
  addIkasProductToFavorites,
  removeIkasProductFromFavorites,
  getSelectedProductVariantHref,
  Router,
  IkasProduct,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";

export interface Props {
  product: IkasProduct;
  favoriteAriaLabel?: string;
  favoriteRemoveAriaLabel?: string;
  shareAriaLabel?: string;
  linkCopiedText?: string;
  className?: string;
}

const PARTICLE_COUNT = 8;
const PARTICLE_RADIUS = 32;
const POP_MS = 300;
const COPIED_MS = 1600;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function spawnParticles(host: HTMLElement | null): void {
  if (!host || prefersReducedMotion()) return;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
    const tx = Math.cos(angle) * PARTICLE_RADIUS;
    const ty = Math.sin(angle) * PARTICLE_RADIUS;
    const el = document.createElement("span");
    el.className =
      "ikas-social-btn__particle" +
      (i % 2 === 1 ? " ikas-social-btn__particle--alt" : "");
    el.style.setProperty("--tx", `${tx.toFixed(1)}px`);
    el.style.setProperty("--ty", `${ty.toFixed(1)}px`);
    el.setAttribute("aria-hidden", "true");
    host.appendChild(el);
    el.addEventListener(
      "animationend",
      () => {
        el.remove();
      },
      { once: true }
    );
  }
}

function triggerPop(btn: HTMLElement | null): void {
  if (!btn || prefersReducedMotion()) return;
  btn.classList.remove("pop");
  // Force reflow so consecutive pops re-trigger
  void btn.offsetWidth;
  btn.classList.add("pop");
  window.setTimeout(() => btn.classList.remove("pop"), POP_MS);
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fallback below */
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function resolveShareUrl(product: IkasProduct): string {
  const path = getSelectedProductVariantHref(product) || "";
  if (typeof window === "undefined") return path;
  if (!path) return window.location.href;
  if (/^https?:\/\//i.test(path)) return path;
  const origin = window.location.origin || "";
  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="ikas-social-btn__icon ikas-social-btn__heart"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      className="ikas-social-btn__icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="ikas-social-btn__icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.2 4.2L19 7.5" />
    </svg>
  );
}

/**
 * ProductSocialActions — PDP başlık satırı favori + link kopyala.
 * Chip dili CloseButton / AccordionToggleIcon ile uyumlu (34px).
 */
export function ProductSocialActions({
  product,
  favoriteAriaLabel = "Favorilere ekle",
  favoriteRemoveAriaLabel = "Favorilerden çıkar",
  shareAriaLabel = "Bağlantıyı kopyala",
  linkCopiedText = "Bağlantı kopyalandı",
  className = "",
}: Props) {
  const liked = isFavoriteIkasProduct(product);
  const [favBusy, setFavBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");
  const favBtnRef = useRef<HTMLButtonElement>(null);
  const shareBtnRef = useRef<HTMLButtonElement>(null);
  const copiedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current != null) {
        window.clearTimeout(copiedTimerRef.current);
      }
    };
  }, []);

  const handleFavorite = async () => {
    if (favBusy) return;

    if (!hasCustomer(customerStore)) {
      Router.navigateToPage("LOGIN");
      return;
    }

    setFavBusy(true);
    try {
      if (liked) {
        await removeIkasProductFromFavorites(product);
      } else {
        const ok = await addIkasProductToFavorites(product);
        if (ok) {
          triggerPop(favBtnRef.current);
          spawnParticles(favBtnRef.current);
        }
      }
    } finally {
      setFavBusy(false);
    }
  };

  const handleShare = async () => {
    const url = resolveShareUrl(product);
    const ok = await copyText(url);
    if (!ok) return;

    triggerPop(shareBtnRef.current);
    spawnParticles(shareBtnRef.current);
    setCopied(true);
    setLiveMessage(linkCopiedText || "");

    if (copiedTimerRef.current != null) {
      window.clearTimeout(copiedTimerRef.current);
    }
    copiedTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      setLiveMessage("");
      copiedTimerRef.current = null;
    }, COPIED_MS);
  };

  const rootClass = ["ikas-social-actions", className].filter(Boolean).join(" ");
  const favClass = [
    "ikas-social-btn",
    "ikas-tap-44",
    liked ? "ikas-social-btn--liked" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const shareClass = [
    "ikas-social-btn",
    "ikas-tap-44",
    copied ? "ikas-social-btn--copied" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <button
        ref={favBtnRef}
        type="button"
        className={favClass}
        aria-label={liked ? favoriteRemoveAriaLabel : favoriteAriaLabel}
        aria-pressed={liked}
        disabled={favBusy}
        onClick={handleFavorite as any}
      >
        <span className="ikas-icon-chip" aria-hidden="true">
          <HeartIcon filled={liked} />
        </span>
      </button>

      <button
        ref={shareBtnRef}
        type="button"
        className={shareClass}
        aria-label={copied ? linkCopiedText : shareAriaLabel}
        onClick={handleShare as any}
      >
        <span className="ikas-icon-chip" aria-hidden="true">
          {copied ? <CheckIcon /> : <ShareIcon />}
        </span>
      </button>

      <span className="ikas-social-actions__live" aria-live="polite">
        {liveMessage}
      </span>
    </div>
  );
}

export default observer(ProductSocialActions);
