// This file is auto-generated — do not edit manually.
import type { IkasNavigationLink, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Başlığın üzerindeki monospace etiket */
  tagText?: string;
  /** Ana sayfa en üst büyük slogan başlığı */
  title?: string;
  /** Başlık altındaki açıklama paragrafı */
  subtitle?: string;
  /** Ana eylem butonu yazısı */
  primaryButtonText?: string;
  /** Ana buton yönlendirme bağlantısı */
  primaryButtonLink?: IkasNavigationLink | null;
  /** İkinci eylem butonu yazısı */
  secondaryButtonText?: string;
  /** İkinci buton yönlendirme bağlantısı */
  secondaryButtonLink?: IkasNavigationLink | null;
  /** Görsel üzerindeki sosyal kanıt kartı ana metni */
  socialProofTitle?: string;
  /** Sosyal kanıt kartı alt puan metni */
  socialProofSubtitle?: string;
  /** Hero alanında gösterilecek dikey görsel */
  image?: IkasImage | null;
  /** Bölüm zemin rengi */
  backgroundColor?: string;
}
