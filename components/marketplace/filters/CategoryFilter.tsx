import { motion } from 'framer-motion';
import styled from 'styled-components';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <Wrapper>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          onClick={() => onChange(category)}
          selected={selected === category}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {category}
        </CategoryButton>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CategoryButton = styled(motion.button)<{ selected: boolean }>`
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(var(--text), 0.1);
  background: ${(p) => p.selected ? 'rgb(115, 10, 168)' : 'white'};
  color: ${(p) => p.selected ? 'white' : 'rgb(var(--text))'};
  font-size: 1.4rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => p.selected ? 'rgb(115, 10, 168)' : 'rgba(115, 10, 168, 0.1)'};
  }
`;