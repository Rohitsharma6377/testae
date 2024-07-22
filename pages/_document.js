// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.png" />
          {/* <!-- Google tag (gtag.js) --> */}
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-LGKQM3G7X6"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LGKQM3G7X6');
          </script>

          <meta name="google-site-verification" content="FELfso2g9xC9Wy_vCQKHKg-rrmsO9qxf5g5NDLq9L7c" /> */}
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
