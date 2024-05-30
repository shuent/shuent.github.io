---
title: "筑波情シス院試CS 28年2月　過去問"
pubDate: 2018-05-31T01:22:48+09:00
draft: false
tags: ["algorithm"]

---

またまた二分探索木の問題。情報の問題１。
http://www.cs.tsukuba.ac.jp/admission/past-exam.html


### 解答
1. d
    - 進み続ける。無限ループ。
2. node != EMPTY
    - ここでのEMPTY.value は番兵。番兵を最後において、find_node の無限ループを止めている。 
3. a, 4. b
    - 二部探索木の計算量は $ O(\log n) \sim O(n) $

5 は穴埋めでコード完成。すでにvalueが存在するときはそのままリターン。ここで注意しなきゃいけないのが、関数の型も、引数のtree もポインタ型ではないということ。普段ポインタで慣れている人ほど引っ掛かりそう。

```cpp
tree insert(tree t,int v){
    if (t==&empty){
        tree node = malloc()
        node->val = v
        node->left = node->right = &empty
        return node
    }
    // ここからが答え
    if(v < t->value){
        &t->left = insert(&t->left, v); // leftがemptyにたどり着くまで再帰。たどり着いた先で上のコードで新しく挿入される。
    }else if (v > t->value){
        &t->right = &insert(&t->right, v);    
    }
    return t // すでに存在するとき
}
```