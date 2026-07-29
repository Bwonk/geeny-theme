import { Props } from "./types";

export interface CurvedMarqueeProps extends Props {
  className?: string;
}

/**
 * CurvedMarquee — Tam Özelleştirilebilir Atmosferik Kavisli Kayan Metin Section
 *
 * Düzeltmeler (Harf Çarpıklığı / Geometri Bozulması Çözümü):
 * - `preserveAspectRatio="none"` KALDIRILDI → `xMidYMid slice` olarak ayarlandı.
 *   (Böylece SVG genişlik/yükseklik ölçeklemesi X ve Y aksında %100 eşit (1:1) oranla yapılır, harfler yatayda ezilmez veya gerilmez.)
 * - SVG `<text>` elemanına doğrudan `fontFamily`, `fontSize`, `fontWeight` attribute'ları bağlandı.
 * - Harf aralığı bozulmasını önlemek için nötr letter-spacing kullanıldı.
 */
export function CurvedMarquee({
  text = "SS26 · SEYAHAT SERİSİ · UYKUNU YANINDA TAŞI ·",
  color,
  speed = 26,
  direction = "LEFT",
  curveAmount = 20,
  fontSize = 38,
  fadeEdges = true,
  backgroundColor,
  className = "",
}: CurvedMarqueeProps) {
  const baseText = text?.trim()
    ? text.trim().toLocaleUpperCase("tr-TR")
    : "SS26 · SEYAHAT SERİSİ · UYKUNU YANINDA TAŞI ·";

  // Kesintisiz döngüsel akış için 4 tekrarlı metin
  const fullText = `${baseText} ${baseText} ${baseText} ${baseText}`;

  // Animasyon süresi (saniye)
  const animDur =
    typeof speed === "number" && speed > 0
      ? `${speed}s`
      : typeof speed === "string" && (speed as string).trim()
      ? (speed as string).trim()
      : "26s";

  // Akış Yönü: LEFT -> 0% to -100%, RIGHT -> -100% to 0%
  const dirStr = String(direction || "LEFT").toUpperCase();
  const fromOffset = dirStr === "RIGHT" ? "-100%" : "0%";
  const toOffset = dirStr === "RIGHT" ? "0%" : "-100%";

  // TEK Simetrik Kavis Hesaplama:
  // Başlangıç: (-200, 60), Tek Kontrol Noktası: (800, controlY), Bitiş: (1800, 60)
  const baseLineY = 60;
  const numCurve = typeof curveAmount === "number" ? curveAmount : 20;
  const controlY = baseLineY - numCurve;
  const pathD = `M -200 ${baseLineY} Q 800 ${controlY} 1800 ${baseLineY}`;

  // Metin boyutu
  const numFontSize = typeof fontSize === "number" && fontSize > 0 ? fontSize : 38;

  const inlineStyles: Record<string, any> = {
    backgroundColor: backgroundColor || undefined,
    "--marquee-color": color || undefined,
    "--marquee-font-size": `${numFontSize}px`,
  };

  return (
    <section
      className={`ikas-curved-marquee ${className}`.trim()}
      style={inlineStyles}
      aria-label={`Duyuru Bandı: ${baseText}`}
    >
      {/* SOL / SAĞ KENAR SOLUKLAŞMA FADE MASK */}
      {fadeEdges !== false && (
        <div className="ikas-curved-marquee__overlay" aria-hidden="true" />
      )}

      {/* SVG KAVİSLİ KAYAN METİN */}
      <svg
        viewBox="0 0 1600 110"
        preserveAspectRatio="xMidYMid slice"
        className="ikas-curved-marquee__svg"
        aria-hidden="true"
      >
        <path
          id="ikas-curved-path"
          d={pathD}
          fill="none"
          stroke="none"
        />
        <text
          className="ikas-curved-marquee__text"
          font-family="Onest, var(--font-heading), sans-serif"
          font-size={numFontSize}
          font-weight="600"
          dominant-baseline="central"
        >
          <textPath href="#ikas-curved-path" startOffset="0%">
            {fullText}
            <animate
              attributeName="startOffset"
              from={fromOffset}
              to={toOffset}
              dur={animDur}
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </section>
  );
}

export default CurvedMarquee;
