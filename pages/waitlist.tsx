import styled from 'styled-components';
import { motion } from 'framer-motion';
import Page from 'components/Page';
import { media } from 'utils/media';
import WaitlistForm from 'components/WaitlistForm';
import Image from 'next/image';

export default function WaitlistPage() {
  return (
    <Page title="Early Access - Wurana" description="Join the revolutionary artisan marketplace on Solana. Get early access, zero fees during beta, and exclusive NFT badges.">
      <WaitlistWrapper>
        <HeroBackground>
          <Image 
            src="/wura/art.jpg" 
            alt="Artisan Marketplace"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Overlay />
        </HeroBackground>
        
        <ContentWrapper>
          <HeaderContent
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <GradientTitle>Early Access</GradientTitle>
            </motion.div>
            <SubtitleHighlight>Transform Your Artisan Business with Blockchain</SubtitleHighlight>
            <Description>
              Be among the first to experience Wurana's revolutionary artisan marketplace on Solana. 
              Get exclusive benefits and shape the future of skilled trades.
            </Description>
          </HeaderContent>

          <FormContainer>
            <BenefitsList>
              <BenefitItem>
                <BenefitIcon>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⚡
                  </motion.span>
                </BenefitIcon>
                <BenefitText>
                  <strong>Early Platform Access</strong>
                  <span>Be the first to use our marketplace</span>
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>💎</BenefitIcon>
                <BenefitText>
                  <strong>Zero Platform Fees</strong>
                  <span>During entire beta period</span>
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>🎨</BenefitIcon>
                <BenefitText>
                  <strong>Exclusive NFT Badge</strong>
                  <span>Limited edition beta tester badge</span>
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>🎯</BenefitIcon>
                <BenefitText>
                  <strong>Priority Support</strong>
                  <span>Direct access to our team</span>
                </BenefitText>
              </BenefitItem>
            </BenefitsList>

            <FormWrapper>
              <WaitlistForm />
            </FormWrapper>
          </FormContainer>
        </ContentWrapper>
      </WaitlistWrapper>
    </Page>
  );
}

const WaitlistWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  padding: 4rem 0;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(var(--secondary), 0.95),
    rgba(var(--secondary), 0.7)
  );
  backdrop-filter: blur(5px);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem;
  gap: 3rem;
`;

const HeaderContent = styled.div`
  text-align: center;
  max-width: 80rem;
  margin-top: 2rem;
`;

const GradientTitle = styled.h1`
  font-size: 7.2rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg, 
    #FFC107 0%,
    rgb(var(--primary)) 50%,
    #FFC107 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 15px rgba(var(--primary), 0.15);
  letter-spacing: -0.02em;
  
  ${media('<=tablet')} {
    font-size: 4.8rem;
  }
`;

const SubtitleHighlight = styled.h2`
  font-size: 2.8rem;
  color: rgb(var(--textSecondary));
  margin-bottom: 1.5rem;
  font-weight: 600;
  
  ${media('<=tablet')} {
    font-size: 2.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--textSecondary));
  opacity: 0.8;
  line-height: 1.6;
  text-align: center;
  max-width: 60rem;
  margin: 0 auto;

  ${media('<=tablet')} {
    font-size: 1.6rem;
    padding: 0 1rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;
  max-width: 110rem;
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 4rem;
  border: 1px solid rgba(var(--primary), 0.1);
  margin-bottom: 4rem;

  ${media('<=tablet')} {
    flex-direction: column;
    padding: 2rem;
    gap: 3rem;
  }
`;

const BenefitsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const BenefitIcon = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  background: rgba(var(--primary), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;

const BenefitText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  strong {
    font-size: 1.8rem;
    color: rgb(var(--text));
  }

  span {
    font-size: 1.4rem;
    color: rgb(var(--text), 0.8);
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  min-width: 40rem;
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 3rem;
  background: rgba(var(--cardBackground), 0.3);
  border: 1px solid rgba(var(--primary), 0.1);
  
  ${media('<=tablet')} {
    min-width: unset;
    padding: 2rem;
  }
`;