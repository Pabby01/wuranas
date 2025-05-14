import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaClock, FaMapMarkerAlt, FaStar, FaWallet } from 'react-icons/fa';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';

export default function ListingDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  // Placeholder data - replace with API call
  const listing = {
    id: '1',
    title: 'Professional Web Developer',
    description: 'Full-stack development with modern technologies. Experienced in React, Node.js, and cloud platforms.',
    price: 50,
    rating: 4.8,
    reviews: 156,
    location: 'Lagos, Nigeria',
    image: '/wura/peju.jpg',
    category: 'Development',
    artisan: {
      name: 'John Doe',
      image: '/wura/tek.jpg',
      joined: '2023',
      completedJobs: 234
    },
    gallery: [
      '/wura/secure.jpg',
      '/wura/pay.jpg',
      '/wura/rep.jpg'
    ]
  };

  return (
    <Wrapper>
      <Container>
        <Content>
          <MainSection>
            <ImageGallery>
              <MainImage>
                <Image 
                  src={listing.image} 
                  alt={listing.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </MainImage>
              <ThumbnailGrid>
                {listing.gallery.map((img, i) => (
                  <Thumbnail key={i}>
                    <Image 
                      src={img} 
                      alt={`${listing.title} ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Thumbnail>
                ))}
              </ThumbnailGrid>
            </ImageGallery>

            <Details>
              <Category>{listing.category}</Category>
              <Title>{listing.title}</Title>
              <RatingSection>
                <Rating>
                  <FaStar /> {listing.rating}
                </Rating>
                <ReviewCount>({listing.reviews} reviews)</ReviewCount>
                <Location>
                  <FaMapMarkerAlt /> {listing.location}
                </Location>
              </RatingSection>
              <Description>{listing.description}</Description>
            </Details>
          </MainSection>

          <Sidebar>
            <PriceCard>
              <PriceHeader>
                <PriceAmount>${listing.price}</PriceAmount>
                <span>per hour</span>
              </PriceHeader>
              <BookButton 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </BookButton>
            </PriceCard>

            <ArtisanCard>
              <ArtisanHeader>
                <ArtisanImage>
                  <Image 
                    src={listing.artisan.image} 
                    alt={listing.artisan.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </ArtisanImage>
                <ArtisanInfo>
                  <ArtisanName>{listing.artisan.name}</ArtisanName>
                  <JoinedDate>
                    <FaClock /> Joined {listing.artisan.joined}
                  </JoinedDate>
                </ArtisanInfo>
              </ArtisanHeader>
              <ArtisanStats>
                <StatItem>
                  <FaWallet />
                  <div>
                    <StatValue>{listing.artisan.completedJobs}</StatValue>
                    <StatLabel>Jobs Completed</StatLabel>
                  </div>
                </StatItem>
              </ArtisanStats>
              <ContactButton>
                Contact Artisan
              </ContactButton>
            </ArtisanCard>
          </Sidebar>
        </Content>
      </Container>
    </Wrapper>
  );
}

// Styled components for the listing details page
const Wrapper = styled.div`
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba(115, 10, 168, 0.05), rgba(110, 9, 141, 0.05));
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 35rem;
  gap: 3rem;

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImage = styled.div`
  position: relative;
  width: 100%;
  height: 40rem;
  border-radius: 0.6rem;
  overflow: hidden;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 12rem;
  border-radius: 0.6rem;
  overflow: hidden;
  cursor: pointer;
`;

const Details = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Category = styled.span`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: rgba(115, 10, 168, 0.1);
  color: rgb(115, 10, 168);
  border-radius: 2rem;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  margin: 0 0 2rem;
  color: rgb(var(--text));
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f1c40f;
  font-size: 1.8rem;
  font-weight: bold;
`;

const ReviewCount = styled.span`
  color: rgba(var(--text), 0.6);
  font-size: 1.6rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(var(--text), 0.6);
  font-size: 1.6rem;
`;

const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PriceCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PriceHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const PriceAmount = styled.span`
  font-size: 3.2rem;
  font-weight: bold;
  color: rgb(115, 10, 168);
`;

const BookButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  background: rgb(115, 10, 168);
  color: white;
  border: none;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: rgb(95, 8, 138);
  }
`;

const ArtisanCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ArtisanHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ArtisanImage = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ArtisanInfo = styled.div`
  flex: 1;
`;

const ArtisanName = styled.h3`
  font-size: 1.8rem;
  margin: 0 0 0.5rem;
  color: rgb(var(--text));
`;

const JoinedDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(var(--text), 0.6);
  font-size: 1.4rem;
`;

const ArtisanStats = styled.div`
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: rgba(115, 10, 168, 0.05);
  border-radius: 0.8rem;

  svg {
    font-size: 2rem;
    color: rgb(115, 10, 168);
  }
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: rgb(var(--text));
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.6);
`;

const ContactButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: white;
  color: rgb(115, 10, 168);
  border: 2px solid rgb(115, 10, 168);
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(115, 10, 168, 0.05);
  }
`;