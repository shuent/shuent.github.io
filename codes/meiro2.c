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
