import { useState } from "preact/hooks";
import {
  getThemeSetting,
  getProductListSortOptions,
  setSortType,
  getProductListFilterCategories,
  getSelectedFilterValues,
  handleFilterValueClick,
  clearProductListFilters,
  hasProductListAppliedFilters,
  isProductListFilterable,
} from "@ikas/bp-storefront";
import { Button } from "../Button";
import { Props } from "./types";

export interface FilterAndSortBarProps extends Props {
  className?: string;
}

export function FilterAndSortBar({
  productList,
  filterTitle = "Filtrele",
  sortTitle = "Sırala",
  className = "",
}: FilterAndSortBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Read theme global settings via getThemeSetting
  const sectionPxSetting = getThemeSetting("_Nd1XnRyZlx"); // Boşluk / Masaüstü Yatay Bölüm Padding (20px)
  const mobilePxSetting = getThemeSetting("_uRDipxnxkx"); // Boşluk / Mobil Yatay Padding (16px)
  const formRadiusSetting = getThemeSetting("_iI8H4rllzj"); // Radius / Input ve Form (0.5rem)
  const siteWidthSetting = getThemeSetting("_l6CcMRzdeZ"); // Boşluk / Site Maksimum Genişliği (1820px)

  const sectionPx = sectionPxSetting?.value || "20px";
  const mobilePx = mobilePxSetting?.value || "16px";
  const formRadius = formRadiusSetting?.value || "0.5rem";
  const maxSiteWidth = siteWidthSetting?.value || "1820px";

  const inlineStyles = {
    "--section-px": sectionPx,
    "--mobile-px": mobilePx,
    "--form-radius": formRadius,
    "--max-site-width": maxSiteWidth,
  };

  if (!productList) return null;

  const totalCount = (productList as any).totalCount ?? productList.data?.length ?? 0;
  const sortOptions = getProductListSortOptions(productList) || [];
  const filterCategories = isProductListFilterable(productList)
    ? getProductListFilterCategories(productList) || []
    : [];
  const hasApplied = hasProductListAppliedFilters(productList);

  const handleSortChange = (e: any) => {
    const val = e.target.value;
    if (val && productList) {
      setSortType(productList, val as any);
    }
  };

  const handleFilterClick = (category: any, filterValue: any) => {
    if (productList && category && filterValue) {
      handleFilterValueClick(productList, category, filterValue);
    }
  };

  const handleClearFilters = () => {
    if (productList) {
      clearProductListFilters(productList);
    }
  };

  return (
    <div
      className={`ikas-filter-bar ${className}`.trim()}
      style={inlineStyles as any}
      lang="tr"
    >
      <div className="ikas-filter-bar__container">
        {/* SOL KISIM: FİLTRELEME BUTONU VE ÜRÜN SAYISI */}
        <div className="ikas-filter-bar__left">
          {filterCategories.length > 0 && (
            <button
              type="button"
              className="ikas-filter-bar__btn _C0OZ8W7vYS"
              onClick={() => setIsDrawerOpen(true)}
              aria-expanded={isDrawerOpen}
            >
              <span>⚡</span>
              <span>{filterTitle}</span>
            </button>
          )}

          <span className="ikas-filter-bar__count _C0OZ8W7vYS">
            {totalCount} Ürün Gösteriliyor
          </span>

          {hasApplied && (
            <button
              type="button"
              className="ikas-filter-bar__clear _C0OZ8W7vYS"
              onClick={handleClearFilters}
            >
              Filtreleri Temizle
            </button>
          )}
        </div>

        {/* SAĞ KISIM: SIRALAMA SEÇİMİ */}
        <div className="ikas-filter-bar__right">
          {sortOptions.length > 0 && (
            <div className="ikas-filter-bar__select-wrapper">
              <label htmlFor="ikas-sort-select" className="_C0OZ8W7vYS">
                {sortTitle}:
              </label>
              <select
                id="ikas-sort-select"
                className="ikas-filter-bar__select _C0OZ8W7vYS"
                onChange={handleSortChange}
              >
                {sortOptions.map((opt: any) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    selected={opt.isSelected}
                  >
                    {opt.label || opt.value}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* MOBİL VE MASAÜSTÜ FİLTRE PANELİ (SLIDE-OUT DRAWER) */}
      <div
        className={`ikas-filter-backdrop ${
          isDrawerOpen ? "ikas-filter-backdrop--open" : ""
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <aside
        className={`ikas-filter-drawer ${
          isDrawerOpen ? "ikas-filter-drawer--open" : ""
        }`}
        aria-hidden={!isDrawerOpen}
      >
        <div className="ikas-filter-drawer__header">
          <h3 className="ikas-filter-drawer__title _AZR1yL8GrK">
            {filterTitle}
          </h3>
          <button
            type="button"
            className="ikas-filter-drawer__close"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Filtre panelini kapat"
          >
            ✕
          </button>
        </div>

        <div className="ikas-filter-drawer__content">
          {filterCategories.map((category: any, catIdx: number) => {
            const values = category.values || category.displayedValues || [];
            return (
              <div key={category.id || catIdx} className="ikas-filter-drawer__group">
                <h4 className="ikas-filter-drawer__group-title _VcfI5D07Nt">
                  {category.name || category.title}
                </h4>
                <div className="ikas-filter-drawer__options">
                  {values.map((vVal: any, valIdx: number) => {
                    const isSelected = vVal.isSelected;
                    return (
                      <button
                        key={vVal.id || valIdx}
                        type="button"
                        className={`ikas-filter-drawer__option-btn _C0OZ8W7vYS ${
                          isSelected ? "ikas-filter-drawer__option-btn--selected" : ""
                        }`}
                        onClick={() => handleFilterClick(category, vVal)}
                      >
                        <span>{vVal.name || vVal.label}</span>
                        {typeof vVal.count === "number" && (
                          <span className="_eZyocyyd0F">({vVal.count})</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="ikas-filter-drawer__footer">
          {hasApplied && (
            <Button
              text="Filtreleri Temizle"
              variant="SECONDARY"
              size="FULL_WIDTH"
              onClick={handleClearFilters}
            />
          )}
          <Button
            text="Sonuçları Göster"
            variant="PRIMARY"
            size="FULL_WIDTH"
            onClick={() => setIsDrawerOpen(false)}
          />
        </div>
      </aside>
    </div>
  );
}

export default FilterAndSortBar;
