import { createGlobalStyle } from 'styled-components'
import { theme } from '@/config/theme'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.primary};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    line-height: 1.2;
    margin-bottom: ${theme.spacing.sm};
  }

  h1 {
    font-size: ${theme.fontSizes['5xl']};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['4xl']};
    }
  }

  h2 {
    font-size: ${theme.fontSizes['4xl']};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['3xl']};
    }
  }

  h3 {
    font-size: ${theme.fontSizes['3xl']};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['2xl']};
    }
  }

  p {
    margin-bottom: ${theme.spacing.sm};
    font-size: ${theme.fontSizes.lg};
    line-height: 1.7;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  section {
    scroll-margin-top: 80px; /* Account for sticky header */
  }
` 