import { motion } from 'framer-motion';
import { InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import ArticleCard from 'components/ArticleCard';
import AutofitGrid from 'components/AutofitGrid';
import Container from 'components/Container';
import Page from 'components/Page';
import { media } from 'utils/media';
import { getAllPosts } from 'utils/postsFetcher';

export default function BlogIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page
      title="Wurana Blog - Web3 Artisan Insights"
      description="Explore the latest insights about blockchain technology, artisan services, and the future of decentralized marketplaces."
    >
      <HeaderContainer>
        <Header as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Title>Latest Updates</Title>
          <Description>
            Stay informed about the latest developments in blockchain technology, artisan services, and how Wurana is revolutionizing the
            marketplace.
          </Description>
        </Header>
      </HeaderContainer>

      <BlogContainer>
        <CustomAutofitGrid>
          {posts.map((singlePost, idx) => (
            <motion.div
              key={singlePost.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ArticleCard
                title={singlePost.meta.title}
                description={singlePost.meta.description}
                imageUrl={singlePost.meta.imageUrl}
                slug={singlePost.slug}
              />
            </motion.div>
          ))}
        </CustomAutofitGrid>
      </BlogContainer>
    </Page>
  );
}

const HeaderContainer = styled.div`
  padding: 5rem 0;
  background: linear-gradient(180deg, rgba(var(--secondary), 0.05) 0%, rgba(var(--secondary), 0) 100%);
`;

const Header = styled(Container)`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4.8rem;
  background: linear-gradient(135deg, rgb(var(--primary)), #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;

  ${media('<=tablet')} {
    font-size: 3.6rem;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.8);
  max-width: 60rem;
  margin: 0 auto;
  line-height: 1.6;
`;

const BlogContainer = styled(Container)`
  padding: 5rem 0;
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }

  .article-card-wrapper {
    max-width: 100%;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
