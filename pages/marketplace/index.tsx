/* eslint-disable import/order */
import FilterPanel from 'components/marketplace/filters/Filterpanel';
import SearchBar from 'components/marketplace/filters/SearchBar';
import ListingGrid from 'components/marketplace/Listings/ListingGrid';
import { useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function MarketplacePage() {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    location: '',
    rating: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Artisan Marketplace</Title>
          <SubTitle>Discover skilled artisans in your area</SubTitle>
        </Header>
        
        <Content>
          <FilterSection>
            <SearchBar />
            <FilterPanel 
              filters={filters} 
              onFilterChange={(newFilters: unknown) => {
                setFilters(newFilters as {
                  category: string;
                  priceRange: number[];
                  location: string;
                  rating: number;
                });
                setCurrentPage(1); // Reset to first page when filters change
              }} 
            />
          </FilterSection>
          
          <MainSection>
            <ListingGrid 
              filters={filters} 
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            <PaginationWrapper>
              <PaginationButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FaArrowLeft /> Previous
              </PaginationButton>
              <PageInfo>Page {currentPage}</PageInfo>
              <PaginationButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next <FaArrowRight />
              </PaginationButton>
            </PaginationWrapper>
          </MainSection>
        </Content>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba(115, 10, 168, 0.05), rgba(110, 9, 141, 0.05));
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(135deg, rgb(115, 10, 168), rgb(110, 9, 141));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.8);
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 28rem 1fr;
  gap: 3rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const FilterSection = styled.aside`
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

const MainSection = styled.main``;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  padding: 2rem 0;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 3rem;
  background: rgb(115, 10, 168);
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: rgb(95, 8, 138);
  }

  svg {
    font-size: 1.4rem;
  }
`;

const PageInfo = styled.span`
  font-size: 1.6rem;
  color: rgba(var(--text), 0.8);
  font-weight: 500;
`;