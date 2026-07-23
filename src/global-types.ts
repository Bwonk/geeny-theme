// Auto-generated global type definitions for ikas code components.
// This file is regenerated automatically — do not edit manually.
import { getThemeSettingValue as _getThemeSettingValueRaw } from "@ikas/bp-storefront";

/** Stable keys of theme global variables defined in the editor's "Styles" panel. */
export type ThemeSettingName =
  /** Radius / Sepet İtem Görseli (TEXT) */
  | "_0WnqPU26e8"
  /** Boşluk / Buton Yüksekliği (TEXT) */
  | "_2xLGYXCG2n"
  /** Boşluk / Grid Gap (TEXT) */
  | "_4Ud47RIVna"
  /** Boşluk / Dikey Bölüm Spacing (TEXT) */
  | "_5Fdl1j6UHQ"
  /** Radius / Kargo İlerleme Çubuğu (TEXT) */
  | "_6yX0RuKGDr"
  /** Animasyon / Fade Yumuşak (TEXT) */
  | "_AwVN6G9Zib"
  /** Animasyon / Buton ve Hover (TEXT) */
  | "_bNtMCrOBsE"
  /** Boşluk / Mobile Drawer Genişliği (TEXT) */
  | "_Bw7ChF0VC8"
  /** Boşluk / Mobil Grid Gap (TEXT) */
  | "_dBvnJWALXD"
  /** Radius / Input ve Form (TEXT) */
  | "_iI8H4rllzj"
  /** Gölge / Sticky Header Shadow (SHADOW) */
  | "_iSJXfL0J5I"
  /** Gölge / Buton Drop Shadow (SHADOW) */
  | "_jRVG7AJWkc"
  /** Boşluk / Masaüstü Dikey Spacing (TEXT) */
  | "_Kl0my3VVMA"
  /** Boşluk / Site Maksimum Genişliği (TEXT) */
  | "_l6CcMRzdeZ"
  /** Gölge / Swatch Odak Gölgesi (SHADOW) */
  | "_lTnQi8nt1z"
  /** Boşluk / Tablet Grid Gap (TEXT) */
  | "_mfIn0YsoTT"
  /** Boşluk / Yatay Bölüm Padding (TEXT) */
  | "_Nd1XnRyZlx"
  /** Animasyon / Menü Alt Çizgi (TEXT) */
  | "_NXa706BcQP"
  /** Boşluk / Header Yüksekliği (TEXT) */
  | "_OQlsoCe9ah"
  /** Animasyon / Akordiyon Açılış (TEXT) */
  | "_QzHzEnrknJ"
  /** Boşluk / Sticky Cart Bar Yüksekliği (TEXT) */
  | "_rEYcHCKRvC"
  /** Animasyon / Drawer ve Modal (TEXT) */
  | "_rTI75Www8J"
  /** Boşluk / Checkout Buton Yüksekliği (TEXT) */
  | "_RtoVmtuDGF"
  /** Boşluk / Mobil Yatay Padding (TEXT) */
  | "_uRDipxnxkx"
  /** Radius / Kart (TEXT) */
  | "_WyFUVwOpPk"
  /** Radius / Swatch Dairesel (TEXT) */
  | "_XYyz9eaKGx"
  /** Boşluk / Cart Drawer Genişliği (TEXT) */
  | "_YDHxutBHyk"
  /** Radius / Medya (TEXT) */
  | "_YFQAxlLvZl"
  /** Boşluk / Announcement Bar Yüksekliği (TEXT) */
  | "_YvGykMxQWI"
  /** Gölge / Kart Soft Shadow (SHADOW) */
  | "_yyUleMlhR4"
  /** Animasyon / Görsel Scale Hover (TEXT) */
  | "_Z1JfmMfgtb"
  /** Animasyon / Sticky Bar Belirme (TEXT) */
  | "_z2WqA2GtRY"
  /** Radius / Buton (TEXT) */
  | "_ZaLXoaaaAA";

/** Narrowed value type per global key (primitives only; complex kinds are `any`). */
type ThemeSettingValueMap = {
  "_0WnqPU26e8": string;
  "_2xLGYXCG2n": string;
  "_4Ud47RIVna": string;
  "_5Fdl1j6UHQ": string;
  "_6yX0RuKGDr": string;
  "_AwVN6G9Zib": string;
  "_bNtMCrOBsE": string;
  "_Bw7ChF0VC8": string;
  "_dBvnJWALXD": string;
  "_iI8H4rllzj": string;
  "_iSJXfL0J5I": any;
  "_jRVG7AJWkc": any;
  "_Kl0my3VVMA": string;
  "_l6CcMRzdeZ": string;
  "_lTnQi8nt1z": any;
  "_mfIn0YsoTT": string;
  "_Nd1XnRyZlx": string;
  "_NXa706BcQP": string;
  "_OQlsoCe9ah": string;
  "_QzHzEnrknJ": string;
  "_rEYcHCKRvC": string;
  "_rTI75Www8J": string;
  "_RtoVmtuDGF": string;
  "_uRDipxnxkx": string;
  "_WyFUVwOpPk": string;
  "_XYyz9eaKGx": string;
  "_YDHxutBHyk": string;
  "_YFQAxlLvZl": string;
  "_YvGykMxQWI": string;
  "_yyUleMlhR4": any;
  "_Z1JfmMfgtb": string;
  "_z2WqA2GtRY": string;
  "_ZaLXoaaaAA": string;
};

/**
 * Type-safe theme global accessor — only accepts keys declared in the editor's Styles panel.
 * Import this from `./global-types`, not `getThemeSettingValue` from `@ikas/bp-storefront`
 * (that one is untyped: it accepts any string and returns `any`).
 */
export function themeValue<K extends ThemeSettingName>(name: K): ThemeSettingValueMap[K] {
  return _getThemeSettingValueRaw(name) as ThemeSettingValueMap[K];
}
