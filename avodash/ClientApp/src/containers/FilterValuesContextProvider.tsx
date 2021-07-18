/* eslint-disable func-call-spacing */
import React, { createContext, useState, useEffect } from "react";

import useRouteState from "../hooks/useRouteState";
import { FilterQuery } from "../models/FilterQuery";
import RouteValueKeys from "../models/routeValueKeys";

// eslint-disable-next-line no-spaced-func
export const FilterValuesContext = createContext<[
  // eslint-disable-next-line no-unused-vars
  FilterQuery | null, (data: FilterQuery) => void]>([null, () => {}]);

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
      regions,
      excludedRegions,
      packageTypes,
      productionTypes,
    });
  }, [regions, excludedRegions, packageTypes, productionTypes, startDate, endDate, data]);

  const setDataExternal = (newData: FilterQuery) => {
    setData(newData);
    setStartDate(newData.startDate?.getTime() ?? null);
    setEndDate(newData.endDate?.getTime() ?? null);
    setRegions(newData.regions);
    setExcludedRegions(newData.excludedRegions);
    setPackageTypes(newData.packageTypes);
    setProductionTypes(newData.productionTypes);
  };

  return (
    <FilterValuesContext.Provider value={[data, setDataExternal]}>
      {children}
    </FilterValuesContext.Provider>
  );
};

export default Provider;
