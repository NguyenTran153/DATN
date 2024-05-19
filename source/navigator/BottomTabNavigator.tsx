import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme, Icon} from 'react-native-paper';

import type {BottomRoutes} from '../Routes/Route';
import HomeScreen from '../screens/Home/HomeScreen';
import StoreScreen from '../screens/Store/StoreScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DoctorListScreen from '../screens/Doctor/DoctorListScreen';

const BottomTabs = createMaterialBottomTabNavigator<BottomRoutes>();

const BottomTabNavigator = () => {
  const theme = useTheme();

  return (
    <BottomTabs.Navigator
      initialRouteName="HomeScreen"
      activeColor={theme.colors.primary}
      barStyle={{backgroundColor: theme.colors.background}}>
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({focused}: any) => (
            <Icon
              source="home"
              color={focused ? theme.colors.primary : theme.colors.onBackground}
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
              color={focused ? theme.colors.primary : theme.colors.onBackground}
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
              color={focused ? theme.colors.primary : theme.colors.onBackground}
              size={24}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({focused}: any) => (
            <Icon
              source="account"
              color={focused ? theme.colors.primary : theme.colors.onBackground}
              size={24}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
