import { useState } from "preact/hooks";
import { getThemeSetting } from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";

export interface Props {
  label?: string;
  placeholder?: string;
  className?: string;
  onNoteChange?: (note: string) => void;
}

export function CartOrderNote({
  label = "Sipariş Notu Ekleyin",
  placeholder = "Hediyelik paket talebi veya kargo teslimat notlarınızı buraya yazabilirsiniz...",
  className = "",
  onNoteChange,
}: Props) {
  const [note, setNote] = useState<string>("");

  // Read live theme global setting via getThemeSetting
  const formRadiusSetting = getThemeSetting("_iI8H4rllzj"); // Radius / Input ve Form (8px)
  const formRadius = formRadiusSetting?.value || "8px";

  const handleChange = (e: any) => {
    const val = e.target.value;
    setNote(val);
    if (onNoteChange) onNoteChange(val);
  };

  return (
    <div
      className={`ikas-cart-note ${className}`.trim()}
      style={{ "--form-radius": formRadius } as any}
      lang="tr"
    >
      <label htmlFor="ikas-cart-note-input" className="ikas-cart-note__label _VcfI5D07Nt">
        {label}
      </label>
      <textarea
        id="ikas-cart-note-input"
        className="ikas-cart-note__textarea _C0OZ8W7vYS"
        placeholder={placeholder}
        value={note}
        onInput={handleChange}
        rows={3}
      />
    </div>
  );
}

export default observer(CartOrderNote);
