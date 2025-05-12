import styled from 'styled-components';
import { motion } from 'framer-motion';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import YoutubeVideo from 'components/YoutubeVideo';
import { media } from 'utils/media';

const FEATURES = [
  {
    imageUrl: '/grid-icons/escrow.svg',
    title: 'Secure Escrow System',
    description:
      'Smart contracts automatically handle payment escrow, ensuring artisans get paid and clients receive quality work. Built on Solana for instant, secure transactions.',
    link: '/features/escrow'
  },
  {
    imageUrl: '/grid-icons/reputation.svg',
    title: 'Reputation NFT Badges',
    description:
      'Earn unique NFT badges for completed jobs and positive reviews. Build an immutable portfolio that showcases your craftsmanship and reliability.',
    link: '/features/reputation'
  },
  {
    imageUrl: '/grid-icons/payments.svg',
    title: 'Low-Fee Payments',
    description:
      'Take advantage of Solana\'s sub-cent transaction fees. Save significantly compared to traditional marketplace fees of 15-30%.',
    link: '/features/payments'
  },
  {
    imageUrl: '/grid-icons/marketplace.svg',
    title: 'Global Marketplace',
    description:
      'Connect with clients worldwide. List your services, set your rates, and grow your artisan business beyond geographical boundaries.',
    link: '/marketplace'
  },
  {
    imageUrl: '/grid-icons/verification.svg',
    title: 'Artisan Verification',
    description:
      'Get verified as a skilled artisan. Show clients your credentials, certifications, and work history - all secured on the blockchain.',
    link: '/features/verification'
  },
  {
    imageUrl: '/grid-icons/messaging.svg',
    title: 'Secure Messaging',
    description:
      'Communicate directly with clients through our encrypted messaging system. Discuss projects, share files, and coordinate seamlessly.',
    link: '/features/messaging'
  }
];

export default function FeaturesPage() {
  return (
    <Page 
      title="Platform Features" 
      description="Discover how Wurana's blockchain-powered features revolutionize the artisan marketplace experience."
    >
      <Wrapper>
        <HeaderContainer>
          <OverTitle>Built on Solana</OverTitle>
          <SectionTitle>Empowering Artisans with Web3</SectionTitle>
          <Description>
            Experience a revolutionary marketplace that combines traditional craftsmanship with blockchain innovation. 
            Our features are designed to provide security, transparency, and opportunity for skilled artisans.
          </Description>
        </HeaderContainer>

        <CustomAutofitGrid>
          {FEATURES.map((singleFeature, idx) => (
            <FeatureCard 
              key={singleFeature.title} 
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              {...singleFeature} 
            />
          ))}
        </CustomAutofitGrid>
      </Wrapper>
    </Page>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 5rem;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 90rem;
  margin: 0 auto 6rem;
`;

const OverTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-transform: uppercase;
  color: rgb(var(--primary));
`;

const Description = styled.div`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.8);
  line-height: 1.6;
  margin-top: 2.5rem;
`;

const FeatureCard = styled(BasicCard)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3rem;
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  border: 1px solid rgba(var(--primary), 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    border: 1px solid rgba(var(--primary), 0.3);
    box-shadow: 0 0 30px rgba(var(--primary), 0.1);
  }
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 35rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }

  gap: 4rem;
  margin-top: 6rem;
`;
