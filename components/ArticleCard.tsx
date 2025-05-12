/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { media } from 'utils/media';

export interface ArticleCardProps {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  category?: string;
}

export default function ArticleCard({ title, slug, imageUrl, description, category = 'Web3' }: ArticleCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <CardLink href={'/blog/' + slug} passHref>
      <ArticleCardWrapper
        as={motion.div}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
      >
        <GlassMorphicContainer>
          <ImageContainer>
            <NextImage
              src={imageUrl}
              alt={title}
              width={400}
              height={250}
              style={{
                objectFit: 'cover',
                borderRadius: '1.5rem 1.5rem 0 0',
              }}
              priority
            />
            <Overlay />
          </ImageContainer>
          <Content>
            <CategoryBadge>{category}</CategoryBadge>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <ReadMore>
              Read Article <ArrowIcon>→</ArrowIcon>
            </ReadMore>
          </Content>
        </GlassMorphicContainer>
      </ArticleCardWrapper>
    </CardLink>
  );
}

const CardLink = styled(NextLink)`
  text-decoration: none;
  color: inherit;
  outline: none;
  -webkit-tap-highlight-color: transparent;
`;

const ArticleCardWrapper = styled.div`
  height: 45rem;
  max-width: 35rem;
  cursor: pointer;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const GlassMorphicContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background: rgba(var(--cardBackground), 0.7);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  border: 1px solid rgba(var(--primary), 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(var(--primary), 0.3);
    box-shadow: 0 0 30px rgba(var(--primary), 0.1), inset 0 0 30px rgba(var(--primary), 0.05);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 25rem;
  width: 100%;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(var(--cardBackground), 0.2) 100%);
  border-radius: 1.5rem 1.5rem 0 0;
`;

const Content = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: rgba(var(--primary), 0.1);
  color: rgb(var(--primary));
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 2rem;
  align-self: flex-start;
`;

const Title = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  color: rgb(var(--text));
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: rgba(var(--text), 0.8);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const ReadMore = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(var(--primary));
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  transition: gap 0.3s ease;

  &:hover {
    gap: 1rem;
  }
`;

const ArrowIcon = styled.span`
  transition: transform 0.3s ease;
  ${ArticleCardWrapper}:hover & {
    transform: translateX(5px);
  }
`;
