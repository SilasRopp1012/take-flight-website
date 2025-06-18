import Image from 'next/image'
import styled from 'styled-components'
import { theme } from '@/config/theme'
import { images } from '@/config/images'
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

const AboutContent = styled.div<{ progress: number }>`
  opacity: ${props => Math.max(0, Math.min(1, props.progress))};
  transform: translateX(${props => (1 - props.progress) * -50}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;

  @media (max-width: ${theme.breakpoints.lg}) {
    transform: translateY(${props => (1 - props.progress) * 50}px);
  }

  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.secondary};
  }
`

const AboutTitle = styled.h2<{ progress: number }>`
  opacity: ${props => Math.max(0, Math.min(1, (props.progress - 0.1) * 2))};
  transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.progress - 0.1) * 2))) * 50}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const AboutParagraph = styled.p<{ progress: number; delay: number }>`
  opacity: ${props => Math.max(0, Math.min(1, (props.progress - props.delay) * 3))};
  transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.progress - props.delay) * 3))) * 50}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const AboutImageContainer = styled.div<{ progress: number }>`
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  opacity: ${props => Math.max(0, Math.min(1, props.progress * 1.2))};
  transform: translateX(${props => (1 - props.progress) * 50}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;

  @media (max-width: ${theme.breakpoints.lg}) {
    order: -1;
    height: 400px;
    transform: translateY(${props => (1 - props.progress) * 50}px);
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
      
      // Calculate progress based on how much of the section is visible
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
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
    <AboutSection id="about" ref={sectionRef}>
      <Container>
        <AboutGrid>
          <AboutContent progress={scrollProgress}>
            <AboutTitle progress={scrollProgress}>About Me</AboutTitle>
            <AboutParagraph progress={scrollProgress} delay={0.1}>
              Hi! I'm Chris, and birding has been a passion of mine for over 50 years. 
              I grew up in Washington state where I learned to "bird by ear" at the age of 12, a skill
              that I have been honing ever since.
            </AboutParagraph>
            <AboutParagraph progress={scrollProgress} delay={0.2}>
              I studied ornithology intensively during my undergraduate years and worked as a field ornithologist throughout my 20s.
              I later earned a master's degree in Forest Ecology and spent many years working as a Vegetation Ecologist with the 
              Washington Natural Heritage Program, where I focused on conservation and ecological research.
            </AboutParagraph>
            <AboutParagraph progress={scrollProgress} delay={0.3}>
              Since moving to the Southwest in 2007, I have been extensively exploring northern New Mexico and its incredible birdlife.
              Today, I bring together decades of experience in bird behavior, habitat, vegetation, and ecosystems to offer 
              guided trips that are as informative as they are immersive. I also regularly volunteer leading bird walks at the 
              Randall Davey Audubon Center.
            </AboutParagraph>
            <AboutParagraph progress={scrollProgress} delay={0.4}>
            Most of my tours are within a day's drive of Santa Fe, though I occasionally lead overnight trips to special places by request,
            including Bosque del Apache and the Bitter Lake/Roswell area.
            </AboutParagraph>
          </AboutContent>
          <AboutImageContainer progress={scrollProgress}>
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