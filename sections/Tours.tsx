import Image from 'next/image'
import styled from 'styled-components'
import { theme } from '@/config/theme'
import { images } from '@/config/images'
import { content } from '@/config/content'
import { useRef, useEffect, useState } from 'react'

const ToursSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.primary};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg} 0;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} 0;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`

const SectionHeader = styled.div<{ $progress: number }>`
  text-align: right;
  margin-bottom: ${theme.spacing['2xl']};
  opacity: ${props => Math.max(0, Math.min(1, props.$progress * 1.5))};
  transform: translateY(${props => (1 - Math.max(0, Math.min(1, props.$progress * 1.5))) * 30}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;

  h2 {
    color: ${theme.colors.primary};
    font-size: ${theme.fontSizes['5xl']};
    margin-bottom: ${theme.spacing.md};
  }
`

const ToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`

const TourCard = styled.div.attrs<{ $progress: number; $delay: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - props.$delay) * 2)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - props.$delay) * 2))) * 50}px)`,
  },
}))<{ $progress: number; $delay: number }>`
  position: relative;
  height: 550px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.$progress - props.$delay) * 2))) * 50 - 5}px) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: ${theme.breakpoints.lg}) {
    height: 500px;
    
    &:hover {
      transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.$progress - props.$delay) * 2))) * 30 - 5}px) !important;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 450px;
  }
`

const CardBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 2;
  transition: background 0.8s ease-in-out;

  ${TourCard}:hover & {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.3) 30%,
      rgba(0, 0, 0, 0.6) 70%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }
`

const CardContent = styled.div`
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing['2xl']};
  color: ${theme.colors.text.light};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
`

const CardTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 600;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
    margin-bottom: ${theme.spacing.md};
  }
`

const TourFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: ${theme.colors.text.light};
    margin-bottom: ${theme.spacing.sm};
    padding-left: ${theme.spacing.md};
    position: relative;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    opacity: 0.95;
    font-size: ${theme.fontSizes.sm};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes.xs};
      margin-bottom: ${theme.spacing.xs};
    }

    &:before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${theme.colors.text.light};
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const CardDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.lg};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  opacity: 0.95;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.sm};
    margin-bottom: ${theme.spacing.md};
  }
`

const ArrowButton = styled.button`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 4;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    transform: translateX(3px);
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${theme.colors.text.light};
    transition: all 0.3s ease;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
  }

  &:hover svg {
    color: ${theme.colors.accent};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 28px;
    height: 28px;
    bottom: ${theme.spacing.sm};
    right: ${theme.spacing.sm};

    svg {
      width: 20px;
      height: 20px;
    }
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

  // Define images for each tour
  const tourImages = [
    '/images/tours-birding.jpg',
    '/images/tours-birding-2.jpg', 
    '/images/tours-birding-3.jpg'
  ]

  // Define features for each tour type
  const tourFeatures = [
    ['One-on-one or small groups', 'Flexible scheduling', 'Customized to your interests', 'All skill levels welcome'],
    ['Regularly scheduled tours', 'Meet fellow birders', 'Educational insights', 'Group learning experience'],
    ['Hands-on field learning', 'Bird identification skills', 'Behavior observation', 'Habitat understanding']
  ]

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <ToursSection id="tours" ref={sectionRef}>
      <Container>
        <SectionHeader $progress={scrollProgress}>
          <h2>{content.tours.title}</h2>
        </SectionHeader>
        
        <ToursGrid>
          {content.tours.offerings.map((offering, index) => (
            <TourCard 
              key={offering.id} 
              $progress={scrollProgress}
              $delay={0.1 + (index * 0.1)}
              onClick={handleContactClick}
            >
              <CardBackground>
                <Image
                  src={tourImages[index]}
                  alt={offering.title}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    transform: index === 0 ? 'scale(1.3) translateX(10%) translateY(-5%)' : 'scale(1)'
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </CardBackground>
              <CardOverlay />
              
              <CardContent>
                <CardTitle>{offering.title}</CardTitle>
                <TourFeatures>
                  {tourFeatures[index].map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </TourFeatures>
              </CardContent>

              <ArrowButton onClick={handleContactClick}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </ArrowButton>
            </TourCard>
          ))}
        </ToursGrid>
      </Container>
    </ToursSection>
  )
} 