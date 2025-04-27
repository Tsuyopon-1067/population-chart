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
| `prefectures?`     | `Prefecture[]`                                             | 都道府県一覧                         |
| `checkStatus?`     | `: CheckboxData[]`                                         | チェックボックスの状態               |
| `setCheckStatus`   | `(status: CheckboxData[]) => void`                         | チェックボックスの更新更新           |
| `updateCheckState` | `(prefCode: number, checkboxData: CheckboxData[]) => void` | 選択情報更新と人口構成データフェッチ |

#### 使用例

```tsx
<Checkboxes
  prefectures={prefectures}
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
