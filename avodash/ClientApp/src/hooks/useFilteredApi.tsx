import { useState, useContext, useEffect } from "react";

import { FilterValuesContext } from "../containers/FilterValuesContextProvider";

type TType = {} | null;
const useFilteredApi = <T extends TType>(route: string): [boolean, T] => {
  const [filterValues] = useContext(FilterValuesContext);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [data, setData] = useState<T>(null as T);

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

  return [isReady, data];
};

export default useFilteredApi;
