/* eslint-disable import/order */
import NextImage from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Collapse from 'components/Collapse';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';
import ThreeLayersCircle from 'components/ThreeLayersCircle';
import { media } from 'utils/media';

const TABS = [
  {
    title: 'Secure On-Chain Escrow',
    description:
      '<p>Smart contracts automatically handle payment escrow, ensuring artisans get paid and clients receive quality work. Funds are locked until both parties confirm job completion.</p>',
    imageUrl: '/wura/onchain.jpg',
    baseColor: '255,193,7',
    secondColor: '128,0,128',
  },
  {
    title: 'Reputation NFT System',
    description:
      '<p>Every completed job and 5-star review mints a unique NFT badge to your portfolio. Build an immutable reputation that showcases your craftsmanship and reliability.</p>',
    imageUrl: '/wura/rep.jpg',
    baseColor: '147,51,234',
    secondColor: '79,70,229',
  },
  {
    title: 'Instant Solana Payments',
    description:
      '<p>Experience lightning-fast transactions with near-zero fees on Solana. Get paid instantly in SOL or USDC, with complete payment security and transparency.</p>',
    imageUrl: '/wura/pay.jpg',
    baseColor: '128,0,128',
    secondColor: '255,193,7',
  },
];

export default function FeaturesGallery() {
  const [currentTab, setCurrentTab] = useState(TABS[0]);

  const imagesMarkup = TABS.map((singleTab, idx) => {
    const isActive = singleTab.title === currentTab.title;
    const isFirst = idx === 0;

    return (
      <ImageContainer
        key={singleTab.title}
        isActive={isActive}
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <NextImage src={singleTab.imageUrl} alt={singleTab.title} fill style={{ objectFit: 'contain' }} priority={isFirst} />
      </ImageContainer>
    );
  });

  const tabsMarkup = TABS.map((singleTab, idx) => {
    const isActive = singleTab.title === currentTab.title;

    return (
      <Tab isActive={isActive} key={idx} onClick={() => handleTabClick(idx)}>
        <TabTitleContainer>
          <CircleContainer>
            <ThreeLayersCircle baseColor={isActive ? 'transparent' : singleTab.baseColor} secondColor={singleTab.secondColor} />
          </CircleContainer>
          <h4>{singleTab.title}</h4>
        </TabTitleContainer>
        <Collapse isOpen={isActive} duration={300}>
          <TabContent>
            <div dangerouslySetInnerHTML={{ __html: singleTab.description }}></div>
          </TabContent>
        </Collapse>
      </Tab>
    );
  });

  function handleTabClick(idx: number) {
    setCurrentTab(TABS[idx]);
  }

  return (
    <FeaturesGalleryWrapper>
      <Content>
        <OverTitle>features</OverTitle>
        <SectionTitle>What are you signing in for?</SectionTitle>
      </Content>
      <GalleryWrapper>
        <TabsContainer>{tabsMarkup}</TabsContainer>
        {imagesMarkup}
      </GalleryWrapper>
    </FeaturesGalleryWrapper>
  );
}

const FeaturesGalleryWrapper = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 10rem 0;
  background: linear-gradient(180deg, rgba(var(--secondary), 0.1) 0%, rgba(var(--secondary), 0) 100%);
`;

const GalleryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;

  ${media('<=desktop')} {
    flex-direction: column;
  }
`;

const Content = styled.div`
  & > *:not(:first-child) {
    margin-top: 1rem;
  }
  text-align: center;
`;

const TabsContainer = styled.div`
  flex: 1;
  margin-right: 4rem;

  & > *:not(:first-child) {
    margin-top: 2rem;
  }

  ${media('<=desktop')} {
    margin-right: 0;
    margin-bottom: 4rem;
    width: 100%;
  }
`;

const ImageContainer = styled.div<{ isActive: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 0.8rem;
  flex: ${(p) => (p.isActive ? '2' : '0')};
  box-shadow: var(--shadow-md);

  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: calc((9 / 16) * 100%);
  }

  & > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  ${media('<=desktop')} {
    width: ${(p) => (p.isActive ? '100%' : '0')};
  }
`;

const Tab = styled(motion.div)<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem;
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  box-shadow: ${(p) => (p.isActive ? '0 0 30px rgba(var(--primary), 0.2)' : 'var(--shadow-md)')};
  opacity: ${(p) => (p.isActive ? 1 : 0.7)};
  cursor: pointer;
  border-radius: 1rem;
  border: 1px solid rgba(var(--primary), ${(p) => (p.isActive ? 0.2 : 0.05)});
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  ${media('<=desktop')} {
    width: 100%;
  }
`;

const TabTitleContainer = styled.div`
  display: flex;
  align-items: center;

  h4 {
    flex: 1;
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  margin-top: 1rem;
  font-size: 1.6rem;
  padding-left: calc(5rem + 1.5rem);
  line-height: 1.7;
  color: rgb(var(--text), 0.8);

  ${media('<=tablet')} {
    padding-left: calc(4rem + 1.25rem);
  }

  p {
    font-weight: normal;
  }
`;

const CircleContainer = styled.div`
  flex: 0 calc(5rem + 1.5rem);

  ${media('<=tablet')} {
    flex: 0 calc(4rem + 1.25rem);
  }
`;
