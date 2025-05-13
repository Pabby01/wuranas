import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';
import Page from 'components/Page';
import WaitlistForm from 'components/WaitlistForm';
import { media } from 'utils/media';

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const benefitItems = [
  {
    icon: '⚡',
    title: 'Early Platform Access',
    description: 'Be the first to use our marketplace',
    animate: true
  },
  {
    icon: '💎',
    title: 'Zero Platform Fees',
    description: 'During entire beta period'
  },
  {
    icon: '🎨',
    title: 'Exclusive NFT Badge',
    description: 'Limited edition beta tester badge'
  },
  {
    icon: '🎯',
    title: 'Priority Support',
    description: 'Direct access to our team'
  }
];

export default function WaitlistPage() {
  return (
    <Page
      title="Join Wurana Early Access - Revolutionary Artisan Marketplace"
      description="Get exclusive early access to Wurana - the future of artisan services on Solana. Zero fees during beta, exclusive NFT badges, and priority support await!"
    >
      <WaitlistWrapper>
        <HeroBackground>
          <Image 
            src="/wura/art.jpg" 
            alt="Artisan Marketplace" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority
            quality={90}
          />
          <Overlay />
        </HeroBackground>

        <ContentWrapper>
          <HeaderContent
            as={motion.div}
            initial="initial"
            animate="animate"
            variants={fadeInUpVariants}
            transition={{ duration: 0.6 }}
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

          <FormContainer
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BenefitsList>
              {benefitItems.map((item, index) => (
                <BenefitItem
                  key={item.title}
                  as={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <BenefitIcon>
                    {item.animate ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        {item.icon}
                      </motion.span>
                    ) : (
                      item.icon
                    )}
                  </BenefitIcon>
                  <BenefitText>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </BenefitText>
                </BenefitItem>
              ))}
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
  overflow-x: hidden; // Add this to prevent horizontal scroll
  padding: 4rem 2rem; // Add horizontal padding
  width: 100%; // Add this
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
  background: linear-gradient(135deg, rgba(var(--secondary), 0.95), rgba(var(--secondary), 0.7));
  backdrop-filter: blur(5px);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; // Add this
  max-width: 120rem;
  margin: 0 auto; // Add this
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
  background: linear-gradient(135deg, #ffc107 0%, rgb(var(--primary)) 50%, #ffc107 100%);
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
  padding: 3rem; // Reduce padding
  border: 1px solid rgba(var(--primary), 0.1);
  margin: 2rem;

  ${media('<=tablet')} {
    flex-direction: column;
    padding: 2rem;
    gap: 3rem;
    margin: 1rem; // Add responsive margin
  }
`;

const BenefitsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2rem;
  width: 100%; // Add this
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
  width: 100%; // Add this
  min-width: auto; // Change from 40rem to auto
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 3rem;
  background: rgba(var(--cardBackground), 0.3);
  border: 1px solid rgba(var(--primary), 0.1);

  ${media('<=tablet')} {
    padding: 2rem;
  }
`;
