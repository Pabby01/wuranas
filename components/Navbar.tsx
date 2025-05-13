/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBars, FaBookOpen, FaCompass, FaQuestionCircle,  FaTimes, FaUserAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { useTheme } from 'components/ThemeProvider';
import { media } from 'utils/media';

const NAV_ITEMS = [
  {
    href: '/marketplace',
    title: 'Explore',
    icon: FaCompass,
    description: 'Discover Artisans',
  },
  {
    href: '/become-artisan',
    title: 'Join',
    icon: FaUserAlt,
    description: 'Become an Artisan',
  },
  {
    href: '/blog',
    title: 'Learn',
    icon: FaBookOpen,
    description: 'Web3 Insights',
  },
  {
    href: '/how-it-works',
    title: 'Guide',
    icon: FaQuestionCircle,
    description: 'How It Works',
  },
];

interface NavbarProps {
  items?: typeof NAV_ITEMS;
}

export default function Navbar({}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <NavWrapper
        initial={false}
        animate={isScrolled ? 'scrolled' : 'top'}
        variants={{
          top: { height: '8rem', backgroundColor: 'rgba(var(--navbarBackground), 0)' },
          scrolled: { height: '6rem', backgroundColor: 'rgba(var(--navbarBackground), 0.8)' },
        }}
        transition={{ duration: 0.3 }}
      >
        <NavContainer $isScrolled={isScrolled}>
          <LogoSection>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <LogoWrapper>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Image
                    src="/wura/logo.jpg"
                    alt="Wurana"
                    width={isScrolled ? 35 : 40}
                    height={isScrolled ? 35 : 40}
                    priority
                    style={{ borderRadius: '50%' }}
                  />
                </motion.div>
                <LogoText animate={{ opacity: isScrolled ? 0 : 1, x: isScrolled ? -20 : 0 }} transition={{ duration: 0.3 }}>
                  Wurana
                </LogoText>
              </LogoWrapper>
            </Link>
          </LogoSection>

          <DesktopNav $isScrolled={isScrolled}>
            <NavItems $isScrolled={isScrolled}>
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.href}>
                  <Link href={item.href}>
                    <NavIconWrapper whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }}>
                      <item.icon size={24} />
                      <NavTooltip>{item.description}</NavTooltip>
                    </NavIconWrapper>
                  </Link>
                </NavItem>
              ))}
            </NavItems>

            <WalletSection>
              
              <ConnectButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} $isScrolled={isScrolled}>
                {walletConnected ? (
                  <WalletInfo>
                    <span>◎ 1.234 SOL</span>
                  </WalletInfo>
                ) : (
                  'Connect Wallet'
                )}
              </ConnectButton>
            </WalletSection>
          </DesktopNav>

          <MobileNav>
            
            <MenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </MenuButton>
          </MobileNav>
        </NavContainer>
      </NavWrapper>

      <MobileMenu
        initial="closed"
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: '100%' },
        }}
      >
        {NAV_ITEMS.map((item) => (
          <MobileMenuItem key={item.href} href={item.href}>
            <item.icon size={20} />
            <span>{item.title}</span>
          </MobileMenuItem>
        ))}
        <MobileConnectButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Connect Wallet
        </MobileConnectButton>
      </MobileMenu>
      <NavSpacer />
    </>
  );
}

const NavWrapper = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid rgba(var(--primary), 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div<{ $isScrolled: boolean }>`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$isScrolled ? 'center' : 'space-between')};
  gap: ${(p) => (p.$isScrolled ? '4rem' : '2rem')};
  transition: all 0.3s ease;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const LogoText = styled(motion.span)`
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(var(--primary)), #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
`;

const NavItems = styled.div<{ $isScrolled: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(p) => (p.$isScrolled ? '3rem' : '2rem')};
  transition: all 0.3s ease;
`;

const NavItem = styled.div`
  position: relative;
`;

const NavIconWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(var(--primary), 0.1);
  color: rgb(var(--text));
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--primary), 0.2);
    color: rgb(var(--primary));
  }
`;

const NavTooltip = styled.span`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: rgba(var(--primary), 0.9);
  color: white;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  ${NavIconWrapper}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

const WalletSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ConnectButton = styled(motion.button)<{ $isScrolled: boolean }>`
  background: linear-gradient(135deg, rgb(var(--primary)), #ffc107);
  color: white;
  border: none;
  padding: ${(p) => (p.$isScrolled ? '0.8rem 1.5rem' : '1rem 2rem')};
  border-radius: 3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${(p) => (p.$isScrolled ? '1.4rem' : '1.6rem')};
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'JetBrains Mono', monospace;
`;

const NavSpacer = styled.div`
  height: 8rem; // Same as navbar max height
`;

const DesktopNav = styled.div<{ $isScrolled: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  ${media('<=desktop')} {
    display: none;
  }
`;

const MobileNav = styled.div`
  display: none;
  align-items: center;
  gap: 1rem;

  ${media('<=desktop')} {
    display: flex;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: rgb(var(--text));
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: rgb(var(--text));
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: rgb(var(--primary));
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 6rem;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 40rem;
  background: rgba(var(--cardBackground), 0.98);
  backdrop-filter: blur(10px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
  border-left: 1px solid rgba(var(--primary), 0.1);
`;

const MobileMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  color: rgb(var(--text));
  text-decoration: none;
  font-size: 1.6rem;
  border-radius: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--primary), 0.1);
    color: rgb(var(--primary));
  }
`;

const MobileConnectButton = styled(motion.button)`
  margin-top: auto;
  background: linear-gradient(135deg, rgb(var(--primary)), #ffc107);
  color: white;
  border: none;
  padding: 1.5rem;
  border-radius: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;
