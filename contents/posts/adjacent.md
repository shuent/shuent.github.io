---
title: "隣接行列から隣接リストの変換"
date: 2018-06-04T00:11:19+09:00
draft: false
tags: ["algorithm"]
---

グラフで使われる、隣接行列から隣接リストへの変換関数を作った。有向グラフ、無向グラフ関係なく使える。グラフ G=(E,V)において、隣接行列は、O(V^2) の空間を必要とするが、隣接リストは O(E+V). 辺がそこまで多くないようなグラフで有効。

なお実際この変換関数は O(V^2) なので、入力が与えられているときは直接リストを作るべきだから、使うべき場面はない。何かのためではなく、変換することが目的な時に使える（笑）。ポインターを使ういい練習になった。

`listify()`はある配列に対して参照渡しをする。`listify2()`は新しく配列をヒープに動的確保して返す。このほうがオブジェクト指向っぽい。計算量は O(V^2) だけど、作業している分は辺の数 E だけ。

`get_edge()`は両方のインデックスから辺を見つける。隣接行列だとO(1)でとれるが、これは連結リストなので、一つのノードにつながれている辺が多いほど時間がかかる. 平均で O(E/V).

```c
#include <stdio.h>
#include <stdlib.h>
typedef struct Edge {
    int idx;
    int cost;
    struct Edge* next;
} Edge;

void listify(int n,int mat[n][n], Edge* ls[n], int boundary){
    // initialize list. point next itself.
    int i,j;
    Edge* new;
    for(i=0;i<n;i++){
        ls[i] = malloc(sizeof(Edge));
        ls[i]->idx = -1;        
        ls[i]->next = ls[i];
    }

    for(i = 0; i < n; i++){
        for(j = 0; j < n; j++){
            if(mat[i][j] != boundary){
                // insert cost and key
                new = (Edge *)malloc(sizeof(Edge));
                new->cost = mat[i][j];
                new->idx = j;
                // pointer replace. Nodes are inversively orderd because new node connect to first node.
                new->next = ls[i]->next;
                ls[i]->next = new;
            }
        }
    }
}

Edge **listify2(int n,int mat[n][n], int boundary){
    // Dynamic allocation version.
    // allocate memory of pointers array to heap
    // '*ls[n]' cause warning: return-local-addr, and seg fault.
    Edge** ls=malloc(n * sizeof(Edge*));  
    listify(n,mat,ls,boundary);
    return ls;
}

Edge* get_edge(Edge** ls, int u,int v){
    Edge *edge = ls[u]->next;
    while(edge != ls[u]){
        if(edge->idx == v) return edge;
        edge = edge->next;
    }
    return NULL;
}

#define N 8
#define M 10000
int main(void){
    int edge[N][N]= {{0,1,7,2,M,M,M,M},
                {1,0,M,M,2,4,M,M},
                {7,M,0,M,M,2,3,M},
                {2,M,M,0,M,M,5,M},
                {M,2,M,M,0,1,M,M},
                {M,4,2,M,1,0,M,6},
                {M,M,3,5,M,M,0,2},
                {M,M,M,M,M,6,2,0}};

    Edge *ls[N];
    listify(N,edge,ls,M); // 参照渡し
    Edge **lst2 = listify2(N,edge,M); //配列を動的確保するver.

    Edge *e = get_edge(lst2,0,2);
    printf("%d\n",e->cost); //=> 7
    e = get_edge(ls,0,2);
    printf("%d\n",e->cost); //=> 7
    
}
```