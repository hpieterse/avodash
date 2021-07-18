import React, { useMemo, useContext } from "react";
import FilterSelector from "../FilterSelector/FilterSelector";
import { MetaDataContext } from "../../containers/MetaDataContextProvider";
import Styles from "./DateFilter.module.scss";
import { FilterValuesContext } from "../../containers/FilterValuesContextProvider";
import DateInput from "../DateInput/DateInput";

const DataFilter = () => {
  const [isReady, metaData] = useContext(MetaDataContext);
  const [filterValues, setFilterValues] = useContext(FilterValuesContext);

  const maxDate = useMemo(() => {
    if (!isReady) {
      return new Date();
    }
    return new Date(Date.parse(metaData.maxDate));
  }, [isReady, metaData]);

  const minDate = useMemo(() => {
    if (!isReady) {
      return new Date();
    }
    return new Date(Date.parse(metaData.minDate));
  }, [isReady, metaData]);

  return (
    <div className="d-flex flex-wrap">
      <div className={Styles.DateInput}>
        <DateInput
          min={minDate}
          max={filterValues?.endDate ?? maxDate}
          value={filterValues?.startDate ?? minDate}
          onChange={(date) => {
            if (filterValues == null) {
              return;
            }

            setFilterValues({
              ...filterValues,
              startDate: date as Date | null,
            });
          }}
        />
      </div>
      <div className={Styles.DateInput}>
        <DateInput
          min={filterValues?.startDate ?? minDate}
          max={maxDate}
          value={filterValues?.endDate ?? maxDate}
          onChange={(date) => {
            if (filterValues == null) {
              return;
            }

            setFilterValues({
              ...filterValues,
              endDate: date as Date | null,
            });
          }}
        />
      </div>
      <div className={Styles.FilterSelector}>
        <FilterSelector />
      </div>
    </div>
  );
};

export default DataFilter;
