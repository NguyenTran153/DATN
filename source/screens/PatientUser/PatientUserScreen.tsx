// PatientUserScreen.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryRecordScreen from '../Profile/DiaryRecordScreen';
import BookingHistoryScreen from './pages/BookingHistoryScreen';
import MedicalHistoryScreen from './pages/MedicalHistoryScreen';
import CurrentInfoScreen from './pages/CurrentInfoScreen';
import PersonalInfoScreen from './pages/PersonalInfoScreen';
import StoreScreen from '../Store/StoreScreen';
import DoctorListScreen from '../Doctor/DoctorListScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import BecomeDoctorScreen from '../Profile/BecomeDoctorScreen';
import {useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const FoodDiaryScreen = () => (
  <View style={styles.screen}>
    <DiaryRecordScreen />
  </View>
);

const TabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIndicatorStyle: {backgroundColor: theme.colors.primary},
        tabBarShowLabel: false,
        tabBarIcon: ({color}) => {
          let iconName;
          switch (route.name) {
            case 'CurrentInfoScreen':
              iconName = 'information-outline';
              break;
            case 'FoodDiary':
              iconName = 'food-apple-outline';
              break;
            case 'BookingHistoryScreen':
              iconName = 'file-document-outline';
              break;
            case 'MedicalHistoryScreen':
              iconName = 'history';
              break;
            case 'PersonalInfoScreen':
              iconName = 'account-outline';
              break;
            default:
              iconName = 'circle-outline';
              break;
          }
          return (
            <MaterialCommunityIcons name={iconName} size={24} color={color} />
          );
        },
      })}>
      <Tab.Screen name="CurrentInfoScreen" component={CurrentInfoScreen} />
      <Tab.Screen name="FoodDiary" component={FoodDiaryScreen} />
      <Tab.Screen
        name="BookingHistoryScreen"
        component={BookingHistoryScreen}
      />
      <Tab.Screen
        name="MedicalHistoryScreen"
        component={MedicalHistoryScreen}
      />
      <Tab.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
    </Tab.Navigator>
  );
};

const PatientUserScreen = ({navigation}: any) => {
  const user = useSelector((state: any) => state.user);

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
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

export default PatientUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 16,
  },
});
