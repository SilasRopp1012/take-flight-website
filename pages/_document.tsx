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
          
          {/* Primary Meta Tags - Enhanced from your existing ones */}
          <meta name="description" content="Expert birding tours and nature adventures in New Mexico. Join professional guide Chris Chappell for personalized birding experiences, educational group tours, and field-based classes." />
          <meta name="keywords" content="birding, nature tours, bird watching, guided tours, New Mexico birding, Chris Chappell, Albuquerque birding, Santa Fe birding" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://takeflightbirding.com" />
          <meta property="og:title" content="Take Flight Birding and Nature Adventures" />
          <meta property="og:description" content="Expert birding tours and nature adventures in New Mexico. Professional guide Chris Chappell offers personalized experiences and educational tours." />
          <meta property="og:image" content="https://takeflightbirding.com/images/hero-birding.jpg" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://takeflightbirding.com" />
          <meta property="twitter:title" content="Take Flight Birding and Nature Adventures" />
          <meta property="twitter:description" content="Expert birding tours and nature adventures in New Mexico. Professional guide Chris Chappell offers personalized experiences and educational tours." />
          <meta property="twitter:image" content="https://takeflightbirding.com/images/hero-birding.jpg" />

          {/* Canonical URL */}
          <link rel="canonical" href="https://takeflightbirding.com" />

          {/* Your existing Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&family=Marcellus&display=swap"
            rel="stylesheet"
          />
          <link 
            href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap"
            rel="stylesheet"
          />
          
          {/* Favicon - Bird icons created by PLANBSTUDIO - Flaticon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
} 