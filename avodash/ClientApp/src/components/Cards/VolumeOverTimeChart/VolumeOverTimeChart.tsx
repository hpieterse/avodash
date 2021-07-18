import React, {
  useContext, useRef, useMemo,
  useCallback, useEffect,
} from "react";
import { ResponsiveLine } from "@nivo/line";
import useFilteredApi from "../../../hooks/useFilteredApi";
import { ChartSeries } from "../../../models/ChartSeries";
import { FilterValuesContext } from "../../../containers/FilterValuesContextProvider";
import { MetaDataContext } from "../../../containers/MetaDataContextProvider";
import { ChartMetaData } from "../../../models/ChartMetaData";

const VolumeOverTimeChart = () => {
  const data = useFilteredApi<ChartMetaData<Array<ChartSeries<number|string, string, number>>>>(
    "dashboard/volume-v-time",
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

  const addProductionType = useCallback((productionTypeName: string) => {
    if (filterValuesRef.current == null || !metaDataRef.current.isMetaDataReady) {
      return;
    }

    const productionType = metaDataRef.current.metaData.productionTypes
      .find((p) => p.value === productionTypeName)?.key;
    if (productionType == null) {
      return;
    }

    setFilterValues({
      ...filterValuesRef.current,
      productionTypes: [
        ...(filterValuesRef.current?.productionTypes ?? []),
        productionType,
      ],
    });
  }, [setFilterValues]);

  // determine time axis ticks
  const { tickValues, format } = useMemo(() => {
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

    return {
      tickValues: tickValuesInternal,
      format: formatInternal,
    };
  }, [filterValues?.endDate, filterValues?.startDate]);

  const chart = useMemo(() => {
    let valueSuffix = "";

    if (data.valueDivisor === 1000000000) {
      valueSuffix = "billion";
    } else if (data.valueDivisor === 1000000) {
      valueSuffix = "million";
    }

    return (
      <ResponsiveLine
        data={data.data}
        curve="monotoneX"
        useMesh
        margin={{
          top: 30, bottom: 50, right: 130, left: 70,
        }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear", min: "auto", max: "auto", stacked: true, reverse: false,
        }}
        axisBottom={{
          tickValues,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format,
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: `Volume (${valueSuffix} avocados)`,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        legends={[
          {
            anchor: "bottom-right",
            translateX: 120,
            translateY: 0,
            direction: "column",
            itemWidth: 100,
            itemHeight: 20,
            onClick: (e) => {
              addProductionType(e.id as string);
            },
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 0.5,
                },
              },
            ],
          },
        ]}
      />
    );
  }, [data, tickValues, format, addProductionType]);

  return chart;
};

export default VolumeOverTimeChart;
