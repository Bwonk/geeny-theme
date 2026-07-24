import type { IkasProduct, IkasProductList } from "@ikas/bp-storefront";

export interface Props {
  /** PDP Ana Ürün Objesi */
  product?: IkasProduct | null;
  /** İlgili ürünler listesi (opsiyonel) */
  relatedProducts?: IkasProductList | null;
  /** Arka plan rengi */
  backgroundColor?: string;
}
