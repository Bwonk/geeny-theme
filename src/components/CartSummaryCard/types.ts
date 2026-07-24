import type { IkasCart } from "@ikas/bp-storefront";

export interface Props {
  /** ikas sepet objesi */
  cart?: IkasCart | null;
  /** Ücretsiz kargo barı eşik tutarı (TL) */
  freeShippingThreshold?: number;
}
