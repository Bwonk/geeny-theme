// This file is auto-generated — do not edit manually.
import type { VelocityBeltDirection, VelocityBeltScrollBoost, VelocityBeltSpeed } from "../../global-types";

export interface Props {
  /** Band üzerinde akan metin */
  text?: string;
  /** Bandı eğ. 0 = düz. Örnek: -2 veya 3 (eksi sola, artı sağa yatık). */
  angle?: number;
  /** Sola veya sağa. */
  direction?: VelocityBeltDirection;
  /** Kayan yazının rengi */
  color?: string;
  /** Bandın zemin rengi */
  backgroundColor?: string;
  /** Piksel cinsinden yazı büyüklüğü. Örnek: 12 */
  fontSize?: number;
  /** Bandın normal kayma hızı. Yavaş önerilir. */
  speed?: VelocityBeltSpeed;
  /** Sayfa kaydırılınca bant biraz hızlanır mı? Kapalı = sabit hız. */
  scrollBoost?: VelocityBeltScrollBoost;
}
