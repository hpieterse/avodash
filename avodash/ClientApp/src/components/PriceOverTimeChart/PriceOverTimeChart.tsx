import React, {
  useContext, useRef, useMemo,
} from "react";
import { ResponsiveLine } from "@nivo/line";
import useFilteredApi from "../../hooks/useFilteredApi";
import { ChartSeries } from "../../models/ChartSeries";
import { FilterValuesContext } from "../../containers/FilterValuesContextProvider";
import { MetaDataContext } from "../../containers/MetaDataContextProvider";

const PriceOverTimeChart = () => {
  const [isDataReady, data] = useFilteredApi<Array<ChartSeries<number|string, string, number>>>(
    "dashboard/price-v-time"
  );
  const [filterValues, setFilterValues] = useContext(FilterValuesContext);
  const [isMetaDataReady, metaData] = useContext(MetaDataContext);

  const chartDataCache = useRef(data ?? []);
  const chartData = useMemo(() => {
    if (!isMetaDataReady || !isDataReady) {
      return chartDataCache.current;
    }

    const newData = data?.map((s) => ({
      ...s,
      id: metaData.productionTypes.find((p) => p.key === s.id)?.value ?? s.id,
    }));

    chartDataCache.current = newData;
    return newData;
  }, [isMetaDataReady, isDataReady, data, metaData.productionTypes]);

  const addProductionType = (productionTypeName: string) => {
    if (filterValues == null || !isMetaDataReady) {
      return;
    }

    const productionType = metaData.productionTypes
      .find((p) => p.value === productionTypeName)?.key;
    if (productionType == null) {
      return;
    }

    setFilterValues({
      ...filterValues,
      productionTypes: [
        ...(filterValues?.productionTypes ?? []),
        productionType,
      ],
    });
  };

  // determine time axis ticks
  const timeDeltaDays = (
    (filterValues?.endDate?.getTime() ?? 0) - (filterValues?.startDate?.getTime() ?? 0)
  ) / (60 * 60 * 24 * 1000);

  let tickValues = "every 1 year";
  let format = "%Y";

  if (timeDeltaDays < 14) {
    tickValues = "every 1 day";
    format = "%Y-%m-%d";
  } else if (timeDeltaDays < 31 * 4) {
    tickValues = "every 2 week";
    format = "%Y-%m-%d";
  } else if (timeDeltaDays < 365 / 2) {
    tickValues = "every 1 month";
    format = "%Y-%m";
  } else if (timeDeltaDays < 365) {
    tickValues = "every 3 month";
    format = "%Y-%m";
  } else if (timeDeltaDays < 600) {
    tickValues = "every 6 month";
    format = "%Y-%m";
  }

  return (
    <ResponsiveLine
      data={chartData}
      curve="monotoneX"
      margin={{
        top: 50, right: 110, bottom: 50, left: 60,
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
        legend: "Average price per avocado ($)",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      legends={[
        {
          anchor: "right",
          translateX: 100,
          direction: "column",
          itemWidth: 80,
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
};

export default PriceOverTimeChart;
