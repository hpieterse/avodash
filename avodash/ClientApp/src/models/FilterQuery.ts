export interface FilterQuery {
  startDate : Date | null;
  endDate: Date | null;
  regions: Array<string>;
  excludedRegions: Array<string>;
  packageTypes: Array<number>;
  productionTypes: Array<number>;
}