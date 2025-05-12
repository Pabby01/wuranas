import fs from 'fs';
import path from 'path';
import { motion } from 'framer-motion';
import matter from 'gray-matter';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import { formatDate } from 'utils/formatDate';
import { media } from 'utils/media';
import { getAllPosts } from 'utils/postsFetcher';
import { getReadTime } from 'utils/readTime';
import MetadataHead from 'views/SingleArticlePage/MetadataHead';

type PostData = {
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  imageUrl: string;
  content: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
};

type MetadataHeadProps = {
  title: string;
  description: string;
  author: string;
};

export default function SingleArticlePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [readTime, setReadTime] = useState('');

  useEffect(() => {
    if (contentRef.current) {
      setReadTime(getReadTime(contentRef.current.textContent || ''));
    }
  }, []);

  const { data } = props;

  if (!data) return null;

  return (
    <>
      <MetadataHead {...data} />
      <ArticleContainer>
        <HeaderSection>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Category>{data.category}</Category>
            <Title>{data.title}</Title>
            <MetaInfo>
              <AuthorDate>
                <span>{data.author}</span>
                <Separator>•</Separator>
                <span>{formatDate(new Date(data.date))}</span>
              </AuthorDate>
              <ReadTime>{readTime} read</ReadTime>
            </MetaInfo>
          </motion.div>
        </HeaderSection>

        <HeroImage>
          <Image src={data.imageUrl} alt={data.title} width={1200} height={600} priority style={{ objectFit: 'cover' }} />
        </HeroImage>

        <ContentContainer ref={contentRef}>
          <MDXRemote {...data.content} />
        </ContentContainer>
      </ArticleContainer>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const { slug } = params as { slug: string };
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    props: {
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        author: data.author,
        imageUrl: data.imageUrl,
        content: mdxSource,
      },
    },
  };
}

const ArticleContainer = styled.article`
  margin: 0 auto;
  max-width: 100rem;
  padding: 0 2rem;
`;

const HeaderSection = styled.header`
  margin: 10rem auto 5rem;
  text-align: center;
  max-width: 80rem;
`;

const Category = styled.div`
  color: rgb(var(--primary));
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, rgb(var(--primary)), #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${media('<=tablet')} {
    font-size: 3.5rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: rgba(var(--text), 0.8);
  font-size: 1.6rem;
`;

const AuthorDate = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Separator = styled.span`
  color: rgb(var(--primary));
`;

const ReadTime = styled.div`
  color: rgba(var(--text), 0.7);
`;

const HeroImage = styled.div`
  margin: 0 auto 5rem;
  max-width: 120rem;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(var(--primary), 0.1);
`;

const ContentContainer = styled.div`
  margin: 5rem auto;
  max-width: 80rem;
  font-size: 1.8rem;
  line-height: 1.8;
  color: rgba(var(--text), 0.9);

  h2 {
    font-size: 3.2rem;
    margin: 5rem 0 2rem;
    color: rgb(var(--text));
  }

  h3 {
    font-size: 2.4rem;
    margin: 4rem 0 2rem;
    color: rgb(var(--text));
  }

  p {
    margin: 2rem 0;
  }

  code {
    background: rgba(var(--primary), 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
    font-size: 1.6rem;
  }

  pre {
    background: rgba(var(--primary), 0.1);
    padding: 2rem;
    border-radius: 1rem;
    overflow-x: auto;
    margin: 3rem 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    margin: 3rem 0;
  }

  blockquote {
    border-left: 4px solid rgb(var(--primary));
    padding-left: 2rem;
    margin: 3rem 0;
    font-style: italic;
  }
`;
