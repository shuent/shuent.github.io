---
title: Node.js初心者が初めてnpm moduleを作って公開するまで
tags:
  - blog
  - javascript
  - node.js
pubDate: 2021-04-19
---

このブログみたいにNext.jsやGatsbyなどJSの静的サイトジェネレータで、マークダウンでテンプレートからコンテンツを素早く書き始められるcliを作り、**npm module** として公開した。

使い方は簡単。1行のコマンドで設定からファイルを生成。`npm.cofig.js`でmdを自作のテンプレに設定できる。**今日の日付(date)** も組み込める。

```shell
npm run mdg today_whether
# => create blog/2021-4-14-today_whether.md
```

こちら: [@shuent/markdown-generator](https://www.npmjs.com/package/@shuent/markdown-generator)

初めてnpmモジュールを作成して公開するにあたり、学んだこと、ハマったことをいったん箇条書きで全部書く。需要があればコードと共に解説する。

- node.jsはCommonJSで基本動く。
  - `const hoge = require('hoge')` とモジュールを宣言する。
  - `module.exports`としてモジュールをエクスポートする。
  - importなどは使うのに工夫がいる。Babelでトランスパイラする。今回はやらず。
- ユーザー定義の設定ファイルどこで設定するか迷った結果
  - `app-root-path`でプロジェクトルートパスにアクセスできる
    - しかし、ローカルでテスト用のプロジェクトを作り読み込むと `link` されるため、`app-root-path`が開発中のモジュールのルートを参照してしまう
      - 公開してから読み込んでみるしかない。テストできない。困った。
- testを書いた。
  - 基本的にentry point(index.js)に全部実装してしまったので、`module.exports`していない関数をテストできない。
  - よってロジックファイルだけを切り出し。
  - `mocha`とNode.js標準のモジュール `assert.strictEqual`を使用。
  - [`rewire`](https://www.npmjs.com/package/rewire) が有能
    - エクスポートしていない関数`__get__`で呼び出し、テストできる
    - 内部の関数をモックできる`__set__`を使う
    - ローカルで成功したテストがgithub actionsでは失敗した。パスの問題ぽい。
      - 今回はスルー。すみませんという気持ち。今度格闘する。
- cli として機能させるために
  - `index.js`の行頭に `#! /usr/bin/env node` と書く。
  - `package.json`内で `"bin": { "mdg": "index.js" }` とする
    - すると `node_module/.bin/mdg` で実行できる。
- その他Javascriptに関して
  - `{} === {}`が`false`. これは衝撃。
    - `isEqual(obj)`という関数を作ってオブジェクトの空判定をした。
    - テストファイルを作ってから判明したので、テストは大事だった。

初めてOSSとして公開したので、いい経験になった。自分が欲しいものを作るに限る。反応があればもっと cli らしくオプションを入力できたりコマンドを増やしたりしたい。
  