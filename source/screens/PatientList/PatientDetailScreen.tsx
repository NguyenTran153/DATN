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
import ExamineScreen from '../Home/ExamineScreen';

const Tab = createMaterialTopTabNavigator();

const {height} = Dimensions.get('window');

const PatientDetailScreen = ({navigation, route}: any) => {
  const theme = useTheme();

  const CurrentInfoScreen = () => (
    <View style={styles.screen}>
      <View></View>
    </View>
  );

  const FoodDiaryScreen = () => (
    <View style={styles.screen}>
      <DiaryRecordScreen />
    </View>
  );

  const PersonalInfoScreen = () => (
    <View style={styles.screen}>
      <List.Section>
        <List.Item
          title="Họ"
          description="Nguyễn"
          left={() => <List.Icon icon="account-outline" />}
          titleStyle={styles.listItemTitle}
          descriptionStyle={styles.listItemDescription}
        />
        <List.Item
          title="Tên"
          description="Văn A"
          left={() => <List.Icon icon="account-outline" />}
          titleStyle={styles.listItemTitle}
          descriptionStyle={styles.listItemDescription}
        />
        <List.Item
          title="Giới tính"
          description="Nam"
          left={() => <List.Icon icon="gender-male" />}
          titleStyle={styles.listItemTitle}
          descriptionStyle={styles.listItemDescription}
        />
        <List.Item
          title="Ngày sinh"
          description="01/01/1990"
          left={() => <List.Icon icon="calendar" />}
          titleStyle={styles.listItemTitle}
          descriptionStyle={styles.listItemDescription}
        />
        <List.Item
          title="Cân nặng"
          description="70 kg"
          left={() => <List.Icon icon="weight" />}
          titleStyle={styles.listItemTitle}
          descriptionStyle={styles.listItemDescription}
        />
        <List.Item
          title="Chiều cao"
          description="175 cm"
          left={() => <List.Icon icon="ruler" />}
          titleStyle={styles.listItemTitle}
          descriptionStyle={styles.listItemDescription}
        />
        <List.Item
          title="Địa chỉ"
          description="123 Đường ABC, Quận 1, TP.HCM"
          left={() => <List.Icon icon="home-outline" />}
          titleStyle={styles.listItemTitle}
          descriptionStyle={styles.listItemDescription}
        />
      </List.Section>
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
                case 'CurrentInfo':
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
                case 'PersonalInfo':
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
          <Tab.Screen name="CurrentInfo" component={CurrentInfoScreen} />
          <Tab.Screen name="FoodDiary" component={FoodDiaryScreen} />
          <Tab.Screen
            name="BookingHistoryScreen"
            component={BookingHistoryScreen}
          />
          <Tab.Screen
            name="MedicalHistoryScreen"
            component={MedicalHistoryScreen}
          />
          <Tab.Screen name="PersonalInfo" component={PersonalInfoScreen} />
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
