import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';

import type {BottomRoutes} from '../Routes/Route';
import MessagesScreen from '../screens/MessagesScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomTabs = createBottomTabNavigator<BottomRoutes>();

const BottomTabNavigator = ({navigation, route}: any) => {
  const theme = useTheme();

  return (
    <BottomTabs.Navigator
      initialRouteName="MessagesScreen"
      screenOptions={{headerShown: false}}>
      <BottomTabs.Screen
        name="MessagesScreen"
        component={MessagesScreen}
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
