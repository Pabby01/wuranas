import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import ArticleCard from 'components/ArticleCard';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';
import { useResizeObserver } from 'hooks/useResizeObserver';
import { SingleArticle } from 'types';
import { media } from 'utils/media';

interface ScrollableBlogPostsProps {
  posts: SingleArticle[];
}

export default function ScrollableBlogPosts({ posts }: ScrollableBlogPostsProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const { ref, width = 1 } = useResizeObserver<HTMLDivElement>();

  const oneItemWidth = 400; // Increased card width
  const noOfItems = Math.floor(width / oneItemWidth);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <Section>
      <Container>
        <Content
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <OverTitle>Stay Updated</OverTitle>
          <SectionTitle>Latest from Wurana</SectionTitle>
          <Description>
            Discover insights about blockchain technology, artisan services, and the future of decentralized marketplaces.
          </Description>
        </Content>
      </Container>

      <SwiperContainer ref={ref}>
        {hasMounted && (
          <Swiper
            modules={[A11y, Autoplay]}
            slidesPerView={noOfItems}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={1000}
          >
            {posts.map((singlePost, idx) => (
              <SwiperSlide key={singlePost.meta.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ArticleCard
                    title={singlePost.meta.title}
                    description={singlePost.meta.description}
                    imageUrl={singlePost.meta.imageUrl}
                    slug={singlePost.slug}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </SwiperContainer>
    </Section>
  );
}

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 5rem;

  & > *:last-child {
    margin-top: 1rem;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.8);
  max-width: 60rem;
  margin: 2rem auto 0;
  text-align: center;
  line-height: 1.6;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10rem 0;
  background: linear-gradient(
    180deg,
    rgba(var(--secondary), 0.05) 0%,
    rgba(var(--secondary), 0) 100%
  );
`;

const SwiperContainer = styled(Container)`
  max-width: 180rem;
  height: 50rem;
  padding: 0 2rem;

  .swiper {
    padding: 2rem;
    margin: -2rem;
  }

  .swiper-slide {
    height: auto;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  ${media('<=largeDesktop')} {
    max-width: 100%;
    padding: 0 2rem;
  }

  ${media('<=tablet')} {
    height: auto;
    padding: 0 1rem;
  }
`;
