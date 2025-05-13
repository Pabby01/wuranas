/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sort-imports */
import { IconBrandDiscord, IconBrandFacebook, IconBrandGithub, IconBrandLinkedin, IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';

type SingleFooterListItem = { title: string; href: string };
type FooterListItems = SingleFooterListItem[];
type SingleFooterList = { title: string; items: FooterListItems };
type FooterItems = SingleFooterList[];

const footerItems: FooterItems = [
  {
    title: 'Company',
    items: [
      { title: 'About Us', href: '/about' },
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { title: 'Marketplace', href: '/marketplace' },
      { title: 'Become an Artisan', href: '/become-artisan' },
      { title: 'How It Works', href: '/how-it-works' },
      { title: 'Escrow Service', href: '/features/escrow' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'Blog', href: '/blog' },
      { title: 'Artisan Guide', href: '/artisan-guide' },
      { title: 'FAQ', href: '/faq' },
      { title: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Community',
    items: [
      { title: 'Discord', href: 'https://discord.gg/wurana' },
      { title: 'Twitter', href: 'https://twitter.com/wuranaapp' },
      { title: 'Documentation', href: '/docs' },
      { title: 'Roadmap', href: '/roadmap' },
    ],
  },
];

const fadeInUpVariants = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 },
};

export default function Footer() {
  return (
    <FooterWrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Container>
        <ListContainer>
          {footerItems.map((singleItem, index) => (
            <motion.div
              key={singleItem.title}
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FooterList {...singleItem} />
            </motion.div>
          ))}
        </ListContainer>
        <BottomBar>
          <SocialLinks />
          <Copyright as={motion.p} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            &copy; Copyright 2025 Wurana
          </Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

function FooterList({ title, items }: SingleFooterList) {
  return (
    <ListWrapper>
      <ListHeader>{title}</ListHeader>
      {items.map((singleItem) => (
        <ListItem key={singleItem.href} {...singleItem} />
      ))}
    </ListWrapper>
  );
}

function ListItem({ title, href }: SingleFooterListItem) {
  return (
    <ListItemWrapper>
      <NextLink href={href}>
        <motion.span whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
          {title}
        </motion.span>
      </NextLink>
    </ListItemWrapper>
  );
}

const SocialLinks = () => (
  <ShareBar>
    <SocialLink 
      href="https://twitter.com/wuranaapp" 
      target="_blank"
      rel="noopener noreferrer"
      as={motion.a} 
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.95 }}
    >
      <IconBrandTwitter size={24} stroke={2} />
    </SocialLink>

    <SocialLink 
      href="https://discord.gg/wurana" 
      target="_blank"
      rel="noopener noreferrer"
      as={motion.a} 
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.95 }}
    >
      <IconBrandDiscord size={24} stroke={2} />
    </SocialLink>

    <SocialLink 
      href="https://github.com/wurana" 
      target="_blank"
      rel="noopener noreferrer"
      as={motion.a} 
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.95 }}
    >
      <IconBrandGithub size={24} stroke={2} />
    </SocialLink>

    <SocialLink 
      href="https://facebook.com/wuranaapp" 
      target="_blank"
      rel="noopener noreferrer"
      as={motion.a} 
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.95 }}
    >
      <IconBrandFacebook size={24} stroke={2} color="black" />
    </SocialLink>

     <SocialLink 
      href="https://instagram.com/wuranaapp" 
      target="_blank"
      rel="noopener noreferrer"
      as={motion.a} 
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.95 }}
    >
      <IconBrandInstagram size={24} stroke={2} color="black" />
    </SocialLink>
  </ShareBar>
);

const FooterWrapper = styled(motion.div)`
  padding-top: 10rem;
  padding-bottom: 4rem;
  background: rgba(var(--secondary), 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(var(--primary), 0.1);
  color: rgb(var(--textSecondary));
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
`;

const ListHeader = styled.p`
  font-weight: 700;
  font-size: 2rem;
  background: linear-gradient(90deg, rgb(var(--primary)), rgb(var(--secondary)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2.5rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ListItemWrapper = styled.p`
  font-size: 1.6rem;

  a {
    text-decoration: none;
    color: rgba(var(--textSecondary), 0.75);
    transition: all 0.2s ease-in-out;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background: linear-gradient(90deg, rgb(var(--primary)), transparent);
      transition: width 0.3s ease;
    }

    &:hover {
      color: rgb(var(--primary));
      &:after {
        width: 100%;
      }
    }
  }
`;

const ShareBar = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const SocialLink = styled(NextLink)`
  color: white;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  background: hsla(0, 0.00%, 100.00%, 0.87);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(var(--primary), 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(241, 238, 238, 0.92);
  }
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  opacity: 0.7;
  margin-top: 0.5rem;
`;

const BottomBar = styled.div`
  margin-top: 6rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(var(--textSecondary), 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media('<=tablet')} {
    flex-direction: column;
    gap: 2rem;
  }
`;
