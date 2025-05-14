/* eslint-disable sort-imports */
/* eslint-disable import/order */
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { media } from 'utils/media';

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    location: string;
    image: string;
    category: string;
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <CardContainer>
      <CardWrapper 
        whileHover={{ 
          y: -8,
          boxShadow: '0 20px 40px rgba(115, 10, 168, 0.15)',
        }} 
        whileTap={{ scale: 0.98 }}
      >
        <Link href={`/marketplace/listings/${listing.id}`} style={{ textDecoration: 'none' }}>
          <ImageContainer>
            <StyledImage 
              src={listing.image} 
              alt={listing.title}
              fill
              style={{ objectFit: 'cover' }}
            />
            <Category>{listing.category}</Category>
            <ImageOverlay />
          </ImageContainer>
          
          <Content>
            <Title>{listing.title}</Title>
            <Description>{listing.description}</Description>
            
            <Footer>
              <Rating>
                <FaStar /> {listing.rating}
              </Rating>
              <Location>
                <FaMapMarkerAlt /> {listing.location}
              </Location>
              <Price>${listing.price}/hr</Price>
            </Footer>
          </Content>
        </Link>
      </CardWrapper>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  height: 100%;
  perspective: 1000px;
`;

const CardWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(115, 10, 168, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(115, 10, 168, 0.1);
  
  ${media('<=desktop')} {
    border-radius: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 24rem;
  overflow: hidden;
  
  ${media('<=tablet')} {
    height: 20rem;
  }
`;

const StyledImage = styled(Image)`
  transition: transform 0.3s ease;
  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.2) 100%
  );
`;

const Category = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(115, 10, 168, 0.9);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 3rem;
  font-size: 1.4rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100% - 24rem);
  
  ${media('<=tablet')} {
    padding: 2rem;
    height: calc(100% - 20rem);
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin: 0 0 1rem;
  
  ${media('<=tablet')} {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.8);
  margin: 0 0 2rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  ${media('<=tablet')} {
    font-size: 1.4rem;
    margin: 0 0 1.5rem;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  border-top: 1px solid rgba(115, 10, 168, 0.1);
  padding-top: 1.5rem;
  gap: 1.5rem;
  
  ${media('<=tablet')} {
    font-size: 1.4rem;
    padding-top: 1.2rem;
    gap: 1rem;
  }
`;

const Rating = styled.span`
  color: #f1c40f;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const Location = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(var(--text), 0.7);
  flex: 1;
  
  svg {
    color: rgb(115, 10, 168);
  }
`;

const Price = styled.span`
  font-weight: 600;
  color: rgb(115, 10, 168);
  background: rgba(115, 10, 168, 0.1);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
`;