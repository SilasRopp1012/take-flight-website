import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { theme } from '@/config/theme'
import { images } from '@/config/images'
import { content } from '@/config/content'
import { useRef, useEffect, useState } from 'react'

const shimmer = keyframes`
  0% {
    background-position: -100% -100%;
  }
  100% {
    background-position: 100% 100%;
  }
`;

const ToursSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.primary};
  z
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

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / rect.height) * -3;
    const rotateY = (mouseX / rect.width) * 3;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

    // Smoother angle calculation that avoids rapid spinning
    const baseAngle = 135;
    const maxAngleOffset = 30;
    const xOffset = (mouseX / (rect.width / 2)) * maxAngleOffset;
    const yOffset = (mouseY / (rect.height / 2)) * maxAngleOffset;
    const angle = baseAngle + xOffset + yOffset;
    
    card.style.setProperty('--gradient-angle', `${angle}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
    >
      {children}
    </div>
  );
};

const TourCard = styled.div.attrs<{ $progress: number; $delay: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - props.$delay) * 2)),
  },
}))<{ $progress: number; $delay: number }>`
  position: relative;
  height: 550px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  will-change: transform;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
              0 0 20px rgba(255, 255, 255, 0.05),
              inset 0 0 20px rgba(255, 255, 255, 0.05);
  
  &::before {
    content: '';
    position: absolute;
    top: -150%;
    left: -150%;
    right: -150%;
    bottom: -150%;
    background: radial-gradient(
      farthest-corner circle at center,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.01) 30%,
      rgba(255,255,255,0.03) 50%,
      rgba(255,255,255,0.01) 70%,
      rgba(255,255,255,0) 100%
    );
    background-size: 200% 200%;
    opacity: 0;
    pointer-events: none;
    z-index: 3;
  }

  &:hover::before {
    opacity: 1;
    animation: ${shimmer} 6s ease-in-out infinite;
  }
  
  @media (max-width: ${theme.breakpoints.lg}) {
    height: 500px;
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
`

const CardContent = styled.div`
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  color: ${theme.colors.text.light};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
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

const ArrowButton = styled.button`
  position: absolute;
  bottom: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0;
  transition: all 0.3s ease;
  z-index: 4;
  opacity: 0.8;
  color: ${theme.colors.text.light};
  font-size: ${theme.fontSizes.sm};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  span {
    font-weight: 500;
    transition: color 0.3s ease;
  }

  svg {
    width: 0;
    height: 24px;
    color: ${theme.colors.text.light};
    transition: all 0.3s ease;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
    opacity: 0;
  }

  &:hover {
    opacity: 1;
    gap: ${theme.spacing.xs};

    span {
      color: ${theme.colors.accent};
    }

    svg {
      width: 24px;
      opacity: 1;
      color: ${theme.colors.text.light};
    }
  }
`

const BackArrowButton = styled(ArrowButton)`
  left: ${theme.spacing.md};
  right: auto;
  color: ${theme.colors.text.primary};

  span {
    width: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease;
    margin-right: 0;
    text-shadow: none;
    color: ${theme.colors.text.primary};
  }

  svg {
    width: 24px;
    opacity: 1;
    transform: rotate(180deg);
    color: ${theme.colors.text.primary};
    filter: none;
  }

  &:hover {
    svg {
      color: ${theme.colors.accent};
    }
    
    span {
      width: 3rem;
      opacity: 1;
      margin-right: ${theme.spacing.xs};
      color: ${theme.colors.text.primary};
    }
  }
`

const BacksideArrowButton = styled(ArrowButton)`
  color: ${theme.colors.text.primary};
  text-shadow: none;

  span {
    color: ${theme.colors.text.primary};
  }

  svg {
    color: ${theme.colors.text.primary};
    filter: none;
  }

  &:hover {
    span {
      color: ${theme.colors.accent};
    }
    
    svg {
      color: ${theme.colors.text.primary};
    }
  }
`

const CardSides = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 1.0);
`

const CardFront = styled(CardSide)`
  transform: rotateY(0);
`

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  background-color: ${theme.colors.background.accent};
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
  }
`

const BackTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 600;
`

const BackDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
`

const BackContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const PricingSection = styled.div`
  margin-top: auto;
  padding-top: ${theme.spacing.lg};
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
  
  span {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.fontSizes.base};
  }
`

const PriceNote = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  font-style: italic;
  margin-top: ${theme.spacing.md};
  line-height: 1.5;
`

export function Tours() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({})

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

  const handleContactClick = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCardFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <ToursSection id="services" ref={sectionRef}>
      <Container>
        <SectionHeader $progress={scrollProgress}>
          <h2>{content.tours.title}</h2>
        </SectionHeader>
        
        <ToursGrid>
          {content.tours.offerings.map((offering, index) => (
            <TiltCard key={offering.id}>
              <TourCard 
                $progress={scrollProgress} 
                $delay={0.2 + index * 0.1}
              >
                <CardSides $isFlipped={flippedCards[offering.id] || false}>
                  <CardFront>
                    <CardBackground>
                      <Image
                        src={tourImages[index]}
                        alt={offering.title}
                        fill
                        style={{ 
                          objectFit: 'cover',
                          transform: index === 0 
                            ? 'scale(1.2) scaleX(-1) translateY(5%)' 
                            : index === 2 
                              ? 'scale(1.2) translateY(8%)' 
                              : 'scale(1.3)'
                        }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </CardBackground>
                    <CardOverlay />
                    
                    <CardContent>
                      <CardTitle>{offering.title}</CardTitle>
                      <TourFeatures>
                        {offering.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </TourFeatures>
                    </CardContent>

                    <ArrowButton onClick={(e) => {
                      e.stopPropagation();
                      handleCardFlip(offering.id);
                    }}>
                      <span>Learn More</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </ArrowButton>
                  </CardFront>

                  <CardBack>
                    <BackContent>
                      <div>
                        <BackTitle>{offering.title}</BackTitle>
                        {offering.id === 'personalized' && (
                          <>
                            <BackDescription>
                              Tailored experiences for individuals or small groups, with flexible scheduling.
                            </BackDescription>
                            <PricingSection>
                              <PriceRow>
                                <span>Half Day (up to 2 people):</span>
                                <span>$200</span>
                              </PriceRow>
                              <PriceRow>
                                <span>Full Day (up to 2 people):</span>
                                <span>$300</span>
                              </PriceRow>
                              <PriceNote>
                                Additional participants: $25 per person.
                                <br />
                                Includes transportation within 40 minutes of Santa Fe.
                                <br />
                                Large group rates available upon request.
                              </PriceNote>
                            </PricingSection>
                          </>
                        )}
                        
                        {offering.id === 'group' && (
                          <>
                            <BackDescription>
                              Join scheduled group adventures to explore local hotspots while meeting fellow bird enthusiasts.
                            </BackDescription>
                            <PricingSection>
                              <PriceRow>
                                <span>Per Person:</span>
                                <span>$50-90</span>
                              </PriceRow>
                              <PriceNote>
                                Price varies by trip duration.
                                <br />
                                Typical maximum group size is 9 people.
                                <br />
                                Transportation not included (carpooling available).
                                <br />
                                Scholarships available for eligible participants.
                              </PriceNote>
                            </PricingSection>
                          </>
                        )}
                        
                        {offering.id === 'classes' && (
                          <>
                            <BackDescription>
                              Structured learning experiences with expert field instruction to develop your birding skills.
                            </BackDescription>
                            <PricingSection>
                              <PriceRow>
                                <span>Pricing is customized based on class duration, location, and number of participants.</span>
                              </PriceRow>
                              <PriceNote>
                                Contact me for detailed pricing estimates.
                              </PriceNote>
                            </PricingSection>
                          </>
                        )}
                      </div>
                    </BackContent>
                    <div>
                      <BackArrowButton onClick={(e) => {
                        e.stopPropagation();
                        handleCardFlip(offering.id);
                      }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <span>Back</span>
                      </BackArrowButton>
                      <BacksideArrowButton onClick={(e) => {
                        e.stopPropagation();
                        handleContactClick();
                      }}>
                        <span>Contact Me</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </BacksideArrowButton>
                    </div>
                  </CardBack>
                </CardSides>
              </TourCard>
            </TiltCard>
          ))}
        </ToursGrid>
      </Container>
    </ToursSection>
  )
} 