import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '@/config/theme'

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => 
    props.isScrolled 
      ? 'rgba(250, 250, 250, 1)' 
      : 'transparent'
  };
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => 
    props.isScrolled 
      ? `1px solid ${theme.colors.background.secondary}` 
      : 'none'
  };
  padding: ${theme.spacing.md} 0;
  z-index: 1000;
  transition: all 0.3s ease;
`

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div<{ isScrolled: boolean }>`
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-align: center;
  transition: color 0.3s ease;
`

const LogoTitle = styled.div<{ isScrolled: boolean }>`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 600;
  color: ${props => 
    props.isScrolled 
      ? theme.colors.primary
      : theme.colors.text.light
  };
  margin-bottom: ${theme.spacing.xs};
  text-shadow: ${props => 
    props.isScrolled 
      ? 'none' 
      : '2px 2px 4px rgba(0, 0, 0, 0.3)'
  };
  transition: all 0.3s ease;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['2xl']};
  }
`

const LogoSubtitle = styled.div<{ isScrolled: boolean }>`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
  color: ${props => 
    props.isScrolled 
      ? theme.colors.primary 
      : theme.colors.text.light
  };
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: ${props => 
    props.isScrolled 
      ? 'none' 
      : '1px 1px 2px rgba(0, 0, 0, 0.3)'
  };
  transition: all 0.3s ease;
`

const NavLinks = styled.ul<{ isScrolled: boolean }>`
  display: flex;
  list-style: none;
  gap: ${theme.spacing.lg};
  margin: 0;
  padding: 0;

  a {
    font-weight: 500;
    font-size: ${theme.fontSizes.base};
    color: ${props => 
      props.isScrolled 
        ? theme.colors.text.primary 
        : theme.colors.text.light
    };
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 20px;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-shadow: ${props => 
      props.isScrolled 
        ? 'none' 
        : '1px 1px 2px rgba(0, 0, 0, 0.3)'
    };

    &:hover {
      color: ${theme.colors.primary};
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const NavLink = styled.li``

const MobileMenuButton = styled.button<{ isScrolled: boolean }>`
  display: none;
  background: none;
  color: ${props => 
    props.isScrolled 
      ? theme.colors.primary 
      : theme.colors.text.light
  };
  font-size: ${theme.fontSizes.xl};
  padding: ${theme.spacing.xs};
  text-shadow: ${props => 
    props.isScrolled 
      ? 'none' 
      : '1px 1px 2px rgba(0, 0, 0, 0.3)'
  };
  transition: all 0.3s ease;

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${theme.colors.background.primary};
  border-top: 1px solid ${theme.colors.background.secondary};
  padding: ${theme.spacing.md};
  
  /* Smooth animation */
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
  
  ul {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    font-weight: 500;
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.text.primary};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 20px;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      color: ${theme.colors.primary};
    }
  }

  /* Only show on mobile */
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#tours', label: 'Tours' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Start transition much earlier - at 50% of hero height
      // This ensures header has white background before reaching hero text
      const heroHeight = window.innerHeight
      const transitionPoint = heroHeight * 0.5 // Start at 50% of hero height
      setIsScrolled(window.scrollY > transitionPoint)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    
    // Special handling only for Tours section
    if (href === '#tours') {
      const toursElement = document.getElementById('tours')
      if (toursElement) {
        const headerHeight = 80 // Fixed header height
        const elementTop = toursElement.offsetTop
        
        // Scroll up by two header heights plus padding to prevent testimonials peeking
        window.scrollTo({
          top: elementTop - (headerHeight * 2) - 20,
          behavior: 'smooth'
        })
      }
    }
    // All other navigation uses default browser behavior
  }

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Nav>
        <Logo isScrolled={isScrolled}>
          <LogoTitle isScrolled={isScrolled}>Take Flight</LogoTitle>
          <LogoSubtitle isScrolled={isScrolled}>Birding and Nature Adventures</LogoSubtitle>
        </Logo>
        
        <NavLinks isScrolled={isScrolled}>
          {navItems.map((item) => (
            <NavLink key={item.href}>
              <a 
                href={item.href} 
                onClick={(e) => {
                  if (item.href === '#tours') {
                    e.preventDefault()
                    handleNavClick(item.href)
                  } else {
                    handleNavClick(item.href) // Just close mobile menu
                  }
                }}
              >
                {item.label}
              </a>
            </NavLink>
          ))}
        </NavLinks>

        <MobileMenuButton isScrolled={isScrolled} onClick={handleMobileMenuToggle}>
          ☰
        </MobileMenuButton>
      </Nav>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <ul>
          {navItems.map((item) => (
            <NavLink key={item.href}>
              <a 
                href={item.href} 
                onClick={(e) => {
                  if (item.href === '#tours') {
                    e.preventDefault()
                    handleNavClick(item.href)
                  } else {
                    handleNavClick(item.href) // Just close mobile menu
                  }
                }}
              >
                {item.label}
              </a>
            </NavLink>
          ))}
        </ul>
      </MobileMenu>
    </HeaderContainer>
  )
} 