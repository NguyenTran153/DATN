import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Text, useTheme, Card, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import PrescriptionService from '../../../services/PrescriptionService';
import DiaryService from '../../../services/DiaryService';
import AppointmentService from '../../../services/AppointmentService';
import moment from 'moment';

interface State {
  token: {accessToken: string};
  user: {id: string};
}

interface Prescription {
  id: string;
  data: {
    medicines: {
      name: string;
      schedule: {
        morning: string;
        afternoon: string;
        evening: string;
        night: string;
      };
      dosage: string;
    }[];
  };
}

interface Diary {
  data: {
    bloodPressure?: string;
    bloodSugar?: string;
    time?: string;
    morning?: string;
    afternoon?: string;
    evening?: string;
  };
}

interface Appointment {
  status: string;
  beginTimestamp: number;
}

const CurrentInfoScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const token = useSelector((state: State) => state.token);
  const patient = useSelector((state: State) => state.user);
  const [data, setData] = useState({
    prescriptions: [] as Prescription[],
    diaries: {
      food: [] as Diary[],
      bloodPressure: [] as Diary[],
      bloodSugar: [] as Diary[],
    },
    appointments: [] as Appointment[],
    diagnosis: '',
    nextAppointmentDate: '',
    medicineStrings: [] as string[],
  });
  const isFocused = useIsFocused();

  const fetchAPI = useCallback(async () => {
    try {
      const patientID = Number(patient.id);
      const [prescriptions, diariesFood, diariesBP, diariesBS, appointments] =
        await Promise.all([
          PrescriptionService.getPrescription(patient.id, token.accessToken),
          DiaryService.getDiaries(token.accessToken, 1, 100, patientID, 'food'),
          DiaryService.getDiaries(
            token.accessToken,
            1,
            100,
            patientID,
            'blood_pressure',
          ),
          DiaryService.getDiaries(
            token.accessToken,
            1,
            100,
            patientID,
            'blood_sugar',
          ),
          AppointmentService.getAppointment(token.accessToken),
        ]);

      let diagnosis = '';
      let medicineStrings: string[] = [];
      if (prescriptions.length > 0) {
        const diagnoses = await PrescriptionService.getDiagnosis(
          prescriptions[0].id,
          token.accessToken,
        );
        diagnosis = diagnoses.length > 0 ? diagnoses[0].problem : '';

        medicineStrings = prescriptions[0].data.medicines.map(
          (medicine: any) =>
            `${medicine.name}: Sáng: ${medicine.schedule.morning}, Trưa: ${medicine.schedule.afternoon}, Chiều: ${medicine.schedule.evening}, Tối: ${medicine.schedule.night}\nSố lượng: ${medicine.dosage} viên`,
        );
      }

      const nextAppointmentDate = calculateNextAppointmentDate(appointments);

      setData({
        prescriptions,
        diaries: {
          food: diariesFood,
          bloodPressure: diariesBP,
          bloodSugar: diariesBS,
        },
        appointments,
        diagnosis,
        nextAppointmentDate,
        medicineStrings,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error (e.g., show error message to user)
    }
  }, [patient.id, token.accessToken]);

  useEffect(() => {
    if (isFocused) {
      fetchAPI();
    }
  }, [isFocused, fetchAPI]);

  const calculateNextAppointmentDate = (
    appointments: Appointment[],
  ): string => {
    const now = new Date();
    const thresholdDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const ongoingAppointments = appointments
      .filter(item => item.status === 'ongoing')
      .map(item => new Date(item.beginTimestamp * 1000))
      .sort((a, b) => a.getTime() - b.getTime());

    for (const date of ongoingAppointments) {
      if (date.getTime() > thresholdDate.getTime()) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
      }
    }
    return '';
  };

  const renderDiaryInfo = () => {
    const {food, bloodPressure, bloodSugar} = data.diaries;
    const recentDietLog =
      food.length > 0
        ? `${food[0].data.morning ? `Sáng: ${food[0].data.morning}` : ''}${
            food[0].data.morning &&
            (food[0].data.afternoon || food[0].data.evening)
              ? ' | '
              : ''
          }${food[0].data.afternoon ? `Trưa: ${food[0].data.afternoon}` : ''}${
            food[0].data.afternoon && food[0].data.evening ? ' | ' : ''
          }${food[0].data.evening ? `Tối: ${food[0].data.evening}` : ''}`
        : 'Không tìm thấy nhật ký ăn uống gần nhất';

    const recentBloodPressure =
      bloodPressure.length > 0
        ? `${
            bloodPressure[0].data.bloodPressure
              ? `${bloodPressure[0].data.bloodPressure} mmHg`
              : ''
          } | ${
            bloodPressure[0].data.time ? `${bloodPressure[0].data.time}` : ''
          }`
        : 'Không tìm thấy nhật ký huyết áp gần nhất';

    const recentBloodSugar =
      bloodSugar.length > 0
        ? `${
            bloodSugar[0].data.bloodSugar
              ? `${bloodSugar[0].data.bloodSugar} mg/dL`
              : ''
          } | ${bloodSugar[0].data.time ? `${bloodSugar[0].data.time}` : ''}`
        : 'Không tìm thấy nhật ký đường huyết gần nhất';

    return (
      <>
        <Text style={styles.cardContent}>{recentDietLog}</Text>
        <Text style={styles.cardContent}>{recentBloodPressure}</Text>
        <Text style={styles.cardContent}>{recentBloodSugar}</Text>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
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
                {data.nextAppointmentDate || 'Không có lịch khám tiếp theo'}
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DiaryRecordScreen')}>
          <Card style={styles.card}>
            <Card.Title
              title="Nhật ký gần nhất"
              left={props => <IconButton {...props} icon="food" />}
              titleStyle={styles.cardTitle}
            />
            <Card.Content>{renderDiaryInfo()}</Card.Content>
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
              <Text style={styles.cardContent}>
                {data.diagnosis || 'Không tìm thấy chẩn đoán gần nhất'}
              </Text>
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
            <Card.Content>
              {data.medicineStrings.length > 0 ? (
                data.medicineStrings.map((item, index) => (
                  <Text key={index} style={styles.cardContent}>
                    {item}
                  </Text>
                ))
              ) : (
                <Text style={styles.cardContent}>Không tìm thấy đơn thuốc</Text>
              )}
            </Card.Content>
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
