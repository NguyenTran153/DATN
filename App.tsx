import {NavigationContainer} from '@react-navigation/native';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';

import RootNavigator from './source/navigator/RootNavigator';
import {createThemeFromSystemSchemes} from './source/utils/createTheme';
import {store} from './source/redux/store';

const App = () => {
  const colorScheme = useColorScheme();

  let primary = '#1626df';

  const systemSchemes: any = {
    light: {
      primary: primary,
    },
    dark: {
      primary: primary,
    },
  };
  const customTheme = createThemeFromSystemSchemes(systemSchemes);

  const paperTheme =
    colorScheme === 'dark'
      ? {...MD3DarkTheme, colors: {...MD3DarkTheme.colors, ...customTheme.dark}}
      : {
          ...MD3LightTheme,
          colors: {...MD3LightTheme.colors, ...customTheme.light},
        };

  return (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
