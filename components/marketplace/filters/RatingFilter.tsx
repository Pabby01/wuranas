import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
  const stars = [5, 4, 3, 2, 1];

  return (
    <Wrapper>
      {stars.map((rating) => (
        <RatingOption
          key={rating}
          selected={value === rating}
          onClick={() => onChange(rating)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Stars>
            {[...Array(rating)].map((_, i) => (
              <Star key={i} />
            ))}
          </Stars>
          <Label>& Up</Label>
        </RatingOption>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RatingOption = styled(motion.button)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 0.8rem;
  background: ${(p) => p.selected ? 'rgba(115, 10, 168, 0.1)' : 'white'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgb(115, 10, 168);
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Star = styled(FaStar)`
  color: #f1c40f;
  font-size: 1.6rem;
`;

const Label = styled.span`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.8);
`;