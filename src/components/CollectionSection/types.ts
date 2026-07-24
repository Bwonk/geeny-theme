import type { IkasProductList } from "@ikas/bp-storefront";

export interface Props {
  /** Koleksiyon / Kategori ikas Ürün Listesi */
  productList?: IkasProductList | null;
  /** Özel Koleksiyon Başlığı (opsiyonel) */
  title?: string;
  /** Özel Açıklama (opsiyonel) */
  description?: string;
  /** Arka Plan Rengi */
  backgroundColor?: string;
}
