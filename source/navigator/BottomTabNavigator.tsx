import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';

import type {BottomRoutes} from '../Routes/Route';
import ChatNavigator from './ChatNavigator';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomTabs = createMaterialBottomTabNavigator<BottomRoutes>();
const BottomTabstack = createNativeStackNavigator();

const BottomTabNavigator = ({navigation, route}: any) => {
  const theme = useTheme();

  const getTabBarVisibility = (route: any) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'ChatScreen') {
      return false;
    }
    return true;
  };

  return (
    <BottomTabs.Navigator initialRouteName="ChatNavigator">
      <BottomTabs.Screen
        name="ChatNavigator"
        component={ChatNavigator}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({size, focused}: any) => (
            <Icon
              name="home"
              color={focused ? theme.colors.primary : theme.colors.outline}
              size={24}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({size, focused}: any) => (
            <Icon
              name="home"
              color={focused ? theme.colors.primary : theme.colors.outline}
              size={24}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({size, focused}: any) => (
            <Icon
              name="home"
              color={focused ? theme.colors.primary : theme.colors.outline}
              size={24}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
