import Head from 'next/head'
import Link from 'next/link'
import { siteConfig } from 'src/constants'

const Home = () => (
  <>
    <Head>
      <title>{siteConfig.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>{siteConfig.title}</h1>
    <ul>
      <li>
        <Link href="/works">works</Link> - somthing like portfolio
      </li>
      <li>
        <Link href="/blog">blog</Link> - tutorial, poem, thoughts.
      </li>
    </ul>
    <div>
      <h3>Author</h3>
      <p>Freelance Frontend Engineer. DM me in Twitter for Contact</p>
      <a
        href="https://twitter.com/shunta10m"
        target="_blank"
        rel="noopener noreferrer"
      >
        @shunta10m
      </a>
    </div>
  </>
)

export default Home
