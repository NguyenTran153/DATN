import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  useTheme,
  Button,
  Text,
  Icon,
  Searchbar,
  DataTable,
  Avatar,
  TextInput,
} from 'react-native-paper';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import Horizon from '../../components/Horizon';
import CustomAppbar from '../../components/CustomAppbar';
import AppointmentService from '../../services/AppointmentService';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import UserService from '../../services/UserService';
import {setUser} from '../../redux/slices/userSlice';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

LocaleConfig.locales['en'] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
LocaleConfig.defaultLocale = 'en';

const BookingScreen = ({route, navigation}: any) => {
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState<UserData>();
  const [doctorList, setDoctorList] = useState<any[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setData(await UserService.getUserInfo(token.accessToken));
    const friends = await UserService.getFriendList(token.accessToken);
    const doctors = friends.data.map(item => ({
      id: item.id,
      avatar: item.avatar,
      name: `${item.firstName} ${item.lastName}`,
      gender: item.gender,
    }));
    setDoctorList(doctors);
    console.log(doctorList);
    dispatch(setUser(data!));
  };

  const theme = useTheme();

  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [note, setNote] = useState<string>('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [doctorID, setDocID] = useState('');
  const [isDoctorSearch, setIsDoctorSearch] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedDoctors = doctorList?.slice(startIndex, endIndex);

  const timeSlots = [
    '07:00-08:00',
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
  ];

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedHour(null);
    setSelectedDoctor(null);
    setNote('');
  };

  const toggleDoctorVisibility = () => {
    setIsDoctorSearch(!isDoctorSearch);
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const toggleTimePickerVisibility = () => {
    setIsTimePickerVisible(!isTimePickerVisible);
  };

  const renderDoctorContainer = () => {
    const filteredDoctors = doctorList?.filter(doctor =>
      doctor.name.toLowerCase().includes(searchDoctor.toLowerCase()),
    );

    const defaultAvatar = require('../../asset/7677205.jpg');

    return (
      <View style={styles.doctorContainer}>
        <Searchbar
          style={styles.searchBar}
          placeholder={`Tìm nhanh ${
            user.role === 'patient' ? 'bác sĩ' : 'bệnh nhân'
          }`}
          onChangeText={setSearchDoctor}
          value={searchDoctor}
        />
        {filteredDoctors && filteredDoctors.length > 0 ? (
          <DataTable>
            {filteredDoctors.map((doctor, index) => (
              <DataTable.Row
                key={index}
                onPress={() => {
                  setSelectedDoctor(doctor.name);
                  setDocID(doctor.id);
                  setIsDoctorSearch(false);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  <Avatar.Image
                    source={
                      doctor.avatar ? {uri: doctor.avatar} : defaultAvatar
                    }
                    size={40}
                    style={{marginRight: 10}}
                  />
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {doctor.name}
                  </Text>
                </View>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <Text>{`Không có ${
            user.role === 'patient' ? 'bác sĩ' : 'bệnh nhân'
          } nào`}</Text>
        )}
      </View>
    );
  };
  const renderTimeSlots = () => {
    return (
      <View style={{marginTop: 10}}>
        {timeSlots.map((timeSlot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlotButton,
              {
                backgroundColor:
                  selectedHour === timeSlot
                    ? theme.colors.primary
                    : theme.colors.background,
              },
            ]}
            onPress={() => {
              setSelectedHour(timeSlot);
              toggleTimePickerVisibility();
            }}>
            <Text
              style={{
                color:
                  selectedHour === timeSlot
                    ? theme.colors.background
                    : theme.colors.backdrop,
              }}>
              {timeSlot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getBeginTimestamp = () => {
    if (selectedDate && selectedHour) {
      const [hour] = selectedHour.split('-');
      return moment(`${selectedDate} ${hour}`, 'YYYY-MM-DD HH:mm').valueOf();
    }
    return null;
  };

  const handleConfirmBooking = () => {
    const TimestampInMilliseconds = getBeginTimestamp();
    const beginTimestamp = Math.floor(
      TimestampInMilliseconds ? TimestampInMilliseconds / 1000 : 0,
    );
    const now = new Date();
    const nowTimestamp = Math.floor(now.getTime() / 1000);
    const oneDayInSeconds = 24 * 60 * 60;
    if (!selectedDoctor || !selectedDate || !selectedHour || note === '') {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Thông báo',
        textBody: 'Người dùng cần điền đầy đủ thông tin',
        button: 'Đóng',
      });
    } else if (
      beginTimestamp &&
      beginTimestamp - nowTimestamp >= oneDayInSeconds
    ) {
      AppointmentService.sendAppointment(
        token.accessToken,
        Number.parseInt(doctorID),
        {
          note,
          beginTimestamp,
        },
      );
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Đăng ký',
        textBody: 'Đã đặt lịch hẹn',
        button: 'Đóng',
      });
      navigation.goBack();
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Thất bại',
        textBody: 'Lưu ý người dùng chỉ có thể đặt lịch trước 1 ngày',
        button: 'Đóng',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <CustomAppbar title={'Đặt lịch hẹn'} goBack={() => navigation.goBack()} />
      <ScrollView
        style={[styles.container, {backgroundColor: theme.colors.background}]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: theme.colors.primary}]}>
            Thông tin đặt khám
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={resetBooking}>
            <Icon source="eraser" size={24} />
            <Text style={{fontWeight: '400', fontSize: 18}}>Đặt lại</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.informationContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {user.role === 'patient' ? 'Bác sĩ' : 'Bệnh nhân'}
          </Text>
          <TouchableOpacity
            style={[
              styles.textField,
              {backgroundColor: theme.colors.onPrimary},
            ]}
            onPress={toggleDoctorVisibility}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon source="doctor" size={24} />
              <Text style={{marginLeft: 10, fontSize: 18}}>
                {selectedDoctor
                  ? selectedDoctor
                  : `Chọn ${user.role === 'patient' ? 'bác sĩ' : 'bệnh nhân'}`}
              </Text>
            </View>
            <Icon source="hockey-sticks" size={24} />
          </TouchableOpacity>
          {isDoctorSearch && renderDoctorContainer()}
          <Horizon />
        </View>
        <View style={styles.informationContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ngày khám</Text>
          <TouchableOpacity
            style={[
              styles.textField,
              {backgroundColor: theme.colors.onPrimary},
            ]}
            onPress={toggleCalendarVisibility}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon source="calendar" size={24} />
              <Text style={{marginLeft: 10, fontSize: 18}}>
                {selectedDate ? selectedDate : 'Chọn ngày khám'}
              </Text>
            </View>
            <Icon source="hockey-sticks" size={24} />
          </TouchableOpacity>
          {isCalendarVisible && (
            <Calendar
              onDayPress={(day: any) => {
                setSelectedDate(day.dateString);
                setIsCalendarVisible(false);
              }}
            />
          )}
          <Horizon />
        </View>
        <View style={styles.informationContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Giờ khám</Text>
          <TouchableOpacity
            style={[
              styles.textField,
              {backgroundColor: theme.colors.onPrimary},
            ]}
            onPress={toggleTimePickerVisibility}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon source="clock" size={24} />
              <Text style={{marginLeft: 10, fontSize: 18}}>
                {selectedHour ? selectedHour : 'Chọn giờ khám'}
              </Text>
            </View>
            <Icon source="hockey-sticks" size={24} />
          </TouchableOpacity>
          {isTimePickerVisible && renderTimeSlots()}

          <Horizon />
        </View>
        <View style={styles.informationContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ghi chú</Text>
          <TextInput
            style={[styles.textArea, {backgroundColor: theme.colors.onPrimary}]}
            label=""
            multiline
            mode="outlined"
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
            editable
            disabled={false}
            theme={{roundness: 8}}
          />
        </View>
      </ScrollView>
      <Button
        style={styles.confirmButton}
        mode="contained"
        onPress={() => {
          handleConfirmBooking();
        }}>
        Xác nhận
      </Button>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  doctorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    width: '90%',
    alignSelf: 'center',
  },
  searchBar: {
    width: '100%',
  },
  textArea: {
    marginVertical: 10,
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    marginVertical: 10,
    height: 56,
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  serviceField: {
    marginVertical: 10,
    height: 100,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  informationContainer: {
    flexDirection: 'column',
  },
  timeSlotButton: {
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  confirmButton: {
    margin: 10,
    padding: 8,
    marginBottom: 20,
  },
});
