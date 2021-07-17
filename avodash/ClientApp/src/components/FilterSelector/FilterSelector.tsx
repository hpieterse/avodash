import React, { useMemo } from "react";
import { useCallback } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import useMetaData from "../../hooks/useMetaData";
import useRouteState from "../../hooks/useRouteState";
import { FilterItem } from "./FilterItem";

type FilterSelectorItem = FilterItem<string | number>;
type RouterFilterItemType = "p" | "pr" | "r";
type RouteFilterItem = { i: string | number; t: RouterFilterItemType };

const FilterSelector = () => {
  const [isReady, metaData] = useMetaData();
  const [selectedFilters, setSelectedFilters] = useRouteState<
    Array<RouteFilterItem>
  >("f", [] as Array<RouteFilterItem>);

  const selectionToRouteValue = (
    selection: Array<FilterSelectorItem>
  ): Array<RouteFilterItem> => {
    return selection.map((item) => {
      let newType: RouterFilterItemType = "p";
      switch (item.type) {
        case "PackageType":
          newType = "p";
          break;
        case "ProductionType":
          newType = "pr";
          break;
        case "Region":
          newType = "r";
          break;
      }
      return {
        i: item.key,
        t: newType,
      };
    });
  };

  const selectedValues = useCallback((): Array<FilterSelectorItem> => {
    return !isReady
      ? []
      : (selectedFilters
          .map((routeItem) => {
            switch (routeItem.t) {
              case "p":
                return {
                  ...metaData.packageTypes.find((i) => i.key == routeItem.i),
                  type: "PackageType",
                } as FilterItem<number>;
              case "pr":
                return {
                  ...metaData.productionTypes.find((i) => i.key == routeItem.i),
                  type: "ProductionType",
                } as FilterItem<number>;
              case "r":
                return {
                  ...metaData.regions.find((i) => i.key == routeItem.i),
                  type: "Region",
                } as FilterItem<string>;
              default:
                return null;
            }
          })
          .filter((i) => i != null) as Array<FilterSelectorItem>);
  }, [selectedFilters, metaData, isReady]);

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
          } as FilterItem<number>)
      ),
      ...metaData.productionTypes.map(
        (p) =>
          ({
            ...p,
            type: "ProductionType",
          } as FilterItem<number>)
      ),
      ...metaData.regions.map(
        (p) =>
          ({
            ...p,
            type: "Region",
          } as FilterItem<string>)
      ),
    ];
  }, [isReady, metaData]);

  return (
      <Typeahead<FilterSelectorItem>
        id="data-filter"
        multiple
        onChange={(selected: Array<FilterSelectorItem>) => {
          setSelectedFilters(selectionToRouteValue(selected));
        }}
        labelKey="value"
        options={options}
        isLoading={!isReady}
        selected={selectedValues()}
        placeholder="Search for region, production type or package type e.g. Organic, Small Bag, Houston"
        defaultSelected={[]}
      />
  );
};

export default FilterSelector;
