import { getThemeSetting, IkasProduct } from "@ikas/bp-storefront";
import ProductCard from "../../sub-components/ProductCard";
import { Props } from "./types";

export interface RelatedProductsCarouselProps extends Props {
  products?: IkasProduct[];
  className?: string;
}

export function RelatedProductsCarousel({
  tag = "03 · BENZER ÜRÜNLER",
  title = "Bunları da beğenebilirsiniz",
  productList,
  products,
  addToCartText = "SEPETE EKLE",
  addingToCartText = "EKLENİYOR...",
  soldOutText = "TÜKENDİ",
  backgroundColor,
  className = "",
}: RelatedProductsCarouselProps) {
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ");
  const maxSiteWidth = siteWidthSetting?.value || "1560px";

  const displayProducts: IkasProduct[] =
    products || (productList as any)?.data || [];

  if (!displayProducts || displayProducts.length === 0) return null;

  const inlineStyles = {
    backgroundColor: backgroundColor || undefined,
    "--max-site-width": maxSiteWidth,
  } as any;

  return (
    <section
      className={`ikas-related ${className}`.trim()}
      style={inlineStyles}
      lang="tr"
    >
      <div className="ikas-related__container">
        <header className="ikas-related__header">
          <div className="ikas-related__header-left">
            {tag && <div className="ikas-related__tag">{tag}</div>}
            {title && <h2 className="ikas-related__title">{title}</h2>}
          </div>
        </header>

        <div className="ikas-related__track">
          {displayProducts.slice(0, 4).map((productItem, idx) => (
            <div key={productItem.id || idx} className="ikas-related__item">
              <ProductCard
                product={productItem}
                showQuickAdd
                overlayQuickAdd
                addToCartText={addToCartText}
                addingToCartText={addingToCartText}
                soldOutText={soldOutText}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProductsCarousel;
