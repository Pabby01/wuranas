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
      title: 'Master Carpenter',
      description: 'Custom furniture and woodworking specialist with 10+ years experience',
      price: 45,
      rating: 4.9,
      location: 'Lagos, Nigeria',
      image: '/wura/tek.jpg',
      category: 'Carpentry'
    },
    {
      id: '2',
      title: 'Professional Electrician',
      description: 'Residential and commercial electrical installations and repairs',
      price: 40,
      rating: 4.7,
      location: 'Abuja, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Electrical'
    },
    {
      id: '3',
      title: 'Skilled Fashion Designer',
      description: 'Custom clothing and traditional attire alterations',
      price: 35,
      rating: 4.8,
      location: 'Abeokuta, Nigeria',
      image: '/wura/tito.jpg',
      category: 'Fashion'
    },
    {
      id: '4',
      title: 'Expert Plumber',
      description: 'Plumbing installations, repairs, and maintenance services',
      price: 38,
      rating: 4.6,
      location: 'Port Harcourt, Nigeria',
      image: '/wura/tunde.jpg',
      category: 'Plumbing'
    },
    {
      id: '5',
      title: 'Professional Welder',
      description: 'Metal fabrication and structural welding specialist',
      price: 42,
      rating: 4.9,
      location: 'Kano, Nigeria',
      image: '/wura/art.jpg',
      category: 'Welding'
    },
    {
      id: '6',
      title: 'Experienced Mason',
      description: 'Bricklaying, concrete work, and stone masonry',
      price: 40,
      rating: 4.7,
      location: 'Ibadan, Nigeria',
      image: '/wura/tek.jpg',
      category: 'Masonry'
    },
    {
      id: '7',
      title: 'Auto Mechanic',
      description: 'Vehicle repairs, maintenance, and diagnostics',
      price: 45,
      rating: 4.8,
      location: 'Enugu, Nigeria',
      image: '/wura/peju.jpg',
      category: 'Automotive'
    },
    {
      id: '8',
      title: 'HVAC Technician',
      description: 'Air conditioning and heating system installations',
      price: 48,
      rating: 4.5,
      location: 'Kaduna, Nigeria',
      image: '/wura/tito.jpg',
      category: 'HVAC'
    }
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