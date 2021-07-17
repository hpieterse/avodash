import React, { useMemo, useContext } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { MetaDataContext } from "../../containers/MetaDataContextProvider";
import { FilterValuesContext } from "../../containers/FilterValuesContextProvider";
import { FilterItem } from "../../models/FilterItem";

const FilterSelector = ({ className }: { className?: string }) => {
  const [isReady, metaData] = useContext(MetaDataContext);
  const [filterValues, setFilterValues] = useContext(FilterValuesContext);

  const setSelectedFilters = (selection: Array<FilterItem>) => {
    const selectedRegions = selection
      .filter((c) => c.type === "Region")
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
              (p) =>
                ({
                  ...p,
                  type: "PackageType",
                } as FilterItem)
            ),
          ...metaData.productionTypes
            .filter((r) => filterValues?.productionTypes?.includes(r.key))
            .map(
              (p) =>
                ({
                  ...p,
                  type: "ProductionType",
                } as FilterItem)
            ),
          ...metaData.regions
            .filter((r) => filterValues?.regions?.includes(r.key))
            .map(
              (p) =>
                ({
                  ...p,
                  type: "Region",
                } as FilterItem)
            ),
        ];

  console.log(selectedValues);

  const options = useMemo(() => {
    if (!isReady) {
      return [];
    }

    return [
      ...metaData.packageTypes.map(
        (p) =>
          ({
            ...p,
            type: "PackageType",
          } as FilterItem)
      ),
      ...metaData.productionTypes.map(
        (p) =>
          ({
            ...p,
            type: "ProductionType",
          } as FilterItem)
      ),
      ...metaData.regions.map(
        (p) =>
          ({
            ...p,
            type: "Region",
          } as FilterItem)
      ),
    ];
  }, [isReady, metaData]);

  return (
    <Typeahead<FilterItem>
      className={className}
      id="data-filter"
      multiple
      onChange={(selected: Array<FilterItem>) => {
        setSelectedFilters(selected);
      }}
      labelKey="value"
      options={options}
      isLoading={!isReady}
      selected={selectedValues}
      placeholder="Search for region, production type or package type e.g. Organic, Small Bag, Houston"
    />
  );
};

export default FilterSelector;
