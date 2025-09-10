import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Character Set */}
          <meta charSet="utf-8" />
          
          {/* Primary Meta Tags - Updated for Santa Fe Birding */}
          <meta name="description" content="Expert birding tours and bird watching experiences in Santa Fe, New Mexico. Join professional guide Chris Chappell for personalized birding adventures, educational group tours, and field-based classes." />
          <meta name="keywords" content="Santa Fe birding, bird watching Santa Fe, guided birding tours, New Mexico birding, birding tours Santa Fe, Chris Chappell, bird watching New Mexico, Santa Fe nature tours" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://santafebirding.com" />
          <meta property="og:title" content="Santa Fe Birding - Expert Guided Bird Watching Tours in New Mexico" />
          <meta property="og:description" content="Expert birding tours and bird watching experiences in Santa Fe, New Mexico. Professional guide Chris Chappell offers personalized birding adventures and educational tours." />
          <meta property="og:image" content="https://santafebirding.com/images/hero-birding.jpg" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://santafebirding.com" />
          <meta property="twitter:title" content="Santa Fe Birding - Expert Guided Bird Watching Tours in New Mexico" />
          <meta property="twitter:description" content="Expert birding tours and bird watching experiences in Santa Fe, New Mexico. Professional guide Chris Chappell offers personalized birding adventures and educational tours." />
          <meta property="twitter:image" content="https://santafebirding.com/images/hero-birding.jpg" />

          {/* Canonical URL */}
          <link rel="canonical" href="https://santafebirding.com" />

          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap"
            as="style"
          />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap"
            as="style"
          />
          
          {/* Add preconnect hints */}
          <link 
            rel="preconnect" 
            href="https://fonts.googleapis.com" 
            crossOrigin="anonymous"
          />
          <link 
            rel="preconnect" 
            href="https://fonts.gstatic.com" 
            crossOrigin="anonymous"
          />

          {/* Load fonts */}
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap"
            rel="stylesheet"
          />
          <link 
            href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap"
            rel="stylesheet"
          />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
} 