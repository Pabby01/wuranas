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
import WhatsAppButton from 'components/WhatsAppButton';
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#730AA8" />
        
        {/* Primary Meta Tags */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Wurana" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Wurana01" />
        
        {/* Default SEO - will be overridden by page-specific SEO */}
        <meta name="description" content="Wurana - The revolutionary artisan marketplace on Solana. Connect with skilled artisans, secure payments, and build your reputation through blockchain technology." />
        <meta property="og:title" content="Wurana - Decentralized Artisan Marketplace on Solana" />
        <meta property="og:description" content="Experience the future of artisan services with secure payments, NFT reputation system, and instant settlements on Solana blockchain." />
        <meta property="og:image" content="https://wurana.com/og-image.jpg" />
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
            <WhatsAppButton />
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
