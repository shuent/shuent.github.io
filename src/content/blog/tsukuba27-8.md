---
title: "筑波院試情報システムCSの問題（27年度8月 情報1）を解いてみた。"
pubDate: 2018-05-30T20:59:58+09:00
draft: false
tags: ["algorithm"]
---
解説します。
問題はこちら。
http://www.cs.tsukuba.ac.jp/admission/past-exam.html

二分木の問題。

(4) 深さｎの完全二分木に対して、足し合わせの計算量。呼び出す回数は $ 2^{n+1}-1 $ 回。指数が $n+1$ になるのは、null checkを一番最下層のノードに対して行うから。未確認。

(5) ノードの左を子、右を兄弟とした新しいデータ構造に対して、足し合わせの関数を作成する。

```cpp
int sumup_tree2(Node *p){
    if(p == NULL) return 0;
    p->data += sumup_tree2(p->left);
    return p->data + sumup_tree2(p->right);
}
```

確かめてみる。再帰で呼ばれるたびに木をprintしていく。木の階層ごとにprintするには多少工夫がいる。確認の全コードはこちら。C++だけどCと基本は変わらない。

```cpp
#include <iostream>
#include <stdlib.h>
using namespace std;

struct Node{
    int data; Node *left; Node *right;
};
Node *root = NULL;

Node *make_node(int data, Node *left, Node *right){
    Node *p = (Node *)malloc(sizeof *p);
    p->data = data;
    p->left = left;
    p->right = right;
    return p;
}

void build_tree(){
    Node *p1,*p2,*p3,*p4,*p5;
    p5 = make_node(5,NULL,NULL);
    p4 = make_node(4,NULL,NULL);
    p3 = make_node(3,NULL,p4);
    p2 = make_node(2,p3,p5);
    p1 = make_node(1,p2,NULL);
    root = p1;
}

void print(Node *p){
    Node *rank = p;
    while (p!= NULL){
        cout << p->data << " ";
        p = p->right;
    }
    cout << endl;
    if (rank->left !=NULL)
        print(rank->left);
}

void print1(Node *p){
    cout << "Tree: "<< endl;
    print(p);
    cout << endl;
}

int sumup_tree2(Node *p){
    if(p == NULL) return 0;
    p->data += sumup_tree2(p->left);
    print1(root);
    return p->data + sumup_tree2(p->right);
}

int main(){
    build_tree();
    print1(root);
    cout << "sum: "<< sumup_tree2(root) << endl;

}
```
```
# result
Tree:   
1       
2 5     
3 4     
        
Tree:   
1       
2 5     
3 4     
        
Tree:   
1       
2 5     
3 4     
        
Tree:   
1       
9 5     
3 4     
        
Tree:   
1       
9 5     
3 4     
        
Tree:   
15      
9 5     
3 4     
        
sum: 15 

```

院試の過去問の解答なんてどこにも載ってないので、公開してみます。間違っていたら、Twitterから連絡くださるとうれしいです。