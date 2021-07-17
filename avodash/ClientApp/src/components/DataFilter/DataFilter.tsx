import React, { useEffect, useMemo, useContext } from "react";
import DatePicker from "react-datepicker";
import useRouteState from "../../hooks/useRouteState";
import FilterSelector from "../FilterSelector/FilterSelector";
import { MetaDataContext } from "../../containers/MetaDataContextProvider";
import Styles from "./DateFilter.module.scss";

const DataFilter = () => {
  const { isReady, metaData } = useContext(MetaDataContext);
  const [routeStartDate, setRouteStartDate] = useRouteState<number>("mi", 0);
  const [routeEndDate, setRouteEndDate] = useRouteState<number>("ma", 0);

  var maxDate = useMemo(() => {
    if (!isReady) {
      return new Date();
    }
    return new Date(Date.parse(metaData.maxDate));
  }, [isReady, metaData]);

  var minDate = useMemo(() => {
    if (!isReady) {
      return new Date();
    }
    return new Date(Date.parse(metaData.minDate));
  }, [isReady, metaData]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (routeStartDate === 0) {
      setRouteStartDate(minDate.getTime());
    }
    if (routeEndDate === 0) {
      setRouteEndDate(maxDate.getTime());
    }
  }, [
    isReady,
    minDate,
    maxDate,
    setRouteStartDate,
    setRouteEndDate,
    routeStartDate,
    routeEndDate,
  ]);

  var startDate = routeStartDate > 0 ? new Date(routeStartDate) : null;
  var endDate = routeEndDate > 0 ? new Date(routeEndDate) : null;

  return (
    <div className="d-flex flex-wrap">
      <div className={Styles.DateInput}>
      <DatePicker
        className={`form-control`}
        selected={startDate}
        onChange={(date) =>
          setRouteStartDate((date as Date | null)?.getTime() ?? 0)
        }
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
      />
      </div>
      <div className={Styles.DateInput}>
      <DatePicker
        className={`form-control`}
        selected={endDate}
        onChange={(date) =>
          setRouteEndDate((date as Date | null)?.getTime() ?? 0)
        }
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={maxDate}
      />
      </div>
      <div className={Styles.FilterSelector}>
        <FilterSelector />
      </div>
    </div>
  );
};

export default DataFilter;
