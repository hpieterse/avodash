import {
  useState, useContext, useEffect, useRef, useMemo,
} from "react";

import { FilterValuesContext } from "../containers/FilterValuesContextProvider";

type TType = {};
const useFilteredApi = <T extends TType>(route: string, defaultValue: T): T => {
  const [filterValues] = useContext(FilterValuesContext);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    const worker = async () => {
      if (filterValues == null) {
        return;
      }
      // build query parameter
      const searchParams = new URLSearchParams();
      if (filterValues.startDate != null) {
        searchParams.set(
          "startDate",
          filterValues.startDate?.toISOString() ?? ""
        );
      }
      if (filterValues.endDate != null) {
        searchParams.set("endDate", filterValues.endDate?.toISOString() ?? "");
      }

      filterValues.regions.forEach((region) => {
        searchParams.append("regions", region);
      });
      filterValues.excludedRegions.forEach((region) => {
        searchParams.append("excludedRegions", region);
      });

      filterValues.packageTypes.forEach((packageType) => {
        searchParams.append("packageTypes", packageType.toString());
      });
      filterValues.productionTypes.forEach((productionType) => {
        searchParams.append("productionTypes", productionType.toString());
      });

      const response = await fetch(`${route}?${searchParams.toString()}`);
      const apiData = await response.json();
      setData(apiData);
      setIsReady(true);
    };

    setIsReady(false);
    worker();
  }, [route, filterValues]);

  const chartDataCache = useRef(data);
  const chartData = useMemo(() => {
    if (!isReady) {
      return chartDataCache.current;
    }

    chartDataCache.current = data;
    return chartDataCache.current;
  }, [isReady, data]);

  return chartData;
};

export default useFilteredApi;
