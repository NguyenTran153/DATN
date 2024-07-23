import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme, Icon} from 'react-native-paper';
import {useSelector} from 'react-redux';

import StoreScreen from '../screens/Store/StoreScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PatientListScreen from '../screens/PatientList/PatientListScreen';
import PatientUserScreen from '../screens/PatientUser/PatientUserScreen';
import DoctorProfileScreen from '../screens/Profile/DoctorProfileScreen';

const BottomTabs = createMaterialBottomTabNavigator<any>();

const BottomTabNavigator = () => {
  const theme = useTheme();

  return (
    <BottomTabs.Navigator
      initialRouteName="HomeScreen"
      activeColor={theme.colors.primary}
      barStyle={{backgroundColor: theme.colors.background}}>
      <BottomTabs.Screen
        name="PatientListScreen"
        component={PatientListScreen}
        options={{
          tabBarLabel: 'Danh sách bệnh nhân',
          tabBarIcon: ({focused}: any) => (
            <Icon
              source="view-list-outline"
              color={focused ? theme.colors.primary : theme.colors.onBackground}
              size={24}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="DoctorProfileScreen"
        component={DoctorProfileScreen}
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
      <BottomTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({focused}: any) => (
            <Icon
              source="account-settings"
              color={focused ? theme.colors.primary : theme.colors.onBackground}
              size={24}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const MainNavigator = ({navigation}: any) => {
  const role = useSelector((state: any) => state.user.role);

  if (role === 'doctor') {
    return <BottomTabNavigator />;
  } else {
    return <PatientUserScreen navigation={navigation} />;
  }
};

export default MainNavigator;
