// import App from 'next/app'
import 'src/styles/global.css'
import { AppProps /*, AppContext */ } from 'next/app'
import Link from 'next/link'
import { siteConfig } from 'src/constants'
import { useRouter } from 'next/dist/client/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isRoot = useRouter().pathname === '/'

  return (
    <>
      {!isRoot && (
        <div>
          <Link href="/">{siteConfig.title}</Link>
        </div>
      )}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
