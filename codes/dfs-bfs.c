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