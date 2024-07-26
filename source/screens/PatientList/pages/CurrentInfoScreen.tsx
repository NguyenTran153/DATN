import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {Text, useTheme, Card, IconButton, Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import PrescriptionService from '../../../services/PrescriptionService';
import DiaryService from '../../../services/DiaryService';
import AppointmentService from '../../../services/AppointmentService';

interface RouteParams {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    gender: 'male' | 'female' | string;
    address: string;
    height: number;
    weight: number;
    avatar: string;
  };
}

interface State {
  token: {
    accessToken: string;
  };
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
    morning?: string;
    afternoon?: string;
    evening?: string;
    bloodPressure?: string;
    bloodSugar?: string;
    time?: string;
  };
}

interface Appointment {
  status: string;
  beginTimestamp: number;
}

const CurrentInfoScreen: React.FC<{
  route: {params: RouteParams};
  navigation: any;
}> = ({route, navigation}) => {
  const theme = useTheme();
  const token = useSelector((state: State) => state.token);
  const isFocused = useIsFocused();
  const patient = route.params.patient;

  const [data, setData] = useState({
    prescriptions: [] as Prescription[],
    diaries: {
      food: [] as Diary[],
      bloodPressure: [] as Diary[],
      bloodSugar: [] as Diary[],
    },
    appointments: [] as Appointment[],
    diagnosis: '',
    medicineStrings: [] as string[],
  });

  const personalInfo = {
    firstName: patient.firstName || 'Chưa cập nhật',
    lastName: patient.lastName || 'Chưa cập nhật',
    birthdate: patient.birthdate
      ? new Date(patient.birthdate).toLocaleDateString()
      : 'Chưa cập nhật',
    gender:
      patient.gender === 'male'
        ? 'Nam'
        : patient.gender === 'female'
        ? 'Nữ'
        : 'Chưa cập nhật',
    address: patient.address || 'Chưa cập nhật',
    height: patient.height ? `${patient.height} cm` : 'Chưa cập nhật',
    weight: patient.weight ? `${patient.weight} kg` : 'Chưa cập nhật',
    avatar: patient.avatar,
  };

  const fetchAPI = useCallback(async () => {
    try {
      const patientID = Number(patient.id);

      const [prescriptions, diariesFood, diariesBP, diariesBS, appointments] =
        await Promise.all([
          PrescriptionService.getPrescription(patient.id, token.accessToken),
          DiaryService.getDiaries(token.accessToken, 1, 10, patientID, 'food'),
          DiaryService.getDiaries(
            token.accessToken,
            1,
            10,
            patientID,
            'blood_pressure',
          ),
          DiaryService.getDiaries(
            token.accessToken,
            1,
            10,
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

      setData({
        prescriptions,
        diaries: {
          food: diariesFood,
          bloodPressure: diariesBP,
          bloodSugar: diariesBS,
        },
        appointments,
        diagnosis,
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

  const renderDiaryInfo = () => {
    const {food, bloodPressure, bloodSugar} = data.diaries;
    const recentDietLog =
      food.length > 0
        ? `${food[0]?.data?.morning ? `Sáng: ${food[0]?.data?.morning}` : ''}${
            food[0]?.data?.morning &&
            (food[0]?.data?.afternoon || food[0]?.data?.evening)
              ? ' | '
              : ''
          }${
            food[0]?.data?.afternoon ? `Trưa: ${food[0]?.data?.afternoon}` : ''
          }${food[0]?.data?.afternoon && food[0]?.data?.evening ? ' | ' : ''}${
            food[0]?.data?.evening ? `Tối: ${food[0]?.data?.evening}` : ''
          }`
        : 'Không tìm thấy nhật ký ăn uống gần nhất';

    const recentBloodPressure =
      bloodPressure.length > 0
        ? `${
            bloodPressure[0]?.data?.bloodPressure
              ? `${bloodPressure[0]?.data?.bloodPressure} mmHg`
              : ''
          } | ${
            bloodPressure[0]?.data?.time
              ? `${bloodPressure[0]?.data?.time}`
              : ''
          }`
        : 'Không tìm thấy nhật ký huyết áp gần nhất';

    const recentBloodSugar =
      bloodSugar.length > 0
        ? `${
            bloodSugar[0]?.data?.bloodSugar
              ? `${bloodSugar[0]?.data?.bloodSugar} mg/dL`
              : ''
          } | ${
            bloodSugar[0]?.data?.time ? `${bloodSugar[0]?.data?.time}` : ''
          }`
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
        <View style={styles.header}>
          <Avatar.Image
            size={100}
            source={
              personalInfo.avatar
                ? {uri: personalInfo.avatar}
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
          <Card.Content>{renderDiaryInfo()}</Card.Content>
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
            <Text style={styles.cardContent}>
              {data.diagnosis || 'Không tìm thấy chẩn đoán gần nhất'}
            </Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

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

export default CurrentInfoScreen;
