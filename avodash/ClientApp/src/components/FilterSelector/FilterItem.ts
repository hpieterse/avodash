export interface FilterItem<T> {
  key: T,
  value: string,
  type: 'PackageType' | 'Region' | 'ProductionType'
}