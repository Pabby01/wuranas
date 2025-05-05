import NextLink from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { media } from 'utils/media';


export default function Hero() {
  const { setIsModalOpened } = useNewsletterModalContext();

  return (
    <HeroWrapper>
      <Contents>
        <CustomOverTitle>Book artisans in seconds—secure, on‑chain, and low‑fee on Solana.</CustomOverTitle>
        <Heading>"Empower your projects with frictionless artisan services on Solana"</Heading>
        <Description>
        Wurana is a Solana‑powered decentralized marketplace connecting skilled artisans with clients—facilitating secure on‑chain escrow and NFT‑backed reputations for instant trust. <br />
Enjoy seamless service booking with sub‑cent transaction fees, an intuitive UI for both clients and providers, and a unified dashboard that simplifies every step. <br />
        </Description>
        <CustomButtonGroup>
          <Button onClick={() => setIsModalOpened(true)}>
            Subscribe to the newsletter <span>&rarr;</span>
          </Button>
          <NextLink href="#whitepaper" passHref>
            <Button transparent>
              Features <span>&rarr;</span>
            </Button>
          </NextLink>
        </CustomButtonGroup>
      </Contents>
      <ImageContainer>
        <StyledImage
          src="/wura/art.jpg"
          alt="Wurana-artisan"
          width={500}
          height={700}
          priority
        />
      </ImageContainer>
    </HeroWrapper>
  );
}

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 5rem;

  ${media('<=desktop')} {
    padding-top: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const Contents = styled.div`
  flex: 1;
  max-width: 60rem;

  ${media('<=desktop')} {
    max-width: 100%;
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;

  ${media('<=desktop')} {
    margin-top: 2rem;
    justify-content: center;
  }
`;

const StyledImage = styled(Image)`
  max-width: 45rem;
  height: auto;
  border-radius: 65px;
  box-shadow: 0 10px 30px rgba(198, 16, 222, 0.18);

  ${media('<=desktop')} {
    max-width: 80%;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media('<=desktop')} {
    font-size: 1.5rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 7.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;
  overflow: visible;
  white-space: normal;
  word-wrap: break-word;

  span {
    display: inline-block;
    animation: glow 2s ease-in-out infinite;
  }

  @keyframes glow {
    0% { text-shadow: 0 0 10px rgba(var(--primary), 0.8) }
    50% { text-shadow: 0 0 20px rgba(var(--primary), 0.8), 0 0 30px rgba(var(--primary), 0.6) }
    100% { text-shadow: 0 0 10px rgba(var(--primary), 0.8) }
  }

  ${media('<=tablet')} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;
