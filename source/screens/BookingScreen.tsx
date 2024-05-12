import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  useTheme,
  Button,
  Text,
  Icon,
  Searchbar,
  Avatar,
} from 'react-native-paper';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ChatRoutes} from '../Routes/Route';
import {SafeAreaView} from 'react-native-safe-area-context';
import Horizon from '../components/Horizon';
import DoctorCard from '../components/DoctorCard';
import CustomAppbar from '../components/CustomAppbar';

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

type Props = NativeStackScreenProps<ChatRoutes, 'BookingScreen'>;

const BookingScreen = ({route, navigation}: Props) => {
  console.log(JSON.stringify(route));

  const theme = useTheme();

  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const [searchDoctor, setSearchDoctor] = useState<string>('');

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
    // Thêm thông tin của các bác sĩ khác nếu cần
  ];

  const specialties = [
    {index: 0, name: 'Khám chức năng hô hấp', iconName: 'Respirology'},
    {index: 1, name: 'Khám da liễu', iconName: 'Measles'}, // Measles icon might not be appropriate for dermatology
    {index: 2, name: 'Khám điều trị vết thương', iconName: 'Bandaged'},
    {index: 3, name: 'Khám hậu môn-trực tràng', iconName: 'Intestine'},
    {index: 4, name: 'Khám mắt', iconName: 'Eye'},
    {index: 5, name: 'Khám tai mũi họng', iconName: 'Ear'},
    {index: 6, name: 'Khám nội tiết', iconName: 'Endocrinology'},
    {index: 7, name: 'Khám phụ khoa', iconName: 'Gynecology'}, // Consider a more generic icon like 'uterus' or 'gynecology'
    {index: 8, name: 'Khám thai', iconName: 'Fetus'},
    {index: 9, name: 'Khám thần kinh', iconName: 'Psychology'},
    {index: 10, name: 'Khám tiết niệu', iconName: 'Kidneys'},
    {index: 11, name: 'Khám tiêu hoá-gan mật', iconName: 'Stomach'},
    {index: 12, name: 'Khám tim mạch', iconName: 'Heart'},
    {index: 13, name: 'Khám tổng quát', iconName: 'Tac'}, // CT Scan might not be appropriate for a general checkup
    {index: 14, name: 'Khám viêm gan', iconName: 'Liver'},
    {index: 15, name: 'Khám xương khớp', iconName: 'Joints'},
    {
      index: 16,
      name: 'Lồng ngực - Mạch máu - Bướu cổ',
      iconName: 'BloodVessel',
    },
    {index: 17, name: 'Thẩm mỹ - chăm sóc da', iconName: 'Allergies'}, // Allergies icon might not be appropriate for aesthetics or skincare
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
        {filteredDoctors.map((doctor, index) => (
          <TouchableOpacity
            key={index}
            style={{width: '100%'}}
            onPress={() => {
              setSelectedDoctor(doctor.name);
              setIsDoctorSearch(false);
            }}>
            <DoctorCard doctorId={doctor.name} />
          </TouchableOpacity>
        ))}
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
                let uri = `../asset/icon/${specialty.iconName}.svg`;

                return (
                  <TouchableOpacity
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
        </View>
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

        <View style={styles.informationContainer}>
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
              onDayPress={day => {
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
        <View style={{marginHorizontal: 10}}>
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
        </View>
        <Button style={styles.confirmButton} mode="contained">
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
