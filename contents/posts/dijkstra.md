---
title: "ダイクストラ法ー最短経路問題"
date: 2018-06-03T20:49:20+09:00
draft: false
tags: ["algorithm"]
---


隣接行列と、始点が与えられたとき、残りの頂点への最短経路を求める。C言語で実装。計算量は $O(V^2)$

イメージはこちらのサイトを参考にした。http://nw.tsuda.ac.jp/lec/dijkstra/   

```c
#include <stdio.h>
/*
Dijkstra
Given adjecent matrix,
Calculate the shortest path from start point to each point.
*/
#define N 8
#define M << 30
int edge[N][N]= {{0,1,7,2,M,M,M,M},
                {1,0,M,M,2,4,M,M},
                {7,M,0,M,M,2,3,M},
                {2,M,M,0,M,M,5,M},
                {M,2,M,M,0,1,M,M},
                {M,4,2,M,1,0,M,6},
                {M,M,3,5,M,M,0,2},
                {M,M,M,M,M,6,2,0}};

int min(int a,int b){
    return a < b ? a : b;
}
int main(void){
    int start = 0;
    int confirmed[N];
    int cost[N];
    int minc, ref;
    int i,j;
    for(i = 0; i < N; i++){
        confirmed[i]=0;
        cost[i]=M; 
    }
    cost[start] = 0;
    for(i=0;i<N;i++){
        // find min cost node from unconfirmed nodes
        minc = M;
        for(j=0;j<N;j++){
            if(!confirmed[j] && cost[j] < minc){
                minc = cost[j];
                ref = j;
            }
        }
        if(minc==M) {
            printf("graph not connected"); exit(1);
        }
        for(j=0;j<N;j++){
            if (edge[ref][j] < M){ //if connected nodes
                cost[j] = min(cost[j], cost[ref] + edge[ref][j]); // update if less cost via ref               
            }
        }
        confirmed[ref] = 1;
    }
    printf("shortest path from %d\n",start);
    for(i=0;i<N;i++){
        printf("%d: %d\n",i, cost[i]);
    }
}
```
```
# result
$ ./a.out
shortest path from 0
0: 0
1: 1
2: 6
3: 2
4: 3
5: 4
6: 7
7: 9
```

隣接リストで辺が与えられている場合、つながっている頂点を求める計算量がそのままEになる。優先度付きキューを使えば最小値を取り出す操作は log V になる。合わせると、$O((E+V)\log V)$となり、高速化できる。