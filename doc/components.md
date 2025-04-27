# コンポーネント・Hooks仕様・型定義

## コンポーネント

### ChartController

グラフ表示部分を提供する．
表示ラベル選択ボタンと`DynamicChart`で構成される．

#### props

| 名前                  | 型                                          | 説明                               |
| --------------------- | ------------------------------------------- | ---------------------------------- |
| `checkboxData`        | `CheckboxData[]`                            | チェックボックスの状態             |
| `compositionMap`      | `Map<number, PopulationCompositionPerYear>` | <`prefCode`, 人口構成所情報>       |
| `checkedPrefCodeList` | `number[]`                                  | 選択されている都道府県の`prefCode` |

#### 使用例

```tsx
<ChartController
  checkboxData={checkStatus}
  compositionMap={compositionMap}
  checkedPrefCodeList={checkedPrefCodeList}
/>
```

#### 子コンポーネント・依存

- `DynamicChart`

### Checkboxes

都道府県のチェックボックスを表示する．

#### props

| 名前               | 型                                                         | 説明                                 |
| ------------------ | ---------------------------------------------------------- | ------------------------------------ |
| `checkStatus?`     | `: CheckboxData[]`                                         | 都道府県情報とチェックボックスの状態 |
| `setCheckStatus`   | `(status: CheckboxData[]) => void`                         | チェックボックスの更新更新           |
| `updateCheckState` | `(prefCode: number, checkboxData: CheckboxData[]) => void` | 選択情報更新と人口構成データフェッチ |

#### 使用例

```tsx
<Checkboxes
  checkStatus={checkStatus}
  setCheckStatus={setCheckStatus}
  updateCheckState={updateCheckState}
/>
```

#### 子コンポーネント・依存

なし

### DynamicChart

与えられたデータの折れ線グラフを表示する．
通常は凡例の位置は下．画面幅が480px以上かつデータ数が10以下の時凡例を右に配置．

#### props

| 名前           | 型                | 説明                                       |
| -------------- | ----------------- | ------------------------------------------ |
| `data`         | `LineChartData[]` | グラフに表示するデータ                     |
| `prefNameList` | `string[]`        | 当道府県名の配列．dataのキーと一致させる． |

#### 使用例

```tsx
<DynamicChart data={selectedLabelLineData} prefNameList={selectedPrefNameList} />
```

#### 子コンポーネント・依存

- `useWindowWidth`

### TitleBar

タイトルバーを表示する．

#### props

なし

#### 使用例

```tsx
<TitleBar />
```

#### 子コンポーネント・依存

なし

## Hooks

### usePopulationComposition

人口構成データを管理する．表示する人口構成データの提供と人口構成データのフェッチとキャッシュを行う．

#### props

なし

#### 使用例

```tsx
const [updateCheckState, compositionMap, checkedPrefCodeList] = usePopulationComposition();
```

#### 子コンポーネント・依存

なし

### useWindowWidth

ブラウザの画面幅を提供する．

#### props

なし

#### 使用例

```tsx
const windowWidth = useWindowWidth();
console.log(windowWidth);
```

#### 子コンポーネント・依存

なし

## 型定義

### CheckboxData

チェックボックスの状態管理と都道府県情報の提供．

| プロパティ | 型        | 説明                                       |
| ---------- | --------- | ------------------------------------------ |
| prefCode   | `number`  | 都道府県コード                             |
| prefName   | `string`  | 都道府県名                                 |
| checked    | `boolean` | チェックボックスで選択されているとき`true` |

### LineChartData

グラフ上のある時点におけるデータ1件を表す．例えば2000年度のデータを表す．

| プロパティ      | 型                              | 説明                                                              |
| --------------- | ------------------------------- | ----------------------------------------------------------------- |
| `[key: string]` | `string \| number \| undefined` | グラフでX軸ラベルとして指定したキーは必須．他はデータごとに追加． |

#### 使用例

```tsx
const data: LineChartData[] = [
  {
    year: 2000,
    A: 10,
    B: 20,
    C: 30,
  },
  {
    year: 2005,
    A: 20,
    B: 10,
    C: 20,
  },
  {
    year: 2010,
    A: 30,
    B: 20,
    C: 10,
  },
];
```

### PopulationCompositionEntry

ある年度における人口構成データ1件を表す．

| プロパティ | 型       | 説明                             |
| ---------- | -------- | -------------------------------- |
| year       | `number` | 年                               |
| value      | `number` | 人口                             |
| rate?      | `number` | 総人口のうちその人口が占める割合 |

### PopulationCompositionPerYear

APIリクエスト用．

### populationCompositionPerYearResponse

APIリクエスト用．

### prefecture

APIリクエスト用．

### prefecturesResponse

APIリクエスト用．
