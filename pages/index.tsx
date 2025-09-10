import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/config/theme'
import { GlobalStyles } from '@/styles/globalStyles'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Tours } from '@/sections/Services'
import { Contact } from '@/sections/Contact'
import { Testimonials } from '@/sections/Testimonials'
import { Gallery } from '@/sections/Gallery'

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TourismBusiness",
    "name": "Santa Fe Birding",
    "image": "https://santafebirding.com/images/hero-birding.jpg",
    "description": "Expert guided birding tours and bird watching experiences in Santa Fe, New Mexico. Professional guide Chris Chappell offers personalized birding adventures, group tours, and educational classes.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santa Fe",
      "addressRegion": "NM",
      "addressCountry": "US"
    },
    "url": "https://santafebirding.com",
    "telephone": "+1-505-310-3205",
    "priceRange": "$$",
    "openingHours": "Mo-Su",
  }

  return (
    <>
      <Head>
        <title>Santa Fe Birding - Expert Guided Bird Watching Tours in New Mexico</title>
        <meta name="description" content="Professional birding tours and bird watching experiences in Santa Fe, New Mexico. Expert guide Chris Chappell offers personalized birding adventures, group tours, and educational classes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Santa Fe Birding - Expert Guided Tours in New Mexico" />
        <meta property="og:description" content="Professional birding tours and bird watching experiences in Santa Fe, New Mexico with expert guide Chris Chappell." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://santafebirding.com" />
        
        {/* Local business schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Take Flight Birding and Nature Adventures",
            "alternateName": "Santa Fe Birding Tours",
            "description": "Expert guided birding tours and bird watching experiences in Santa Fe, New Mexico",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Santa Fe",
              "addressRegion": "NM"
            },
            "telephone": "(505)-310-3205",
            "areaServed": {
              "@type": "City",
              "name": "Santa Fe"
            }
          })}
        </script>
        
        {/* Favicon - Bird icons created by PLANBSTUDIO - Flaticon (https://www.flaticon.com/free-icons/bird) */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Hero />
        <About />
        <Tours />
        <Testimonials />
        <Gallery />
        <Contact />
        <Footer />
      </ThemeProvider>
    </>
  )
} 