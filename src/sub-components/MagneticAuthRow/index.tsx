import type { RefObject } from "preact";
import {
  getDefaultSrc,
  createMediaSrcset,
  type IkasImage,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import type { ObjectFit } from "../../global-types";
import { resolveObjectFit } from "../../utils/media";

export interface BarDef {
  label: string;
  tone: number;
  isCenter: boolean;
}

export interface Props {
  bars: BarDef[];
  rowRef: RefObject<HTMLDivElement>;
  open: boolean;
  centerBarAria?: string;
  centerBarHint?: string;
  onOpenPanel: () => void;
  /** Side-bar images in left-to-right label order (excludes center). */
  sideImages?: (IkasImage | null | undefined)[];
  centerImage?: IkasImage | null;
  objectFit?: ObjectFit;
  showOverlay?: boolean;
}

function upper(v?: string) {
  return (v || "").toLocaleUpperCase("tr-TR");
}

function BarMedia({
  image,
  objectFitCss,
  showOverlay,
}: {
  image?: IkasImage | null;
  objectFitCss: string;
  showOverlay: boolean;
}) {
  if (!image) return null;
  return (
    <>
      <img
        className="ikas-mgauth__bar-img"
        src={getDefaultSrc(image)}
        srcSet={createMediaSrcset(image)}
        alt=""
        style={{ objectFit: objectFitCss as any }}
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      {showOverlay && (
        <span className="ikas-mgauth__bar-img-overlay" aria-hidden="true" />
      )}
    </>
  );
}

export function MagneticAuthRow({
  bars,
  rowRef,
  open,
  centerBarAria,
  centerBarHint,
  onOpenPanel,
  sideImages = [],
  centerImage,
  objectFit = "Cover",
  showOverlay = true,
}: Props) {
  const objectFitCss = resolveObjectFit(objectFit);
  let sideCursor = 0;

  return (
    <div className="ikas-mgauth__row" role="group" ref={rowRef}>
      {bars.map((bar, i) => {
        if (bar.isCenter) {
          return (
            <button
              key={i}
              type="button"
              className="ikas-mgauth__bar ikas-mgauth__bar--center"
              aria-label={centerBarAria}
              aria-haspopup="dialog"
              aria-expanded={open}
              data-bar="true"
              onClick={onOpenPanel}
            >
              <BarMedia
                image={centerImage}
                objectFitCss={objectFitCss}
                showOverlay={showOverlay}
              />
              <span
                className="ikas-mgauth__bar-label _eZyocyyd0F"
                aria-hidden="true"
              >
                {upper(bar.label)}
              </span>
              <span className="ikas-mgauth__bar-ring" aria-hidden="true" />
              <span className="ikas-mgauth__bar-cta" aria-hidden="true">
                <span className="ikas-mgauth__bar-cta-text">{centerBarHint}</span>
                <span className="ikas-mgauth__bar-cta-icon">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </button>
          );
        }

        const sideImage = sideImages[sideCursor];
        sideCursor += 1;

        return (
          <div
            key={i}
            className={`ikas-mgauth__bar ikas-mgauth__bar--t${bar.tone}`}
            aria-hidden="true"
            data-bar="true"
          >
            <BarMedia
              image={sideImage}
              objectFitCss={objectFitCss}
              showOverlay={showOverlay}
            />
            <span className="ikas-mgauth__bar-label _eZyocyyd0F">
              {upper(bar.label)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default observer(MagneticAuthRow);
