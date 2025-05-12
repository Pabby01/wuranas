import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from '../styles/theme';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Run on client-side only
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  useEffect(() => {
    // Only update DOM after initial client-side render
    if (isDarkMode === null) return;

    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    if (isDarkMode !== null) {
      setIsDarkMode(!isDarkMode);
    }
  };

  // Don't render theme-dependent content until after client-side hydration
  const theme = createTheme(isDarkMode ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ isDarkMode: Boolean(isDarkMode), toggleTheme }}>
      <StyledThemeProvider theme={theme}>{isDarkMode !== null ? children : null}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
