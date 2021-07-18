import { useContext, useMemo } from "react";
import { FilterValuesContext } from "../containers/FilterValuesContextProvider";

const useChartAxisSize = () => {
  const [filterValues] = useContext(FilterValuesContext);

  return useMemo(() => {
    const timeDeltaDays = (
      (filterValues?.endDate?.getTime() ?? 0) - (filterValues?.startDate?.getTime() ?? 0)
    ) / (60 * 60 * 24 * 1000);

    let tickValuesInternal = "every 1 year";
    let formatInternal = "%Y";

    if (timeDeltaDays < 14) {
      tickValuesInternal = "every 1 day";
      formatInternal = "%Y-%m-%d";
    } else if (timeDeltaDays < 31 * 2) {
      tickValuesInternal = "every 2 week";
      formatInternal = "%Y-%m-%d";
    } else if (timeDeltaDays < 365 / 2) {
      tickValuesInternal = "every 1 month";
      formatInternal = "%Y-%m";
    } else if (timeDeltaDays < 365) {
      tickValuesInternal = "every 3 month";
      formatInternal = "%Y-%m";
    } else if (timeDeltaDays < 600) {
      tickValuesInternal = "every 6 month";
      formatInternal = "%Y-%m";
    }

    return [
      tickValuesInternal,
      formatInternal,
    ];
  }, [filterValues?.endDate, filterValues?.startDate]);
};

export default useChartAxisSize;
