---
title: "WindowsでもMac並みの開発環境を整えられる"
pubDate: 2018-05-31T03:46:27+09:00
draft: false
tags: ['blog']
---
高校生になって初めて買ってもらったときから、ずっとMacだった。ずっとWindowsなんてくそだと思ってた。Windowsを使っているやつらを鼻で笑ってきた。愚かだった。はじめて、君に触れて、ちゃんと向き合った。君は綺麗だった。

なんて冒頭から始まる今日のスタイル。最近Macが不調なので前偶然もらったLenovoを使ってる。

Windowsでも開発がしたい。それもMacと同じUnixシステムの上で、やりたい。Winのコマンド叩きたくない、覚えたくない。そんな人に向けたHowto. 詳しくはぐぐってくれ

## How to
Windows Subsystem for Linux (WSL)をインストール. これでbashがlinux上で使える.つかこれがなければ話にならん。何となくdebianを選んだ。

#### Linuxbrew
apt-getでいろいろいれる。gitとかrubyとか。これでrailsも使えるし、それぞれの言語もインストールできそうだし、まあOk。

いやちょっと待って。Homebrewだ。俺にとってMacの使いやすさはHomebrewによるものが大きかった。これなしにライブラリの管理などできない。

apt-getだとバージョン古いしsudoしなきゃだし、ごちゃごちゃになるのが目に見えていた。そしてLinuxでも簡単に使えるパッケージマネージャがないか調べた。

あった。[Linuxbrew](http://linuxbrew.sh/)

便利！！！サイトに沿ってインストールするだけ。なんでもある！Macで使ってたようにパッケージをインストールできる！あら便利。あとはもうルンルン気分で開発。

#### Visual Studio Code
Visual Studio入れようと思ったんだけど、どうにもIDEはよくわからない。重いし。コンパイル機能つきらしい。よくわからないものには手を出さない主義なので、ミニマムにいく。

MacはAtom使ってたけど今回は[VSCode](https://code.visualstudio.com/). ちなみにこれはVSと違い、エディタという位置づけ。カスタムして必要なものだけ入れられる。こっちが好き。補完機能ももちろん、ターミナルも中で扱えるから便利。

C言語のパス通すのがめんどくさかった。WSL特有のめんどくささらしい。

#### Conemu
コマンドプロンプトがなぜかコピぺ使えなかったので、別のターミナルを探す。[ConEmu](https://conemu.github.io/) ってのは人気でらしいので使ってる。そんなわからん。

#### Github
あとBitbucketもだけど、bash にログインしたとき、sshをいちいち接続しなければいけない。Macは一回接続したら保存してんのにね。bash_profileにいろいろ書かなきゃいけない。けど、手作業でやるってのは、仕組みが分かっていいことだと気づいた。一回書けば済むし。

----

こんな感じで、いじってみると意外とMacと同じには揃ったのでOk.ぜひぜひLinuxbrewはとくにおすすめなので使ってみてね。では。