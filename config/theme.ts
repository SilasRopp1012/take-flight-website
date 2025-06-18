export const theme = {
  colors: {
    primary: '#000000',      // almost black dark brown – bold and professional
    secondary: '#5E4533',    // classic dark brown – ideal for buttons or highlights
    accent: '#63AEE6',       // Soft sky blue – light and open, for backgrounds or tags
  
    text: {
      primary: '#1C1C1C',     // Very dark gray – strong contrast for body text
      secondary: '#4A4A4A',   // Medium gray – good for subtext or descriptions
      light: '#FFFFFF',       // White – used on dark backgrounds or buttons
    },
  
    background: {
      primary: '#FFFFFF',     // Clean white – base background
      secondary: '#F3F6FA',   // Very light blue-gray – section contrast
      accent: '#F6F7F9',      // Neutral off-white – card or callout sections
    }
  }  
  ,
  fonts: {
    heading: "'Marcellus', serif",
    body: "'Inter', sans-serif"
  },
  fontSizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '4rem',     // 64px
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '6rem',  // 96px
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
}

export type Theme = typeof theme 