export interface MetaData {
  minDate: string;
  maxDate: string;
  productionTypes: Array<{ key: number; value: string }>;
  regions: Array<{ key: string; value: string }>;
  packageTypes: Array<{ key: number; value: string }>;
}
