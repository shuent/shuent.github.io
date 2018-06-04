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
