import Image from 'next/image'
import styled from 'styled-components'
import { theme } from '@/config/theme'
import { images } from '@/config/images'
import { content } from '@/config/content'
import { useRef, useEffect, useState } from 'react'

const ToursSection = styled.section`
  position: relative;
  padding: ${theme.spacing['3xl']} 0;
  background-color: ${theme.colors.background.primary};
  overflow: hidden;
`

const BackgroundImage = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: ${props => 0.7 + (props.progress * 0.3)};
  transform: scale(${props => 1 + (props.progress * 0.05)});
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 2;
`

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  z-index: 3;
`

const SectionHeader = styled.div<{ progress: number }>`
  text-align: right;
  margin-bottom: ${theme.spacing['2xl']};
  opacity: ${props => Math.max(0, Math.min(1, props.progress * 1.5))};
  transform: translateY(${props => (1 - Math.max(0, Math.min(1, props.progress * 1.5))) * 30}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;

  h2 {
    color: ${theme.colors.text.light};
    font-size: ${theme.fontSizes['6xl']};
    margin-bottom: 0;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`

const ToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`

const TourItem = styled.div<{ progress: number; delay: number }>`
  text-align: left;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease, opacity 0.1s ease-out, transform 0.1s ease-out;
  opacity: ${props => Math.max(0, Math.min(1, (props.progress - props.delay) * 2))};
  transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.progress - props.delay) * 2))) * 50}px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.progress - props.delay) * 2))) * 50 - 5}px);
  }
  
  @media (max-width: ${theme.breakpoints.lg}) {
    transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.progress - props.delay) * 2))) * 30}px);
    
    &:hover {
      transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.progress - props.delay) * 2))) * 30 - 5}px);
    }
  }
`

const TourContent = styled.div`
  h3 {
    color: ${theme.colors.text.light};
    font-size: ${theme.fontSizes.xl};
    margin-bottom: ${theme.spacing.md};
    font-weight: 600;
    line-height: 1.3;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: ${theme.fontSizes.base};
    line-spacing: ${theme.spacing.md};
    line-height: 1.6;
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
`

export function Tours() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress based on how much of the section is visible
      const sectionTop = rect.top
      
      // Start animation when section enters viewport, complete when it's centered
      const startPoint = windowHeight * 0.8 // Start when 80% down the viewport
      const endPoint = windowHeight * 0.2   // Complete when 20% down the viewport
      
      let progress = 0
      
      if (sectionTop <= startPoint && sectionTop >= endPoint) {
        // Calculate progress between 0 and 1
        progress = (startPoint - sectionTop) / (startPoint - endPoint)
      } else if (sectionTop < endPoint) {
        // Fully visible
        progress = 1
      }
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress))
      
      setScrollProgress(progress)
    }

    // Initial calculation
    handleScroll()
    
    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ToursSection id="tours" ref={sectionRef}>
      <BackgroundImage progress={scrollProgress}>
        <Image
          src={images.tours}
          alt="Beautiful birding landscape in New Mexico"
          fill
          style={{ objectFit: 'cover' }}
          quality={85}
        />
      </BackgroundImage>
      <BackgroundOverlay />
      
      <Container>
        <SectionHeader progress={scrollProgress}>
          <h2>{content.tours.title}</h2>
        </SectionHeader>
        
        <ToursGrid>
          {content.tours.offerings.map((offering, index) => (
            <TourItem 
              key={offering.id} 
              progress={scrollProgress}
              delay={0.1 + (index * 0.1)} // Stagger: 0.1, 0.2, 0.3
            >
              <TourContent>
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
              </TourContent>
            </TourItem>
          ))}
        </ToursGrid>
      </Container>
    </ToursSection>
  )
} 