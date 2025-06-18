import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { theme } from '@/config/theme'
import { images } from '@/config/images'
import { content } from '@/config/content'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height - accounts for Safari bars */
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: hidden;
`

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  
  /* Mobile-specific background centering */
  @media (max-width: ${theme.breakpoints.md}) {
    img {
      object-position: center center !important;
    }
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  z-index: -1;
`

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 100px auto;
  padding: 0 ${theme.spacing.md} ${theme.spacing['2xl']} ${theme.spacing.md};
  color: ${theme.colors.text.light};
  z-index: 10;
  text-align: left;
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: 100px;
    padding-bottom: ${theme.spacing.xl};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: 100px;
  }
`

const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes['6xl']};
  margin-bottom: ${theme.spacing.sm};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
  
  /* Animation */
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease-out 0.3s forwards;

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.fontSizes['5xl']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['4xl']};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${theme.fontSizes.base};
  margin-bottom: 0;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  line-height: 1.4;
  max-width: 600px;
  
  /* Animation */
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease-out 0.6s forwards;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.base};
    max-width: 90%;
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${theme.spacing.sm};
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease-out 2.5s forwards, ${bounce} 2s infinite 3.5s;
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.md}) {
    bottom: ${theme.spacing.xs};
    left: calc(50% - 25px); /* Mobile-only: slight left adjustment for centering */
  }
`

const ScrollArrow = styled.div`
  width: 24px;
  height: 24px;
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  transform: rotate(45deg);
  margin: 0 auto 8px auto;
`

const ScrollText = styled.span`
  color: rgba(255, 255, 255, 0.2);
  font-size: ${theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  display: block;
  text-align: center;
`

export function Hero() {
  const handleScrollClick = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <HeroSection id="hero">
      <HeroBackground>
        <Image
          src={images.hero}
          alt="A flock of birds flying over a mountain range in Bosque del Apache"
          fill
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center 90%'
          }}
          priority
          sizes="100vw"
        />
      </HeroBackground>
      <HeroOverlay />
      <HeroContent>
        <HeroTitle>
          {content.hero.title.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index === 0 && <br />}
            </span>
          ))}
        </HeroTitle>
        <HeroSubtitle>
          {content.hero.subtitle}
        </HeroSubtitle>
      </HeroContent>
      
      <ScrollIndicator onClick={handleScrollClick}>
        <ScrollArrow />
        <ScrollText>Scroll</ScrollText>
      </ScrollIndicator>
    </HeroSection>
  )
} 
