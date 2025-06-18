import styled from 'styled-components'
import { theme } from '@/config/theme'

const FooterContainer = styled.footer`
  background-color: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
  text-align: center;
  padding: ${theme.spacing.lg} 0;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`

const FooterText = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  opacity: 0.9;
`

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          © {currentYear} Take Flight Birding and Nature Adventures. All rights reserved.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  )
} 