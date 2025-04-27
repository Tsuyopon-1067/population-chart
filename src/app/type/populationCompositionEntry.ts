// ある年度における人口構成データ1件を表す

export interface PopulationCompositionEntry {
  year: number;
  value: number;
  rate?: number;
}
