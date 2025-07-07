---
title: Claude Code を中断させず，バックグラウンドでタスクを動かす
tags:
  - blog
  - typescript
  - node.js
  - cli
pubDate: 2025-07-04
---

## 課題

AI エージェントが真に自律的に活動するには，環境認識が大事．コード書かせて，人間が別ターミナルでサーバー動かしているようじゃ画面を離れられない．
AI コーディングにおいては，コード書いて，動かして，ログを見て，エラーが出ていないかを認識して，また修正して，とサイクルを回せて自律的と言える．

claude code で web アプリを作る時，勝手に playwright MCP でブラウザ動かしてデバッグしてもらいたいので，実行環境も Claude Code に明け渡したい．

普通に dev サーバー起動させると，
`npm run dev &` と linux のバックグラウンド実行するが，うまくいかない．
途中で hang してしまい，次の応答ができなくなってしまう．

2 つの解決策がある

1. tmux (old)
2. background 機能 を使わせる．(new)

## tmux

claude code から，tmux で作った別画面にコマンドを送り，実行させ，log を見にいけばよい．

こんな感じ.

最小の prompt がこちら

```
run dev server in this way:
find next tmux pane
send key to run server
then confirm by `tmux capture-pane | tail - [N]`
```

前提として，2 pane 立てていて，左の pane で claude code 動かし，右でサーバー動かしている状態．

環境によって window, session でも良いし，cc 自体に 画面がなかったら作らせるところからやっても良い．
工夫してみてください．

## background

ネイティブの機能. 公式には載ってないけど誰かが見つけたもの.

claude code 起動前に，以下の環境変数

```
export ENABLE_BACKGROUND_TASKS=1
```

をセットすると，長時間実行の bash コマンド時にバックグラウンドで実行するかを聞いてくるようになる．
こっちのが良さげ．

`/bashes` コマンドが出現し，今 background で動いてるプロセスも見れる．(環境変数セットしないと見れない隠しコマンドらしい w)

```sh
⏺ Bash(npm run dev)
  ⎿  Running…

╭─────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Long-running command                                                                                │
│                                                                                                     │
│  npm run dev                                                                                        │
│  Running for 19 seconds                                                                             │
│                                                                                                     │
│ How do you want to proceed?                                                                         │
│ ❯ 1. Run in the background                                                                          │
│   2. Continue waiting                                                                               │
│   3. Kill command                                                                                   │
│                                                                                                     │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────╯
  Press esc to close

```

```sh
# /bashes で出てくる

╭─────────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                     │
│ Background Bash Shells                                                                              │
│ Select a shell to view details:                                                                     │
│                                                                                                     │
│ ❯ 1. Shell bash_1: npm run dev (running)                                                            │
│                                                                                                     │
│                                                                                                     │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────╯
  Press esc to close
```
