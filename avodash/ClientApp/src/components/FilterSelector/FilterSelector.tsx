import React, { useMemo, useContext, useRef } from "react";
import { Typeahead, Token } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import { MetaDataContext } from "../../containers/MetaDataContextProvider";
import { FilterValuesContext } from "../../containers/FilterValuesContextProvider";
import { FilterItem } from "../../models/FilterItem";
import { ReactComponent as BoxOpenLightSvg } from "../../svg/box-open-light.svg";
import { ReactComponent as MapMarkerAltLightSvg } from "../../svg/map-marker-alt-light.svg";
import { ReactComponent as SeedlingLightSvg } from "../../svg/seedling-light.svg";
import Styles from "./FilterSelector.module.scss";

const FilterSelector = ({ className }: { className?: string }) => {
  const [isReady, metaData] = useContext(MetaDataContext);
  const [filterValues, setFilterValues] = useContext(FilterValuesContext);

  const setSelectedFilters = (selection: Array<FilterItem>) => {
    const selectedRegions = selection
      .filter((c) => c.type === "Region" && c.exclude !== true)
      .map((c) => c.key as string);

    const excludedRegions = selection
      .filter((c) => c.type === "Region" && c.exclude === true)
      .map((c) => c.key as string);

    const selectedPackageTypes = selection
      .filter((c) => c.type === "PackageType")
      .map((c) => c.key as number);

    const selectedProductionTypes = selection
      .filter((c) => c.type === "ProductionType")
      .map((c) => c.key as number);

    setFilterValues({
      ...(filterValues ?? {
        startDate: null,
        endDate: null,
      }),
      regions: selectedRegions,
      excludedRegions,
      packageTypes: selectedPackageTypes,
      productionTypes: selectedProductionTypes,
    });
  };

  const selectedValues = !isReady
    ? []
    : [
      ...metaData.packageTypes
        .filter((r) => filterValues?.packageTypes?.includes(r.key))
        .map(
          (p) => ({
            ...p,
            type: "PackageType",
          } as FilterItem)
        ),
      ...metaData.productionTypes
        .filter((r) => filterValues?.productionTypes?.includes(r.key))
        .map(
          (p) => ({
            ...p,
            type: "ProductionType",
          } as FilterItem)
        ),
      ...metaData.regions
        .filter((r) => filterValues?.regions?.includes(r.key))
        .map(
          (p) => ({
            ...p,
            type: "Region",
          } as FilterItem)
        ),
      ...metaData.regions
        .filter((r) => filterValues?.excludedRegions?.includes(r.key))
        .map(
          (p) => ({
            ...p,
            type: "Region",
            exclude: true,
          } as FilterItem)
        ),
    ];

  const options = useMemo(() => {
    if (!isReady) {
      return [];
    }

    return [
      ...metaData.productionTypes.map(
        (p) => ({
          ...p,
          type: "ProductionType",
        } as FilterItem)
      ),
      ...metaData.packageTypes.map(
        (p) => ({
          ...p,
          type: "PackageType",
        } as FilterItem)
      ),
      ...metaData.regions.map(
        (p) => ({
          ...p,
          type: "Region",
        } as FilterItem)
      ),
    ];
  }, [isReady, metaData]);

  const getIcon = (option: FilterItem) => {
    switch (option.type) {
      case "PackageType":
        return <BoxOpenLightSvg className="icon-small" />;
      case "ProductionType":
        return <SeedlingLightSvg className="icon-small" />;
      case "Region":
        return <MapMarkerAltLightSvg className="icon-small" />;
      default:
        return option.type;
    }
  };

  const typeAhead = useRef<Typeahead<FilterItem>>(null);

  return (
    <Typeahead<FilterItem>
      className={className}
      ref={typeAhead}
      id="data-filter"
      multiple
      onChange={(selected: Array<FilterItem>) => {
        setSelectedFilters(selected);
      }}
      labelKey="value"
      options={options}
      isLoading={!isReady}
      selected={selectedValues}
      placeholder="Search for region, production method or package type e.g. Organic, Small Bag, Houston"
      renderMenuItemChildren={(option, props, index) => {
        /* Render custom contents here. */
        const getTypeText = (o: FilterItem) => {
          switch (o.type) {
            case "PackageType":
              return "Package Type";
            case "ProductionType":
              return "Production Method";
            default:
              return o.type;
          }
        };

        return (
          <div className="pt-2 px-2 d-flex align-items-center" key={index}>
            <div className="flex-fill">
              <div className="d-flex align-items-center">
                {getIcon(option)}
                <span className={Styles.FilterOptionLabel}>{option.value}</span>
              </div>
              <small className="text-muted">{getTypeText(option)}</small>
            </div>
            <div>
              {option.type === "Region" ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedFilters([
                      ...selectedValues,
                      {
                        ...option,
                        exclude: true,
                      },
                    ]);
                    if (typeAhead.current != null) {
                      typeAhead.current?.toggleMenu();
                    }
                  }}
                >
                  Exclude Region
                </Button>
              ) : null}
            </div>
          </div>
        );
      }}
      renderToken={(option, props, index) => (
        <Token
          key={index}
          option={option}
          onRemove={() => {
            setSelectedFilters(selectedValues.filter((_, i) => i !== index));
          }}
          className={`d-flex align-items-center ${
            option.exclude ? "bg-danger text-white" : ""
          }`}
        >
          {getIcon(option)}
          {" "}
          <span className={Styles.FilterOptionLabel}>
            {option.value}
          </span>
        </Token>
      )}
    />
  );
};

export default FilterSelector;
