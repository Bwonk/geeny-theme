import { useRef, useEffect, useState } from "preact/hooks";
import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface StorySectionProps extends Props {
  className?: string;
}

/**
 * StorySection — YENİ Section (02 · HİKÂYEMİZ)
 *
 * Özellikler:
 * 1. Scroll-Lit Text: Paragraf kelimeleri kullanıcı sayfayı kaydırdıkça soluktan (%15) net laciverte aydınlanır.
 * 2. Animated Counters: İstatistik rakamları görünür olunca 0'dan hedefe sayar (140.000+, 4.8 / 5, 2.412, 2 YIL).
 * 3. Velocity Marquee Belt: Alt lacivert duyuru bandı scroll hızına tepki vererek ivmelenir/yavaşlar.
 * 4. prefers-reduced-motion Erişilebilirlik Desteği.
 */
export function StorySection({
  tag = "02 · HİKÂYEMİZ",
  storyText = "Uykunun bir lüks değil, en temel insan hakkı olduğuna inanıyoruz. İzmir'deki atölyemizde dokunan her iplik, uzun yolculuklarda omurganızı desteklemek ve size evdeki konforu hissettirmek için özenle tasarlandı.",
  counter1Val = "140.000+",
  counter1Label = "MUTLU YOLCU",
  counter2Val = "4.8 / 5",
  counter2Label = "KULLANICI PUANI",
  counter3Val = "2.412",
  counter3Label = "DEĞERLENDİRME",
  counter4Val = "2 YIL",
  counter4Label = "BİREBİR DEĞİŞİM",
  marqueeText = "İZMİR'DE DOKUNDU · İSTANBUL'DA TASARLANDI · %100 SAF PAMUK VE HAFIZA KÖPÜĞÜ ·",
  backgroundColor,
  className = "",
}: StorySectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);

  // States
  const [activeWordCount, setActiveWordCount] = useState(0);
  const [counts, setCounts] = useState({
    c1: "0+",
    c2: "0.0 / 5",
    c3: "0",
    c4: counter4Val || "2 YIL",
  });
  const [beltTranslateX, setBeltTranslateX] = useState(0);

  const words = (storyText || "").trim().split(/\s+/).filter(Boolean);

  // 1. SCROLL-LIT WORDS ANIMATION
  useEffect(() => {
    if (!textRef.current || words.length === 0) return;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveWordCount(words.length);
      return;
    }

    let rafId: number;

    const handleScroll = () => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.25;
      const progress = Math.min(
        1,
        Math.max(0, (startTrigger - rect.top) / (startTrigger - endTrigger))
      );

      const litCount = Math.floor(progress * words.length);
      setActiveWordCount(litCount);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [words.length]);

  // 2. COUNTER ANIMATION (IntersectionObserver + requestAnimationFrame)
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts({
        c1: counter1Val,
        c2: counter2Val,
        c3: counter3Val,
        c4: counter4Val,
      });
      return;
    }

    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            observer.disconnect();

            const startTime = performance.now();
            const duration = 1500;

            const step = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              const easeProgress = 1 - Math.pow(1 - progress, 3);

              const v1 = Math.floor(easeProgress * 140000);
              const formattedV1 = `${v1.toLocaleString("tr-TR")}+`;

              const v2 = (easeProgress * 4.8).toFixed(1);
              const formattedV2 = `${v2} / 5`;

              const v3 = Math.floor(easeProgress * 2412);
              const formattedV3 = v3.toLocaleString("tr-TR");

              setCounts({
                c1: progress >= 1 ? counter1Val : formattedV1,
                c2: progress >= 1 ? counter2Val : formattedV2,
                c3: progress >= 1 ? counter3Val : formattedV3,
                c4: counter4Val,
              });

              if (progress < 1) {
                requestAnimationFrame(step);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [counter1Val, counter2Val, counter3Val, counter4Val]);

  // 3. VELOCITY MARQUEE BELT ANIMATION
  useEffect(() => {
    let animId: number;
    let lastScrollY = window.scrollY || window.pageYOffset;
    let currentX = 0;
    let speed = 0.8;
    const baseSpeed = 0.8;

    const isReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = () => {
      if (!isReducedMotion) {
        const nowScrollY = window.scrollY || window.pageYOffset;
        const delta = Math.abs(nowScrollY - lastScrollY);
        lastScrollY = nowScrollY;

        speed += delta * 0.12;
        speed += (baseSpeed - speed) * 0.06;
      } else {
        speed = baseSpeed;
      }

      currentX -= speed;
      if (currentX <= -50) {
        currentX = 0;
      }

      setBeltTranslateX(currentX);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ");
  const maxSiteWidth = siteWidthSetting?.value || "1560px";

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--max-site-width": maxSiteWidth,
  };

  const formattedMarquee = (marqueeText || "").trim().toLocaleUpperCase("tr-TR");
  const repeatedMarquee = `${formattedMarquee} ${formattedMarquee} ${formattedMarquee} ${formattedMarquee}`;

  return (
    <section
      ref={containerRef}
      className={`ikas-story ${className}`.trim()}
      style={inlineStyles}
      lang="tr"
    >
      <div className="ikas-story__container">
        {/* HİKAYE ÜST ETİKETİ & SCROLL-LIT PARAGRAF */}
        <div className="ikas-story__header">
          {tag && (
            <div className="ikas-story__tag _eZyocyyd0F">
              {tag}
            </div>
          )}
          <p ref={textRef} className="ikas-story__paragraph _sKAMD8d1LA">
            {words.map((word, idx) => {
              const isLit = idx < activeWordCount;
              return (
                <span
                  key={idx}
                  className={`ikas-story__word ${isLit ? "ikas-story__word--lit" : ""}`}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>

        {/* İSTATİSTİK SAYAÇLARI IZGARASI */}
        <div ref={counterRef} className="ikas-story__counters">
          <div className="ikas-story__counter-item">
            <div className="ikas-story__counter-val _sKAMD8d1LA">
              {counts.c1}
            </div>
            <div className="ikas-story__counter-label _eZyocyyd0F">
              {counter1Label}
            </div>
          </div>
          <div className="ikas-story__counter-item">
            <div className="ikas-story__counter-val _sKAMD8d1LA">
              {counts.c2}
            </div>
            <div className="ikas-story__counter-label _eZyocyyd0F">
              {counter2Label}
            </div>
          </div>
          <div className="ikas-story__counter-item">
            <div className="ikas-story__counter-val _sKAMD8d1LA">
              {counts.c3}
            </div>
            <div className="ikas-story__counter-label _eZyocyyd0F">
              {counter3Label}
            </div>
          </div>
          <div className="ikas-story__counter-item">
            <div className="ikas-story__counter-val _sKAMD8d1LA">
              {counts.c4}
            </div>
            <div className="ikas-story__counter-label _eZyocyyd0F">
              {counter4Label}
            </div>
          </div>
        </div>
      </div>

      {/* ALT VELOCITY MARQUEE BANT */}
      <div className="ikas-story__belt-wrapper" aria-hidden="true">
        <div
          ref={beltRef}
          className="ikas-story__belt-track"
          style={{ transform: `translate3d(${beltTranslateX}%, 0, 0)` }}
        >
          <span className="ikas-story__belt-text">{repeatedMarquee}</span>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
