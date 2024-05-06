import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme, Icon} from 'react-native-paper';

import type {BottomRoutes} from '../Routes/Route';
import MessagesScreen from '../screens/Chat/MessagesScreen';
import StoreScreen from '../screens/Store/StoreScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DoctorListScreen from '../screens/Doctor/DoctorListScreen';

const BottomTabs = createBottomTabNavigator<BottomRoutes>();

const BottomTabNavigator = () => {
  const theme = useTheme();

  return (
    <BottomTabs.Navigator
      initialRouteName="MessagesScreen"
      screenOptions={{headerShown: false}}>
      <BottomTabs.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Tin nhắn',
          tabBarIcon: ({focused}: any) => (
            <Icon
              source="home"
              color={focused ? theme.colors.primary : theme.colors.outline}
              size={24}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="DoctorListScreen"
        component={DoctorListScreen}
        options={{
          tabBarLabel: 'Bác sĩ',
          tabBarIcon: ({focused}: any) => (
            <Icon
              source="doctor"
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
          tabBarLabel: 'Cửa hàng',
          tabBarIcon: ({focused}: any) => (
            <Icon
              source="store"
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
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({focused}: any) => (
            <Icon
              source="account"
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
