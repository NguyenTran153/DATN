import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text, useTheme, Card, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import PrescriptionService from '../../../services/PrescriptionService';
import DiaryService from '../../../services/DiaryService';
import AppointmentService from '../../../services/AppointmentService';
import moment from 'moment';

const CurrentInfoScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token);
  const patient = useSelector((state: any) => state.user);
  const [pres, setPres] = useState<any[]>([]);
  const [diary, SetDiary] = useState<any[]>([]);
  const [diaryBP, SetDiaryBP] = useState<any[]>([]);
  const [diaryBS, SetDiaryBS] = useState<any[]>([]);
  const [med, setMed] = useState<any[]>([]);
  const [app, setApp] = useState<any[]>([]);
  const [diagnosis, setDiag] = useState('');
  const [date, setDate] = useState('');
  const isFocused = useIsFocused();

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
    const now = new Date();
    const dates = beginTimestamp.map(
      item => new Date(item.beginTimestamp * 1000),
    );
    dates.sort(
      (a, b) =>
        Math.abs(now.getTime() - a.getTime()) -
        Math.abs(now.getTime() - b.getTime()),
    );
    const thresholdDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    console.log("begin dates length " + dates[0].getTime())
    for (let i = 0; i < dates.length; i++) {
      console.log(dates[i].getTime())
      if (dates[i].getTime() - thresholdDate.getTime() > 24 * 60 * 60 * 1000) {
        const formattedDate = moment(dates[i]).format('DD/MM/YYYY HH:mm:ss');
        console.log("In for loop")
        setDate(formattedDate);
        break;
      }
    }
    const dianoses = await PrescriptionService.getDiagnosis(
      prescriptions[0].id,
      token.accessToken,
    );

    if (dianoses) {
      setDiag(dianoses[0].problem);
    }



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

  useEffect(() => {
    fetchAPI();
  }, [isFocused]);
  // Sample data
  const nextAppointment = date;
  const recentBloodPressure = diaryBP.length !== 0 ? `${diaryBP[0]?.data?.bloodPressure ?
    `${diaryBP[0]?.data?.bloodPressure} mmHg` : ''} | ${diaryBP[0]?.data?.time ?
      `${diaryBP[0]?.data?.time}` : ''}` : 'Không tìm thấy nhật ký huyết áp gần nhất'
  const recentBloodSugar = diaryBS.length !== 0 ? `${diaryBS[0]?.data?.bloodSugar ?
    `${diaryBS[0]?.data?.bloodSugar} mg/dL` : ''} | ${diaryBS[0]?.data?.time ?
      `${diaryBS[0]?.data?.time}` : ''}` : 'Không tìm thấy nhật ký đường huyết gần nhất'
  const recentDietLog =
    diary.length !== 0
      ? `${diary[0]?.data?.morning ? `Sáng: ${diary[0]?.data?.morning}` : ''}${diary[0]?.data?.morning &&
        (diary[0]?.data?.afternoon || diary[0]?.data?.evening)
        ? ' | '
        : ''
      }${diary[0]?.data?.afternoon ? `Trưa: ${diary[0]?.data?.afternoon}` : ''
      }${diary[0]?.data?.afternoon && diary[0]?.data?.evening ? ' | ' : ''}${diary[0]?.data?.evening ? `Tối: ${diary[0]?.data?.evening}` : ''
      }`
      : 'Không tìm thấy nhật ký ăn uống gần nhất';

  const recentDiagnosis =
    diagnosis !== '' ? diagnosis : 'Không tìm thấy chẩn đoán gần nhất';
  const recentPrescription = med;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BookingHistoryScreen')}>
          <Card style={styles.card}>
            <Card.Title
              title="Lịch khám tiếp theo"
              left={props => <IconButton {...props} icon="calendar" />}
              titleStyle={styles.cardTitle}
            />
            <Card.Content>
              <Text style={styles.cardContent}>
                {date !== ''
                  ? date
                  : 'Không có lịch khám tiếp theo'}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DiaryRecordScreen')}>
          <Card style={styles.card}>
            <Card.Title
              title="Nhật ký ăn uống gần nhất"
              left={props => <IconButton {...props} icon="food" />}
              titleStyle={styles.cardTitle}
            />
            <Card.Content>
              <Text style={styles.cardContent}>{recentDietLog}</Text>
              <Text style={styles.cardContent}>{recentBloodPressure}</Text>
              <Text style={styles.cardContent}>{recentBloodSugar}</Text>
              
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MedicalHistoryScreen')}>
          <Card style={styles.card}>
            <Card.Title
              title="Chẩn đoán và kết quả gần nhất"
              left={props => <IconButton {...props} icon="file-find" />}
              titleStyle={styles.cardTitle}
            />
            <Card.Content>
              <Text style={styles.cardContent}>{recentDiagnosis}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MedicalHistoryScreen')}>
          <Card style={styles.card}>
            <Card.Title
              title="Đơn thuốc gần nhất"
              left={props => <IconButton {...props} icon="pill" />}
              titleStyle={styles.cardTitle}
            />
            {recentPrescription.length !== 0 ? (
              recentPrescription.map(item => (
                <Card.Content>
                  <Text style={styles.cardContent}>{item}</Text>
                </Card.Content>
              ))
            ) : (
              <Card.Content>
                <Text style={styles.cardContent}>Không tìm thấy đơn thuốc</Text>
              </Card.Content>
            )}
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrentInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
