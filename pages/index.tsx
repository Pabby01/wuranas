import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Cta';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Join Wurana - The revolutionary artisan marketplace powered by Solana blockchain. Connect with skilled artisans, secure payments, and build your reputation."
        />
      </Head>
      <HomepageWrapper>
        <GradientBackground />
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <BasicSection 
            imageUrl="/artisan-work.svg" 
            title="Empower Your Craft with Blockchain" 
            overTitle="Why Choose Wurana"
          >
            <p>
              Experience a new era of artisan services where blockchain meets craftsmanship. 
              Our platform ensures secure payments, builds verifiable reputations, and connects 
              skilled artisans with clients globally - all powered by Solana's lightning-fast network.
            </p>
          </BasicSection>
          <BasicSection 
            imageUrl="/marketplace-illustration.svg" 
            title="Built for Modern Artisans" 
            overTitle="Platform Features" 
            reversed
          >
            <p>
              Take control of your artisan business with our Web3-powered features. From instant 
              payments to reputation NFTs, we're revolutionizing how skilled trades operate in the digital age.
            </p>
            <FeatureList>
              <FeatureItem>✨ Secure On-Chain Escrow</FeatureItem>
              <FeatureItem>🎨 Reputation NFT Badges</FeatureItem>
              <FeatureItem>⚡ Sub-cent Transaction Fees</FeatureItem>
            </FeatureList>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
          <ScrollableBlogPosts posts={posts} />
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  position: relative;
  overflow: hidden;

  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: -1;
  height: 100vh;
  background: radial-gradient(
    circle at 50% -20%, 
    rgba(var(--primary), 0.1),
    rgba(var(--background), 0.1) 70%
  );
`;

const DarkerBackgroundContainer = styled.div`
  position: relative;
  background: linear-gradient(
    180deg, 
    rgb(var(--background)) 0%,
    rgba(var(--background), 0.9) 100%
  );
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/grid.png') repeat;
    opacity: 0.1;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  & > *:not(:first-child) {
    margin-top: 10rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: linear-gradient(
    180deg, 
    rgb(var(--secondBackground)) 0%,
    rgba(var(--secondBackground), 0.9) 100%
  );
  backdrop-filter: blur(10px);

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 10rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 2rem 0;
  padding: 0;
`;

const FeatureItem = styled.li`
  font-size: 1.8rem;
  margin: 1rem 0;
  color: rgb(var(--text));
  display: flex;
  align-items: center;
  gap: 1rem;

  &::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    background: rgb(var(--primary));
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
