import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { theme } from '@/config/theme'
import { images } from '@/config/images'
import { content } from '@/config/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { GlobalStyles } from '@/styles/globalStyles'
import { useState } from 'react'

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: -1;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ContactFormContainer = styled.div`
  max-width: 600px;
  width: 90%;
  background-color: rgba(255, 255, 255, 0.95);
  padding: ${theme.spacing.xl};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1s ease-out forwards;
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 95%;
    padding: ${theme.spacing.lg};
    margin-top: ${theme.spacing['2xl']};
  }
`

const FormTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  font-family: ${theme.fonts.heading};
  text-align: center;
`

const FormDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  font-family: ${theme.fonts.body};
  line-height: 1.6;
`

const FormField = styled.div`
  margin-bottom: ${theme.spacing.md};
`

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  font-family: ${theme.fonts.body};
`

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fonts.body};
  background-color: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
  }
`

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fonts.body};
  background-color: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fonts.body};
  min-height: 120px;
  resize: vertical;
  background-color: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
  }
`

const SubmitButton = styled.button`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text.light};
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fonts.body};
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  border: none;

  &:hover {
    background-color: ${theme.colors.primary};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled.div`
  background-color: #e6f4ea;
  color: #1e4620;
  padding: ${theme.spacing.md};
  border-radius: 4px;
  margin-bottom: ${theme.spacing.md};
  text-align: center;
  font-family: ${theme.fonts.body};
`

const ContactInfo = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fonts.body};

  p {
    margin: ${theme.spacing.xs} 0;
  }
`

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tourType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      tourType: '',
      message: ''
    })
  }

  return (
    <>
      <GlobalStyles />
      <Header />
      <HeroSection>
        <HeroBackground>
          <Image
            src={images.contact}
            alt="Beautiful landscape showcasing New Mexico's natural beauty"
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
        
        <ContactFormContainer>
          <FormTitle>Get In Touch</FormTitle>
          <FormDescription>
            Ready to explore New Mexico's incredible birdlife? Let's plan your perfect birding adventure.
          </FormDescription>

          {isSubmitted && (
            <SuccessMessage>
              {content.contact.successMessage}
            </SuccessMessage>
          )}
          
          <form onSubmit={handleSubmit}>
            <FormField>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="tourType">Interested In</Label>
              <Select
                id="tourType"
                name="tourType"
                value={formData.tourType}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="personalized">Personalized Birding Tours</option>
                <option value="group">Educational Group Adventures</option>
                <option value="classes">Field-Based Birding Classes</option>
                <option value="other">Other</option>
              </Select>
            </FormField>

            <FormField>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormField>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </form>

          <ContactInfo>
            <p>{content.contact.phone}</p>
            <p>{content.contact.location}</p>
          </ContactInfo>
        </ContactFormContainer>
      </HeroSection>
      <Footer />
    </>
  )
} 