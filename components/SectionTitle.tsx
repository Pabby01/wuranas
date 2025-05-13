import { motion } from 'framer-motion';
import styled from 'styled-components';
import { media } from 'utils/media';

interface SectionTitleProps {
  $withAccent?: boolean;
  $gradient?: boolean;
}

const SectionTitle = styled(motion.div)<SectionTitleProps>`
  font-size: 5.2rem;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  
  ${props => props.$gradient && `
    background: linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}

  ${props => props.$withAccent && `
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -1rem;
      transform: translateX(-50%);
      width: 8rem;
      height: 4px;
      background: linear-gradient(90deg, rgb(var(--primary)), rgb(var(--secondary)));
      border-radius: 2px;
    }
  `}

  ${media('<=desktop')} {
    font-size: 4.6rem;
  }

  ${media('<=tablet')} {
    font-size: 3.8rem;
  }

  ${media('<=phone')} {
    font-size: 3.2rem;
  }
`;

// Example usage:
// <SectionTitle
//   $withAccent
//   $gradient
//   as={motion.h2}
//   initial={{ opacity: 0, y: 20 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true }}
//   transition={{ duration: 0.5 }}
// >
//   Your Title Here
// </SectionTitle>

export default SectionTitle;
