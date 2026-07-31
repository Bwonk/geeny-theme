import { useEffect, useRef, useState } from "preact/hooks";
import {
  getThemeSetting,
  getSelectedProductVariant,
  getProductVariantMainImage,
  getDefaultSrc,
  getSrc,
  getThumbnailSrc,
  createMediaSrcset,
  IkasImage,
  IkasProduct,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { formatShadow } from "../../utils/theme";

export interface Props {
  product?: IkasProduct | null;
  /** Masaüstü scroll başına slide yüksekliği (vh). Referans varsayılan: 66 */
  slideHoldVh?: number;
  className?: string;
}

const DESKTOP_MQ = "(min-width: 992px)";
const DEFAULT_SLIDE_HOLD_VH = 66;

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function collectImages(product: IkasProduct): IkasImage[] {
  const variant = getSelectedProductVariant(product);
  const rawImages = (variant as any)?.images || (product as any)?.images || [];
  const mainProductImage = variant ? getProductVariantMainImage(variant) : null;
  const mainImage: IkasImage | null =
    (mainProductImage as any)?.image || (mainProductImage as any) || null;

  const allImages: IkasImage[] = [];
  if (mainImage && (mainImage as any).id) {
    allImages.push(mainImage);
  }
  if (rawImages && rawImages.length > 0) {
    rawImages.forEach((item: any) => {
      const imgObj = item?.image || item;
      if (imgObj && imgObj.id) {
        if (!allImages.some((existing) => existing.id === imgObj.id)) {
          allImages.push(imgObj);
        }
      }
    });
  }
  return allImages;
}

function imageLabel(img: IkasImage | null | undefined, productName?: string): string {
  const alt = ((img as any)?.altText || "").trim();
  if (alt) return alt;
  return productName || "";
}

export function ProductMediaGallery({
  product,
  slideHoldVh = DEFAULT_SLIDE_HOLD_VH,
  className = "",
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);

  const mediaRadiusSetting = getThemeSetting("_YFQAxlLvZl"); // Radius / Medya
  const cardShadowSetting = getThemeSetting("_yyUleMlhR4"); // Gölge / Kart Soft Shadow
  const fadeAnimSetting = getThemeSetting("_AwVN6G9Zib"); // Animasyon / Fade Yumuşak
  const scaleHoverSetting = getThemeSetting("_Z1JfmMfgtb"); // Animasyon / Görsel Scale Hover
  const mobileGridGapSetting = getThemeSetting("_dBvnJWALXD"); // Boşluk / Mobil Grid Gap

  const mediaRadius = mediaRadiusSetting?.value || "28px";
  const cardShadow = formatShadow(
    cardShadowSetting?.value,
    "0 4px 20px color-mix(in srgb, var(--pxNuSoudLn) 8%, transparent)"
  );
  const fadeAnim = fadeAnimSetting?.value || "0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  const thumbMotion = scaleHoverSetting?.value || "0.24s cubic-bezier(0.22, 1, 0.36, 1)";
  const mobileGridGap = mobileGridGapSetting?.value || "12px";

  const allImages = product ? collectImages(product) : [];
  const imageCount = allImages.length;
  const activeIndex =
    imageCount === 0 ? 0 : Math.min(selectedIndex, Math.max(0, imageCount - 1));
  const activeImage = allImages[activeIndex] || null;
  const activeLabel = imageLabel(activeImage, product?.name);
  const countText =
    imageCount > 0 ? `${pad2(activeIndex + 1)} / ${pad2(imageCount)}` : "";

  const scrubEnabled = imageCount > 1;
  const hold = Math.max(40, Math.min(110, Number(slideHoldVh) || DEFAULT_SLIDE_HOLD_VH));

  const variant = product ? getSelectedProductVariant(product) : null;
  const variantKey = variant?.id || product?.id || "";

  useEffect(() => {
    setSelectedIndex(0);
  }, [variantKey]);

  useEffect(() => {
    reduceMotionRef.current = !!(
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (!scrubEnabled) return;

    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const mq = window.matchMedia(DESKTOP_MQ);
    let cur = -1;
    let queued = false;
    let mQueued = false;

    const setIndex = (i: number) => {
      const next = Math.max(0, Math.min(imageCount - 1, i));
      if (next === cur) return;
      cur = next;
      setSelectedIndex(next);
    };

    const pad = () => Math.max(60, Math.min(110, window.innerHeight * 0.09));

    const geom = () => {
      const top = track.getBoundingClientRect().top + window.scrollY;
      const total = Math.max(1, track.offsetHeight - stage.offsetHeight - pad());
      return { start: top - pad(), total };
    };

    const paintDesktop = () => {
      queued = false;
      if (!mq.matches) return;
      const g = geom();
      const p = Math.max(0, Math.min(0.9999, (window.scrollY - g.start) / g.total));
      setIndex(Math.min(imageCount - 1, Math.floor(p * imageCount)));
    };

    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(paintDesktop);
      }
    };

    const onStageScroll = () => {
      if (mQueued) return;
      mQueued = true;
      requestAnimationFrame(() => {
        mQueued = false;
        if (mq.matches) return;
        const w = stage.clientWidth || 1;
        setIndex(Math.round(stage.scrollLeft / w));
      });
    };

    const onMqChange = () => {
      if (mq.matches) {
        paintDesktop();
      } else {
        const w = stage.clientWidth || 1;
        stage.scrollTo({ left: Math.max(0, cur) * w, behavior: "auto" });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    stage.addEventListener("scroll", onStageScroll, { passive: true });
    mq.addEventListener?.("change", onMqChange);

    paintDesktop();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      stage.removeEventListener("scroll", onStageScroll);
      mq.removeEventListener?.("change", onMqChange);
    };
  }, [scrubEnabled, imageCount, hold]);

  const goToIndex = (i: number) => {
    const next = Math.max(0, Math.min(imageCount - 1, i));
    setSelectedIndex(next);

    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || !scrubEnabled) return;

    const reduce = reduceMotionRef.current;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

    if (window.matchMedia(DESKTOP_MQ).matches) {
      const edgePad = Math.max(60, Math.min(110, window.innerHeight * 0.09));
      const top = track.getBoundingClientRect().top + window.scrollY;
      const total = Math.max(1, track.offsetHeight - stage.offsetHeight - edgePad);
      const start = top - edgePad;
      const y = start + ((next + 0.5) / imageCount) * total;
      window.scrollTo({ top: Math.max(0, y), behavior });
    } else {
      stage.scrollTo({ left: next * stage.clientWidth, behavior });
    }
  };

  if (!product) return null;

  const trackStyle = {
    "--media-radius": mediaRadius,
    "--card-shadow": cardShadow,
    "--gallery-fade": fadeAnim,
    "--gallery-thumb-motion": thumbMotion,
    "--mobile-grid-gap": mobileGridGap,
    ...(scrubEnabled
      ? { "--gallery-track-height": `${imageCount * hold}vh` }
      : {}),
  } as any;

  return (
    <div
      ref={trackRef}
      className={`ikas-media-gallery${scrubEnabled ? " ikas-media-gallery--scrub" : ""} ${className}`.trim()}
      style={trackStyle}
      lang="tr"
    >
      <div className="ikas-media-gallery__sticky">
        <div className="ikas-media-gallery__wrap">
          {imageCount > 1 && (
            <div
              className="ikas-media-gallery__thumbs"
              role="tablist"
              aria-label={product.name}
            >
              {allImages.map((img, idx) => {
                const thumbSrc =
                  getThumbnailSrc(img) || getSrc(img, 150) || getDefaultSrc(img);
                const isActive = idx === activeIndex;
                const label = imageLabel(img, product.name) || `${product.name} ${idx + 1}`;

                return (
                  <button
                    key={(img as any).id || idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ikas-media-gallery__thumb${
                      isActive ? " ikas-media-gallery__thumb--active" : ""
                    }`}
                    onClick={() => goToIndex(idx)}
                    aria-label={label}
                  >
                    {thumbSrc && (
                      <img
                        src={thumbSrc}
                        alt=""
                        className="ikas-media-gallery__thumb-img"
                        draggable={false}
                      />
                    )}
                    <span className="ikas-media-gallery__thumb-ring" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="ikas-media-gallery__main-col">
            <div
              ref={stageRef}
              className="ikas-media-gallery__stage"
              role="region"
              aria-roledescription="carousel"
              aria-label={product.name}
            >
              {imageCount === 0 ? (
                <div className="ikas-media-gallery__slide ikas-media-gallery__slide--active">
                  <div className="ikas-media-gallery__placeholder" />
                </div>
              ) : (
                allImages.map((img, idx) => {
                  const src = getDefaultSrc(img);
                  const srcSet = createMediaSrcset?.(img);
                  const isActive = idx === activeIndex;
                  const label = imageLabel(img, product.name);

                  return (
                    <div
                      key={(img as any).id || idx}
                      className={`ikas-media-gallery__slide${
                        isActive ? " ikas-media-gallery__slide--active" : ""
                      }`}
                      aria-hidden={!isActive}
                    >
                      {src ? (
                        <img
                          src={src}
                          srcSet={srcSet || undefined}
                          sizes="(max-width: 991px) 100vw, 56vw"
                          alt={label || product.name || ""}
                          className="ikas-media-gallery__img"
                          draggable={false}
                        />
                      ) : (
                        <div className="ikas-media-gallery__placeholder" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {imageCount > 0 && (
              <div className="ikas-media-gallery__meta">
                <span className="ikas-media-gallery__label">{activeLabel}</span>
                {imageCount > 1 && (
                  <span className="ikas-media-gallery__count">{countText}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(ProductMediaGallery);
