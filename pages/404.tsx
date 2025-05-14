import Link from 'next/link';
import styled from 'styled-components';
import Container from 'components/Container';
import NotFoundIllustration from 'components/NotFoundIllustration';
import { media } from 'utils/media';

export default function NotFoundPage() {
  return (
    <Wrapper>
      <Container>
        <Content>
          <ImageContainer>
            <NotFoundIllustration />
          </ImageContainer>
          <Title>Craftsman's Corner Not Found</Title>
          <Description>
            Oops! This artisan's workshop seems to have moved 🛠️
          </Description>
          <SubText>
            The page you're looking for might be under construction or has been relocated.
          </SubText>
          <ButtonGroup>
            <HomeButton href="/">
              Return to Workshop
            </HomeButton>
            <ExploreButton href="/marketplace">
              Browse Artisans
            </ExploreButton>
          </ButtonGroup>
        </Content>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: linear-gradient(135deg, rgba(115, 10, 168, 0.05), rgba(110, 9, 141, 0.05));
  min-height: calc(100vh - 20rem);
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  text-align: center;
  padding: 4rem 0;
`;

const ImageContainer = styled.div`
  width: 30rem;
  margin: 0 auto 3rem;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  ${media('<=tablet')} {
    width: 25rem;
  }
`;

const Title = styled.h1`
  font-size: 4.2rem;
  font-weight: bold;
  background: linear-gradient(135deg, rgb(115, 10, 168), rgb(110, 9, 141));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 2rem;
  
  ${media('<=tablet')} {
    font-size: 3.2rem;
  }
`;

const Description = styled.h2`
  font-size: 2.4rem;
  color: rgb(var(--text));
  margin: 0 0 1rem;
  
  ${media('<=tablet')} {
    font-size: 2rem;
  }
`;

const SubText = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.8);
  margin: 0 0 3rem;
  
  ${media('<=tablet')} {
    font-size: 1.6rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  
  ${media('<=tablet')} {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  padding: 1.2rem 2.4rem;
  border-radius: 5rem;
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const HomeButton = styled(Button)`
  background: linear-gradient(135deg, rgb(115, 10, 168), rgb(110, 9, 141));
  color: white;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(115, 10, 168, 0.3);
  }
`;

const ExploreButton = styled(Button)`
  background: white;
  color: rgb(115, 10, 168);
  border: 2px solid rgb(115, 10, 168);
  
  &:hover {
    background: rgba(115, 10, 168, 0.1);
  }
`;
