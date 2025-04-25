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