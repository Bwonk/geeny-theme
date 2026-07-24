import { useState } from "preact/hooks";
import { getThemeSetting } from "@ikas/bp-storefront";
import { Props } from "./types";

export interface AccordionItem {
  id?: string;
  title: string;
  content: string;
}

export interface ProductValueAccordionsProps extends Props {
  items?: AccordionItem[];
  className?: string;
}

export function ProductValueAccordions({
  items,
  product,
  className = "",
}: ProductValueAccordionsProps) {
  const [openState, setOpenState] = useState<Record<string, boolean>>({ item0: true });

  const accordionAnimSetting = getThemeSetting("_QzHzEnrknJ"); // Animasyon / Akordiyon Açılış
  const accordionTransition = accordionAnimSetting?.value || "max-height 0.35s ease-in-out";

  const defaultItems: AccordionItem[] = [
    {
      id: "item0",
      title: "Ergonomik Tasarım & Kullanım",
      content:
        product?.description ||
        "Infinity Pillow 360° dönebilen ergonomik yapısı sayesinde baş, boyun ve bel desteği sağlar. Uçak, tren, araba seyahatlerinde ve evde dinlenirken omurganızı mükemmel açıda destekler.",
    },
    {
      id: "item1",
      title: "Kumaş Bakımı & Yıkama Talimatları",
      content:
        "Nefes alabilir bambu dokuma kılıfı fermuarlıdır ve kolayca çıkarılabilir. 30°C'de makinede hassas yıkama yapılabilir. Ağartıcı kullanılmamalıdır.",
    },
    {
      id: "item2",
      title: "Kargo, Teslimat & 14 Gün İade",
      content:
        "Hafta içi saat 15:00'e kadar verilen tüm siparişler aynı gün kargoya teslim edilir. Ürününüzden %100 memnun kalmazsanız 14 gün boyunca ücretsiz iade hakkınız mevcuttur.",
    },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  const toggleItem = (id: string) => {
    setOpenState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`ikas-accordions ${className}`.trim()}
      style={{ "--accordion-transition": accordionTransition } as any}
      lang="tr"
    >
      {displayItems.map((item, idx) => {
        const itemId = item.id || `item${idx}`;
        const isOpen = Boolean(openState[itemId]);

        return (
          <div key={itemId} className="ikas-accordions__item">
            <button
              type="button"
              className="ikas-accordions__header"
              onClick={() => toggleItem(itemId)}
              aria-expanded={isOpen}
            >
              <span className="ikas-accordions__title _AZR1yL8GrK">
                {item.title}
              </span>
              <span
                className={`ikas-accordions__icon ${
                  isOpen ? "ikas-accordions__icon--open" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={`ikas-accordions__panel ${
                isOpen ? "ikas-accordions__panel--open" : ""
              }`}
            >
              <div className="ikas-accordions__body _VcfI5D07Nt">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductValueAccordions;
