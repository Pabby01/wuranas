import NextLink from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import { media } from 'utils/media';

export default function Hero() {
  return (
    <>
      <HeroWrapper>
        <Contents>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CustomOverTitle>
              Book artisans in seconds—secure, on‑chain, and low‑fee on Solana.
            </CustomOverTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heading>
              Empower your projects with <GradientText>frictionless</GradientText> artisan services on <GradientText>Solana</GradientText>
            </Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Description>
              Wurana is a Solana‑powered decentralized marketplace connecting skilled artisans with clients—facilitating secure on‑chain escrow and NFT‑backed reputations for instant trust.
              <HighlightBox>
                <Highlight>✓ Sub-cent transaction fees</Highlight>
                <Highlight>✓ NFT reputation system</Highlight>
                <Highlight>✓ Secure escrow payments</Highlight>
              </HighlightBox>
            </Description>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CustomButtonGroup>
              <StyledLink href="/waitlist">
                <PrimaryButton
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join the Waitlist <ButtonIcon>→</ButtonIcon>
                </PrimaryButton>
              </StyledLink>
              <StyledLink href="#whitepaper">
                <SecondaryButton
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started <ButtonIcon>→</ButtonIcon>
                </SecondaryButton>
              </StyledLink>
            </CustomButtonGroup>
          </motion.div>
        </Contents>
        <ImageContainer>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <StyledImage
              src="/wura/art.jpg"
              alt="Wurana-artisan"
              width={500}
              height={700}
              priority
            />
          </motion.div>
        </ImageContainer>
      </HeroWrapper>
    </>
  );
}

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  color: rgb(var(--primary));
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
  gap: 2rem;
`;

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 7rem; // Reduced from 15rem
  min-height: 100vh;
  align-items: center;

  ${media('<=desktop')} {
    padding-top: 10rem; // Reduced from 12rem
    flex-direction: column;
    align-items: center;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, rgb(var(--primary)), #FFC107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
`;

const HighlightBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const Highlight = styled.div`
  font-size: 1.6rem;
  color: rgb(var(--text));
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledLink = styled(NextLink)`
  text-decoration: none;
`;

const PrimaryButton = styled.button`
  padding: 1.5rem 3rem;
  background: linear-gradient(135deg, rgb(var(--primary)), #FFC107);
  color: white;
  border: none;
  border-radius: 3rem;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 20px rgba(var(--primary), 0.2);

  &:hover {
    box-shadow: 0 15px 30px rgba(var(--primary), 0.3);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 2px solid rgb(var(--primary));
  color: rgb(var(--text));
  box-shadow: none;

  &:hover {
    background: rgba(var(--primary), 0.1);
    box-shadow: none;
  }
`;

const ButtonIcon = styled.span`
  font-size: 2rem;
  transition: transform 0.3s ease;

  ${PrimaryButton}:hover &,
  ${SecondaryButton}:hover & {
    transform: translateX(5px);
  }
`;

// Update existing styled components
const Contents = styled.div`
  flex: 1;
  max-width: 60rem;
  z-index: 10;

  ${media('<=desktop')} {
    max-width: 100%;
  }
`;

const Description = styled.div`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.8);
  line-height: 1.6;
  margin-bottom: 4rem;

  ${media('<=desktop')} {
    font-size: 1.6rem;
  }
`;

const Heading = styled.h1`
  font-size: 7.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media('<=tablet')} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  ${media('<=desktop')} {
    margin-top: 5rem;
    justify-content: center;
    width: 100%;
  }
`;

const StyledImage = styled(Image)`
  max-width: 45rem;
  height: auto;
  border-radius: 3rem;
  box-shadow: 
    0 20px 40px rgba(var(--primary), 0.2),
    0 0 100px rgba(var(--primary), 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 
      0 30px 60px rgba(var(--primary), 0.3),
      0 0 120px rgba(var(--primary), 0.2);
  }

  ${media('<=desktop')} {
    max-width: 80%;
  }
`;
