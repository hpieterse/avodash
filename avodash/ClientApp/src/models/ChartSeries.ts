import { ChartDataPoint } from "./ChartDataPoint";

export interface ChartSeries<TId, Tx, Ty> {
  id: TId,
  data: Array<ChartDataPoint<Tx, Ty>>,
}
