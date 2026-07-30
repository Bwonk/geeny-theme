import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Props } from "./types";
import type { VelocityBeltDirection } from "../../global-types";

export interface VelocityBeltProps extends Props {
  className?: string;
}

/**
 * VelocityBelt — Scroll hızına tepki veren kayan bant.
 *
 * Eğim (angle) tek birimde uygulanır: lacivert zemin + metin birlikte rotate olur.
 * Section zemini boyanmaz (düz dikdörtgen eğimi öldürürdü); boya yalnızca wrapper'da.
 *
 * Köşe oturtma: wrapper genişliği |angle|'a göre büyür → rotate sonrası sol/sağ boşluk yok.
 *
 * Renkler — TOKENS.md:
 *   bg    → Ana Lacivert var(--pxNuSoudLn) satır 10
 *   color → Saf Beyaz     var(--24KlcgGmm9) satır 14
 */
export function VelocityBelt({
  text = "İZMİR'DE DOKUNDU · İSTANBUL'DA TASARLANDI · %100 SAF PAMUK VE HAFIZA KÖPÜĞÜ ·",
  baseSpeed = 0.28,
  velocityMultiplier = 0.035,
  angle = -2,
  direction = "LEFT" as VelocityBeltDirection,
  color,
  backgroundColor,
  fontSize = 12,
  className = "",
}: VelocityBeltProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const resolvedBase =
    typeof baseSpeed === "number" && isFinite(baseSpeed) ? Math.max(0, baseSpeed) : 0.28;
  const resolvedMultiplier =
    typeof velocityMultiplier === "number" && isFinite(velocityMultiplier)
      ? Math.max(0, velocityMultiplier)
      : 0.035;
  const resolvedAngle = typeof angle === "number" && isFinite(angle) ? angle : -2;
  const resolvedFontSize =
    typeof fontSize === "number" && isFinite(fontSize) && fontSize > 0 ? fontSize : 12;
  const dir = String(direction || "LEFT").toUpperCase() === "RIGHT" ? "RIGHT" : "LEFT";

  // Eğim arttıkça bant genişler; rotate sonrası sol/sağ köşeler viewport'u kapatır.
  // taban %14 + |derece| × %2.2 (ör. 5° → ~%25, 10° → ~%36), üst sınır %55.
  const expandPct = useMemo(() => {
    const abs = Math.abs(resolvedAngle);
    return Math.min(55, Math.max(14, 14 + abs * 2.2));
  }, [resolvedAngle]);

  // Clip dikey nefes: eğik bandın AABB yüksekliği için (px ≈ sin×genişlik yerine güvenli pay).
  const clipPadPx = useMemo(() => {
    const abs = Math.abs(resolvedAngle);
    return Math.max(8, Math.round(abs * 3.5 + 6));
  }, [resolvedAngle]);

  useEffect(() => {
    let animId = 0;
    let lastScrollY = window.scrollY || window.pageYOffset;
    let currentX = 0;
    let speed = resolvedBase;

    const isReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = () => {
      if (!isReducedMotion) {
        const nowScrollY = window.scrollY || window.pageYOffset;
        const delta = Math.abs(nowScrollY - lastScrollY);
        lastScrollY = nowScrollY;

        speed += delta * resolvedMultiplier;
        // Temel hıza dönüş — biraz daha yavaş sönüm (daha sakin his)
        speed += (resolvedBase - speed) * 0.08;
        // Anlık tavan: scroll patlamalarında kaçmasın
        const maxSpeed = resolvedBase * 4 + 0.6;
        if (speed > maxSpeed) speed = maxSpeed;
      } else {
        speed = resolvedBase;
      }

      currentX += dir === "RIGHT" ? speed : -speed;

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
    // Section şeffaf kalır — eğimli birim yalnızca wrapper
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
        {/* Zemin + yazı TEK transform: rotate — birlikte eğilir */}
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
