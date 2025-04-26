# population-graph

## やったこと
### next.jsプロジェクトの作成
```bash
yarn create next-app
```

### prettierのインストール

```bash
yarn add -D prettier
```

- 設定の参考
    - [VSCodeでPrettierを使ってコードスタイルを統一する方法](https://liginc.co.jp/649627)
    - [ESLint,Prettier,husky,lint-staged,commitlintで開発環境を整備](https://zenn.dev/hayato94087/articles/f5e02dc3dadb58)

### ESLintの設定
- 設定の参考
    - [仕組みと嬉しさから理解するeslint FlatConfig対応](https://zenn.dev/cybozu_frontend/articles/about-eslint-flat-config)

### huskyの設定
```bash
npx husky-init
```
- 設定の参考
    - [ESLint,Prettier,husky,lint-staged,commitlintで開発環境を整備](https://zenn.dev/hayato94087/articles/f5e02dc3dadb58)

### APIの型定義
- 実装の参考
    - [[TypeScript] `any non-nullish value`としての`{}`型](https://qiita.com/sugoroku_y/items/09aace6a17a6b36dfee6)
    - 使用しない引数があるときのESLintエラー解消（自己解決できなかったのでAI使用）
        - [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars)
        - [Eslintでunderscoreから始まる変数をチェックさせない設定にする](https://shotat.hateblo.jp/entry/2016/10/26/000912)

### プロキシAPIの実装
- 実装の参考
    - エンドポイントの続きの呼び方がわからなかったのでAIに質問
        - 関数の名前付け
    - [Next.js で API を実装してみた](https://zenn.dev/yumemi_inc/articles/nextjs-rest-api)
    - [Next.jsを使ったAPI開発](https://qiita.com/hukuryo/items/56a516d6252326c8e2cf)

### チェックボックスの実装
- 実装の参考
    - [日本語対応！CSS Flexboxのチートシートを作ったので配布します](https://www.webcreatorbox.com/blog/css-flexbox-cheat-sheet)
        - Flexでは最後の配置が不自然になるためCSS Gridに以降

### 人口構成取得Hooksの実装
- 実装の参考
    - [型ガード](https://typescript-jp.gitbook.io/deep-dive/type-system/typeguard)
    - [TypeScriptの型と実態がズレるとき、型付けにどう向き合っていくか](https://zenn.dev/mybest_dev/articles/82ef8c34dfd1b7)
    - Mapからの配列生成で調べたが実際には必要なかった

### Hooksのテスト
```bash
yarn add -D @testing-library/react
yarn add -D jest
yarn add -D @types/jest
```
- [【React】カスタムフックのテストはこんな感じに書くといいよ](https://qiita.com/anneau/items/c3a1779ba228b23d0956)