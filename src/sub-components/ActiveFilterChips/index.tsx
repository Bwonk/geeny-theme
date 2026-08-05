import {
  getFilterDisplayedValues,
  handleFilterValueClick,
  handleNumberRangeOptionClick,
  clearProductListFilters,
  IkasProductList,
  IkasProductFilter,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";

export interface ChipItem {
  id: string;
  kind: string;
  label: string;
  filter: IkasProductFilter;
  onRemove: () => void;
}

export interface Props {
  productList: IkasProductList;
  clearText?: string;
  onChange?: () => void;
  className?: string;
}

function collectChips(
  productList: IkasProductList,
  onChange?: () => void
): ChipItem[] {
  const filters = productList.filters ?? [];
  const chips: ChipItem[] = [];

  filters.forEach((filter) => {
    const values = getFilterDisplayedValues(filter) || [];
    values.forEach((fv) => {
      if (fv.isSelected !== true) return;
      chips.push({
        id: `${filter.id}-${fv.id || fv.key}`,
        kind: filter.name,
        label: fv.name,
        filter,
        onRemove: () => {
          handleFilterValueClick(productList, filter, fv);
          onChange?.();
        },
      });
    });

    (filter.numberRangeListOptions || []).forEach((opt) => {
      if (!opt.isSelected) return;
      const label =
        opt.to == null ? `${opt.from}+` : `${opt.from} – ${opt.to}`;
      chips.push({
        id: `${filter.id}-range-${opt.from}-${opt.to}`,
        kind: filter.name,
        label,
        filter,
        onRemove: () => {
          handleNumberRangeOptionClick(productList, filter, opt);
          onChange?.();
        },
      });
    });
  });

  return chips;
}

function ActiveFilterChips({
  productList,
  clearText = "TEMİZLE",
  onChange,
  className = "",
}: Props) {
  const chips = collectChips(productList, onChange);
  if (!chips.length) return null;

  return (
    <div className={`ikas-filter-chips ${className}`.trim()}>
      {chips.map((c) => (
        <button
          key={c.id}
          type="button"
          className="ikas-filter-chips__chip"
          onClick={c.onRemove}
        >
          <span className="ikas-filter-chips__kind _eZyocyyd0F">{c.kind}</span>
          <span className="ikas-filter-chips__label">{c.label}</span>
          <span className="ikas-filter-chips__x" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </span>
        </button>
      ))}
      <button
        type="button"
        className="ikas-filter-chips__clear _eZyocyyd0F"
        onClick={() => {
          clearProductListFilters(productList);
          onChange?.();
        }}
      >
        {clearText}
      </button>
    </div>
  );
}

export default observer(ActiveFilterChips);
