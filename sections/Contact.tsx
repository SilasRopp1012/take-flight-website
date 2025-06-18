import { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@/config/theme'
import { content } from '@/config/content'

const ContactSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background-color: ${theme.colors.background.secondary};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
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

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
  }
`

const ContactDetails = styled.div`
  margin-top: auto;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  
  span {
    margin-left: ${theme.spacing.sm};
    color: ${theme.colors.text.primary};
  }

  a {
    margin-left: ${theme.spacing.sm};
    color: ${theme.colors.text.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`

const ContactForm = styled.form`
  background-color: ${theme.colors.background.primary};
  padding: ${theme.spacing.lg};
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.sm};
`

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text.primary};
  font-weight: 500;
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

const SubmitButton = styled.button`
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
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${theme.colors.text.secondary};
    cursor: not-allowed;
    transform: none;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent traditional form submission
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xldnlnno', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
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
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        console.error('Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }

    setIsSubmitting(false)
  }

  return (
    <ContactSection id="contact">
      <Container>
        <ContactGrid>
          <ContactInfo>
            <div>
              <h2>{content.contact.title}</h2>
              <p>{content.contact.description}</p>
            </div>
            
            <ContactDetails>
              <ContactItem>
                <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
              </ContactItem>
              
              <ContactItem>
                <a href={`tel:+1${content.contact.phone.replace(/\D/g, '')}`}>{content.contact.phone}</a>
              </ContactItem>
              
              <ContactItem>
                <span>{content.contact.location}</span>
              </ContactItem>
            </ContactDetails>
          </ContactInfo>

          <ContactForm onSubmit={handleSubmit}>
            {isSubmitted && (
              <SuccessMessage>
                {content.contact.successMessage}
              </SuccessMessage>
            )}
            
            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your birding experience and what you're hoping to see..."
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  )
} 