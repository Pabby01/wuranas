import styled from 'styled-components';
import Page from 'components/Page';
import { media } from 'utils/media';
import WaitlistForm from 'components/WaitlistForm';

export default function WaitlistPage() {
  return (
    <Page title="Join Waitlist" description="Join our waitlist to get early access to Wurana's artisan marketplace.">
      <WaitlistWrapper>
        <Title>Join Our Waitlist</Title>
        <Description>
          Be among the first to experience Wurana's revolutionary artisan marketplace on Solana. Sign up now for early access and updates.
        </Description>
        <FormWrapper>
          <WaitlistForm />
        </FormWrapper>
      </WaitlistWrapper>
    </Page>
  );
}

const WaitlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
  background: rgb(var(--background));
`;

const Title = styled.h1`
  font-size: 4.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 2rem;
  text-align: center;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    font-size: 3.6rem;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text));
  opacity: 0.8;
  line-height: 1.6;
  text-align: center;
  max-width: 60rem;
  margin: 0 auto 4rem;

  ${media('<=tablet')} {
    font-size: 1.5rem;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 2rem;
`;