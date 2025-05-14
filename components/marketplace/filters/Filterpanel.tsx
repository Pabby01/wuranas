/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryFilter from './CategoryFilter';
import LocationFilter from './LocationFilter';
import RangeSlider from './RangeSlider';
import RatingFilter from './RatingFilter';

interface FilterPanelProps {
  filters: {
    category: string;
    priceRange: number[];
    location: string;
    rating: number;
  };
  onFilterChange: (filters: unknown) => void;
}

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const categories = [
    'All Categories',
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Graphic Design',
    'Content Writing',
    'Digital Marketing',
  ];

  const handlePriceChange = (range: number[]) => {
    onFilterChange({ ...filters, priceRange: range });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  const handleLocationChange = (location: string) => {
    onFilterChange({ ...filters, location });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      priceRange: [0, 1000],
      location: '',
      rating: 0
    });
  };

  return (
    <Wrapper>
      <Header>
        <Title>Filters</Title>
        <ClearButton onClick={clearFilters}>Clear All</ClearButton>
      </Header>

      <Section>
        <SectionTitle>Category</SectionTitle>
        <CategoryFilter
          categories={categories}
          selected={filters.category}
          onChange={handleCategoryChange}
        />
      </Section>

      <Section>
        <SectionTitle>Price Range (USD/hr)</SectionTitle>
        <RangeSlider
          min={0}
          max={1000}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
      </Section>

      <Section>
        <SectionTitle>Location</SectionTitle>
        <LocationFilter
          value={filters.location}
          onChange={handleLocationChange}
        />
      </Section>

      <Section>
        <SectionTitle>Minimum Rating</SectionTitle>
        <RatingFilter
          value={filters.rating}
          onChange={handleRatingChange}
        />
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: rgb(115, 10, 168);
  font-size: 1.4rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  margin: 0 0 1.5rem;
  color: rgba(var(--text), 0.8);
`;