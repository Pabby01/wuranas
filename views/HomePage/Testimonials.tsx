import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';

interface TestimonialProps {
  content: string;
  author: {
    name: string;
    location: string;
    rating: number;
  };
}

const TESTIMONIALS: TestimonialProps[] = [
  {
    content: 'Wurana transformed how I find reliable plumbers—secure payments and real reviews!',
    author: {
      name: 'Yemi A.',
      location: 'Lagos',
      rating: 5
    },
  },
  {
    content: 'As a carpenter, I\'ve tripled my client base across Nigeria. The escrow system gives me peace of mind.',
    author: {
      name: 'Funke O.',
      location: 'Ibadan',
      rating: 5
    },
  },
  {
    content: 'Best low-fee platform I\'ve used—got paid in minutes, and my NFT badges look great!',
    author: {
      name: 'Ahmed S.',
      location: 'Abuja',
      rating: 5
    },
  },
];

export default function Testimonials() {
  return (
    <Wrapper>
      <Container>
        <Title>What Our Users Say</Title>
        <TestimonialsGrid>
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <Stars>
                {Array.from({ length: testimonial.author.rating }).map((_, idx) => (
                  <Star key={idx}>★</Star>
                ))}
              </Stars>
              <Content>"{testimonial.content}"</Content>
              <AuthorContainer>
                <AuthorContent>
                  <AuthorName>{testimonial.author.name}</AuthorName>
                  <AuthorLocation>{testimonial.author.location}</AuthorLocation>
                </AuthorContent>
              </AuthorContainer>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background: rgb(var(--background));
  padding: 8rem 0;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  text-align: center;
  margin-bottom: 6rem;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background: rgba(var(--text), 0.05);
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
`;

const Stars = styled.div`
  margin-bottom: 2rem;
`;

const Star = styled.span`
  color: #FFC107;
  font-size: 2rem;
  margin: 0 0.2rem;
`;

const Content = styled.blockquote`
  font-size: 1.8rem;
  line-height: 1.5;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  font-style: italic;
`;

const AuthorContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AuthorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthorName = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: rgb(var(--text));
`;

const AuthorLocation = styled.div`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
  margin-top: 0.5rem;
`;
