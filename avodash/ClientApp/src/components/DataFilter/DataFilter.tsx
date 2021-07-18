import React, { useMemo, useContext } from "react";
import Button from "react-bootstrap/Button";
import FilterSelector from "./FilterSelector/FilterSelector";
import { MetaDataContext } from "../../containers/MetaDataContextProvider";
import Styles from "./DateFilter.module.scss";
import { FilterValuesContext } from "../../containers/FilterValuesContextProvider";
import DateInput from "./DateInput/DateInput";
import { ReactComponent as FilterSvg } from "../../svg/filter-light.svg";

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
      <div className={`${Styles.FilterSelector} d-flex`}>
        <FilterSelector className="flex-fill" />
        <Button
          className="flex-shrink-0"
          id="clear-filter"
          variant="outline-danger"
          size="sm"
          onClick={() => {
            if (filterValues == null) return;
            setFilterValues({
              startDate: new Date(Date.parse(metaData.minDate)),
              endDate: new Date(Date.parse(metaData.maxDate)),
              regions: [],
              excludedRegions: [],
              packageTypes: [],
              productionTypes: [],
            });
          }}
        >
          <FilterSvg className="icon-small me-2" />
          Reset
        </Button>

      </div>
    </div>
  );
};

export default DataFilter;
