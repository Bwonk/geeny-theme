import { useEffect, useRef, useState } from "preact/hooks";
import { IkasComponentRenderer } from "@ikas/bp-storefront";
import {
  applyLayoutTokens,
  ThemeSetting,
  ThemeType,
  readSetting,
} from "../../utils/themeTokens";
import { Props } from "./types";

export function FaqBouncyAccordion(props: Props) {
  const {
    tag = "SSS",
    title = "Sıkça sorulan sorular",
    subtitle = "Sipariş, kargo ve ürün hakkında merak edilenler.",
    backgroundColor = "#ffffff",
    items,
    emptyStateText = "Henüz soru eklenmedi.",
  } = props;

  const sectionRef = useRef<HTMLElement>(null);
  const groupIdRef = useRef(`faq-${Math.random().toString(36).slice(2, 10)}`);
  const [headVisible, setHeadVisible] = useState(false);

  const springEase = readSetting(
    ThemeSetting.qtyStepper,
    "0.42s cubic-bezier(0.34, 1.56, 0.64, 1)"
  );
  const fadeEase = readSetting(
    ThemeSetting.fade,
    "0.6s cubic-bezier(0.22, 1, 0.36, 1)"
  );
  const faqRadius = readSetting(ThemeSetting.cartItemImgRadius, "12px");

  const layoutTokens = applyLayoutTokens({
    includePy: true,
    includePx: true,
    includeSiteWidth: true,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setHeadVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setHeadVisible(true);
          io.disconnect();
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const itemList = Array.isArray(items)
    ? items
    : Array.isArray((items as { components?: unknown } | null)?.components)
      ? (items as { components: any[] }).components
      : [];
  const hasItems = itemList.length > 0;

  const inlineStyles = {
    ...(backgroundColor ? { backgroundColor } : {}),
    ...layoutTokens,
    "--faq-spring": springEase,
    "--faq-fade": fadeEase,
    "--faq-radius": faqRadius,
  } as Record<string, string>;

  return (
    <section
      ref={sectionRef}
      className={`ikas-faq${headVisible ? " ikas-faq--inview" : ""}`}
      style={inlineStyles}
      data-faq-group={groupIdRef.current}
      lang="tr"
    >
      <div className="ikas-faq__inner">
        <header className="ikas-faq__head">
          {tag ? (
            <div className={`ikas-faq__tag ikas-faq__reveal ${ThemeType.label}`}>
              {tag}
            </div>
          ) : null}
          {title ? (
            <h2
              className={`ikas-faq__title ikas-faq__reveal ikas-faq__reveal--2 ${ThemeType.h2}`}
            >
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p
              className={`ikas-faq__subtitle ikas-faq__reveal ikas-faq__reveal--3 ${ThemeType.bodySm}`}
            >
              {subtitle}
            </p>
          ) : null}
        </header>

        <div className="ikas-faq__list">
          {hasItems ? (
            <IkasComponentRenderer
              id="faq-items"
              components={itemList as any[]}
              parentProps={props}
            />
          ) : (
            <p className={`ikas-faq__empty ${ThemeType.bodySm}`}>{emptyStateText}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FaqBouncyAccordion;
