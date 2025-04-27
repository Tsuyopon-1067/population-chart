// グラフ上のある時点におけるデータ1件を表す
// 例えば2000年度のデータを表す

export type LineChartData = {
  [key: string]: string | number | undefined;
};
