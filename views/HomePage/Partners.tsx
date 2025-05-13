/* eslint-disable import/order */
import NextImage from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'components/Container';
import { media } from 'utils/media';
import { motion } from 'framer-motion';

const PARTNERS = [
  {
    name: 'Solana',
    logo: '/partners/solana_logo.png',
    link: 'https://solana.com',
    description: 'High-performance blockchain platform',
  },
  {
    name: 'Phantom',
    logo: '/partners/phantom-logo.png',
    link: 'https://phantom.app',
    description: 'Leading Solana wallet',
  },
  {
    name: 'Metaplex',
    logo: '/partners/metaplex-logo.jpg',
    link: 'https://metaplex.com',
    description: 'NFT infrastructure provider',
  },
  {
    name: 'Arweave',
    logo: '/partners/arweave.png',
    link: 'https://arweave.org',
    description: 'Permanent storage solution',
  },
  {
    name: 'Serum',
    logo: '/partners/serum.jpg',
    link: 'https://projectserum.com',
    description: 'Decentralized exchange protocol',
  },
  {
    name: 'Magic Eden',
    logo: '/partners/Magic-Eden.webp',
    link: 'https://magiceden.io',
    description: 'Leading NFT marketplace',
  },
  {
    name: 'Solflare',
    logo: '/partners/solflare-logo.png',
    link: 'https://www.solflare.com/',
    description: 'Fastest Solana Wallet',
  },
];

export default function Partners() {
  return (
    <PartnersWrapper>
      <HeaderSection>
        <OverTitle
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Powered By Industry Leaders
        </OverTitle>
        <Title
          as={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Trusted Technology Partners
        </Title>
      </HeaderSection>

      <PartnersGrid>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={6}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: false,
          }}
          speed={3000}
          breakpoints={{
            320: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1025: { slidesPerView: 6 },
          }}
          className="swiper-wrapper"
        >
          {PARTNERS.map((partner) => (
            <SwiperSlide key={partner.name}>
              <PartnerCard
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                as={motion.a}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ImageWrapper>
                  <NextImage src={partner.logo} alt={partner.name} width={140} height={60} style={{ objectFit: 'contain' }} />
                </ImageWrapper>
              </PartnerCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </PartnersGrid>
    </PartnersWrapper>
  );
}

const PartnersWrapper = styled.section`
  padding: 8rem 0;
  background: rgba(var(--secondary), 0.03);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(var(--primary), 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeaderSection = styled(Container)`
  text-align: center;
  margin-bottom: 6rem;
`;

const OverTitle = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: bold;
  color: rgb(var(--primary));
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, rgb(var(--primary)), #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${media('<=tablet')} {
    font-size: 2.8rem;
  }
`;

const PartnersGrid = styled(Container)`
  .swiper-wrapper {
    will-change: transform;
    transition-timing-function: linear;
    user-select: none;
  }
`;

const PartnerCard = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  border: 1px solid rgba(var(--primary), 0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: rgba(var(--primary), 0.3);
    box-shadow: 0 0 30px rgba(var(--primary), 0.1);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 6rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all 0.2s ease-in-out;
  }

  ${PartnerCard}:hover & img {
    filter: grayscale(0%);
    opacity: 1;
  }
`;
