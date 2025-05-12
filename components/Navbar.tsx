import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { media } from 'utils/media';

const ColorSwitcher = dynamic(() => import('../components/ColorSwitcher'), { ssr: false });

interface WalletInfo {
  address: string;
  balance: {
    sol: number;
    usdc: number;
  };
  network: 'devnet' | 'mainnet';
}

type NavbarProps = { 
  items: Array<{
    href: string;
    title: string;
    isButton?: boolean;
  }>;
};

const Navbar = ({ items }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = async () => {
    // Implement wallet connection logic here
    setWalletConnected(true);
    setWalletInfo({
      address: '7xKX...9aB2',
      balance: { sol: 1.234, usdc: 100.50 },
      network: 'devnet'
    });
  };

  return (
    <NavbarWrapper
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      $isScrolled={isScrolled}
    >
      <NavContainer>
        <LogoSection>
          <Link href="/" className="logo-link">
              <LogoWrapper>
                <StyledImage 
                  src="/wura/logo.jpg"
                  alt="Wurana"
                  width={40}
                  height={40}
                  priority
                />
                <LogoText
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Wurana
                </LogoText>
              </LogoWrapper>
          </Link>
        </LogoSection>

        <DesktopNav>
          {items.map((item) => (
            <NavItem key={item.href} $isButton={item.isButton}>
              <Link href={item.href}>
                {item.title}
              </Link>
            </NavItem>
          ))}
          
          <Web3Controls>
            {!walletConnected ? (
              <ConnectButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
              >
                Connect Wallet
              </ConnectButton>
            ) : (
              <WalletInfo>
                <NetworkBadge $network={walletInfo?.network}>
                  {walletInfo?.network}
                </NetworkBadge>
                <WalletAddress>{walletInfo?.address}</WalletAddress>
                <BalanceDropdown>
                  <span>◎ {walletInfo?.balance.sol} SOL</span>
                  <span>$ {walletInfo?.balance.usdc} USDC</span>
                </BalanceDropdown>
              </WalletInfo>
            )}
            <ColorSwitcher />
          </Web3Controls>
        </DesktopNav>

        <MobileNav>
          <HamburgerButton
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
          
          <AnimatePresence>
            {isOpen && (
              <MobileMenu
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ type: 'spring', damping: 25 }}
              >
                {items.map((item) => (
                  <MobileNavItem key={item.href}>
                    <Link href={item.href}>
                      {item.title}
                    </Link>
                  </MobileNavItem>
                ))}
                {!walletConnected && (
                  <ConnectButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </ConnectButton>
                )}
              </MobileMenu>
            )}
          </AnimatePresence>
        </MobileNav>
      </NavContainer>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled(motion.nav)<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 0;
  background: ${p => p.$isScrolled ? 'rgba(var(--navbarBackground), 0.9)' : 'transparent'};
  backdrop-filter: ${p => p.$isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: 1px solid rgba(var(--primary), 0.1);
  z-index: var(--z-navbar);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoText = styled(motion.span)`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(var(--primary)), #FFC107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavContainer = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: 2rem;

  ${media('>=desktop')} {
    display: flex;
  }
`;

const MobileNav = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${media('>=desktop')} {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgb(var(--navbarBackground));
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
  margin-top: 1rem;
`;

const NavLink = styled(Link)<{ $mobile?: boolean }>`
  color: rgb(var(--text));
  text-decoration: none;
  font-weight: 500;
  padding: ${p => p.$mobile ? '0.5rem 0' : '0'};
  transition: color 0.2s ease;

  &:hover {
    color: rgb(var(--primary));
  }
`;

const NavButton = styled(motion.button)<{ $mobile?: boolean }>`
  background: rgb(var(--primary));
  color: rgb(var(--textSecondary));
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  width: ${p => p.$mobile ? '100%' : 'auto'};
`;

const ColorSwitcherContainer = styled.div`
  width: 4rem;
  margin-left: 1rem;
`;

const NavItem = styled.div<{ $isButton?: boolean }>`
  position: relative;
  
  a {
    color: ${p => p.$isButton ? 'rgb(var(--textSecondary))' : 'rgb(var(--text))'};
    background: ${p => p.$isButton ? '#FFC107' : 'transparent'};
    padding: ${p => p.$isButton ? '0.8rem 1.5rem' : '0.5rem 1rem'};
    border-radius: ${p => p.$isButton ? '2rem' : '0'};
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${p => p.$isButton ? 'rgb(var(--textSecondary))' : 'rgb(var(--primary))'};
      background: ${p => p.$isButton ? '#FFD54F' : 'transparent'};
    }
  }
`;

const Web3Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ConnectButton = styled(motion.button)`
  background: linear-gradient(135deg, rgb(var(--primary)), #FFC107);
  color: rgb(var(--textSecondary));
  border: none;
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(var(--primary), 0.1);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
`;

const NetworkBadge = styled.span<{ $network?: 'devnet' | 'mainnet' }>`
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  background: ${p => p.$network === 'mainnet' ? '#4CAF50' : '#FF9800'};
  color: white;
`;

const WalletAddress = styled.span`
  font-family: monospace;
  color: rgb(var(--text));
`;

const BalanceDropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  
  span {
    white-space: nowrap;
    color: rgb(var(--text));
  }
`;

const HamburgerButton = styled(motion.button)`
  background: none;
  border: none;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  padding: 0;

  span {
    width: 100%;
    height: 2px;
    background: rgb(var(--text));
    transition: all 0.2s ease;
  }
`;

const MobileNavItem = styled.div`
  a {
    display: block;
    padding: 0.8rem 1rem;
    color: rgb(var(--text));
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(var(--primary), 0.1);
    }
  }
`;

export default Navbar;
