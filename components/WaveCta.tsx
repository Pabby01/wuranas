import { motion } from 'framer-motion';
import NextLink from 'next/link';
import styled from 'styled-components';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

export default function WaveCta() {
  return (
    <>
      <WaveContainer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            fill="url(#gradient)"
            d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(var(--primary))', stopOpacity: 1 }} />
              <stop offset="70%" style={{ stopColor: 'rgb(var(--primary))', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#FFC107', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
        </svg>
      </WaveContainer>
      <CtaWrapper>
        <Container>
          <Content
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Title>Ready to Transform Your Artisan Business?</Title>
            <Subtitle>Join Wurana today and experience the future of artisan services on Solana</Subtitle>
            <CustomButtonGroup>
              <NextLink href="/waitlist">
                <PrimaryButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Join Waitlist <span>→</span>
                </PrimaryButton>
              </NextLink>
              <NextLink href="/marketplace">
                <OutlinedButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transparent>
                  Explore Marketplace <span>→</span>
                </OutlinedButton>
              </NextLink>
            </CustomButtonGroup>
          </Content>
        </Container>
      </CtaWrapper>
    </>
  );
}

const WaveContainer = styled.div`
  width: 100%;
  height: 25rem;
  margin-top: -10rem;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    transform: scale(1.1);
  }
`;

const CtaWrapper = styled.div`
  background: linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--primary)) 70%, rgba(255, 193, 7, 0.8) 100%);
  margin-top: -1px; // Remove gap between wave and content
  padding-bottom: 12rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(var(--primary), 0.5) 0%, transparent 70%);
    pointer-events: none;
  }

  ${media('<=tablet')} {
    padding-top: 4rem;
    padding-bottom: 8rem;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const Title = styled(SectionTitle)`
  color: rgb(var(--textSecondary));
  font-size: 4.8rem;
  margin-bottom: 2rem;

  ${media('<=tablet')} {
    font-size: 3.6rem;
  }
`;

const Subtitle = styled.p`
  color: rgb(var(--textSecondary));
  font-size: 2rem;
  margin-bottom: 4rem;
  opacity: 0.8;

  ${media('<=tablet')} {
    font-size: 1.8rem;
  }
`;

const PrimaryButton = styled(Button)`
  background: rgba(var(--secondary), 0.9);
  color: rgb(var(--textSecondary));
  padding: 1.5rem 3rem;
  border-radius: 3rem;
  font-size: 1.8rem;
  font-weight: bold;
  backdrop-filter: blur(10px);

  span {
    margin-left: 1rem;
  }

  &:hover {
    background: rgba(var(--secondary), 1);
  }
`;

const OutlinedButton = styled(Button)`
  border: 2px solid rgba(var(--textSecondary), 0.8);
  color: rgb(var(--textSecondary));
  padding: 1.5rem 3rem;
  border-radius: 3rem;
  font-size: 1.8rem;
  font-weight: bold;
  backdrop-filter: blur(10px);

  span {
    margin-left: 1rem;
  }

  &:hover {
    background: rgba(var(--textSecondary), 0.1);
    border-color: rgb(var(--textSecondary));
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  justify-content: center;
  gap: 2rem;

  ${media('<=tablet')} {
    flex-direction: column;
    align-items: stretch;
  }
`;
