import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { theme } from '@/config/theme'

const GallerySection = styled.section`
  padding: ${theme.spacing['2xl']} 0;
  background-color: ${theme.colors.background.primary};
  margin-bottom: -${theme.spacing['2xl']};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`

const GalleryTitle = styled.h2.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - 0.1) * 2)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - 0.1) * 2))) * 30}px)`,
  },
}))<{ $progress: number }>`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes['5xl']};
  text-align: right;
  margin-bottom: ${theme.spacing['2xl']};
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.md};
`

const ImageContainer = styled.div<{ $progress: number }>`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
  opacity: ${props => Math.max(0, Math.min(1, props.$progress * 1.5))};
  transform: translateY(${props => (1 - Math.max(0, Math.min(1, props.$progress * 1.5))) * 30}px);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
  
  &:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`

const ImageCaption = styled.div`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  text-align: center;
  margin-top: ${theme.spacing.xs};
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledImage = styled(Image)`
  object-fit: cover;
`

const GalleryButton = styled.button<{ $direction: 'up' | 'down' }>`
  margin: ${theme.spacing.md} auto 0;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background.secondary};
  border: none;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.lg};
  cursor: pointer;
  padding: ${theme.spacing.xs} ${theme.spacing.xl};
  border-radius: 9999px;
  opacity: 0.8;
  transition: all 0.2s ease-out;
  min-width: 140px;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  svg {
    position: absolute;
    right: ${theme.spacing.md};
    width: 0;
    height: 20px;
    opacity: 0;
    transition: all 0.2s ease-out;
    transform: ${props => props.$direction === 'up' ? 'rotate(180deg)' : 'none'};
    stroke: ${theme.colors.accent};
  }

  &:hover svg {
    width: 20px;
    opacity: 1;
    transform: ${props => props.$direction === 'up' ? 'rotate(180deg) translateY(-4px)' : 'translateY(4px)'};
  }

  &:hover span {
    padding-right: ${theme.spacing.lg};
  }

  span {
    transition: padding 0.2s ease-out;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
`

// Update the formatBirdName function to be more sophisticated
const formatBirdName = (filename: string) => {
  return filename
    .replace(/\.(jpg|JPG)$/, '')
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
    .split(' ')
    .map(word => {
      // Don't capitalize certain words unless they're at the start
      const lowercaseWords = ['and', 'or', 'the', 'in', 'on', 'at', 'to', 'for', 'of'];
      return lowercaseWords.includes(word.toLowerCase()) ? word.toLowerCase() : 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function Gallery() {
  const INITIAL_IMAGES_COUNT = 6
  const [visibleCount, setVisibleCount] = useState(INITIAL_IMAGES_COUNT)
  const [titleProgress, setTitleProgress] = useState(0)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [imageProgress, setImageProgress] = useState<number[]>([])
  const [images] = useState([
    'American Dipper.JPG',
    "Barrow's Goldeneye.JPG",
    'Black-chinned Hummingbird.jpg',
    'Black-chinned Sparrow.jpg',
    'Black-headed Grosbeak.JPG',
    'Black-throated Sparrow.JPG',
    'Blue Grosbeak.JPG',
    'Broad-tailed Hummingbird.jpg',
    'Burrowing Owl.jpg',
    'Chestnut-collared Longspur.jpg',
    'Chihuahuan Meadowlark.jpg',
    'Cinnamon Teal.JPG',
    'Common Black Hawk.jpg',
    'Crissal Thrasher.JPG',
    'Dusky Grouse.jpg',
    "Grace's Warbler.jpg",
    'Great Horned Owl.JPG',
    'Greater Roadrunner.JPG',
    'Hepatic Tanager.JPG',
    'Ladder-backed Woodpecker.jpg',
    'Lazuli Bunting.JPG',
    "Lewis's Woodpecker.JPG",
    "Lucy's Warbler.jpg",
    "MacGillivray's Warbler.JPG",
    'Mountain Bluebird pair.JPG',
    'Northern Pygmy-Owl.JPG',
    'Pinyon Jay.JPG',
    'Prairie Falcon.jpg',
    'Pygmy Nuthatch.JPG',
    'Red Crossbill.JPG',
    'Sage Thrasher.JPG',
    'Sandhill Crane pair.jpg',
    'Sandhill Crane.jpg',
    'Scaled Quail.jpg',
    'Short-tailed Weasel.JPG',
    "Steller's Jay.JPG",
    'Summer Tanager.JPG',
    'Virginia Rail.JPG',
    'Western Flycatcher.JPG',
    'Western Tanager.jpg',
    'Yellow-breasted Chat.JPG',
    'Male Mountain Bluebird.jpg'
  ])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === titleRef.current) {
            setTitleProgress(entry.isIntersecting ? entry.intersectionRatio : 0)
          } else {
            const index = imageRefs.current.findIndex(ref => ref === entry.target)
            if (index !== -1) {
              setImageProgress(prev => {
                const newProgress = [...prev]
                newProgress[index] = entry.isIntersecting ? entry.intersectionRatio : 0
                return newProgress
              })
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '-100px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    setImageProgress(new Array(visibleCount).fill(0))

    if (titleRef.current) observer.observe(titleRef.current)
    imageRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visibleCount])

  const handleShowLess = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      const galleryTop = gallerySection.offsetTop;
      window.scrollTo({ top: galleryTop, behavior: 'smooth' });
      
      // Wait for scroll animation to complete (typical duration ~500ms)
      setTimeout(() => {
        setVisibleCount(INITIAL_IMAGES_COUNT);
      }, 500);
    }
  };

  return (
    <GallerySection id="gallery">
      <Container>
        <GalleryTitle ref={titleRef} $progress={titleProgress}>Gallery</GalleryTitle>
        <GalleryGrid>
          {images.slice(0, visibleCount).map((image, index) => (
            <ImageWrapper key={image}>
              <ImageContainer 
                ref={el => { imageRefs.current[index] = el }}
                $progress={imageProgress[index] || 0}
              >
                <StyledImage
                  src={`/images/bird-gallery/${image}`}
                  alt={formatBirdName(image)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </ImageContainer>
              <ImageCaption>
                {formatBirdName(image)}
              </ImageCaption>
            </ImageWrapper>
          ))}
        </GalleryGrid>
        <ButtonContainer>
          <GalleryButton 
            onClick={() => {
              if (visibleCount >= images.length) {
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                  const galleryTop = gallerySection.offsetTop;
                  const headerHeight = 80;
                  const startTime = performance.now();
                  const scrollDuration = 700;

                  window.scrollTo({ 
                    top: galleryTop - headerHeight - 20,
                    behavior: 'smooth' 
                  });
                  
                  const fadeOut = () => {
                    const elapsed = performance.now() - startTime;
                    if (elapsed >= scrollDuration) {
                      setVisibleCount(INITIAL_IMAGES_COUNT);
                    } else {
                      requestAnimationFrame(fadeOut);
                    }
                  };
                  requestAnimationFrame(fadeOut);
                }
              } else {
                setVisibleCount(count => Math.min(count + INITIAL_IMAGES_COUNT, images.length));
              }
            }}
            $direction={visibleCount >= images.length ? "up" : "down"}
          >
            <span>
              {visibleCount >= images.length ? "Show less" : "Show more"}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5"/>
              <path d="M7 6l5 5 5-5"/>
            </svg>
          </GalleryButton>
        </ButtonContainer>
      </Container>
    </GallerySection>
  )
} 