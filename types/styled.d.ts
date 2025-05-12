import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // Colors
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    background: string;
    backgroundSecondary: string;
    cardBackground: string;
    border: string;
    navbarBackground: string;
    shadowColor: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Common
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    zIndex: {
      navbar: number;
      modal: number;
      tooltip: number;
    };
  }
}
