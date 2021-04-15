// import App from 'next/app'
import 'src/styles/global.scss'
import { AppProps /*, AppContext */ } from 'next/app'
import Link from 'next/link'
import { Wrapper } from 'src/components/Wrapper'
import { siteConfig } from 'src/constants'
import { useRouter } from 'next/dist/client/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isRoot = useRouter().pathname === '/'

  return (
    <Wrapper>
      {!isRoot && (
        <div>
          <Link href="/">{siteConfig.title}</Link>
        </div>
      )}
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default MyApp
