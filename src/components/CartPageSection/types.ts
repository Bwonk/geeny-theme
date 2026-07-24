import type { IkasCart } from "@ikas/bp-storefront";

export interface Props {
  /** ikas sepet objesi */
  cart?: IkasCart | null;
  /** Sayfa ana başlığı */
  title?: string;
  /** Boş sepet durum metni */
  emptyCartTitle?: string;
  /** Boş sepet buton metni */
  emptyCartButtonText?: string;
  /** Arka plan rengi */
  backgroundColor?: string;
}
