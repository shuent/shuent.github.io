---
title: "深さ優先探索DFSと幅優先探索BFS"
pubDate: 2018-06-04T18:37:23+09:00
draft: false
tags: ["algorithm"]
---


グラフや木構造であらわされたデータを探索するときに、主に２つの手法がある。深さ優先探索と幅優先探索。

主な違いは、直列に進むか並列に進むか、次の探索候補点をスタックに入れるか待ち行列(キュー)に入れるか。

それぞれ木であらわすと、こんな感じ。番号は呼ばれる順番。
```
# 深さ優先探索 (行きがけ順) 
     1
   2   5
 3  4 6  7

# 幅優先探索
      1
    2   3
  4  5 6  7
```
DFSは木を降りていくが、BFSは兄弟木をすべてたどってから子の階層を辿る。


## 実装
次のプログラムでは、両方とも隣接行列が与えられたとき、すべてのデータを探索し、その順番を表示する。DFSは再帰版とスタック版がある。

DFSスタック版とBFSは、スタックを使うか、キューを使うかの違いなの、が実装を見るとよくわかる。

スタックとキューは配列を使い実装。

```c
#include <stdio.h>
#define N 8
const int mat[N][N]= {
                {0,1,0,0,0,0,0,0},
                {1,0,1,1,0,0,0,0},
                {0,1,0,0,0,0,1,0},
                {0,1,0,0,1,0,0,0},
                {0,0,0,1,0,1,0,0},
                {0,0,0,0,1,0,1,1},
                {0,0,1,0,0,1,0,1},
                {0,0,0,0,0,1,1,0}};
int visited[N];

 // 深さ優先探索 Depth First Search 再帰ver
int dfs_rec(int i){
    if(visited[i]) return 0;
    visited[i] = 1;
    printf("%d ",i);            

    for(int j=0;j<N;j++){
        if( visited[j]==0 && mat[i][j]==1){
            dfs_rec(j);
        }
    }
}

// 深さ優先探索 stack ver.
int dfs(){
    int stack[100];
    int sp=0; // スタックポインタ
    int i,j,k;

    stack[sp++]=0; // 0 ~ 7 どれでも
    while(sp){
        k = stack[--sp];
        if(visited[k]) continue;
        visited[k]=1;
        printf("%d ",k);

        for(j=N-1;0<=j;j--){ //逆からにすると番号順にスタックから取り出される。
            if( !visited[j] && mat[k][j])
                stack[sp++]=j;
        }
        // for(i=0;i<sp;i++) // スタックの状態を出力。
        //     printf("%d ",stack[i]);
        // printf("\n");
    }
}

// 幅優先探索 Breadth First Search
int bfs(){
    int queue[100];
    int head=0,tail=0,k,j;

    queue[tail++] = 0;
    while(head != tail){
        k = queue[head++];
        if(visited[k]) continue;
        visited[k] = 1;
        printf("%d ",k);

        for(j=0;j<N;j++){
            if(!visited[j] && mat[k][j])
                queue[tail++] = j;
        }
    }
}

int main(void){

    for(int i=0;i<N;i++)
        visited[i]=0;
    dfs_rec(0); printf("\n");

    for(int i=0;i<N;i++)
        visited[i]=0;
    dfs(); printf("\n");

    for(int i=0;i<N;i++)
        visited[i]=0;
    bfs(); printf("\n");
    
}

/* result

$ ./a.out
0 1 2 6 5 4 3 7
0 1 2 6 5 4 3 7
0 1 2 3 6 4 5 7

*/

```