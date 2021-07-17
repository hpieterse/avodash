import React, { createContext, useState } from "react";
import { useEffect } from "react";
import useRouteState from "../hooks/useRouteState";
import { FilterQuery } from "../models/FilterQuery";
import { RouteValueKeys } from "../models/routeValueKeys";

export const FilterValuesContext = createContext<
  [FilterQuery | null, (data: FilterQuery) => void]
>([null, () => {}]);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<FilterQuery | null>(null);

  const [regions, setRegions] = useRouteState<Array<string>>(
    RouteValueKeys.regions,
    [] as Array<string>
  );
  const [excludedRegions, setExcludedRegions] = useRouteState<Array<string>>(
    RouteValueKeys.excludedRegions,
    [] as Array<string>
  );
  const [packageTypes, setPackageTypes] = useRouteState<Array<number>>(
    RouteValueKeys.packageTypes,
    [] as Array<number>
  );
  const [productionTypes, setProductionTypes] = useRouteState<Array<number>>(
    RouteValueKeys.productionTypes,
    [] as Array<number>
  );
  const [startDate, setStartDate] = useRouteState<number | null>(
    RouteValueKeys.minDate,
    null
  );
  const [endDate, setEndDate] = useRouteState<number | null>(
    RouteValueKeys.maxDate,
    null
  );

  // set initial data value from route
  useEffect(() => {
    if (data != null) {
      return;
    }
    setData({
      startDate: startDate == null ? null : new Date(startDate),
      endDate: endDate == null ? null : new Date(endDate),
      regions: regions,
      excludedRegions: excludedRegions,
      packageTypes: packageTypes,
      productionTypes: productionTypes,
    });
  }, [regions, excludedRegions, packageTypes, productionTypes, startDate, endDate, data]);

  const setDataExternal = (data: FilterQuery) => {
    setData(data);
    setStartDate(data.startDate?.getTime() ?? null);
    setEndDate(data.endDate?.getTime() ?? null);
    setRegions(data.regions);
    setExcludedRegions(data.excludedRegions);
    setPackageTypes(data.packageTypes);
    setProductionTypes(data.productionTypes);
  };

  return (
    <FilterValuesContext.Provider value={[data, setDataExternal]}>
      {children}
    </FilterValuesContext.Provider>
  );
};

export default Provider;
