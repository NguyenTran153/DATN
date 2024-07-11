// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { createThemeFromSystemSchemes } from './source/utils/createTheme';
import { store } from './source/redux/store';
import { ThemeProvider, useThemeContext } from './source/context/ThemeContext';
import RootNavigator from './source/navigator/RootNavigator';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const { isDarkMode } = useThemeContext();

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
    ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...customTheme.dark } }
    : { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...customTheme.light } };

  return (
    <PaperProvider theme={paperTheme}>
      <AlertNotificationRoot>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AlertNotificationRoot>
    </PaperProvider>
  );
};

export default App;
