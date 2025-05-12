import { IconBrandDiscord, IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
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
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Cookies Policy', href: '/cookies-policy' },
    ],
  },
  {
    title: 'Product',
    items: [
      { title: 'Features', href: '/features' },
      { title: 'Something', href: '/something' },
      { title: 'Something else', href: '/something-else' },
      { title: 'And something else', href: '/and-something-else' },
    ],
  },
  {
    title: 'Knowledge',
    items: [
      { title: 'Blog', href: '/blog' },
      { title: 'Contact', href: '/contact' },
      { title: 'FAQ', href: '/faq' },
      { title: 'Help Center', href: '/help-center' },
    ],
  },
  {
    title: 'Something',
    items: [
      { title: 'Features2', href: '/features2' },
      { title: 'Something2', href: '/something2' },
      { title: 'Something else2', href: '/something-else2' },
      { title: 'And something else2', href: '/and-something-else2' },
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
          <ShareBar>
            <SocialLink href="https://twitter.com/my-saas-startup" as={motion.a} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconBrandTwitter size={32} stroke={1.5} />
            </SocialLink>

            <SocialLink href="https://facebook.com/my-saas-startup" as={motion.a} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconBrandFacebook size={32} stroke={1.5} />
            </SocialLink>

            <SocialLink href="https://linkedin.com/my-saas-startup" as={motion.a} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconBrandLinkedin size={32} stroke={1.5} />
            </SocialLink>

            <SocialLink href="https://discord.com/my-saas-startup" as={motion.a} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconBrandDiscord size={32} stroke={1.5} />
            </SocialLink>
          </ShareBar>
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
  color: rgba(var(--textSecondary), 0.75);
  transition: color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  background: rgba(var(--primary), 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    color: rgb(var(--primary));
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
