import React, { createContext, useState, useEffect } from "react";
import { MetaData } from "../models/MetaData";

type MetaDataContextData = { isReady: boolean, metaData: MetaData };
export const MetaDataContext = createContext<MetaDataContextData>({
  isReady: false,
  metaData: {} as MetaData,
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [metaData, setMetaData] = useState<MetaDataContextData>({
    isReady: false,
    metaData: {} as MetaData,
  });

  useEffect(() => {
    const worker = async () => {
      const response = await fetch("/metaData");
      const data = await response.json();
      setMetaData({ isReady: true, metaData: data as MetaData });
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
