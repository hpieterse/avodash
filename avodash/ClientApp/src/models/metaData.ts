export interface MetaData {
  minDate: Date;
  maxDate: Date;
  productionTypes: Array<{ key: number; value: string }>;
  regions: Array<{ key: string; value: string }>;
  packageTypes: Array<{ key: number; value: string }>;
}
