import { getFormattedShadow } from "@ikas/bp-storefront";

/**
 * ikas getThemeSetting ile dönen SHADOW globalVariable JSON objesini
 * geçerli CSS box-shadow string ifadesine çevirir.
 */
export function formatShadow(
  settingValue: any,
  fallback: string = "0 4px 20px rgba(55, 67, 91, 0.08)"
): string {
  if (!settingValue) return fallback;
  if (typeof settingValue === "string") return settingValue;
  if (typeof settingValue === "object") {
    try {
      const formatted = getFormattedShadow(settingValue);
      if (formatted) return formatted;
    } catch {
      // Fallback manual formatting
      const inset = settingValue.position === "inside" ? "inset " : "";
      const x = settingValue.x ?? 0;
      const y = settingValue.y ?? 4;
      const blur = settingValue.blur ?? 20;
      const spread = settingValue.spread ?? 0;
      const color = settingValue.color ?? "rgba(55, 67, 91, 0.08)";
      return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
    }
  }
  return fallback;
}
