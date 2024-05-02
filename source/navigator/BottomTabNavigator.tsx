import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';

import type {BottomRoutes} from '../Routes/Route';
import MessagesScreen from '../screens/Chat/MessagesScreen';
import StoreScreen from '../screens/Store/StoreScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

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
        name="StoreScreen"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({size, focused}: any) => (
            <Icon
              name="shopping-bag"
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
              name="user"
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
