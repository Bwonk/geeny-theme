import type { IkasProductList, IkasProduct } from "@ikas/bp-storefront";

export interface Props {
  /** ikas ürün listesi objesi */
  productList?: IkasProductList | null;
  /** Doğrudan ürün dizisi (opsiyonel) */
  products?: IkasProduct[];
  /** Boş durum mesajı */
  emptyMessage?: string;
}
