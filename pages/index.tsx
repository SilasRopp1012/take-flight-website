import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/config/theme'
import { GlobalStyles } from '@/styles/globalStyles'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Tours } from '@/sections/Tours'
import { Contact } from '@/sections/Contact'
import { Testimonials } from '@/sections/Testimonials'

export default function Home() {
  return (
    <>
      <Head>
        <title>Take Flight Birding and Nature Adventures</title>
        <meta name="description" content="Guided birding and nature tours with heart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Take Flight Birding and Nature Adventures" />
        <meta property="og:description" content="Expert-guided birding tours in New Mexico" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        
        {/* Local business schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Take Flight Birding and Nature Adventures",
            "description": "Guided birding tours in New Mexico",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Santa Fe",
              "addressRegion": "NM"
            },
            "email": "chris.chappell4@gmail.com",
            "telephone": "(505)-310-3205"
          })}
        </script>
        
        {/* Favicon - Bird icons created by PLANBSTUDIO - Flaticon (https://www.flaticon.com/free-icons/bird) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Hero />
        <About />
        <Tours />
        <Testimonials />
        <Contact />
        <Footer />
      </ThemeProvider>
    </>
  )
} 