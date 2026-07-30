import { useEffect, useRef, useState } from "preact/hooks";
import { Props } from "./types";
import type { VelocityBeltDirection } from "../../global-types";

export interface VelocityBeltProps extends Props {
  className?: string;
}

/**
 * VelocityBelt — Bağımsız scroll-hızlı kayan bant section.
 *
 * StorySection'dan ayrıldı. Scroll delta'sına göre ivmelenir; angle ile eğilir.
 * prefers-reduced-motion → sabit baseSpeed, scroll tepkisi yok (açı korunur).
 *
 * Renk default'ları TOKENS.md:
 *   backgroundColor → Ana Lacivert var(--pxNuSoudLn) satır 10 (#37435B)
 *   color           → Saf Beyaz     var(--24KlcgGmm9) satır 14 (#FFFFFF)
 */
export function VelocityBelt({
  text = "İZMİR'DE DOKUNDU · İSTANBUL'DA TASARLANDI · %100 SAF PAMUK VE HAFIZA KÖPÜĞÜ ·",
  baseSpeed = 0.8,
  velocityMultiplier = 0.12,
  angle = -1,
  direction = "LEFT" as VelocityBeltDirection,
  color,
  backgroundColor,
  fontSize = 12,
  className = "",
}: VelocityBeltProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const resolvedBase = typeof baseSpeed === "number" && isFinite(baseSpeed) ? baseSpeed : 0.8;
  const resolvedMultiplier =
    typeof velocityMultiplier === "number" && isFinite(velocityMultiplier)
      ? velocityMultiplier
      : 0.12;
  const resolvedAngle = typeof angle === "number" && isFinite(angle) ? angle : -1;
  const resolvedFontSize =
    typeof fontSize === "number" && isFinite(fontSize) && fontSize > 0 ? fontSize : 12;
  const dir = String(direction || "LEFT").toUpperCase() === "RIGHT" ? "RIGHT" : "LEFT";

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

        // Scroll ivmesi + temel hıza yumuşak dönüş
        speed += delta * resolvedMultiplier;
        speed += (resolvedBase - speed) * 0.06;
      } else {
        // reduced-motion: sabit yavaş akış, scroll'a tepki yok
        speed = resolvedBase;
      }

      // LEFT → negatif X (soldan akar), RIGHT → pozitif X
      currentX += dir === "RIGHT" ? speed : -speed;

      // %50 döngü: metin 2 kopya olduğu için yarım turda sıfırlanır
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

  // İki kopya → %50 wrap; ekstra kopyalar boşlukları kapatır
  const repeated = `${formatted} ${formatted} ${formatted} ${formatted}`;

  const sectionStyle = {
    // Prop yoksa CSS token fallback'leri devreye girer
    backgroundColor: backgroundColor || undefined,
    "--belt-color": color || undefined,
    "--belt-bg": backgroundColor || undefined,
    "--belt-font-size": `${resolvedFontSize}px`,
    "--belt-angle": `${resolvedAngle}deg`,
  } as Record<string, string | undefined>;

  return (
    <section
      className={`ikas-velocity-belt ${className}`.trim()}
      style={sectionStyle}
      lang="tr"
      aria-hidden="true"
    >
      {/* Clip katmanı: eğimde kenar boşluğu/taşmayı gizler */}
      <div className="ikas-velocity-belt__clip">
        {/* Geniş eğik bant: width 110% + negatif margin ile ortalanır */}
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
