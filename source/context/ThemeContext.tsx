// src/context/ThemeContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {createThemeFromSystemSchemes} from '../utils/createTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadDarkModeState();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    saveDarkModeState(newMode);
  };

  const primary = '#1626df';

  const systemSchemes: any = {
    light: {
      primary: primary,
    },
    dark: {
      primary: primary,
    },
  };

  const customTheme: any = createThemeFromSystemSchemes(systemSchemes);

  const paperTheme = isDarkMode
    ? {...MD3DarkTheme, colors: {...MD3DarkTheme.colors, ...customTheme.dark}}
    : {
        ...MD3LightTheme,
        colors: {...MD3LightTheme.colors, ...customTheme.light},
      };

  const loadDarkModeState = async () => {
    try {
      const storedDarkModeState = await AsyncStorage.getItem('darkMode');
      if (storedDarkModeState !== null) {
        setIsDarkMode(storedDarkModeState === 'true');
      }
    } catch (error) {
      console.error('Error loading dark mode state:', error);
    }
  };

  const saveDarkModeState = async (mode: boolean) => {
    try {
      await AsyncStorage.setItem('darkMode', mode.toString());
    } catch (error) {
      console.error('Error saving dark mode state:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
