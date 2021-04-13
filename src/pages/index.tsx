import Head from 'next/head'
import Link from 'next/link'

const siteName = 'Shuent Dev'

export const Home = (): JSX.Element => (
  <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>{siteName}</h1>
    <h2>Links</h2>
    <ul>
      <li>
        <Link href="/works">works</Link> - somthing like portfolio
      </li>
      <li>
        <Link href="/blog">blog</Link> - tutorial, poem, thoughts.
      </li>
      <li>
        <Link href="/misc">misc</Link> - counts for nothing but scribble
      </li>
    </ul>
    <div>
      <h2>Author</h2>
      <p>フロントエンドがメインのエンジニア</p>
      <a
        href="https://twitter.com/shunta10m"
        target="_blank"
        rel="noopener noreferrer"
      >
        @shunta10m
      </a>
    </div>
    <style jsx global>{`
      html,
      body {
        font-family: Lucida Console, Courier, monospace;
      }
    `}</style>
  </>
)

export default Home
