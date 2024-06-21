// PatientUserScreen.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, IconButton, useTheme} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryRecordScreen from './pages/DiaryRecordScreen';
import BookingHistoryScreen from './pages/BookingHistoryScreen';
import MedicalHistoryScreen from './pages/MedicalHistoryScreen';
import CurrentInfoScreen from './pages/CurrentInfoScreen';
import PersonalInfoScreen from './pages/PersonalInfoScreen';
import StoreScreen from '../Store/StoreScreen';
import DoctorListScreen from '../Doctor/DoctorListScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import {useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BookingScreen from '../Home/BookingScreen';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = ({navigation}: any) => {
  const theme = useTheme();
  const MedicalHistory = () => <MedicalHistoryScreen navigation={navigation} />;
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
            case 'DiaryRecordScreen':
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
      <Tab.Screen name="DiaryRecordScreen" component={DiaryRecordScreen} />
      <Tab.Screen
        name="BookingHistoryScreen"
        component={BookingHistoryScreen}
      />
      <Tab.Screen name="MedicalHistoryScreen" component={MedicalHistory} />
      <Tab.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
    </Tab.Navigator>
  );
};

const PatientUserScreen = ({navigation}: any) => {
  const user = useSelector((state: any) => state.user);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <IconButton
            icon="bell"
            size={24}
            onPress={() =>
              navigation.navigate('HomeNavigator', {
                screen: 'NotificationScreen',
              })
            }
          />
        ),
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{drawerLabel: 'Trang chủ', title: 'Trang chủ'}}
      />
      <Drawer.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{drawerLabel: 'Cửa hàng', title: 'Cửa hàng'}}
      />
      <Drawer.Screen
        name="DoctorListScreen"
        component={DoctorListScreen}
        options={{
          drawerLabel: 'Danh sách bác sĩ',
          title: 'Danh sách bác sĩ',
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{drawerLabel: 'Cài đặt', title: 'Cài đặt'}}
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
