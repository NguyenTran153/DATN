import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useTheme, Button, Text, Icon, Searchbar} from 'react-native-paper';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import Horizon from '../../components/Horizon';
import DoctorCard from '../../components/DoctorCard';
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

  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [doctorID, setDocID] = useState('');
  const [isSpecialtySearch, setIsSpecialtySearch] = useState(false);
  const [isDoctorSearch, setIsDoctorSearch] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

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
  const doctors = [
    {name: 'Huy Bình', specialty: 'Tai Mũi Họng'},
    {name: 'Phương Thảo', specialty: 'Nhi Khoa'},
  ];

  const specialties = [
    {index: 0, name: 'Khám chức năng hô hấp', iconName: 'Respirology'},
    {index: 1, name: 'Khám da liễu', iconName: 'Measles'},
    {index: 2, name: 'Khám điều trị vết thương', iconName: 'Bandaged'},
    {index: 3, name: 'Khám hậu môn-trực tràng', iconName: 'Intestine'},
    {index: 4, name: 'Khám mắt', iconName: 'Eye'},
    {index: 5, name: 'Khám tai mũi họng', iconName: 'Ear'},
    {index: 6, name: 'Khám nội tiết', iconName: 'Endocrinology'},
    {index: 7, name: 'Khám phụ khoa', iconName: 'Gynecology'},
    {index: 8, name: 'Khám thai', iconName: 'Fetus'},
    {index: 9, name: 'Khám thần kinh', iconName: 'Psychology'},
    {index: 10, name: 'Khám tiết niệu', iconName: 'Kidneys'},
    {index: 11, name: 'Khám tiêu hoá-gan mật', iconName: 'Stomach'},
    {index: 12, name: 'Khám tim mạch', iconName: 'Heart'},
    {index: 13, name: 'Khám tổng quát', iconName: 'Tac'},
    {index: 14, name: 'Khám viêm gan', iconName: 'Liver'},
    {index: 15, name: 'Khám xương khớp', iconName: 'Joints'},
    {
      index: 16,
      name: 'Lồng ngực - Mạch máu - Bướu cổ',
      iconName: 'BloodVessel',
    },
    {index: 17, name: 'Thẩm mỹ - chăm sóc da', iconName: 'Allergies'},
  ];

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedHour(null);
    setSelectedDoctor(null);
    setSelectedSpecialty(null);
  };

  const toggleSpecialtiesVisibility = () => {
    setIsSpecialtySearch(!isSpecialtySearch);
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
    const filteredDoctors = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchDoctor.toLowerCase()),
    );

    return (
      <View style={styles.doctorContainer}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Tìm nhanh bác sĩ"
          onChangeText={setSearchDoctor}
          value={searchDoctor}
        />
        {doctorList
          ? doctorList.map((doctor, index) => (
              <TouchableOpacity
                key={index}
                style={{width: '100%'}}
                onPress={() => {
                  setSelectedDoctor(doctor.name);
                  setDocID(doctor.id);
                  setIsDoctorSearch(false);
                }}>
                <DoctorCard doctor={doctor} />
              </TouchableOpacity>
            ))
          : 'Không có bác sĩ nào'}
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
    if (beginTimestamp && beginTimestamp - nowTimestamp >= oneDayInSeconds) {
      console.log(doctorID);
      AppointmentService.sendAppointment(
        token.accessToken,
        Number.parseInt(doctorID),
        {
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
        {/*<View style={styles.informationContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Chuyên khoa</Text>
          <TouchableOpacity
            style={[
              styles.textField,
              {backgroundColor: theme.colors.onPrimary},
            ]}
            onPress={toggleSpecialtiesVisibility}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon source="hospital" size={24} />
              <Text style={{marginLeft: 10, fontSize: 18}}>
                {selectedSpecialty ? selectedSpecialty : 'Chọn chuyên khoa'}
              </Text>
            </View>
            <Icon source="hockey-sticks" size={24} />
          </TouchableOpacity>
          {isSpecialtySearch && (
            <View
              style={{
                flexDirection: 'column',
                width: '90%',
                alignSelf: 'center',
                gap: 5,
              }}>
              {specialties.map(specialty => {
                return (
                  <TouchableOpacity
                    key={specialty.index}
                    style={{
                      height: 50,
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      borderWidth: 1,
                      borderColor: theme.colors.primary,
                      borderRadius: 16,
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setSelectedSpecialty(specialty.name);
                      setIsSpecialtySearch(false);
                    }}>
                    <Text variant="titleLarge">{specialty.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <Horizon />
        </View>*/}
        <View style={styles.informationContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Bác sĩ</Text>
          <TouchableOpacity
            style={[
              styles.textField,
              {backgroundColor: theme.colors.onPrimary},
            ]}
            onPress={toggleDoctorVisibility}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon source="doctor" size={24} />
              <Text style={{marginLeft: 10, fontSize: 18}}>
                {selectedDoctor ? selectedDoctor : 'Chọn bác sĩ'}
              </Text>
            </View>
            <Icon source="hockey-sticks" size={24} />
          </TouchableOpacity>
          {isDoctorSearch && renderDoctorContainer()}
          <Horizon />
        </View>

        {/*<View style={styles.informationContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Dịch vụ</Text>
          <TouchableOpacity
            style={[
              styles.serviceField,
              {backgroundColor: theme.colors.onPrimary},
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginLeft: 10, fontSize: 18}}>Khám dịch vụ</Text>
            </View>
            <Text style={{fontSize: 20, color: theme.colors.primary}}>
              150.000 VND
            </Text>
          </TouchableOpacity>
          <Horizon />
        </View>*/}
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
        {/*<View style={{marginHorizontal: 10}}>
          <Text style={{color: theme.colors.primary}}>
            Vui lòng kiểm tra lại thông tin trước khi đặt lịch
          </Text>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Phí khám bệnh</Text>
              <Text> 150.000 VNĐ</Text>
            </View>
          </View>
        </View>*/}
        <Button
          style={styles.confirmButton}
          mode="contained"
          onPress={() => {
            handleConfirmBooking();
          }}>
          Xác nhận
        </Button>
      </ScrollView>
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
    marginTop: 20,
  },
});
