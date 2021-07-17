import React, { useMemo } from "react";
import useMetaData from "../../hooks/useMetaData";
import FilterSelector from "../FilterSelector/FilterSelector";

const DataFilter = () => {
  const [isReady, metaData] = useMetaData();
  
  return (
    <div>
      <h1>Data Filter {isReady ? "Ready" : "Loading"}</h1>
      
      <FilterSelector />
    </div>
  );
};

export default DataFilter;
