import { useState } from "preact/hooks";
import {
  getThemeSetting,
  getSelectedProductVariant,
  getProductVariantMainImage,
  getDefaultSrc,
  getSrc,
  getThumbnailSrc,
  IkasImage,
  IkasProduct,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";

export interface Props {
  product?: IkasProduct | null;
  className?: string;
}

export function ProductMediaGallery({
  product,
  className = "",
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const mobileGridGapSetting = getThemeSetting("_dBvnJWALXD"); // Boşluk / Mobil Grid Gap (12px)
  const mobileGridGap = mobileGridGapSetting?.value || "12px";

  if (!product) return null;

  const variant = getSelectedProductVariant(product);
  
  // Extract images from variant or main product
  const rawImages = (variant as any)?.images || (product as any)?.images || [];
  const mainProductImage = variant ? getProductVariantMainImage(variant) : null;
  const mainImage: IkasImage | null = (mainProductImage as any)?.image || (mainProductImage as any) || null;

  // Build complete list of IkasImage objects
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

  // Active image selection logic
  const activeImage = allImages[selectedIndex] || allImages[0] || mainImage;
  const mainSrc = activeImage ? getDefaultSrc(activeImage) : null;

  return (
    <div
      className={`ikas-media-gallery ${className}`.trim()}
      style={{ "--mobile-grid-gap": mobileGridGap } as any}
      lang="tr"
    >
      {/* ANA BÜYÜK GÖRSEL */}
      <div className="ikas-media-gallery__main">
        {mainSrc ? (
          <img
            src={mainSrc}
            alt={(activeImage as any)?.altText || product?.name || "Ürün Görseli"}
            className="ikas-media-gallery__main-img"
          />
        ) : (
          <div className="ikas-media-gallery__main-placeholder" />
        )}
      </div>

      {/* THUMBNAIL SLIDER */}
      {allImages.length > 1 && (
        <div
          className="ikas-media-gallery__thumbnails"
          role="region"
          aria-label="Ürün Görsel Galerisi Küçük Resimler"
        >
          {allImages.map((img, idx) => {
            const thumbSrc = getThumbnailSrc(img) || getSrc(img, 150) || getDefaultSrc(img);
            const isActive = idx === selectedIndex || (!allImages[selectedIndex] && idx === 0);

            return (
              <button
                key={img.id || idx}
                type="button"
                className={`ikas-media-gallery__thumb-item ${
                  isActive ? "ikas-media-gallery__thumb-item--active" : ""
                }`}
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Görsel ${idx + 1}`}
              >
                {thumbSrc && (
                  <img
                    src={thumbSrc}
                    alt={(img as any)?.altText || `Küçük Görsel ${idx + 1}`}
                    className="ikas-media-gallery__thumb-img"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default observer(ProductMediaGallery);
