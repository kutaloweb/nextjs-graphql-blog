import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.scss';
import Head from 'next/head';

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                <title>Blog</title>
                {<script dangerouslySetInnerHTML={{__html: noOverlayWorkaroundScript}}/>}
            </Head>
            <Component {...pageProps} />
        </>
    );
}
export default MyApp;
