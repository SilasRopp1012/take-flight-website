import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '@/config/theme'
import { content } from '@/config/content'

const HeaderContainer = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => 
    props.$isScrolled 
      ? 'rgba(250, 250, 250, 1)' 
      : 'transparent'
  };
  backdrop-filter: ${props => props.$isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => 
    props.$isScrolled 
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

const Logo = styled.a<{ $isScrolled: boolean }>`
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-align: center;
  transition: color 0.3s ease;
  cursor: pointer;
  text-decoration: none;
`

const LogoTitle = styled.div<{ $isScrolled: boolean }>`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 600;
  color: ${props => 
    props.$isScrolled 
      ? theme.colors.primary
      : theme.colors.text.light
  };
  margin-bottom: ${theme.spacing.xs};
  text-shadow: ${props => 
    props.$isScrolled 
      ? 'none' 
      : '2px 2px 4px rgba(0, 0, 0, 0.3)'
  };
  transition: all 0.3s ease;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['2xl']};
  }
`

const LogoSubtitle = styled.div<{ $isScrolled: boolean }>`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
  color: ${props => 
    props.$isScrolled 
      ? theme.colors.primary 
      : theme.colors.text.light
  };
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: ${props => 
    props.$isScrolled 
      ? 'none' 
      : '1px 1px 2px rgba(0, 0, 0, 0.3)'
  };
  transition: all 0.3s ease;
`

const NavLinks = styled.ul<{ $isScrolled: boolean }>`
  display: flex;
  list-style: none;
  gap: ${theme.spacing.lg};
  margin: 0;
  padding: 0;

  a {
    font-weight: 500;
    font-size: ${theme.fontSizes.base};
    color: ${props => 
      props.$isScrolled 
        ? theme.colors.text.primary 
        : theme.colors.text.light
    };
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 20px;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-shadow: ${props => 
      props.$isScrolled 
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

const MobileMenuButton = styled.button<{ $isScrolled: boolean; $isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  width: 40px;
  height: 40px;
  position: relative;
  transition: all 0.3s ease;

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const HamburgerLine = styled.span<{ $isScrolled: boolean; $isOpen: boolean; $position: 'top' | 'middle' | 'bottom' }>`
  width: 20px;
  height: 2px;
  background-color: ${props => 
    props.$isScrolled 
      ? theme.colors.primary 
      : theme.colors.text.light
  };
  display: block;
  margin: 2px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  filter: ${props => 
    props.$isScrolled 
      ? 'none' 
      : 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))'
  };

  ${props => props.$position === 'top' && props.$isOpen && `
    transform: translateY(6px) rotate(45deg);
  `}

  ${props => props.$position === 'middle' && props.$isOpen && `
    opacity: 0;
    transform: scaleX(0);
  `}

  ${props => props.$position === 'bottom' && props.$isOpen && `
    transform: translateY(-6px) rotate(-45deg);
  `}
`

const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 9998;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const MobileMenu = styled.div<{ $isOpen: boolean; $isScrolled: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${props => 
    props.$isScrolled 
      ? theme.colors.background.primary 
      : 'transparent'
  };
  border-top: none;
  padding: ${theme.spacing.md};
  z-index: 9999;
  
  /* Smooth animation */
  transform: translateY(${props => props.$isOpen ? '0' : '-100%'});
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
  transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease;
  
  ul {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: right;
  }

  a {
    font-weight: 500;
    font-size: ${theme.fontSizes.base};
    color: ${props => 
      props.$isScrolled 
        ? theme.colors.text.primary 
        : theme.colors.text.light
    };
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 20px;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-align: right;
    text-shadow: ${props => 
      props.$isScrolled 
        ? 'none' 
        : '1px 1px 2px rgba(0, 0, 0, 0.3)'
    };

    &:hover {
      color: ${theme.colors.primary};
    }
  }

  /* Only show on mobile */
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false)
    
    // Clear the hash from URL and return to base domain
    window.history.pushState(null, '', window.location.pathname)
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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
      // Update the URL hash
      window.history.pushState(null, '', href)
      
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMobileMenuOpen) return
      
      const target = event.target as HTMLElement
      const header = document.querySelector('header')
      
      // Close menu if click is outside the header
      if (header && !header.contains(target)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <Nav>
        <Logo $isScrolled={isScrolled} onClick={handleLogoClick}>
          <LogoTitle $isScrolled={isScrolled}>{content.header.title}</LogoTitle>
          <LogoSubtitle $isScrolled={isScrolled}>{content.header.subtitle}</LogoSubtitle>
        </Logo>
        
        <NavLinks $isScrolled={isScrolled}>
          {content.navigation.map((item) => (
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

        <MobileMenuButton $isScrolled={isScrolled} $isOpen={isMobileMenuOpen} onClick={handleMobileMenuToggle}>
          <HamburgerLine $isScrolled={isScrolled} $isOpen={isMobileMenuOpen} $position="top" />
          <HamburgerLine $isScrolled={isScrolled} $isOpen={isMobileMenuOpen} $position="middle" />
          <HamburgerLine $isScrolled={isScrolled} $isOpen={isMobileMenuOpen} $position="bottom" />
        </MobileMenuButton>
      </Nav>

      <MobileMenu $isOpen={isMobileMenuOpen} $isScrolled={isScrolled}>
        <ul>
          {content.navigation.map((item) => (
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