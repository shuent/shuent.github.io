---
title: "バックトラック法(深さ優先探索)で迷路を解く。"
date: 2018-06-04T16:48:32+09:00
draft: false
tags: ["algorithm"]
---

## 問題
3*3のマス目で、1が壁、0が道で表現されている。(0,0)から(2,2)にたどりつくことができるか探索せよ。

## 解法

バックトラック法で解く。可能性がある道を深堀していき、行き止まりなら分岐点へ戻って進む。この探索の方法を別名で深さ優先探索という。再帰で実装できる。

この問題ではないけど、隣接行列が与えられたときは、もっと簡単に実装できる。

木構造で迷路は表現できる。スタートをルートとして、次に進めるマスを子として木に追加していくと想像する。帰りがけ順に走査するとどこかでゴールにたどり着く。たどり着かなければ道がなかったことになる。

２次元配列ではなく、１次元配列で迷路を取得した。本当は４方向に動けるべきだけど、２方向に限定した。いろいろと端折ってますすみません。


```c
#include <stdio.h>
#define N 3*3
#define LEN 3

int meiro[N] = { 0,0,0,
                 0,1,0,
                 0,1,0 };
// int visited[N];
const int goal = 8;
int success = 0;

int visit(int i){
    printf("%d ",i);

    // if no way return -1
    if( (i+1)%LEN !=0 && !meiro[i+1]) // ひとつ右に行ったとき、(右が端でない && 訪問済みでない && 行き止まりでない)とき
        visit(i+1);
    if( i+LEN < N && !meiro[i+LEN]) // ひとつ下に行ったとき、(下が範囲を超えていない && 訪問済みでない && 行き止まりでない)とき
        visit(i+LEN);
    printf("\n");
    if(i==goal){
        success = 1;
    }
    return success;
}

int main(){
    int r = visit(0);
    printf("\nsuccess: %d\n",r);
}


```


上のコードだと、全探索してしまうため、ゴールにたどり着いたら探索をやめたい。それを満たす改良版は以下。

```c
#include <stdio.h>
#define N 3*3
#define LEN 3

// ゴールに達したら終了する。

int meiro[N] = { 0,0,0,
                 0,1,0,
                 0,1,0 };
// int visited[N];
const int goal = 8;

int visit(int i){
    printf("%d ",i);
    if(i==goal){
        return 1;
    }else{
        if( (i+1)%LEN !=0 && !meiro[i+1]) // ひとつ右に行ったとき、(右が端でない && 行き止まりでない)とき
            if (visit(i+1) == 1) return 1;
        if( i+LEN < N && !meiro[i+LEN]) // ひとつ下に行ったとき、(下が範囲を超えていない && 行き止まりでない)とき
            if (visit(i+LEN) == 1) return 1;
    }
    return 0;
}

int main(){
    int r = visit(0);
    printf("\nsuccess: %d\n",r);
}

```

```
# result
$ ./a.out
0 1 2 5 8
success: 1
```

ちなみに端に1を敷き詰めて番兵を作ってしまえば、端かどうかの判定がいらない。
```
11111
10001
10101
10101
11111
```
こんな感じで。