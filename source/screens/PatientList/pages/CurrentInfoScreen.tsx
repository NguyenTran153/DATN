import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, useTheme, Card, IconButton, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import PrescriptionService from '../../../services/PrescriptionService';
import DiaryService from '../../../services/DiaryService';
import AppointmentService from '../../../services/AppointmentService';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

const CurrentInfoScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token);
  const isFocused = useIsFocused();
  const patient = route.params.patient;
  const [pres, setPres] = useState<any[]>([]);
  const [diary, SetDiary] = useState<any[]>([]);
  const [diaryBP, SetDiaryBP] = useState<any[]>([]);
  const [diaryBS, SetDiaryBS] = useState<any[]>([]);
  const [med, setMed] = useState<any[]>([]);
  const [app, setApp] = useState<any[]>([]);
  const [diagnosis, setDiag] = useState('');
  const user = route.params.patient;

  const personalInfo = {
    firstName: user.firstName || 'Chưa cập nhật',
    lastName: user.lastName || 'Chưa cập nhật',
    birthdate: user.birthdate
      ? new Date(user.birthdate).toLocaleDateString()
      : 'Chưa cập nhật',
    gender:
      user.gender === 'male'
        ? 'Nam'
        : user.gender === 'female'
          ? 'Nữ'
          : 'Chưa cập nhật',
    address: user.address || 'Chưa cập nhật',
    height: user.height ? `${user.height} cm` : 'Chưa cập nhật',
    weight: user.weight ? `${user.weight} kg` : 'Chưa cập nhật',
    avatar: user.avatar,
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const prescriptions = await PrescriptionService.getPrescription(
        patient.id,
        token.accessToken,
      );
      const diaries = await DiaryService.getDiaries(
        token.accessToken,
        1,
        100,
        patient.id,
        'food',
      );
      const diariesBP = await DiaryService.getDiaries(
        token.accessToken,
        1,
        100,
        patient.id,
        'blood_pressure',
      );
      const diariesBS = await DiaryService.getDiaries(
        token.accessToken,
        1,
        100,
        patient.id,
        'blood_sugar',
      );
      const appointments = await AppointmentService.getAppointment(
        token.accessToken,
      );
      const beginTimestamp = appointments.filter(
        item => item.status === 'ongoing',
      );
      const dates = beginTimestamp.map(
        item => new Date(item.beginTimestamp * 1000),
      );
      const dianoses = await PrescriptionService.getDiagnosis(
        prescriptions[0].id,
        token.accessToken,
      );
      console.log(dianoses);
      if (dianoses) {
        setDiag(dianoses[0].problem);
      }
      const now = new Date();
      dates.sort(
        (a, b) =>
          Math.abs(now.getTime() - a.getTime()) -
          Math.abs(now.getTime() - b.getTime()),
      );
      console.log('Dates array' + dates);
      setApp(appointments);
      setPres(prescriptions);
      SetDiary(diaries);
      SetDiaryBP(diariesBP);
      SetDiaryBS(diariesBS);
      const medicineStrings = prescriptions[0].data.medicines.map(
        (medicine: {
          name: any;
          schedule: { morning: any; afternoon: any; evening: any; night: any };
          dosage: any;
        }) =>
          `${medicine.name}: Sáng: ${medicine.schedule.morning}, Trưa: ${medicine.schedule.afternoon}, Chiều: ${medicine.schedule.evening}, Tối: ${medicine.schedule.night}\nSố lượng: ${medicine.dosage} viên`,
      );
      setMed(medicineStrings);
    };
    fetchAPI();
  }, [isFocused]);

  // Sample data
  const recentDietLog = diary.length !== 0
    ? `${diary[0]?.data?.morning ? `Sáng: ${diary[0]?.data?.morning}` : ''}${diary[0]?.data?.morning && (diary[0]?.data?.afternoon || diary[0]?.data?.evening) ? ' | ' : ''}${diary[0]?.data?.afternoon ? `Trưa: ${diary[0]?.data?.afternoon}` : ''}${diary[0]?.data?.afternoon && diary[0]?.data?.evening ? ' | ' : ''}${diary[0]?.data?.evening ? `Tối: ${diary[0]?.data?.evening}` : ''}`
    : 'Không tìm thấy nhật ký gần nhất';
  const recentBloodPressure = diaryBP.length !== 0 ? `${diaryBP[0]?.data?.bloodPressure ?
    `${diaryBP[0]?.data?.bloodPressure} mmHg` : ''} | ${diaryBP[0]?.data?.time ?
      `${diaryBP[0]?.data?.time}` : ''}` : 'Không tìm thấy nhật ký huyết áp gần nhất'
  const recentBloodSugar = diaryBS.length !== 0 ? `${diaryBS[0]?.data?.bloodSugar ?
    `${diaryBS[0]?.data?.bloodSugar} mg/dL` : ''} | ${diaryBS[0]?.data?.time ?
      `${diaryBS[0]?.data?.time}` : ''}` : 'Không tìm thấy nhật ký đường huyết gần nhất'
  const recentDiagnosis =
    diagnosis !== '' ? diagnosis : 'Không tìm thấy chẩn đoán gần nhất';
  const recentPrescription = med;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Avatar.Image
            size={100}
            source={
              personalInfo.avatar
                ? { uri: personalInfo.avatar }
                : require('../../../asset/7677205.jpg')
            }
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>
              {personalInfo.lastName} {personalInfo.firstName}
            </Text>
            <Text style={styles.gender}>Giới tính: {personalInfo.gender}</Text>
          </View>
        </View>

        <View style={styles.personalDetails}>
          <Text style={styles.detailText}>
            Ngày sinh: {personalInfo.birthdate}
          </Text>
          <Text style={styles.detailText}>Địa chỉ: {personalInfo.address}</Text>
          <Text style={styles.detailText}>
            Chiều cao: {personalInfo.height}
          </Text>
          <Text style={styles.detailText}>Cân nặng: {personalInfo.weight}</Text>
        </View>

        <Card
          style={styles.card}
          onPress={() => navigation.navigate('FoodDiary')}>
          <Card.Title
            title="Nhật ký gần nhất"
            left={props => <IconButton {...props} icon="food" />}
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.cardContent}>{recentDietLog}</Text>
            <Text style={styles.cardContent}>{recentBloodPressure}</Text>
            <Text style={styles.cardContent}>{recentBloodSugar}</Text>
          </Card.Content>
        </Card>

        <Card
          style={styles.card}
          onPress={() => navigation.navigate('MedicalHistoryScreen')}>
          <Card.Title
            title="Chẩn đoán và kết quả gần nhất"
            left={props => <IconButton {...props} icon="file-find" />}
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.cardContent}>{recentDiagnosis}</Text>
          </Card.Content>
        </Card>

        <Card
          style={styles.card}
          onPress={() => navigation.navigate('MedicalHistoryScreen')}>
          <Card.Title
            title="Đơn thuốc gần nhất"
            left={props => <IconButton {...props} icon="pill" />}
            titleStyle={styles.cardTitle}
          />
          {recentPrescription.length !== 0 ? (
            recentPrescription.map((item, index) => (
              <Card.Content key={index}>
                <Text style={styles.cardContent}>{item}</Text>
              </Card.Content>
            ))
          ) : (
            <Card.Content>
              <Text style={styles.cardContent}>Không tìm thấy đơn thuốc</Text>
            </Card.Content>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrentInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  gender: {
    fontSize: 16,
  },
  personalDetails: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 16,
    marginTop: 8,
  },
});
