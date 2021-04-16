---
title: '📙React + TypeScript + Firebaseで認証付きの簡単な掲示板を作ろう'
date: '2021-4-10'
tags: ['react', 'firebase']
---


## はじめに
つぶやきしかできないWebアプリを作りました。ReactでWebサービスを作りたい人はこのチュートリアルを読み進め、足りない機能を作ってみると良いでしょう。
![Screen Shot 2021-04-11 at 16.43.53.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/83242/7371c9ff-1563-aae6-640b-1791ee5391ba.png)


Demo: https://single-board-3c001.web.app/
Code: https://github.com/shuent/single-board
### Webアプリの機能
- ログイン
    - Googleアカウントかメールアドレスで認証。
- つぶやき一覧
- コメント投稿
    - 認証したユーザーのみ投稿できる

### 使用する技術・ライブラリなど
- React
    - Hooks
        - useReducer
    - ContextAPI
- TypeScript
- Create React App
- React Router 
- Firebase
    - Auth
    - Firestore
    - Hosting
- Chakra UI

#### Hooks
今どきなので、関数コンポーネントとHooksを使います。筆者は関数コンポーネントが出てからReactを勉強したので、Class時代のReactを書いたことがない。

#### TypeScript

- コンパイル時エラーを出してくれる
- IDEがコード補完しやすい

というメリットがあるので利用しています。初心者にとってコードを書く量が多くなるというデメリットを差し引いても、メリットが余りあります。

#### 状態管理
状態管理にはHooksのuseReducerと Context APIを利用して、Fluxの思想を取り入れます。Reduxは使いませんが、実装の流れとしては一緒なので使い方は一度見ておくと良さそうです。

#### UIライブラリ: Chakra UI
[Chakra UI](chakra-ui.com) は TailwindCSS のようなユーティリティベースなComponentを提供するUIライブラリです。Reactコンポーネントになっているので、Tailwindより使いやすく、Material UIなどのUIフレームワークよりは自由度があるので好きです。

#### Firebase
##### Firestore
今回はデータ構造が簡単なため、NoSQLであるFirestoreを利用します。NoSQLはDB設計に正解がないので難しく、複雑なリレーションを張るには向いてません。反面、バックエンドが要らず手軽に利用できるので、小規模で単純なデータ構造のアプリには使いやすいです。

##### Firebase Authentication
認証にはFirebase Authentication を利用します。tokenの管理などを裏でやってくれるので、とても楽です。さらに[Firebase UI](https://firebase.google.com/docs/auth/web/firebaseui?hl=ja)を使い、ログイン画面もほぼコード書かずに済みました。

##### Hosting
コマンド一つでデプロイ、urlを発行してくれます。今回はこれを使います

フロントエンドのホスティングサービスは他にもいろいろ出ています。Vercel, Netlify, Amplify. どれも簡単にデプロイできるので、試してみてください。

### 実装手順
1. 画面設計・機能を書き出す
1. データモデルの型を書き出す
1. コンポーネント構造を考える
1. 構造化して各フォルダ・ファイルを作る
1. 画面を実装する。表示するのはダミーデータ
1. ユーザー認証を実装
1. Flux(useReducer + Context)でつぶやきの状態管理を実装
1. firebaseから 読み取り、書き込みをできるようにする
1. firestoreのルールを実装する
1. デプロイする

次章から、ハンズオン形式でチュートリアルを書いていきます。コードを全て書いているわけではないので、説明が足りない部分は[Githubリポジトリを参照](https://github.com/shuent/single-board)してください。もしわからない部分があれば、質問していただけると記事の改善につながります。



## 画面設計・機能の書き出し
どんなアプリを作るにしても設計が大事です。まず一言で何を作るかを決めます。

- 「ちょっと見た目に気を使ったシンプルなつぶやき投稿アプリ: Single Board」

### 機能一覧

次にアプリに欲しい機能を決めます。Single Boardは世に出す意識がなかったので、最低限と練習したい機能をつけることにしました。

- 投稿一覧が見れる
- 投稿にはユーザー情報と作成日時、つぶやき内容を載せる
- ログインしないと投稿できない
- googleとメールアドレスでログインできる

### 画面設計
紙でもUIツールでもパワポでも、ラフで良いので、画面を作ります。実際作ったのがこのくらいラフ。笑　トップページと、投稿コンポーネントを描いています。
![IMG_2963.JPG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/83242/fe153e28-9362-c415-b4b9-011e5f4c9653.jpeg)
どうせUIライブラリに依存することになるので、丁寧にSketchやFigmaを使ってデザインする必要はないです。画面数が多い場合、雑にプロトタイプとしてFigmaかなんかで作ってみるのはアリ。

### 実装
ここからは実装していきます。まず、create-react-app(CRA)でプロジェクトを作成します。

```sh
npx create-react-app single-board --template typescript
```

CRAでは必要なライブラリが全部入っているので、設定なしにコードを書き始められます。eslintも入っています。

ただ、コードフォーマットツールのprettierはありません。自動でコードを綺麗に整形したい人はインストールしましょう。vscodeを使っている人は、prettierの拡張機能をインストールすればnpm installする必要がありません。`.prettierrc`で自分の設定でコードフォーマットしてくれます。
参考: 
https://create-react-app.dev/docs/setting-up-your-editor/#formatting-code-automatically
https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code-ja


手元でできた画面を確認してみてください。デフォルトの画面が立ち上がります。

```sh
npm start
```


プロジェクトフォルダの中の、基本的には`src/`の中にコードを書いていくことになります。
それぞれの初期ファイルの説明は公式ページを読んでみてください。
https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code-ja

## データモデルの型を書き出す
プロジェクトを作った時、何から書いていけば良いか迷いますよね。データモデルから書くことによって、データ中心にアプリを作っていけるのでおすすめです。今回は、

- つぶやき一覧でユーザー名とつぶやきのデータを表示する。
- つぶやきを投稿する

という機能に必要なデータモデルを定義します。`models.ts`というファイルを作成します。

```
.
└── src/
    └── models.ts
```

```models.ts
export type IUser = {
  displayName: string | null | undefined
  photoURL: string | null | undefined
}
export type IComment = {
  user: IUser
  content: string
  createdAt: Date
  id: string
}
export type ICommentAdd = {
  user: IUser
  content: string
}
```
表示に使う属性だけ定義します。

## コンポーネント構造を考える
次にView、見た目の部分を作っていきます。Reactで開発する上で大事な考え方が、コンポーネント志向です。画面を適切な役割ごとにコンポーネントで切り分けて実装することで可読性、保守性が上がります。

コンポーネントの種類には2種類あります。

- APIと通信したり、状態管理コードを呼んだり、状態を持っていたり、という副作用を持った実体コンポーネント
- 受け取ったpropsを表示する純粋な関数コンポーネント
  - (Hooksを使ってもそのコンポーネント内で閉じているものも含む)
    
私が今回アプリを作っていくときには、

- まず画面をざっくり前者の実体コンポーネント（と名付けてみる）で分けてみる。
- 実体コンポーネントを実装する中で共通化できそうなものは関数コンポーネントに分けてみる

という風に作っていきました。

```component構造.
- App
- Home
    - Header
    - Editor
    - CommentList
        - Comment
            - UserAvatar
            - Content
    - Footer
- Login
    - Header
    - Form

```


考え方としては、Atomic Designを参考に、簡易化しています。実体コンポーネント、関数コンポーネントはそれぞれ Organism, molecules に対応するかと思います。

大事なのは、難しく考えずだいたいで切り分けてあとで共通化する、ということです。最初からDRYでやるのは悪手です。

実装していきます。
## フォルダ・ファイルを構造化して作成する。
先に必要になりそうなファイルを全部作っていきます。

```shell
.
├── package-lock.json
├── package.json
├── public
├── src
│   ├── App.tsx # 各コンポーネントを呼び出す
│   ├── api # firestoreのインターフェース
│   │   └── commentsApi.ts
│   ├── components
│   │   ├── CommentList.tsx
│   │   ├── Editor.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── MainVisual.tsx
│   │   └── UserAvatar.tsx
│   ├── contexts 
│   │   ├── authContext.tsx # ユーザー認証状態管理
│   │   └── commentsContext.tsx #　つぶやきの状態管理
│   ├── reducers 
│   │   └── commentsReducer.ts #　つぶやきのFlux (あとで解説)
│   ├── firebase.ts
│   ├── index.tsx # App.tsxを呼び出しているだけ
│   ├── models.ts # データモデル
│   └── theme.ts # 全体UIの設定
└── tsconfig.json
```
## Viewを作る

UIライブラリの[Chakra UI](https://chakra-ui.com/docs/getting-started)をインストールします。

```sh
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

[react-router](https://reactrouter.com/)を使い、urlによって、トップ画面とログイン画面を出し分けます。公式ドキュメントではサンプルを動かせるので、めちゃわかりやすいです。

```sh
npm i react-router-dom
```

```tsx :App.tsx
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Login } from './components/Login'
import { Home } from './components/Home'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
```

```tsx :Home.tsx
import { CommentList } from './CommentList'
import { MainVisual } from './MainVisual'
import { Editor } from './Editor'
import { Footer } from './Footer'
export const Home = () => (
  <>
    <MainVisual /> // 一番上のメインビジュアル
    <Editor />  // つぶやき編集フォーム
    <CommentList /> // つぶやきリスト
    <Footer /> // フッター
  </>
)
```

ダミーデータを作り、とりあえず表示するの画面を作っていきます。

```tsx :CommentList.tsx
import { HStack, Box, Avatar, Heading, Text } from '@chakra-ui/react'
import { IComment, IUser } from '../models'

// ダミーデータ
const user1: IUser = { displayName: 'testuser1', photoURL: 'sample.jpg' }
const dcomments: IComment[] = [
    {
      user: user1,
      content:
        'first comment ss',
      createdAt: new Date(),
      id: 'comment1id',
    },
    {
      user: user1,
      content: '元気ですか',
      createdAt: new Date(),
      id: 'comment2id',
    },
  
export const CommentList = () => {
  return (
    <>
      <Heading>
        Posted Comments
      </Heading>
      <ul>
        {comments === [] ? (
          <p>No Post</p>
        ) : (
          // Comment 実装は省略
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />  
          ))
        )}
      </ul>
    </>
  )
}
```

省略したコンポーネントはレポジトリをみてみてください。

## 認証画面・機能を作成
ログイン画面を作っていきます。Firebase AuthenticationとFirebaseUIを使うことで簡単に実装できます。

### firebaseの設定
firebase consoleでプロジェクトを作成します。
https://console.firebase.google.com/u/0/?hl=ja

作成したら、プロジェクトの設定 > Firebase SDK snippet を取得します。
![Screen Shot 2021-04-12 at 20.51.40.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/83242/9dd9f80e-d9dc-7a45-2d1b-6d520b2c7993.png)



CRAは元々の設定で、`REACT_APP_`から始まる環境変数名を`.env`ファイルからアプリに組み込んでくれます。そして、ビルド時に値を埋め込んでくれます。これで外に変数が漏れることはありません。
https://create-react-app.dev/docs/adding-custom-environment-variables/

先ほど取得した値を変数として`.local.env`ファイルに宣言し、プロジェクトのルートにおきます。

```.env.local
  REACT_APP_APIKEY=xxxxxx
  REACT_APP_AUTHDOMAIN=xxxxxx
  REACT_APP_PROJECTID=xxxxxx
  REACT_APP_STORAGEBUCKET=xxxxxx
  REACT_APP_MESSAGINGSENDERID=xxxxxx
  REACT_APP_APPID=xxxxxx
  REACT_APP_MEASUREMENTID=xxxxxx
```

プロジェクト内では、firebaseを扱うファイルを作り、環境変数を埋めます。ついでにFirebaseの認証とデータベースにfirestoreを使うので、exportしておきます。

```src/firebase.ts
import firebase from 'firebase'

const fireConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
}
firebase.initializeApp(fireConfig)
const auth = firebase.auth()
const firedb = firebase.firestore()
export { firebase, auth, firedb }
```

### firebaseUIを導入
ログイン画面を作っていきます。
firebaseUIのReact用ライブラリがあるのでインストールします。

＊公式の開発者がストップしているみたいなので、canary版を使います。
https://github.com/firebase/firebaseui-web-react/pull/122

```sh
npm install react-firebaseui@canary
```

ログインコンポーネントを作ります。ログインフォームの挙動は`uiConfig`変数で設定します。

```tsx :src/Login.tsx
import { Center, Heading, VStack } from '@chakra-ui/layout'
import { primaryTextColor } from '../theme'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { firebase, auth } from '../firebase'

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

export const Login = () => {
  return (
    <Center mt={8}>
      <VStack>
        <Heading size='md' color={primaryTextColor}>
          Sign In
        </Heading>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </VStack>
    </Center>
  )
```

`<StyledFirebaseAuth firebaseAuth={auth} />`でプロジェクトのfirebaseインスタンスとUIをつなげています。

### AuthContextで認証状態管理
ログイン・登録ができるようになったので、セッション情報:(「ログインしているかどうか」と「ログインしているユーザー情報」)をアプリ内で使えるようにします

ユーザー認証の状態管理には、Context APIを使用します。流れとしては、Contextを作成し、Providerで状態を保存し、useContextで使います。
公式: https://ja.reactjs.org/docs/context.html

認証用のContextを扱う、`authContext.ts`を作成します。

```tsx :src/contexts/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { firebase, auth } from '../firebase'

type AuthContextProps = {
  user: firebase.User | null
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<firebase.User | any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

```

`auth.onAuthStateChanged`ではユーザーの認証状態を監視して、ログイン、ログアウト時、と認証情報が変わる度に引数に渡しているコールバック関数を実行します。
`Provider`をUnmountする時に監視を捨てる必要があるので、useEffectの返り値に設定してます。
https://firebase.google.com/docs/auth/web/manage-users?hl=ja

### セッションを使用する
今定義した関数を使い、アプリ上でセッションを取得できるようにしましょう。アプリ全体を`AuthProvider`で囲みます。これで囲んだどのコンポーネント内でも`useAuth()`が使えることになります。

```diff _tsx :App.tsx

...
import { AuthProvider } from './contexts/authContext'

function App() {
  return (
+    <AuthProvider>
       <ChakraProvider theme={theme}>
          <Router>
            <Header />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
            </Switch>
          </Router>
       </ChakraProvider>
+    </AuthProvider>
  )
}
```

ヘッダーでログインしている時はログアウトボタン、ログインしていないときはログインリンクを表示します。

```tsx :Header.tsx
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { auth } from '../firebase'

export const Header = () => {
  const { user } = useAuth()
  return (
  <>
    // ...省略
    {user ? (
      <Text as='button' onClick={() => auth.signOut()}>
        Log Out
      </Text>
    ) : (
      <Link to='/login'>
        <Text color='white'> Sign In</Text>
      </Link>
    )}
    // ...
  </>
  )

```

トップ画面のエディターでもログインしている時のみ投稿できるようにします。

```tsx :src/Editor.tsx
export const Editor = () => {
  const { user } = useAuth()
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content !== '' && user) {
      // post content to server
    } else if (!user) {
      alert('Sign in first')
    }
    setContent('')
  }
  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value)
  }

  return (
    <div>
      <VStack
        as='form'
        onSubmit={handleSubmit}
      >
        <Textarea
          name='content'
          value={content}
          onChange={handleChange}
          placeholder="What's on your mind?"
        />
        <Button type='submit' colorScheme='orange'>
          post
        </Button>
      </VStack>
    </div>
  )
}
```
これで認証状態管理は終わりです。

## つぶやきの状態管理
つぶやきの状態管理でもContextAPIを使い、状態を保持できるようにします。加えて、useReducerというHookを使いFluxアーキテクチャでの状態管理を行います。Contextだけでも管理できないことはないですが、状態を変更する機能が多くなってきた時に分かりやすいです。

reducerから定義していきます。

```ts :src/reducers/commentsReducer.ts
import { IComment } from '../models'

export type CommentsAction =
  | { type: 'SET_COMMENTS'; comments: IComment[] }
  | { type: 'ADD_COMMENT'; comment: IComment }

export type CommentsState = {
  comments: IComment[]
}

export const initialState: CommentsState = {
  comments: [],
}

export const commentsReducer = (
  state: CommentsState,
  action: CommentsAction
): CommentsState => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { comments: action.comments }
    case 'ADD_COMMENT':
      return { comments: [action.comment, ...state.comments] }
    default:
      return state
  }

```
後々firestoreにつぶやきを投稿したタイミングでまたつぶやきリストを取得するかストリーミングすれば最新の状態になるので、`ADD_COMMENT`はあってもなくても良いのですが、毎回APIを呼ばなくても良いようにと、練習のために作っています。

Contextを作ります。

```tsx :src/contexts/commentsContext.tsx
import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useContext,
} from 'react'
import {
  CommentsAction,
  commentsReducer,
  CommentsState,
  initialState,
} from '../reducers/commentsReducer'

type CommentsContextProps = {
  state: CommentsState
  dispatch: Dispatch<CommentsAction>
}

const CommentsContext = createContext<CommentsContextProps>({
  state: initialState,
  dispatch: () => initialState,
})

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(commentsReducer, initialState)
  return (
    <CommentsContext.Provider value={{ state, dispatch }}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useComments = () => useContext(CommentsContext)

```

EditorとCommentListで使うので、それらを含むHomeコンポーネントで囲んでおきます。

```diff _tsx :src/Home.tsx
export const Home = () => (
<>
+  <CommentsProvider>
     <MainVisual />
     <Editor />
     <CommentList />
     <Footer />
+  </CommentsProvider>
<>
)
```
フォーム送信時にDispatchします。

```tsx :src/components/Editor.tsx
export const Editor = () => {
  const { user } = useAuth()
  const { dispatch } = useComments()
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content !== '' && user) {
      const toPost: ICommentAdd = {
        user: { displayName: user.displayName, photoURL: user.photoURL },
        content,
      }
      dispatch({
        type: 'ADD_COMMENT',
        comment: {
          ...toPost,
          createdAt: new Date(),
          id: Date(),
        },
      })
    } else if (!user) {
      alert('Sign in first')
    }
    setContent('')
  }

return (...)
}
```

`useEffect`でコンポーネントを読み込むタイミングでDispatchします。

```tsx :src/components/CommentList.tsx
export const CommentList = () => {
  const { state, dispatch } = useComments()
  const dcomments: IComment[] = [
    {
      user: user1,
      content:
        'first comment',
      createdAt: new Date(),
      id: 'comment1id',
    },
    {
      user: user1,
      content: '元気ですか',
      createdAt: new Date(),
      id: 'comment2id',
    },
  ]

  useEffect(() => {
    let unmount = false
    if (!unmount) {
      console.log('set comments called')
      dispatch({ type: 'SET_COMMENTS', comments: dcomments })
    }
    return () => {
      unmount = true
    }
  }, [dispatch])

  return (...)
}
```
これでつぶやき（コメント）の状態管理は終わりです。

## firestore への read/write
firestore上でデータを管理できるようにします。

firebaseコンソールで firestoreを有効にします。


firestoreへのインターフェースを実装します。ここで実装することで、将来別のAPIを使った時にも　関数名、引数、返り値を同じにすることでView側を変更しなくても良いように、疎結合に実装します。もっと厳密にやるなら[interfaceを定義](https://typescript-jp.gitbook.io/deep-dive/type-system/interfaces)したり、[Dipendency Injection](https://qiita.com/yoshinori_hisakawa/items/a944115eb77ed9247794)をすることになります。

```tsx :src/api/commentsApi.ts
import { firedb, firebase } from '../firebase'
import { IComment, ICommentAdd } from '../models'

export const getComments = async () => {
  const snapShot = await firedb
    .collection('comments')
    .orderBy('createdAt', 'desc')
    .get()
  const data = snapShot.docs.map<IComment>((doc) => ({
    user: doc.data().user,
    content: doc.data().content,
    createdAt: doc.data().createdAt.toDate(),
    id: doc.id,
  }))
  return data
}

export const addComment = async (comment: ICommentAdd) => {
  return firedb.collection('comments').add({
    user: comment.user,
    content: comment.content,
    createdAt: firebase.firestore.Timestamp.now(),
  })

```

使用時には、主にDispatch呼び出し前におき、結果をDispatchに渡します。

コメントリスト

```diff _tsx :src/components/CommentList.tsx
export const CommentList = () => {
  const {
    state: { comments },
    dispatch,
  } = useComments()
  useEffect(() => {
+    getComments().then((data) => {
+      dispatch({ type: 'SET_COMMENTS', comments: data })
+    })
  }, [dispatch])

  return (...)
}
```

エディター

```diff _tsx :src/components/Editor.tsx
export const Editor = () => {
  const { user } = useAuth()
  const { dispatch } = useComments()
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content !== '' && user) {
      const toPost: ICommentAdd = {
        user: { displayName: user.displayName, photoURL: user.photoURL },
        content,
      }
+      addComment({ ...toPost })
      dispatch({
        type: 'ADD_COMMENT',
        comment: {
          ...toPost,
          createdAt: new Date(),
          id: Date(),
        },
      })
    } else if (!user) {
      alert('Sign in first')
    }
    setContent('')
  }
```
ブラウザでつぶやいてみると、firestoreにもデータが追加されているのが分かります
![Screen Shot 2021-04-12 at 22.43.22.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/83242/9b5833c3-2de5-170a-0bf0-8081629484cb.png)

### firestore rule
`Editor Component`で、ユーザーではない場合投稿できないようにしましたが、直接APIを知られてしまった場合、投稿できてしまいます。さらに今のままだと投稿するユーザー名を偽装して、本人以外の名を騙り投稿できてしまいます。

そのようなことがないように、コンソールで`rule`を書くことで、セキュリティを守ります。ローカル環境で書いてデプロイすることも可能ですが、ここではコンソールに直接書いてます。

![Screen Shot 2021-04-12 at 22.53.16.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/83242/ff943624-ae5d-6233-3d19-49ac593774d4.png)

左下のルールプレイグラウンドでは、いろいろな条件でルールをテストできるので、試してみると良いです。

今回のルールはこちら

- 'comments'以外のリソースにアクセスできない
- (ログインしてなくても)誰でも読めるようにする
- ユーザー名と一致する投稿のみ受け付ける。
- 更新、削除は受け付けない

```firestore.rule
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      match /comments/{comment} {
        allow read: if true;
        allow create: if request.auth.token.name == request.resource.data.user.displayName
      }
    }
  }
}
```
公式: https://firebase.google.com/docs/rules/basics?hl=ja

## Firebase Hosting へデプロイ

ここまででアプリが完成したらFirebase Hostingサービスにデプロイします。

コンソールからHostingを有効にします。



```sh
# firebase cliをインストールして、deployコマンドを使えるようにします。
npm install -g firebase-tools
# 認証してコンソールで作ったプロジェクトを選択します。
firebase login
```

firebaseのファイルを作成します。

```sh
firebase init
```
いろいろ聞かれます。Hostingだけ選択し、
What do you want to use as your public directory? には `build`を指定します。
あとは好きなものを選んでください。

最終的にこんなファイルができていれば大丈夫です。

```firebase.json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

Githubと連携してCICDやプルリクでデプロイしてくれるのですが、その設定は扱いません。調べてみてください。

プロジェクトをビルド後、デプロイします！

```sh
npm run build
firebase deploy --only hosting
```

うまくいけば、ターミナルに出てくるurlがデプロイ先です！！！

## 終わりに

今回作ったアプリにはつぶやきの削除、ユーザー設定、ユーザーページなど機能が足りません。ここまで読んでくれた方はこれを発展させて、改造させて、面白いものを作ってみてください。もし作った時はコメントから報告してくれると嬉しいです。

初めて包括的な記事を書いたので足りないところはあると思いますが、楽しんでいただけたら何らかのアクションをしてくれると嬉しいです。ここまで読んでくれてありがとうございました。次回はもうちょっと高度なことか、コンポーネント設計に関することを書きたいと思います。
