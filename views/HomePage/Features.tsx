import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import { media } from 'utils/media';
import { RiShieldLine, RiMedalLine, RiMoneyDollarCircleLine, RiGlobalLine } from 'react-icons/ri';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const features = [
  {
    icon: <RiShieldLine />,
    title: 'On-Chain Escrow',
    description: 'Lock SOL/USDC in smart-contract until job completion—no non-payment risk.',
  },
  {
    icon: <RiMedalLine />,
    title: 'Reputation NFTs',
    description: 'Immutable badges minted on-chain for every 5-star review—build your digital resume.',
  },
  {
    icon: <RiMoneyDollarCircleLine />,
    title: 'Sub-Cent Fees',
    description: 'Enjoy Solana\'s < $0.01 transactions, compared to 10–20% marketplace cuts.',
  },
  {
    icon: <RiGlobalLine />,
    title: 'Global Reach',
    description: 'List services and find clients across borders with instant settlement.',
  },
];

function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <Card
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(var(--primary), 0.15)'
      }}
    >
      <IconWrapper>{icon}</IconWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <GlowingBorder />
    </Card>
  );
}

export default function Features() {
  return (
    <Wrapper>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Powered by Solana</SectionTitle>
        </motion.div>
        <Grid>
          {features.map((feature, idx) => (
            <FeatureCard 
              key={feature.title} 
              {...feature} 
              delay={idx * 0.2} 
            />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background: rgb(var(--background));
  padding: 8rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(var(--primary), 0.2), 
      transparent
    );
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 4rem;
  margin-top: 4rem;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3.5rem 2.5rem;
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  border: 1px solid rgba(var(--primary), 0.1);
  overflow: hidden;
`;

const GlowingBorder = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 2rem;
  padding: 2px;
  background: linear-gradient(
    45deg,
    rgba(var(--primary), 0.5),
    rgba(255, 193, 7, 0.5)
  );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: rgb(var(--primary));
  
  svg {
    filter: drop-shadow(0 0 8px rgba(var(--primary), 0.5));
  }
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  text-align: center;
  margin-bottom: 6rem;
  background: linear-gradient(135deg, rgb(var(--primary)), #FFC107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(var(--primary), 0.5), 
      transparent
    );
  }
`;

const CardTitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: rgb(var(--text));
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.6;
`;
