import type { IkasProductList } from "@ikas/bp-storefront";

export interface Props {
  /** ikas ürün listesi objesi */
  productList?: IkasProductList | null;
  /** Yükle buton metni */
  loadMoreText?: string;
  /** Yükleniyor metni */
  loadingText?: string;
}
