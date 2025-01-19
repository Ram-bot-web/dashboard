import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorScheme = {
  primary: string;
  background: string;
  dashboard: string;
  text: string;
  chartPrimary: string;
  chartSecondary: string;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
  updateColors: (newColors: Partial<ColorScheme>) => void;
};

const defaultLightColors: ColorScheme = {
  primary: '#0ea5e9',  // Sky blue
  background: '#ffffff', // White
  dashboard: '#f3f4f6', // Gray-100
  text: '#1f2937',    // Gray-800
  chartPrimary: '#0ea5e9', // Sky blue
  chartSecondary: '#ef4444', // Red
};

const defaultDarkColors: ColorScheme = {
  primary: '#0ea5e9',  // Sky blue
  background: '#1f2937', // Gray-900
  dashboard: '#1f2937', // Gray-900
  text: '#f3f4f6',    // Gray-100
  chartPrimary: '#38bdf8', // Light blue
  chartSecondary: '#f87171', // Light red
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  colors: defaultLightColors,
  updateColors: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [colors, setColors] = useState<ColorScheme>(() => {
    if (typeof window !== 'undefined') {
      const savedColors = localStorage.getItem('themeColors');
      return savedColors ? JSON.parse(savedColors) : (isDarkMode ? defaultDarkColors : defaultLightColors);
    }
    return defaultLightColors;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Update CSS variables for theme colors
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
    
    // Update Tailwind CSS classes
    document.documentElement.style.setProperty('--tw-text-opacity', '1');
    document.documentElement.style.setProperty('--tw-bg-opacity', '1');
    
    localStorage.setItem('themeColors', JSON.stringify(colors));
  }, [colors]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      setColors(newMode ? defaultDarkColors : defaultLightColors);
      return newMode;
    });
  };

  const updateColors = (newColors: Partial<ColorScheme>) => {
    setColors(prev => ({ ...prev, ...newColors }));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};