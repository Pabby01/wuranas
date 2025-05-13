import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';
import { media } from 'utils/media';

export default function WhatsAppButton() {
  const whatsappNumber = '+2349020250260'; // Replace with your WhatsApp number
  const message = encodeURIComponent('Hello! I need help with Wurana.');
  
  return (
    <WhatsAppLink 
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp size={24} />
      <span>Need Help?</span>
    </WhatsAppLink>
  );
}

const WhatsAppLink = styled(motion.a)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #25D366;
  color: white;
  padding: 1rem 2rem;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  
  span {
    font-size: 1.4rem;
    font-weight: 600;
  }

  &:hover {
    background: #128C7E;
  }

  ${media('<=tablet')} {
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 1rem;
    
    span {
      display: none;
    }
  }
`;