import React, { createContext, useState, useEffect } from "react";
import { MetaData } from "../models/metaData";

type MetaDataContextData = [ boolean, MetaData ];
export const MetaDataContext = createContext<MetaDataContextData>([
  false, 
  {} as MetaData,
]);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [metaData, setMetaData] = useState<MetaDataContextData>([
    false, 
    {} as MetaData,
  ]);

  useEffect(() => {
    const worker = async () => {
      const response = await fetch("/metaData");
      const data = await response.json();
      setMetaData([true, data as MetaData]);
    };

    worker();
  }, []);

  return (
    <MetaDataContext.Provider value={metaData}>
      {children}
    </MetaDataContext.Provider>
  );
};

export default Provider;
