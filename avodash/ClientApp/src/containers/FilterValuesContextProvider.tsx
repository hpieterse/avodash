/* eslint-disable func-call-spacing */
import React, {
  createContext, useState, useEffect, useContext, useCallback, useRef,
} from "react";

import useRouteState from "../hooks/useRouteState";
import { FilterQuery } from "../models/FilterQuery";
import RouteValueKeys from "../models/RouteValueKeys";
import { MetaDataContext } from "./MetaDataContextProvider";

// eslint-disable-next-line no-spaced-func
export const FilterValuesContext = createContext<{
  filterValues: FilterQuery | null,
  // eslint-disable-next-line no-unused-vars
  setFilterValues: (data: FilterQuery) => void,
  // eslint-disable-next-line no-unused-vars
  addProductionType : (name: string) => void,
  // eslint-disable-next-line no-unused-vars
  addPackageType : (shortName: string) => void
    }>({
      filterValues: null,
      setFilterValues: () => {},
      addProductionType: () => {},
      addPackageType: () => {},
    });

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { isReady, metaData } = useContext(MetaDataContext);

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
    if (data != null || !isReady) {
      return;
    }
    setData({
      startDate: startDate == null ? new Date(Date.parse(metaData.minDate)) : new Date(startDate),
      endDate: endDate == null ? new Date(Date.parse(metaData.maxDate)) : new Date(endDate),
      regions,
      excludedRegions,
      packageTypes,
      productionTypes,
    });
  }, [
    regions, excludedRegions, packageTypes, productionTypes,
    startDate, endDate, data, isReady, metaData,
  ]);

  const setDataExternal = useCallback((newData: FilterQuery) => {
    setData(newData);
    setStartDate(newData.startDate?.getTime() ?? null);
    setEndDate(newData.endDate?.getTime() ?? null);
    setRegions(newData.regions);
    setExcludedRegions(newData.excludedRegions);
    setPackageTypes(newData.packageTypes);
    setProductionTypes(newData.productionTypes);
  }, [
    setData, setStartDate, setEndDate, setRegions,
    setExcludedRegions, setPackageTypes, setProductionTypes,
  ]);

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const addProductionType = useCallback((productionTypeName: string) => {
    if (dataRef.current == null || !isReady) {
      return;
    }

    const productionType = metaData.productionTypes
      .find((p) => p.value === productionTypeName)?.key;
    if (productionType == null) {
      return;
    }

    setDataExternal({
      ...dataRef.current,
      productionTypes: [
        ...(dataRef.current?.productionTypes ?? []),
        productionType,
      ],
    });
  }, [setDataExternal, isReady, metaData.productionTypes]);

  const addPackageType = useCallback((packageTypeShortName: string) => {
    if (dataRef.current == null || !isReady) {
      return;
    }

    const packageType = metaData.packageTypeShortNames
      .find((p) => p.value === packageTypeShortName)?.key;
    if (packageType == null) {
      return;
    }

    setDataExternal({
      ...dataRef.current,
      packageTypes: [
        ...(dataRef.current?.packageTypes ?? []),
        packageType,
      ],
    });
  }, [setDataExternal, isReady, metaData.packageTypeShortNames]);

  return (
    <FilterValuesContext.Provider value={{
      filterValues: data,
      setFilterValues: setDataExternal,
      addProductionType,
      addPackageType,
    }}
    >
      {children}
    </FilterValuesContext.Provider>
  );
};

export default Provider;
