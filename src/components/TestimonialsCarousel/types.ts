// This file is auto-generated — do not edit manually.
import type { IkasImage, IkasNavigationLink } from "@ikas/bp-storefront";

export interface Props {
  /** Monospace bölüm üst etiket metni */
  tag?: string;
  /** Avatar kümesinin yanındaki gri üst başlık */
  titlePart1?: string;
  /** Ana lacivert vurgulu alt başlık */
  titlePart2?: string;
  /** Sol üst 1. müşteri yorum metni */
  review1Text?: string;
  /** 1. Müşteri adı */
  review1Author?: string;
  /** 1. Müşteri profil görseli (yüklü değilse adının baş harfi gösterilir) */
  review1Avatar?: IkasImage | null;
  /** Sağ üst 2. müşteri yorum metni */
  review2Text?: string;
  /** 2. Müşteri adı */
  review2Author?: string;
  /** 2. Müşteri profil görseli (yüklü değilse adının baş harfi gösterilir) */
  review2Avatar?: IkasImage | null;
  /** Sol alt 3. müşteri yorum metni */
  review3Text?: string;
  /** 3. Müşteri adı */
  review3Author?: string;
  /** 3. Müşteri profil görseli (yüklü değilse adının baş harfi gösterilir) */
  review3Avatar?: IkasImage | null;
  /** Sağ alt 4. müşteri yorum metni */
  review4Text?: string;
  /** 4. Müşteri adı */
  review4Author?: string;
  /** 4. Müşteri profil görseli (yüklü değilse adının baş harfi gösterilir) */
  review4Avatar?: IkasImage | null;
  /** Bölüm altındaki yönlendirme metni */
  bottomLinkText?: string;
  /** Bölüm zemin rengi */
  backgroundColor?: string;
  bottomLink?: IkasNavigationLink | null;
}
