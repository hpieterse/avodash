import React, {
  useContext,
  useMemo,
} from "react";
import { ResponsiveLine } from "@nivo/line";
import useFilteredApi from "../../../hooks/useFilteredApi";
import { ChartSeries } from "../../../models/ChartSeries";
import { FilterValuesContext } from "../../../containers/FilterValuesContextProvider";
import useChartAxisSize from "../../../hooks/useChartAxisSize";

const PriceOverTimeChart = () => {
  const data = useFilteredApi<Array<ChartSeries<number|string, string, number>>>(
    "dashboard/price-v-time",
    []
  );
  const { addProductionType } = useContext(FilterValuesContext);

  const [tickValues, format] = useChartAxisSize();

  const chart = useMemo(() => (
    <ResponsiveLine
      data={data}
      useMesh
      curve="monotoneX"
      enablePoints={false}
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
        legendOffset: 40,
        legendPosition: "middle",
      }}
      axisLeft={{
        legend: "Average price ($)",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      legends={[
        {
          anchor: "right",
          translateX: 120,
          translateY: -20,
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
      theme={{
        grid: {
          line: {
            stroke: "#eeeeee",
          },
        },
      }}
    />
  ), [data, tickValues, format, addProductionType]);

  return chart;
};

export default PriceOverTimeChart;
