import styled from 'styled-components';
import { motion } from 'framer-motion';
import Page from 'components/Page';
import { media } from 'utils/media';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroSection = styled.section`
  padding: 4rem 0;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  color: var(--text-secondary);
`;

const ContentSection = styled.section`
  padding: 4rem 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  background: var(--background-secondary);
  border-radius: 8px;
  text-align: center;
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
  }
`;

export default function EscrowFeaturePage() {
  return (
    <Page 
      title="Secure Escrow System" 
      description="Smart contracts automatically handle payment escrow, ensuring artisans get paid and clients receive quality work."
    >
      <Wrapper>
        <HeroSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title>Secure Escrow System</Title>
            <Description>
              Our blockchain-powered escrow system ensures safe and transparent transactions 
              between artisans and clients. Funds are held securely until job completion.
            </Description>
          </motion.div>
        </HeroSection>

        <ContentSection>
          <FeatureGrid>
            <FeatureCard>
              <h3>Smart Contract Security</h3>
              <p>Automated escrow powered by Solana smart contracts ensures fair and secure transactions.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Instant Release</h3>
              <p>Funds are released instantly upon mutual job completion confirmation.</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Dispute Resolution</h3>
              <p>Built-in arbitration process protects both parties in case of disagreements.</p>
            </FeatureCard>
          </FeatureGrid>
        </ContentSection>
      </Wrapper>
    </Page>
  );
}