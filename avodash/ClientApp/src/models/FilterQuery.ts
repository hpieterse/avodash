export interface FilterQuery {
  startDate : Date | null;
  endDate: Date | null;
  regions: Array<string>;
  packageTypes: Array<number>;
  productionTypes: Array<number>;
}