import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DiaryRecordScreen from './pages/DiaryRecordScreen';
import BookingHistoryScreen from './pages/BookingHistoryScreen';
import MedicalHistoryScreen from './pages/MedicalHistoryScreen';
import CurrentInfoScreen from './pages/CurrentInfoScreen';
import PersonalInfoScreen from './pages/PersonalInfoScreen';
import DoctorListScreen from '../Doctor/DoctorListScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import {useSelector} from 'react-redux';
import ConnectDoctorScreen from '../Doctor/ConnectDoctorScreen';

const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

const TabNavigator = ({navigation}: any) => {
  const theme = useTheme();
  const MedicalHistory = () => <MedicalHistoryScreen navigation={navigation} />;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarIndicatorStyle: {backgroundColor: theme.colors.primary},
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
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
  const theme = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onBackground,
        tabBarStyle: {backgroundColor: theme.colors.background},
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.onBackground,
        tabBarIcon: ({color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'ConnectDoctorScreen':
              iconName = 'phone-outline';
              break;
            case 'DoctorListScreen':
              iconName = 'doctor';
              break;
            case 'ProfileScreen':
              iconName = 'cog-outline';
              break;
            default:
              iconName = 'circle-outline';
              break;
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        headerRight: () => (
          <IconButton
            icon="bell"
            iconColor={theme.colors.onBackground}
            size={24}
            onPress={() =>
              navigation.navigate('HomeNavigator', {
                screen: 'NotificationScreen',
              })
            }
          />
        ),
      })}>
      <BottomTab.Screen
        name="Home"
        component={TabNavigator}
        options={{tabBarLabel: 'Trang chủ', title: 'Trang chủ'}}
      />
      <BottomTab.Screen
        name="ConnectDoctorScreen"
        component={ConnectDoctorScreen}
        initialParams={{drawer: true}}
        options={{
          tabBarLabel: 'Liên hệ với bác sĩ',
          title: 'Liên hệ với bác sĩ',
        }}
      />
      <BottomTab.Screen
        name="DoctorListScreen"
        component={DoctorListScreen}
        options={{
          tabBarLabel: 'Danh sách bác sĩ',
          title: 'Danh sách bác sĩ',
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{tabBarLabel: 'Cài đặt', title: 'Cài đặt'}}
      />
    </BottomTab.Navigator>
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
