import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { AppProps } from 'next/dist/shared/lib/router/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { TinaEditProvider } from 'tinacms/dist/edit-state';
import Footer from 'components/Footer';
import { GlobalStyle } from 'components/GlobalStyles';
import Layout from 'components/Layout';
import Navbar from 'components/Navbar';
import NavigationDrawer from 'components/NavigationDrawer';
import NewsletterModal from 'components/NewsletterModal';
import { ThemeProvider } from 'components/ThemeProvider';
import WaveCta from 'components/WaveCta';
import { NewsletterModalContextProvider, useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { NavItems } from 'types';

const navItems: NavItems = [
  { title: 'Marketplace', href: '/marketplace' },
  { title: 'Become an Artisan', href: '/artisan-signup' },
  { title: 'How it Works', href: '/how-it-works' },
  { title: 'Connect Wallet', href: '/connect', outlined: true },
];

const TinaCMS = dynamic(() => import('tinacms'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* <link rel="alternate" type="application/rss+xml" href={EnvVars.URL + 'rss'} title="RSS 2.0" /> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-117119829-1', 'auto');
          ga('send', 'pageview');`,
          }}
        /> */}
        {/* <script async src="https://www.google-analytics.com/analytics.js"></script> */}
      </Head>
      <ThemeProvider>
        <LoadingWrapper>
          <GlobalStyle />
          <Providers>
            <Modals />
            <Navbar />
            <TinaEditProvider
              editMode={
                <TinaCMS
                  query={pageProps.query}
                  variables={pageProps.variables}
                  data={pageProps.data}
                  isLocalClient={!process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
                  branch={process.env.NEXT_PUBLIC_EDIT_BRANCH}
                  clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
                  {...pageProps}
                >
                  {(livePageProps: Record<string, unknown>) => (
                    <Layout>
                      <Component {...livePageProps} />
                    </Layout>
                  )}
                </TinaCMS>
              }
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </TinaEditProvider>
            <WaveCta />
            <Footer />
          </Providers>
        </LoadingWrapper>
      </ThemeProvider>
    </>
  );
}

const LoadingWrapper = styled.div`
  opacity: 0;
  animation: fadeIn 0.2s ease-in forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

function Providers<T>({ children }: PropsWithChildren<T>) {
  return (
    <NewsletterModalContextProvider>
      <NavigationDrawer items={navItems}>{children}</NavigationDrawer>
    </NewsletterModalContextProvider>
  );
}

function Modals() {
  const { isModalOpened, setIsModalOpened } = useNewsletterModalContext();
  if (!isModalOpened) {
    return null;
  }
  return <NewsletterModal onClose={() => setIsModalOpened(false)} />;
}

export default MyApp;
