import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {List, TextInput, useTheme} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CustomAppbar from '../../components/CustomAppbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiaryRecordScreen from '../Profile/DiaryRecordScreen';
import BookingHistoryScreen from './pages/BookingHistoryScreen';
import MedicalHistoryScreen from './pages/MedicalHistoryScreen';
import CurrentInfoScreen from './pages/CurrentInfoScreen';
import PersonalInfoScreen from './pages/PersonalInfoScreen';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const {height} = Dimensions.get('window');

const PatientDetailScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token.accessToken);

  const FoodDiaryScreen = () => (
    <View style={styles.screen}>
      <DiaryRecordScreen />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomAppbar title="Bệnh nhân" goBack={() => navigation.goBack()} />
      <View style={{flex: 8}}>
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
                <MaterialCommunityIcons
                  name={iconName}
                  size={24}
                  color={color}
                />
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
          <Tab.Screen
            name="PersonalInfoScreen"
            component={PersonalInfoScreen}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default PatientDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    padding: 16,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 16,
    color: '#555',
  },
  filterContainer: {
    marginBottom: 10,
  },
});
