import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '@/config/theme'
import { content } from '@/config/content'
import { images } from '@/config/images'

const ContactSection = styled.section`
  position: relative;
  padding: ${theme.spacing['3xl']} 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  color: ${theme.colors.text.light};
  overflow: hidden;
`

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: -1;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  width: 100%;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`

const ContactInfo = styled.div.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, props.$progress * 1.2)),
    transform: `translateX(${(1 - props.$progress) * -50}px)`,
  },
}))<{ $progress: number }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;

  @media (max-width: ${theme.breakpoints.lg}) {
    transform: translateY(${props => (1 - props.$progress) * 50}px) !important;
  }
`

const ContactTitle = styled.h2.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - 0.1) * 2)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - 0.1) * 2))) * 30}px)`,
  },
}))<{ $progress: number }>`
  color: ${theme.colors.text.light};
  font-size: ${theme.fontSizes['5xl']};
  text-align: left;
  margin-bottom: ${theme.spacing.lg};
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const ContactDescription = styled.p.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - 0.2) * 2)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - 0.2) * 2))) * 30}px)`,
  },
}))<{ $progress: number }>`
  color: ${theme.colors.text.light};
  margin-bottom: ${theme.spacing.lg};
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const ContactDetails = styled.div.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - 0.3) * 2)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - 0.3) * 2))) * 30}px)`,
  },
}))<{ $progress: number }>`
  margin-top: auto;
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const ContactItem = styled.div.attrs<{ $progress: number; $delay: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - props.$delay) * 3)),
    transform: `translateX(${(1 - Math.max(0, Math.min(1, (props.$progress - props.$delay) * 3))) * -20}px)`,
  },
}))<{ $progress: number; $delay: number }>`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
  
  span, a {
    margin-left: ${theme.spacing.sm};
    color: ${theme.colors.text.light};
  }

  a {
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`

const ContactForm = styled.form.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - 0.1) * 1.5)),
    transform: `translateX(${(1 - Math.max(0, Math.min(1, (props.$progress - 0.1) * 1.5))) * 50}px)`,
  },
}))<{ $progress: number }>`
  background-color: rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing.lg};
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
  backdrop-filter: blur(5px);

  @media (max-width: ${theme.breakpoints.lg}) {
    transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.$progress - 0.1) * 1.5))) * 50}px) !important;
  }
`

const FormGroup = styled.div.attrs<{ $progress: number; $delay: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - props.$delay) * 3)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - props.$delay) * 3))) * 20}px)`,
  },
}))<{ $progress: number; $delay: number }>`
  margin-bottom: ${theme.spacing.sm};
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
`

const Label = styled.label<{ required?: boolean }>`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text.light};
  font-weight: 500;

  &::after {
    content: ${props => props.required ? '" *"' : '""'};
    color: ${theme.colors.text.light};
  }
`

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.xs};
  border: 2px solid ${theme.colors.background.secondary};
  border-radius: 10px;
  font-size: ${theme.fontSizes.base};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.xs};
  border: 2px solid ${theme.colors.background.secondary};
  border-radius: 10px;
  font-size: ${theme.fontSizes.base};
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`

const SubmitButton = styled.button.attrs<{ $progress: number }>(props => ({
  style: {
    opacity: Math.max(0, Math.min(1, (props.$progress - 0.5) * 3)),
    transform: `translateY(${(1 - Math.max(0, Math.min(1, (props.$progress - 0.5) * 3))) * 20}px)`,
  },
}))<{ $progress: number }>`
  background-color: #2F6FA3;
  color: ${theme.colors.text.light};
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: 12px;
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.accent};
    transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.$progress - 0.5) * 3))) * 20 - 1}px) !important;
  }

  &:disabled {
    background-color: ${theme.colors.text.secondary};
    cursor: not-allowed;
    transform: translateY(${props => (1 - Math.max(0, Math.min(1, (props.$progress - 0.5) * 3))) * 20}px) !important;
  }
`

const SuccessMessage = styled.div`
  background-color: ${theme.colors.background.accent};
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md};
  border-radius: 10px;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
`

const NewsletterContainer = styled.div`
  margin-top: auto;  // Push it to the bottom of ContactInfo
  padding-top: ${theme.spacing.xl};
`

const NewsletterText = styled.p`
  color: ${theme.colors.text.light};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.sm};
  user-select: none;
  cursor: default;
`

const NewsletterForm = styled.form`
  display: flex;
  gap: ${theme.spacing.sm};
  
  input {
    flex: 1;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border: 2px solid ${theme.colors.background.secondary};
    border-radius: 8px;
    font-size: ${theme.fontSizes.base};
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.text.light};
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }
  }
  
  button {
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    background-color: #2F6FA3;
    color: ${theme.colors.text.light};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    
    &:hover {
      background-color: ${theme.colors.accent};
      transform: translateY(-1px);
    }
  }
`

const NewsletterButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background-color: #2F6FA3;
  color: ${theme.colors.text.light};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0;
  
  svg {
    width: 0;
    height: 24px;
    transition: all 0.3s ease;
    opacity: 0;
  }
  
  &:hover {
    background-color: ${theme.colors.primary};
    transform: translateY(-1px);
    gap: ${theme.spacing.xs};
    
    svg {
      width: 24px;
      opacity: 1;
    }
  }
`

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    // Check honeypot
    if (formData.get('website')) {
      setIsSubmitting(false)
      return // Bot detected, do nothing
    }

    try {
      const response = await fetch('https://formspree.io/f/xgvzwkvl', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          tour: formData.get('tour'),
          message: formData.get('message'),
          _subject: 'New contact from Take Flight Birding'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          tour: '',
          message: '',
        })
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        console.error('Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }

    setIsSubmitting(false)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsNewsletterSubmitting(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    // Check honeypot
    if (formData.get('website')) {
      setIsNewsletterSubmitting(false)
      return // Bot detected, do nothing
    }

    try {
      const response = await fetch('https://formspree.io/f/xpwrvake', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: newsletterEmail,
          _subject: 'New newsletter signup from Take Flight Birding'
        })
      })

      if (response.ok) {
        setIsNewsletterSubmitted(true)
        setNewsletterEmail('')
        setTimeout(() => setIsNewsletterSubmitted(false), 5000)
      } else {
        console.error('Newsletter submission failed')
      }
    } catch (error) {
      console.error('Newsletter submission error:', error)
    }

    setIsNewsletterSubmitting(false)
  }

  return (
    <ContactSection ref={sectionRef} id="contact">
      <BackgroundImage>
        <Image
          src={images.contact}
          alt="Beautiful New Mexico landscape"
          fill
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'scaleX(-1)' // This flips the image horizontally
          }}
          sizes="100vw"
        />
      </BackgroundImage>
      <Overlay />
      <Container>
        <ContactGrid>
          <ContactInfo $progress={scrollProgress}>
            <ContactTitle $progress={scrollProgress}>{content.contact.title}</ContactTitle>
            <ContactDescription $progress={scrollProgress}>
              {content.contact.description}
            </ContactDescription>
            <ContactDetails $progress={scrollProgress}>
              <ContactItem $progress={scrollProgress} $delay={0.4}>
                <span>{content.contact.email}</span>
              </ContactItem>
              <ContactItem $progress={scrollProgress} $delay={0.5}>
                <a href={`tel:${content.contact.phone.replace(/[^0-9+]/g, '')}`}>{content.contact.phone}</a>
              </ContactItem>
              <ContactItem $progress={scrollProgress} $delay={0.6}>
                <span>{content.contact.location}</span>
              </ContactItem>
            </ContactDetails>
            
            <NewsletterContainer>
              <NewsletterText>Sign up to receive updates about upcoming group tours and birding classes!</NewsletterText>
              {isNewsletterSubmitted && (
                <SuccessMessage>Thank you for subscribing to our newsletter!</SuccessMessage>
              )}
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  disabled={isNewsletterSubmitting}
                />
                {/* Add honeypot field */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  style={{ display: 'none' }}
                />
                <NewsletterButton type="submit" disabled={isNewsletterSubmitting}>
                  <span>{isNewsletterSubmitting ? 'Signing up...' : 'Sign Up'}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </NewsletterButton>
              </NewsletterForm>
            </NewsletterContainer>
          </ContactInfo>

          <ContactForm onSubmit={handleSubmit} $progress={scrollProgress}>
            {isSubmitted && (
              <SuccessMessage>{content.contact.successMessage}</SuccessMessage>
            )}
            
            <FormGroup $progress={scrollProgress} $delay={0.2}>
              <Label htmlFor="name" required>Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </FormGroup>

            <FormGroup $progress={scrollProgress} $delay={0.3}>
              <Label htmlFor="email" required>Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </FormGroup>

            <FormGroup $progress={scrollProgress} $delay={0.4}>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </FormGroup>

            <FormGroup $progress={scrollProgress} $delay={0.5}>
              <Label htmlFor="tour">Interested In</Label>
              <Input
                as="select"
                id="tour"
                name="tour"
                value={formData.tour}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="personalized">Personalized Birding Tours</option>
                <option value="group">Educational Group Adventures</option>
                <option value="classes">Field-Based Birding Classes</option>
                <option value="other">Other</option>
              </Input>
            </FormGroup>

            <FormGroup $progress={scrollProgress} $delay={0.6}>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your interests and what kind of birding experience you're looking for..."
              />
            </FormGroup>

            {/* Add honeypot field */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              style={{ display: 'none' }}
            />

            <SubmitButton 
              type="submit" 
              disabled={isSubmitting}
              $progress={scrollProgress}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  )
} 