import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '@/config/theme'
import { content } from '@/config/content'

const TestimonialsSection = styled.section`
  padding: 12rem 0 8rem;
  background-color: ${theme.colors.background.primary};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 10rem 0 6rem;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 8rem 0 4rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`

const SectionHeader = styled.div<{ $progress: number }>`
  text-align: left;
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

const ScrollContainer = styled.div<{ $progress: number }>`
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  opacity: ${props => Math.max(0, Math.min(1, (props.$progress - 0.2) * 2))};
  transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.$progress - 0.2) * 2))) * 40}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  scroll-behavior: smooth;
  
  /* Fade edges */
  mask: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
`

const TestimonialsWrapper = styled.div<{ $isPaused: boolean }>`
  display: flex;
  gap: ${theme.spacing['2xl']};
  width: fit-content;
  padding: ${theme.spacing.md} 0;
  animation: infiniteScroll 80s linear infinite;
  animation-play-state: ${props => props.$isPaused ? 'paused' : 'running'};
  
  @keyframes infiniteScroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`

const TestimonialItem = styled.div`
  flex: 0 0 auto;
  width: 350px;
  padding: ${theme.spacing.lg};
  border-left: 2px solid ${theme.colors.primary};
  padding-left: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 300px;
    padding: ${theme.spacing.md};
  }
`

const TestimonialText = styled.p`
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
  font-style: italic;
  
  &:before {
    content: '"';
    color: ${theme.colors.accent};
    font-size: 1.2em;
  }
  
  &:after {
    content: '"';
    color: ${theme.colors.accent};
    font-size: 1.2em;
  }
`

const TestimonialAuthor = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.accent};
  font-weight: 600;
  margin: 0;
  text-align: right;
`

const ScrollIndicatorContainer = styled.div<{ $progress: number }>`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.lg};
  opacity: ${props => Math.max(0, Math.min(1, (props.$progress - 0.2) * 2))};
  transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.$progress - 0.2) * 2))) * 40}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const ScrollIndicator = styled.div<{ $isPaused: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  opacity: 0.8;
  transition: opacity 0.2s ease-out;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${theme.colors.primary};
    animation: scrollAnimation 2s infinite;
    animation-play-state: ${props => props.$isPaused ? 'paused' : 'running'};
  }

  span {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.text.secondary};
    margin-right: ${theme.spacing.xs};
  }

  @keyframes scrollAnimation {
    0%, 100% { transform: translateX(-3px); }
    50% { transform: translateX(3px); }
  }
`

export function Testimonials() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      const sectionTop = rect.top
      
      const startPoint = windowHeight * 0.8
      const endPoint = windowHeight * 0.2
      
      let progress = 0
      
      if (sectionTop <= startPoint && sectionTop >= endPoint) {
        progress = (startPoint - sectionTop) / (startPoint - endPoint)
      } else if (sectionTop < endPoint) {
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

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleHorizontalScroll = () => {
      setIsPaused(true)
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 2000)
    }

    const handleMouseEnter = () => {
      setIsPaused(true)
    }

    const handleMouseLeave = () => {
      setIsPaused(false)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleHorizontalScroll, { passive: true })
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleHorizontalScroll)
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Create seamless infinite scroll by duplicating testimonials
  const infiniteTestimonials = [...content.testimonials.testimonials, ...content.testimonials.testimonials]

  return (
    <TestimonialsSection id="testimonials" ref={sectionRef}>
      <Container>
        <SectionHeader $progress={scrollProgress}>
          <h2>{content.testimonials.title}</h2>
        </SectionHeader>
        
        <ScrollContainer ref={containerRef} $progress={scrollProgress}>
          <TestimonialsWrapper $isPaused={isPaused}>
            {infiniteTestimonials.map((testimonial, index) => (
              <TestimonialItem key={`${index}-${testimonial.author}`}>
                <TestimonialText>
                  {testimonial.text}
                </TestimonialText>
                <TestimonialAuthor>
                  – {testimonial.author}
                </TestimonialAuthor>
              </TestimonialItem>
            ))}
          </TestimonialsWrapper>
        </ScrollContainer>
        
        <ScrollIndicatorContainer $progress={scrollProgress}>
          <ScrollIndicator $isPaused={isPaused}>
            <span>Scroll to see more</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </ScrollIndicator>
        </ScrollIndicatorContainer>
      </Container>
    </TestimonialsSection>
  )
} 