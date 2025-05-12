/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/order */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import { media } from 'utils/media';

interface TestimonialProps {
  content: string;
  author: {
    name: string;
    location: string;
    rating: number;
    nftBadge: string;
    completedJobs: number;
    imageUrl: string;
  };
}

const TESTIMONIALS: TestimonialProps[] = [
  {
    content: "Wurana's blockchain escrow made me feel secure. Instant payments and my NFT badges showcase my expertise!",
    author: {
      name: 'Yemi A.',
      location: 'Lagos',
      rating: 5,
      nftBadge: 'Master Craftsman',
      completedJobs: 124,
      imageUrl: '/wura/tek.jpg',
    },
  },
  {
    content: 'As a carpenter, my reputation NFTs have opened doors. Clients trust my verified track record instantly.',
    author: {
      name: 'Funke O.',
      location: 'Ibadan',
      rating: 5,
      nftBadge: 'Expert Artisan',
      completedJobs: 89,
      imageUrl: '/wura/tito.jpg',
    },
  },
  {
    content: 'Sub-cent transaction fees and instant settlements changed my business. The future of artisan work is here!',
    author: {
      name: 'Ahmed S.',
      location: 'Abuja',
      rating: 5,
      nftBadge: 'Rising Star',
      completedJobs: 45,
      imageUrl: '/wura/tunde.jpg',
    },
  },
];

export default function Testimonials() {
  return (
    <Wrapper>
      <Container>
        <HeaderSection>
          <OverTitle>Testimonials</OverTitle>
          <Title>Trusted by Artisans & Clients</Title>
          <Subtitle>Powered by Solana blockchain technology</Subtitle>
          <ReviewButton href="https://g.page/r/YOUR_GOOGLE_REVIEW_ID/review" target="_blank" rel="noopener noreferrer">
            Leave a Review on Google
          </ReviewButton>
        </HeaderSection>
        <TestimonialsGrid>
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TestimonialCard>
                <BadgeContainer>
                  <NFTBadge>{testimonial.author.nftBadge}</NFTBadge>
                  <CompletedJobs>{testimonial.author.completedJobs} jobs</CompletedJobs>
                </BadgeContainer>
                <Stars>
                  {Array.from({ length: testimonial.author.rating }).map((_, idx) => (
                    <Star key={idx}>★</Star>
                  ))}
                </Stars>
                <Content>"{testimonial.content}"</Content>
                <AuthorContainer>
                  <AuthorImage>
                    <img src={testimonial.author.imageUrl} alt={testimonial.author.name} />
                  </AuthorImage>
                  <AuthorContent>
                    <AuthorName>{testimonial.author.name}</AuthorName>
                    <AuthorLocation>{testimonial.author.location}</AuthorLocation>
                  </AuthorContent>
                </AuthorContainer>
              </TestimonialCard>
            </motion.div>
          ))}
        </TestimonialsGrid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background: linear-gradient(180deg, rgba(var(--secondary), 0.05) 0%, rgba(var(--secondary), 0) 100%);
  padding: 12rem 0;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 8rem;
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
  font-size: 4.2rem;
  background: linear-gradient(135deg, rgb(var(--primary)), #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;

  ${media('<=tablet')} {
    font-size: 3.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.8);
`;

const ReviewButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, rgb(var(--primary)), #ffc107);
  color: white;
  padding: 1.2rem 2.4rem;
  border-radius: 3rem;
  font-size: 1.6rem;
  font-weight: 600;
  text-decoration: none;
  margin-top: 3rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(var(--primary), 0.2);
  }
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
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 2rem;
  border: 1px solid rgba(var(--primary), 0.1);
  transition: all 0.3s ease;
  width: 100%;
  height: 42rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(var(--primary), 0.3);
    box-shadow: 0 0 30px rgba(var(--primary), 0.1);
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const NFTBadge = styled.div`
  background: rgba(var(--primary), 0.1);
  color: rgb(var(--primary));
  padding: 0.8rem 1.5rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const CompletedJobs = styled.div`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.7);
`;

const Stars = styled.div`
  margin-bottom: 2rem;
`;

const Star = styled.span`
  color: #ffc107;
  font-size: 2rem;
  margin: 0 0.2rem;
`;

const Content = styled.blockquote`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text));
  margin-bottom: 2.5rem;
  font-style: italic;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(var(--primary), 0.1);
  padding-top: 2rem;
`;

const AuthorImage = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(var(--primary), 0.2);
  margin-right: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
