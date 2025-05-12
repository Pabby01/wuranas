const theme = {
  colors: {
    light: {
      primary: '14, 165, 233',
      secondary: '255, 193, 7',
      accent: '139, 92, 246',
      text: '15, 23, 42',
      textSecondary: '71, 85, 105',
      textTertiary: '148, 163, 184',
      background: '255, 255, 255',
      backgroundSecondary: '248, 250, 252',
      cardBackground: '255, 255, 255',
      border: '226, 232, 240',
      navbarBackground: '255, 255, 255, 0.8',
      shadowColor: '0, 0, 0, 0.1',
    },
    dark: {
      primary: '56, 189, 248',
      secondary: '255, 193, 7',
      accent: '167, 139, 250',
      text: '241, 245, 249',
      textSecondary: '203, 213, 225',
      textTertiary: '148, 163, 184',
      background: '15, 23, 42',
      backgroundSecondary: '30, 41, 59',
      cardBackground: '30, 41, 59',
      border: '51, 65, 85',
      navbarBackground: '15, 23, 42, 0.8',
      shadowColor: '0, 0, 0, 0.3',
    },
    status: {
      success: '34, 197, 94',
      warning: '245, 158, 11',
      error: '239, 68, 68',
      info: '6, 182, 212',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '8rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    full: '9999px',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  zIndex: {
    navbar: 1000,
    modal: 2000,
    tooltip: 3000,
  },
};

export const createTheme = (mode: 'light' | 'dark') => ({
  ...theme.colors[mode],
  ...theme.colors.status,
  ...theme,
});

export type Theme = ReturnType<typeof createTheme>;
