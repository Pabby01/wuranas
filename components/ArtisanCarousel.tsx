/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from 'utils/media';

type Artisan = {
  id: number;
  name: string;
  skills: string[];
  image: string;
};

const artisans: Artisan[] = [
  { id: 1, name: 'John Smith', skills: ['Carpentry', 'Woodworking'], image: '/wura/art.jpg' },
  { id: 2, name: 'Maria Garcia', skills: ['Painting', 'Murals'], image: '/wura/art.jpg' },
  { id: 3, name: 'David Chen', skills: ['Electrical', 'Solar Installation'], image: '/wura/art.jpg' },
  { id: 4, name: 'Sarah Johnson', skills: ['Plumbing', 'HVAC'], image: '/wura/art.jpg' },
  { id: 5, name: 'Michael Brown', skills: ['Masonry', 'Tiling'], image: '/wura/art.jpg' },
  { id: 6, name: 'Emma Wilson', skills: ['Interior Design', 'Decoration'], image: '/wura/art.jpg' },
  { id: 7, name: 'James Lee', skills: ['Landscaping', 'Garden Design'], image: '/wura/art.jpg' },
  { id: 8, name: 'Sofia Martinez', skills: ['Metalwork', 'Welding'], image: '/wura/art.jpg' },
  { id: 9, name: 'William Taylor', skills: ['Roofing', 'Waterproofing'], image: '/wura/art.jpg' },
  { id: 10, name: 'Olivia Anderson', skills: ['Flooring', 'Carpet Installation'], image: '/wura/art.jpg' },
  { id: 11, name: 'Lucas Kim', skills: ['Smart Home', 'Automation'], image: '/wura/art.jpg' },
  { id: 12, name: 'Isabella White', skills: ['Glass Work', 'Window Installation'], image: '/wura/art.jpg' },
  { id: 13, name: 'Ethan Davis', skills: ['Stone Work', 'Paving'], image: '/wura/art.jpg' },
  { id: 14, name: 'Ava Thompson', skills: ['Cabinet Making', 'Custom Furniture'], image: '/wura/art.jpg' },
  { id: 15, name: 'Noah Martin', skills: ['Security Systems', 'CCTV'], image: '/wura/art.jpg' },
];

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const hover = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

export default function ArtisanCarousel() {
  const [duplicatedArtisans, setDuplicatedArtisans] = useState<Artisan[]>([]);

  useEffect(() => {
    // Duplicate the artisans array to create a seamless scroll effect
    setDuplicatedArtisans([...artisans, ...artisans]);
  }, []);

  return (
    <CarouselWrapper>
      <CarouselTrack>
        {duplicatedArtisans.map((artisan, index) => (
          <ArtisanCard key={`${artisan.id}-${index}`}>
            <ImageWrapper>
              <StyledImage src={artisan.image} alt={artisan.name} width={200} height={200} priority />
            </ImageWrapper>
            <ArtisanName>{artisan.name}</ArtisanName>
            <SkillsList>
              {artisan.skills.map((skill, skillIndex) => (
                <SkillTag key={skillIndex}>{skill}</SkillTag>
              ))}
            </SkillsList>
          </ArtisanCard>
        ))}
      </CarouselTrack>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 15rem;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, rgb(var(--cardBackground)), transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, rgb(var(--cardBackground)), transparent);
  }

  ${media('<=desktop')} {
    padding: 1rem 0;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  animation: ${scroll} 40s linear infinite;
  width: fit-content;
  gap: 2rem;

  &:hover {
    animation-play-state: paused;
  }
`;

const ArtisanCard = styled.div`
  flex: 0 0 auto;
  width: 280px;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  border: 1px solid rgba(var(--primary), 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(var(--primary), 0.3);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  ${media('<=tablet')} {
    width: 240px;
    padding: 1.5rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  border-radius: 1rem;
  overflow: hidden;

  ${media('<=tablet')} {
    height: 150px;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArtisanName = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    font-size: 1.5rem;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  font-size: 1.2rem;
  padding: 0.3rem 0.8rem;
  background: rgba(var(--primary), 0.1);
  color: rgb(var(--primary));
  border-radius: 2rem;

  ${media('<=tablet')} {
    font-size: 1rem;
    padding: 0.2rem 0.6rem;
  }
`;
