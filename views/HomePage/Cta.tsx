/* eslint-disable import/order */
import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

export default function Cta() {
  return (
    <CtaWrapper>
      <GlowBackground />
      <Container>
        <Stack
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <OverTitle>Join the Revolution</OverTitle>
          <SectionTitle>Ready to Transform Your Artisan Business?</SectionTitle>
          <Description>
            Whether you're a skilled artisan looking to expand your reach or a client seeking quality craftsmanship, Wurana connects you
            through the power of Solana blockchain. Join our waitlist to be among the first to experience secure, low-fee transactions and
            build your on-chain reputation.
          </Description>
          <ButtonGroup>
            <NextLink href="/waitlist">
              <PrimaryButton as={motion.a} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Join Waitlist <span>→</span>
              </PrimaryButton>
            </NextLink>
            <NextLink href="/how-it-works">
              <OutlinedButton as={motion.a} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transparent>
                Learn More <span>→</span>
              </OutlinedButton>
            </NextLink>
          </ButtonGroup>
          <Stats>
            <StatItem>
              <StatNumber>
                <CountUp
                  start={0}
                  end={1200}
                  duration={2}
                  separator=","
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </StatNumber>
              <StatLabel>Artisans Waiting</StatLabel>
            </StatItem>
            <StatDivider />
            <StatItem>
              <StatNumber>
                <CountUp
                  start={0}
                  end={50}
                  duration={2}
                  prefix="$"
                  suffix="K+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </StatNumber>
              <StatLabel>Ready to Flow</StatLabel>
            </StatItem>
          </Stats>
        </Stack>
      </Container>
    </CtaWrapper>
  );
}

const CtaWrapper = styled.div`
  position: relative;
  background: linear-gradient(135deg, rgba(var(--secondary), 0.95) 0%, rgba(var(--secondary), 0.85) 100%);
  backdrop-filter: blur(10px);
  overflow: hidden;
`;

const GlowBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(var(--primary), 0.1) 0%, rgba(var(--secondary), 0) 70%);
  pointer-events: none;
`;

const Description = styled.div`
  font-size: 1.8rem;
  color: rgba(var(--textSecondary), 0.8);
  line-height: 1.6;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12.5rem 0;
  color: rgb(var(--textSecondary));
  text-align: center;
  align-items: center;
  justify-content: center;

  & > *:not(:first-child) {
    max-width: 80%;
    margin-top: 4rem;
  }

  ${media('<=tablet')} {
    text-align: center;

    & > *:not(:first-child) {
      max-width: 100%;
      margin-top: 2rem;
    }
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(90deg, rgb(var(--primary)), #ffc107);
  color: rgb(var(--textSecondary));
  font-weight: 600;
  padding: 1.5rem 3rem;
  border-radius: 3rem;

  span {
    margin-left: 1rem;
  }
`;

const OutlinedButton = styled(Button)`
  border: 2px solid rgba(var(--primary), 0.3);
  color: rgb(var(--textSecondary));
  padding: 1.5rem 3rem;
  border-radius: 3rem;

  &:hover {
    border-color: rgb(var(--primary));
  }

  span {
    margin-left: 1rem;
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  gap: 5rem;

  ${media('<=tablet')} {
    flex-direction: column;
    gap: 3rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  background: linear-gradient(90deg, rgb(var(--primary)), #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  span {
    background: inherit;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  color: rgba(var(--textSecondary), 0.8);
  margin-top: 0.5rem;
`;

const StatDivider = styled.div`
  width: 1px;
  height: 4rem;
  background: linear-gradient(to bottom, transparent, rgba(var(--primary), 0.3), transparent);

  ${media('<=tablet')} {
    width: 50%;
    height: 1px;
  }
`;
