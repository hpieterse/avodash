import React, {
  useContext, useRef, useMemo, useEffect, useCallback,
} from "react";
import { ResponsiveBar } from "@nivo/bar";
import useFilteredApi from "../../../hooks/useFilteredApi";
import { FilterValuesContext } from "../../../containers/FilterValuesContextProvider";
import { MetaDataContext } from "../../../containers/MetaDataContextProvider";
import { VolumeBarChartDataPoint } from "../../../models/VolumeBarChartDataPoint";
import { ChartMetaData } from "../../../models/ChartMetaData";

const VolumeVsPriceChart = () => {
  const data = useFilteredApi<ChartMetaData<Array<VolumeBarChartDataPoint>>>(
    "dashboard/volume-v-price",
    {
      valueDivisor: 0,
      data: [],
    }
  );
  const [filterValues, setFilterValues] = useContext(FilterValuesContext);
  const [isMetaDataReady, metaData] = useContext(MetaDataContext);

  const filterValuesRef = useRef(filterValues);
  useEffect(() => {
    filterValuesRef.current = filterValues;
  }, [filterValues]);

  const metaDataRef = useRef({ metaData, isMetaDataReady });
  useEffect(() => {
    metaDataRef.current = { metaData, isMetaDataReady };
  }, [metaData, isMetaDataReady]);

  const addPackagingType = useCallback((packageTypeShortName: string) => {
    if (filterValuesRef.current == null || !metaDataRef.current.isMetaDataReady) {
      return;
    }

    const packageType = metaDataRef.current.metaData.packageTypeShortNames
      .find((p) => p.value === packageTypeShortName)?.key;
    if (packageType == null) {
      return;
    }

    setFilterValues({
      ...filterValuesRef.current,
      packageTypes: [
        ...(filterValuesRef.current?.packageTypes ?? []),
        packageType,
      ],
    });
  }, [setFilterValues]);

  const chart = useMemo(() => {
    let valueSuffix = "";

    if (data.valueDivisor === 1000000000) {
      valueSuffix = "billion";
    } else if (data.valueDivisor === 1000000) {
      valueSuffix = "million";
    }

    let keys = metaDataRef.current.metaData?.packageTypeShortNames?.map((p) => p.value) ?? [];
    if ((filterValuesRef?.current?.packageTypes?.length ?? 0) > 0) {
      keys = filterValuesRef?.current?.packageTypes.map((packageTypeId) => metaDataRef
        .current
        .metaData
        .packageTypeShortNames.find((m) => m.key === packageTypeId)?.value ?? "") ?? keys;
    }
    return (
      <ResponsiveBar
        data={data.data as any}
        keys={keys}
        indexBy="priceRange"
        margin={{
          top: 30, right: 130, bottom: 50, left: 70,
        }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        axisBottom={{
          legend: "Price",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          legend: `Volume (${valueSuffix} avocados)`,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipHeight={12}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            onClick: (item) => {
              addPackagingType(item.id as string);
            },
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  }, [data, addPackagingType]);

  return chart;
};

export default VolumeVsPriceChart;
