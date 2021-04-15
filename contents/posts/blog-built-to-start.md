---
title: 'Next.jsとMarkdownでブログを作ろう'
date: '2021-4-15'
tags: ['blog', 'react']
---

前のブログを綺麗に削除して、next.js でブログを書き始めることにした。

ブログでは感想じゃなくて読者に役に立つコンテンツを書こうと思っているので、タイトルは「作ってみた」ではなく「作ってみよう」形式。どっちでもいいね。

## 理由

1. next.js でいちから Jamstack なブログを作りたかったから（手段が目的なところある）
2. Qiita より自分の資産として残したい。
3. React, JS で遊びたい
4. ポートフォリオ的なものもブログと併せて置いておきたい
5. 仕事がほしい！

## Next.js を使う理由は

- React 力を磨きたいので React ベースなライブラリ使う
- Gatsby よりシンプル。余計なものが入っていない。自分でいろいろ書く。
- CRA でも良かったが、SSG じゃないと ogp とかめんどくさそう。
  - ツイッターの表示が大事

### Vercel ではなく

Next.js だし Vercel 使うと思いきや、github.io のドメインがエンジニアぽくてかっこいいのでそのまま使う。ISR やいろいろな便利な機能は捨てて静的サイトビルダーとして使う。

Vercel の Git commit したら CI 書かずに自動でデプロイしてくれるのはめちゃめちゃ魅力的だったが断念。大人しく Github Actions を書く。

## プロジェクト作成

前置きはこの辺にして。プロジェクトを作りますよ。このコマンド打つときが一番楽しい説ある。

```shell
npx create-next-app -e with-typescript-eslint-jest-app your_app_name
```

TypeScript と便利ライブラリいりのテンプレートを使用。blog_starter というテンプレもあるが、中身は一から書くので参考程度にする。

[かなりの量のテンプレ](https://github.com/vercel/next.js/tree/master/examples)がある。

基本的にブログ作成は[公式ページのチュートリアル](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website)に近いので、これを進めればお k。というか全部やろう。

Md のファイルを全部自分でパースしなきゃいけないのが難しいポイントだと思った。ここをライブラリ化したら結構良さそう。

公式に書いてあるところは説明を省く。

## MD to ReactNode

次に公式とは変えたところを説明する。

まず見た目は最低限の HTML と CSS を書いたが参考にならないので省く。

マークダウンを HTML に変える部分も変える。

公式では`getStaticProps`内で md をパースして html として props に渡している。[参照](https://nextjs.org/learn/basics/dynamic-routes/render-markdown)

それに対して弊ブログでは `getStaticProps`で md をパースして文字列に変えて、props として渡し、コンポーネント（クライアントで処理）のなかで HTML ではなく直接 ReactNode に変換している。

```tsx
// MdContent.tsx
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
const Highlighter = ({ language, value }) => (
  <SyntaxHighlighter
    language={language}
    style={atomDark}
    wrapLines={true}
    showLineNumbers={true}
  >
    {value}
  </SyntaxHighlighter>
)

export const MdContent = ({ mdText }) => {
  return <ReactMarkdown source={mdText} renderers={{ code: Highlighter }} />
}
```

page コンポーネントでの使用方法。`getMatterParsedContentFromMd`ではマークダウンファイルを `gray-matter` でメタ情報と md のコンテンツを文字列にパースしている。

```tsx
// pages/blog/[slug].tsx
const Post = ({ mdContent, ...data }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <MdContent mdText={mdContent} />
    </div>
  )
}

const dirPath = 'contents/posts'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams
  const matterResult = getMatterParsedContentFromMd(dirPath, slug)

  return {
    props: {
      mdContent: matterResult.content,
      ...matterResult.data,
    },
  }

```

### うまくいかなかったこと

[remark](https://github.com/remarkjs/remark)や[rehype](https://github.com/rehypejs/rehype)を使って自分で md データを加工しようと奮闘したが、シンタックスハイライトがうまくいかなかったりエラーが出たりで使い物にならなかった。

で Github issues を立てたりした。「エラー出てるよ！なんでかわからないけど！」と小学生みたいな英語で言うだけ言ってみる。

### 選ばれたのは

結局[react-markdown](https://github.com/remarkjs/react-markdown)という md 文字列を渡せば ReactNode に変換してくれるコンポーネントと Syntax Highlight には [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)を組み合わせて使った。

`react-markdown`は開発しているまさにその時にバージョンの破壊的変更があり、最新版のコードは手元の環境だとエラーがあったので一つ前のバージョン `5.0.3`を使用した。

### remark, rehype を知ろう

個人ブログではマークダウンのテキストをあれこれ加工して処理するのが難しいところだが、自由に開発するのに欠かせないので頑張って理解するといい。remark, rehype のプラグインでそのうち md で Tweet を埋め込んだり youtube が埋め込めたりする関数を作れる。

## おわりに

Next.js は全部自分でやらないといけないので、難しい。現にこのブログの設定だけで 3 日は md と格闘することになってしまった。Gatsby や前使っていた Hugo などはテンプレが充実しているので、それを使えば一瞬でブログが作れてしまう。が、レールを外れると難しそう。

ブログ作成自体に生産性はないのだから、React や開発の練習をしたい人だけが使う方がいい。それでもやってみたい人は、公式にめちゃくちゃ丁寧なチュートリアルがあったのでそれをやってみるといいです。

これからこのブログでは React, JavaScript に関するやってみた系の記事や日常、気になったこと書いていく。[Misc](/misc)では記事にするまでもない思考やメモを書く予定。
