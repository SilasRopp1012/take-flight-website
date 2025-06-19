import Image from 'next/image'
import styled from 'styled-components'
import { theme } from '@/config/theme'
import { images } from '@/config/images'
import { content } from '@/config/content'
import { useRef, useEffect, useState } from 'react'

const AboutSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background-color: ${theme.colors.background.primary};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  align-items: center;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`

// Mobile-only title component - shows first on mobile
const MobileTitleContainer = styled.div`
  display: none;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    display: block;
    order: -1;
    text-align: center;
    margin-bottom: ${theme.spacing.xl};
  }
`

const MobileTitle = styled.h2.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - 0.1) * 2)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - 0.1) * 2))) * 50}px)`,
  },
}))<{ $progress: number }>`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes['5xl']};
  font-family: ${theme.fonts.heading};
  margin: 0;
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const AboutContent = styled.div.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, props.$progress)),
    transform: `translateX(${(1 - props.$progress) * -50}px)`,
  },
}))<{ $progress: number }>`
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;

  @media (max-width: ${theme.breakpoints.lg}) {
    transform: translateY(${props => (1 - props.$progress) * 50}px) !important;
    order: 2;
  }

  h2 {
    color: ${theme.colors.primary};
    font-size: ${theme.fontSizes['5xl']};
    margin-bottom: ${theme.spacing.lg};
    
    @media (max-width: ${theme.breakpoints.lg}) {
      display: none;
    }
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.secondary};
  }
`

const AboutTitle = styled.h2.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - 0.1) * 2)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - 0.1) * 2))) * 50}px)`,
  },
}))<{ $progress: number }>`
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const AboutParagraph = styled.p.attrs<{ $progress: number; $delay: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - props.$delay) * 3)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - props.$delay) * 3))) * 50}px)`,
  },
}))<{ $progress: number; $delay: number }>`
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const AboutImageContainer = styled.div.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, props.$progress * 1.2)),
    transform: `translateX(${(1 - props.$progress) * 50}px)`,
  },
}))<{ $progress: number }>`
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;

  @media (max-width: ${theme.breakpoints.lg}) {
    height: 400px;
    transform: translateY(${props => (1 - props.$progress) * 50}px) !important;
    order: 1;
  }
`

export function About() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      const startPoint = windowHeight * 0.8
      const endPoint = windowHeight * 0.2
      
      let progress = 0
      
      if (rect.top <= startPoint && rect.top >= endPoint) {
        progress = (startPoint - rect.top) / (startPoint - endPoint)
      } else if (rect.top < endPoint) {
        progress = 1
      }
      
      progress = Math.max(0, Math.min(1, progress))
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <AboutSection id="about" ref={sectionRef}>
      <Container>
        <AboutGrid>
          {/* Mobile-only title - shows first on mobile */}
          <MobileTitleContainer>
            <MobileTitle $progress={scrollProgress}>{content.about.title}</MobileTitle>
          </MobileTitleContainer>
          
          {/* Desktop: content with title, Mobile: content without title (shows after image) */}
          <AboutContent $progress={scrollProgress}>
            <AboutTitle $progress={scrollProgress}>{content.about.title}</AboutTitle>
            {content.about.paragraphs.map((paragraph, index) => (
              <AboutParagraph key={index} $progress={scrollProgress} $delay={0.1 + (index * 0.1)}>
                {paragraph}
              </AboutParagraph>
            ))}
          </AboutContent>
          
          {/* Image - shows second on mobile */}
          <AboutImageContainer $progress={scrollProgress}>
            <Image
              src={images.about}
              alt="A photo of Chris with binoculars in the field"
              fill
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center 30%'
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </AboutImageContainer>
        </AboutGrid>
      </Container>
    </AboutSection>
  )
} 