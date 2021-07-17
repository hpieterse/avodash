import { useEffect, useState } from "react";
import { MetaData } from "../models/metaData";

const useMetaData = (): [boolean, MetaData] => {
  const [metaDataCache, setMetaDataCache] = useState({
    maxDate: new Date(),
    minDate: new Date(),
  } as MetaData);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const worker = async () => {
      const response = await fetch("/metaData");
      const data = await response.json();
      setMetaDataCache(data);
      setIsReady(true);
    };
    worker();
  }, []);

  return [isReady, metaDataCache];
};

export default useMetaData;
