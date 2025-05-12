// Fix import order
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
// Remove unused imports
// import { staticRequest } from 'tinacms';
// import MDXRichText from 'components/MDXRichText';
// import { NonNullableChildrenDeep } from 'types';
import { formatDate } from 'utils/formatDate';
import { media } from 'utils/media';
import { getReadTime } from 'utils/readTime';
// import Header from 'views/SingleArticlePage/Header';
import MetadataHead from 'views/SingleArticlePage/MetadataHead';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
// Comment out or remove the Tina import
// import { Posts, PostsDocument, Query } from '.tina/__generated__/types';

// Modify the type definitions to not rely on Tina types
type PostData = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  imageUrl: string;
  body: string;
};

export default function SingleArticlePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [readTime, setReadTime] = useState('');

  useEffect(() => {
    calculateReadTime();
    lazyLoadPrismTheme();

    function calculateReadTime() {
      const currentContent = contentRef.current;
      if (currentContent) {
        setReadTime(getReadTime(currentContent.textContent || ''));
      }
    }

    function lazyLoadPrismTheme() {
      const prismThemeLinkEl = document.querySelector('link[data-id="prism-theme"]');

      if (!prismThemeLinkEl) {
        const headEl = document.querySelector('head');
        if (headEl) {
          const newEl = document.createElement('link');
          newEl.setAttribute('data-id', 'prism-theme');
          newEl.setAttribute('rel', 'stylesheet');
          newEl.setAttribute('href', '/prism-theme.css');
          newEl.setAttribute('media', 'print');
          newEl.setAttribute('onload', "this.media='all'; this.onload=null;");
          headEl.appendChild(newEl);
        }
      }
    }
  }, []);

  const { slug, data } = props;
  // Modify this line to use the new type
  const content = data.body;

  if (!data) {
    return null;
  }
  // Modify this line to use the new type
  const { title, description, date, tags, imageUrl } = data as PostData;
  const meta = { title, description, date: date, tags, imageUrl, author: '' };
  const formattedDate = formatDate(new Date(date));
  const absoluteImageUrl = imageUrl.replace(/\/+/, '/');
  return (
    <>
      <Head>
        {/* Replace manual CSS import with proper Next.js styling */}
        <link 
          rel="stylesheet" 
          href="/prism-theme.css" 
          precedence="default"
        />
      </Head>
      <MetadataHead {...meta} />
      <CustomContainer id="content" ref={contentRef}>
        <div>{content}</div>
      </CustomContainer>
    </>
  );
}

// Modify getStaticPaths to return mock or hardcoded data temporarily
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}

// Modify getStaticProps to return mock or hardcoded data temporarily
export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const { slug } = params as { slug: string };
  
  // Mock data structure
  const mockData = {
    title: "Sample Post",
    description: "Sample description",
    date: new Date().toISOString(),
    tags: ["sample"],
    imageUrl: "/sample.jpg",
    body: "Sample content"
  };

  return {
    props: { 
      slug, 
      data: mockData
    },
  };
}

const CustomContainer = styled(Container)`
  position: relative;
  max-width: 90rem;
  margin: 10rem auto;

  ${media('<=tablet')} {
    margin: 5rem auto;
  }
`;
