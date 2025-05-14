import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/marketplace',
      query: { search: query }
    });
  };

  return (
    <Wrapper onSubmit={handleSearch}>
      <SearchInput
        type="text"
        placeholder="Search for artisans, skills, or services..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSearch />
        Search
      </SearchButton>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1.2rem 1.6rem;
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 0.8rem;
  font-size: 1.6rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: rgb(115, 10, 168);
    box-shadow: 0 0 0 2px rgba(115, 10, 168, 0.1);
  }
`;

const SearchButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0.5rem;
  background: rgb(115, 10, 168);
  color: white;
  border: none;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgb(95, 8, 138);
  }
`;