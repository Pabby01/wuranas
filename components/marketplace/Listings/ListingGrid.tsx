/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
import styled from 'styled-components';
import ListingCard from './ListingCard';
import { media } from 'utils/media';

interface ListingGridProps {
  filters: {
    category: string;
    priceRange: number[];
    location: string;
    rating: number;
  };
  currentPage: number;
  itemsPerPage: number;
}

export default function ListingGrid({ filters, currentPage, itemsPerPage }: ListingGridProps) {
  // Placeholder data - will be replaced with API call
  const listings = [
    {
      id: '1',
      title: 'Professional Web Developer',
      description: 'Full-stack development with modern technologies',
      price: 50,
      rating: 4.8,
      location: 'Lagos, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Development'
    },
    {
      id: '1',
      title: 'Skilled Fashion Designer',
      description: 'Custom clothing and alterations',
      price: 50,
      rating: 4.8,
      location: 'Abeokuta, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Fashion'
    },
    {
      id: '1',
      title: 'Professional Web Developer',
      description: 'Full-stack development with modern technologies',
      price: 50,
      rating: 4.8,
      location: 'Lagos, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Development'
    },
    {
      id: '1',
      title: 'Professional Web Developer',
      description: 'Full-stack development with modern technologies',
      price: 50,
      rating: 4.8,
      location: 'Lagos, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Development'
    },
    {
      id: '1',
      title: 'Professional Web Developer',
      description: 'Full-stack development with modern technologies',
      price: 150,
      rating: 5.0,
      location: 'Lagos, Nigeria',
      image: '/wura/tek.jpg',
      category: 'Development'
    },
    {
      id: '1',
      title: 'Professional Web Developer',
      description: 'Full-stack development with modern technologies',
      price: 50,
      rating: 4.8,
      location: 'Lagos, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Development'
    },
    {
      id: '1',
      title: 'Professional Web Developer',
      description: 'Full-stack development with modern technologies',
      price: 50,
      rating: 2.5,
      location: 'Lagos, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Development'
    },
    {
      id: '1',
      title: 'Professional Web Developer',
      description: 'Full-stack development with modern technologies',
      price: 50,
      rating: 1.0,
      location: 'Abuja, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Development'
    },
    // Add more placeholder listings
  ];

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedListings = listings.slice(startIndex, endIndex);

  return (
    <Wrapper>
      {paginatedListings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: 3rem;
  
  ${media('<=desktop')} {
    grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  }
  
  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;