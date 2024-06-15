// DrawerNavigator.tsx
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PatientUserScreen from '../screens/PatientUser/PatientUserScreen';
import StoreScreen from '../screens/Store/StoreScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import BecomeDoctorScreen from '../screens/Profile/BecomeDoctorScreen';
import DoctorListScreen from '../screens/Doctor/DoctorListScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={PatientUserScreen}
        options={{drawerLabel: 'Trang chủ'}}
      />
      <Drawer.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{drawerLabel: 'Cửa hàng'}}
      />
      <Drawer.Screen
        name="DoctorListScreen"
        component={DoctorListScreen}
        options={{drawerLabel: 'Danh sách bác sĩ đã liên hệ'}}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{drawerLabel: 'Cài đặt'}}
      />
      <Drawer.Screen
        name="BecomeDoctorScreen"
        component={BecomeDoctorScreen}
        options={{drawerLabel: 'Đăng ký làm bác sĩ'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
