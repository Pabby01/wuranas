import { createGlobalStyle } from 'styled-components';

// default breakpoints
// {
//   smallPhone: 320;
//   phone: 375;
//   tablet: 768;
//   desktop: 1024;
//   largeDesktop: 1440;
// }

export const GlobalStyle = createGlobalStyle`

.next-light-theme {
  --background: 251,251,253;
  --secondBackground: 255,255,255;
  --text: 10,18,30;
  --textSecondary: 255,255,255;
  --primary: 147,51,234; 
  --secondary: 10,18,30;
  --tertiary: 243,232,255;
  --cardBackground: 255,255,255;
  --inputBackground: 255,255,255;
  --navbarBackground: 255,255,255;
  --modalBackground: 251,251,253;
  --errorColor: 207,34,46;
  --logoColor: #6B21A8;
  --animate-duration: 0.3s;
  --animate-delay: 0.3s;
}

.next-dark-theme {
  --background: 26,32,44;
  --secondBackground: 45,55,72;
  --text: 237,237,238;
  --textSecondary: 255,255,255;
  --primary: 167,86,247; 
  --secondary: 10,18,30;
  --tertiary: 243,232,255;
  --cardBackground: 45,55,72;
  --inputBackground: 45,55,72;
  --navbarBackground: 45,55,72;
  --modalBackground: 26,32,44;
  --errorColor: 207,34,46;
  --logoColor: #fff;
  --animate-duration: 0.3s;
  --animate-delay: 0.3s;
}

:root {
  --font: 'Poppins', sans-serif;
  
  --shadow-md: 0 2px 4px 0 rgb(12 0 46 / 4%);
  --shadow-lg: 0 10px 14px 0 rgb(12 0 46 / 6%);

  --z-sticky: 7777;
  --z-navbar: 8888;
  --z-drawer: 9999;
  --z-modal: 9999;
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}


/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
} 

html {
  font-size: 62.5%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
  text-rendering: optimizelegibility;
  text-size-adjust: 100%;

  @media (max-width: 37.5em) {
    font-size: 50%;
  }

  @media (max-width: 48.0625em) {
    font-size: 55%;
  }

  @media (max-width: 56.25em) {
    font-size: 60%;
  }
}

/* Set core body defaults */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  color: rgb(var(--text));
  background: rgb(var(--background));
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-feature-settings: "kern";
}

svg {
  color: rgb(var(--text));
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

#__next {
  isolation: isolate;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}`;
