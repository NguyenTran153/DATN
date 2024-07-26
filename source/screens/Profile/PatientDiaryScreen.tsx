import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme, Icon, } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DiaryService from '../../services/DiaryService';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from 'react-redux';
import CustomAppbar from '../../components/CustomAppbar';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
const PatientDiaryScreen = ({ navigation, route }: any) => {
  const theme = useTheme();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isTimePickerVisible_bs, setTimePickerVisibilityBs] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleBs, setDatePickerVisibilityBs] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [date, setDate] = useState<Date>();
  const [date_bs, setDateBs] = useState<Date>();
  const handleDateConfirmBS = (date: Date) => {
    setDateBs(date);
    setDatePickerVisibilityBs(false);
    setTimePickerVisibilityBs(true);
  };
  const handleDateConfirm = (date: Date) => {
    setDate(date);
    setDatePickerVisibility(false);
    setTimePickerVisibility(true);
  };
  const [form, setForm] = useState<Entry>({
    time: new Date().toLocaleString(),
    morning: '',
    afternoon: '',
    evening: '',
    bloodPressure: '',
    bloodSugar: '',
    time_bp: '',
    time_bs: '',
    note_bp: '',
    note_bs: ''
  });

  const handleInputChange = (name: keyof Entry, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      setEntries([]);
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  const handleNewTimeConfirm = (time: Date) => {
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedDate = moment(date).format('DD/MM/YYYY');
    const formattedTime = `${formattedDate} ${formattedHours}:${minutes} ${ampm}`;

    handleInputChange('time_bp', formattedTime);

    setTimePickerVisibility(false);
  };
  const handleNewTimeConfirm_bs = (time: Date) => {
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedDate = moment(date).format('DD/MM/YYYY');
    const formattedTime = `${formattedDate} ${formattedHours}:${minutes} ${ampm}`;

    handleInputChange('time_bs', formattedTime);

    setTimePickerVisibilityBs(false);
  };
  const addEntryFood = async () => {
    const newEntries = [...entries, form];
    setEntries(newEntries);

    const data = {
      morning: form.morning,
      afternoon: form.afternoon,
      evening: form.evening
    };
    console.log(data)
    try {
      await DiaryService.postDiary(token.accessToken, data, [], 'food');
      setForm({
        time: new Date().toLocaleString(),
        morning: '',
        afternoon: '',
        evening: '',
        bloodPressure: '',
        bloodSugar: '',
        time_bp: '',
        time_bs: '',
        note_bp: '',
        note_bs: ''

      });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Thành công',
        textBody: 'Nhật ký đã được viết',
        button: 'Đóng',
      });
      
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Lỗi',
        textBody: 'Không thể viết nhật ký được',
        button: 'Đóng',
      });
      console.error('Error saving data', error);
    }
  }
  const addEntryBloodPressure = async () => {
    const newEntries = [...entries, form];
    setEntries(newEntries);

    const data = {

      bloodPressure: form.bloodPressure,
      time: form.time_bp

    };
    console.log(data)
    try {
      await DiaryService.postDiary(token.accessToken, data, [], 'blood_pressure');
      setForm({
        time: new Date().toLocaleString(),
        morning: '',
        afternoon: '',
        evening: '',
        bloodPressure: '',
        bloodSugar: '',
        time_bp: '',
        time_bs: '',
        note_bp: '',
        note_bs: ''

      });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Thành công',
        textBody: 'Nhật ký đã được viết',
        button: 'Đóng',
      });
      
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Lỗi',
        textBody: 'Không thể viết nhật ký được',
        button: 'Đóng',
      });
      console.error('Error saving data', error);
    }
  }
  const addEntryBloodSugar = async () => {
    const newEntries = [...entries, form];
    setEntries(newEntries);

    const data = {
      bloodSugar: form.bloodSugar,
      time: form.time_bs
    };
    console.log(data)
    try {
      await DiaryService.postDiary(token.accessToken, data, [], 'blood_sugar');
      setForm({
        time: new Date().toLocaleString(),
        morning: '',
        afternoon: '',
        evening: '',
        bloodPressure: '',
        bloodSugar: '',
        time_bp: '',
        time_bs: '',
        note_bp: '',
        note_bs: ''

      });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Thành công',
        textBody: 'Nhật ký đã được viết',
        button: 'Đóng',
      });
     
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Lỗi',
        textBody: 'Không thể viết nhật ký được',
        button: 'Đóng',
      });
      console.error('Error saving data', error);
    }
    setForm({
      time: new Date().toLocaleString(),
      morning: '',
      afternoon: '',
      evening: '',
      bloodPressure: '',
      bloodSugar: '',
      time_bp: '',
      time_bs: '',
      note_bp: '',
      note_bs: ''
    });
  };

  const loadEntries = async () => {
    try {
      const savedData = await AsyncStorage.getItem('patientActivities');
      if (savedData) {
        setEntries(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const Tab = createMaterialTopTabNavigator();
  return (

    <View style={styles.container}>
      <CustomAppbar title="Viết nhật ký" goBack={() => navigation.goBack()} />
      <Text style={styles.title}>Nhật ký bệnh nhân</Text>
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurface,
          tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            let iconName;
            switch (route.name) {
              case 'Food':
                iconName = 'food-apple-outline';
                break;
              case 'Blood Pressure':
                iconName = 'heart-pulse';
                break;
              case 'Blood Sugar':
                iconName = 'water';
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
        <Tab.Screen name="Food" >
          {() => <View style={styles.inputContainer}>
            <View>
              <TextInput
                label="Bữa sáng"
                value={form.morning}
                onChangeText={text => handleInputChange('morning', text)}
                style={styles.input}
              />
              <TextInput
                label="Bữa trưa"
                value={form.afternoon}
                onChangeText={text => handleInputChange('afternoon', text)}
                style={styles.input}
              />
              <TextInput
                label="Bữa chiều"
                value={form.evening}
                onChangeText={text => handleInputChange('evening', text)}
                style={styles.input}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={clearAsyncStorage}
                style={[styles.button, { backgroundColor: theme.colors.error }]}>
                Xóa dữ liệu
              </Button>
              <Button
                mode="contained"
                onPress={addEntryFood}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}>
                Thêm nhật ký
              </Button>
            </View>
          </View>}
        </Tab.Screen>
        <Tab.Screen name="Blood Pressure">
          {() => <View style={styles.inputContainer}>

            <View>
              <TextInput
                label="Huyết áp"
                value={form.bloodPressure}
                onChangeText={text => handleInputChange('bloodPressure', text)}
                style={styles.input}
              />


              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={[styles.input, { width: '100%' }]}
                  label="Chọn thời gian"
                  value={form.time_bp}
                  editable={false}
                />
                <TouchableOpacity style={{
                  position: 'absolute',
                  right: '5%',
                  top: '30%', alignItems: 'center', justifyContent: 'center'
                }} onPress={() => { setDatePickerVisibility(!isDatePickerVisible) }}>
                  <Icon source="calendar" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              style={{ zIndex: 9, elevation: 9 }}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              style={{ zIndex: 9, elevation: 9 }}
              mode="time"
              onConfirm={handleNewTimeConfirm}
              onCancel={() => setTimePickerVisibility(false)}
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={clearAsyncStorage}
                style={[styles.button, { backgroundColor: theme.colors.error }]}>
                Xóa dữ liệu
              </Button>
              <Button
                mode="contained"
                onPress={addEntryBloodPressure}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}>
                Thêm nhật ký
              </Button>
            </View>
          </View>}
        </Tab.Screen>
        <Tab.Screen name="Blood Sugar">
          {() => <View style={styles.inputContainer}>

            <View>
              <TextInput
                label="Đường huyết"
                value={form.bloodSugar}
                onChangeText={text => handleInputChange('bloodSugar', text)}
                style={styles.input}
              />
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={[styles.input, { width: '100%' }]}
                  label="Chọn thời gian"
                  value={form.time_bs}
                  editable={false}
                />
                <TouchableOpacity style={{
                  position: 'absolute',
                  right: '5%',
                  top: '30%', alignItems: 'center', justifyContent: 'center'
                }} onPress={() => { setDatePickerVisibilityBs(!isDatePickerVisibleBs) }}>
                  <Icon source="calendar" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisibleBs}
              style={{ zIndex: 9, elevation: 9 }}
              mode="date"
              onConfirm={handleDateConfirmBS}
              onCancel={() => setDatePickerVisibilityBs(false)}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible_bs}
              style={{ zIndex: 9, elevation: 9 }}
              mode="time"
              onConfirm={handleNewTimeConfirm_bs}
              onCancel={() => setTimePickerVisibilityBs(false)}
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={clearAsyncStorage}
                style={[styles.button, { backgroundColor: theme.colors.error }]}>
                Xóa dữ liệu
              </Button>
              <Button
                mode="contained"
                onPress={addEntryBloodSugar}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}>
                Thêm nhật ký
              </Button>
            </View>
          </View>}
        </Tab.Screen>
      </Tab.Navigator>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default PatientDiaryScreen;
