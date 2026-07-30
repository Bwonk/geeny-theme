import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Props } from "./types";
import type {
  VelocityBeltDirection,
  VelocityBeltScrollBoost,
  VelocityBeltSpeed,
} from "../../global-types";

export interface VelocityBeltProps extends Props {
  className?: string;
}

/** Editördeki "Akış Hızı" seçenekleri → dahili px/frame hızı (yavaş default). */
const SPEED_MAP: Record<string, number> = {
  slow: 0.1,
  normal: 0.22,
  fast: 0.42,
};

/** "Kaydırınca Hızlansın mı?" → scroll delta çarpanı */
const BOOST_MAP: Record<string, number> = {
  off: 0,
  light: 0.012,
  medium: 0.028,
  strong: 0.055,
};

/**
 * VelocityBelt — Scroll'a tepki verebilen kayan bant.
 *
 * Merchant ayarları sade:
 *   speed       → Yavaş / Normal / Hızlı
 *   scrollBoost → Kapalı / Hafif / Orta / Güçlü
 *   angle       → eğim (zemin + yazı birlikte)
 *
 * Renkler — TOKENS.md:
 *   bg    → Ana Lacivert var(--pxNuSoudLn) satır 10
 *   color → Saf Beyaz     var(--24KlcgGmm9) satır 14
 */
export function VelocityBelt({
  text = "İZMİR'DE DOKUNDU · İSTANBUL'DA TASARLANDI · %100 SAF PAMUK VE HAFIZA KÖPÜĞÜ ·",
  speed = "slow" as VelocityBeltSpeed,
  scrollBoost = "light" as VelocityBeltScrollBoost,
  angle = -2,
  direction = "LEFT" as VelocityBeltDirection,
  color,
  backgroundColor,
  fontSize = 12,
  className = "",
}: VelocityBeltProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const speedKey = String(speed || "slow").toLowerCase();
  const boostKey = String(scrollBoost || "light").toLowerCase();
  const resolvedBase = SPEED_MAP[speedKey] ?? SPEED_MAP.slow;
  const resolvedMultiplier = BOOST_MAP[boostKey] ?? BOOST_MAP.light;

  const resolvedAngle = typeof angle === "number" && isFinite(angle) ? angle : -2;
  const resolvedFontSize =
    typeof fontSize === "number" && isFinite(fontSize) && fontSize > 0 ? fontSize : 12;
  const dir = String(direction || "LEFT").toUpperCase() === "RIGHT" ? "RIGHT" : "LEFT";

  const expandPct = useMemo(() => {
    const abs = Math.abs(resolvedAngle);
    return Math.min(55, Math.max(14, 14 + abs * 2.2));
  }, [resolvedAngle]);

  const clipPadPx = useMemo(() => {
    const abs = Math.abs(resolvedAngle);
    return Math.max(8, Math.round(abs * 3.5 + 6));
  }, [resolvedAngle]);

  useEffect(() => {
    let animId = 0;
    let lastScrollY = window.scrollY || window.pageYOffset;
    let currentX = 0;
    let currentSpeed = resolvedBase;

    const isReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = () => {
      if (!isReducedMotion && resolvedMultiplier > 0) {
        const nowScrollY = window.scrollY || window.pageYOffset;
        const delta = Math.abs(nowScrollY - lastScrollY);
        lastScrollY = nowScrollY;

        currentSpeed += delta * resolvedMultiplier;
        currentSpeed += (resolvedBase - currentSpeed) * 0.1;
        const maxSpeed = resolvedBase * 3.2 + 0.35;
        if (currentSpeed > maxSpeed) currentSpeed = maxSpeed;
      } else {
        // Kapalı boost veya reduced-motion → sabit yavaş akış
        currentSpeed = resolvedBase;
        lastScrollY = window.scrollY || window.pageYOffset;
      }

      currentX += dir === "RIGHT" ? currentSpeed : -currentSpeed;

      if (dir === "LEFT" && currentX <= -50) currentX = 0;
      if (dir === "RIGHT" && currentX >= 50) currentX = 0;

      setOffset(currentX);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [resolvedBase, resolvedMultiplier, dir]);

  const formatted = (text || "").trim().toLocaleUpperCase("tr-TR");
  if (!formatted) return null;

  const repeated = `${formatted} ${formatted} ${formatted} ${formatted}`;

  const sectionStyle = {
    "--belt-color": color || undefined,
    "--belt-bg": backgroundColor || undefined,
    "--belt-font-size": `${resolvedFontSize}px`,
    "--belt-angle": `${resolvedAngle}deg`,
    "--belt-expand": `${expandPct}%`,
    "--belt-clip-pad": `${clipPadPx}px`,
  } as Record<string, string | undefined>;

  return (
    <section
      className={`ikas-velocity-belt ${className}`.trim()}
      style={sectionStyle}
      lang="tr"
      aria-hidden="true"
    >
      <div className="ikas-velocity-belt__clip">
        <div className="ikas-velocity-belt__wrapper">
          <div
            ref={trackRef}
            className="ikas-velocity-belt__track"
            style={{ transform: `translate3d(${offset}%, 0, 0)` }}
          >
            <span className="ikas-velocity-belt__text">{repeated}</span>
            <span className="ikas-velocity-belt__text" aria-hidden="true">
              {repeated}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VelocityBelt;
