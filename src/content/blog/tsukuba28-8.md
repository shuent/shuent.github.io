---
title: "筑波院試情報システムCS 28年度８月 解答"
pubDate: 2018-05-31T15:02:32+09:00
draft: false
tags: ["algorithm"]

---

情報　問題１を解説します。 マージソートの問題。関数の呼び出し回数を数える問題が苦戦しました。
http://www.cs.tsukuba.ac.jp/admission/past-exam.html

## Solutions

(1) 0と1交互に出す。i=0から始まる。`i = (i+1) % 2`  

(2) 書き換えの問題。条件式をまとめる。` if( peekq(q1) > peekq(q2))`

(3) 苦戦した問題。サイズ４のキューに対して。enq()の回数: `3*(2+1)=9`, newq(): `2*(2*2 + 4*1)= 16`: 階層ごとのキューの個数*キューのサイズの足し合わせ

ここからわかるのが、サイズnのキューに対してenqの呼び出し回数です。ms()が呼び出されるたび、サイズが分割されるので、分割回数は$\log n$です。それに対して分割された合計の要素ms()が実行されるので、合計 $ O(n \log n) $ 回 enq() が実行されることになります. 図。要素数はキューのサイズ。

```
    4
  2    2
1  1  1  1
```

こちらを参考にしました。具体的な計算量の導出は難しいです。
http://www.sd.is.uec.ac.jp/koga/lecture/FSkiso1/kiso1_02.pdf
http://www.jaist.ac.jp/~uehara/course/2016/i431/pdf/03dandc.pdf

(4) 正誤。a:T, b:T, c:T, d;T, e:F マージソートはキューの値には依存せず、サイズだけに依存します。

(5) enq, deq の穴埋め。イレギュラーなキューの入れ方。わかりにくい。`q->count + q->head`, `q->count--`





