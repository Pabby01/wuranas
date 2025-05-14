/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

interface LocationFilterProps {
  value: string;
  onChange: (location: string) => void;
}

export default function LocationFilter({ value, onChange }: LocationFilterProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Placeholder locations - replace with actual API call
  const locations = [
    'Lagos, Nigeria',
    'Abuja, Nigeria',
    'Port Harcourt, Nigeria',
    'Ibadan, Nigeria',
    'Kano, Nigeria',
    'Abeokuta, Nigeria',
    'Enugu, Nigeria',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);
    
    // Filter locations based on input
    const filtered = locations.filter(loc => 
      loc.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);
    setIsOpen(true);
  };

  const handleSelectLocation = (location: string) => {
    onChange(location);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <LocationIcon />
        <Input
          type="text"
          placeholder="Enter location..."
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        <SearchIcon />
      </InputWrapper>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <Suggestions
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {suggestions.map((location) => (
              <SuggestionItem
                key={location}
                onClick={() => handleSelectLocation(location)}
                whileHover={{ backgroundColor: 'rgba(115, 10, 168, 0.1)' }}
              >
                <FaMapMarkerAlt />
                {location}
              </SuggestionItem>
            ))}
          </Suggestions>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LocationIcon = styled(FaMapMarkerAlt)`
  position: absolute;
  left: 1.2rem;
  color: rgba(var(--text), 0.5);
  font-size: 1.6rem;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 1.2rem;
  color: rgba(var(--text), 0.5);
  font-size: 1.6rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 4rem;
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 0.8rem;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: rgb(115, 10, 168);
    box-shadow: 0 0 0 2px rgba(115, 10, 168, 0.1);
  }
`;

const Suggestions = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

const SuggestionItem = styled(motion.div)`
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: rgba(var(--text), 0.8);

  svg {
    color: rgb(115, 10, 168);
  }
`;