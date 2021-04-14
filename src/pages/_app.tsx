// import App from 'next/app'
import 'src/styles/global.scss'
import 'src/styles/prism.css'
import { AppProps /*, AppContext */ } from 'next/app'
import Link from 'next/link'
import { Wrapper } from 'src/components/Wrapper'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Wrapper>
      <div>
        <Link href="/">Go Top</Link>
      </div>
      <Component {...pageProps} />
    </Wrapper>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
