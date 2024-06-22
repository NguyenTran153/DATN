import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, useTheme, Card, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import PrescriptionService from '../../../services/PrescriptionService';
import DiaryService from '../../../services/DiaryService';
import AppointmentService from '../../../services/AppointmentService';
import moment from 'moment';

const CurrentInfoScreen = () => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token);
  const patient = useSelector((state: any) => state.user);
  const [pres, setPres] = useState<any[]>([]);
  const [diary, SetDiary] = useState<any[]>([]);
  const [med, setMed] = useState<any[]>([]);
  const [app, setApp] = useState<any[]>([]);
  const [date, setDate] = useState('');
  useEffect(() => {
    const fetchAPI = async () => {
      const prescriptions = await PrescriptionService.getPrescription(patient.id, token.accessToken)
      const diaries = await DiaryService.getDiaries(token.accessToken, 1, 100, patient.id)
      const appointments = await AppointmentService.getAppointment(token.accessToken)
      const beginTimestamp = appointments.filter(item => (item.status === 'ongoing'));
      const dates = beginTimestamp.map(item => new Date(item.beginTimestamp * 1000));
    
      const now = new Date();
      dates.sort((a, b) => Math.abs(now.getTime() - a.getTime()) - Math.abs(now.getTime() - b.getTime()));
      console.log("Dates array" + dates)
      const thresholdDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      for(let i = 0; i < dates.length; i++)
      {
       
        if(dates[i].getTime() - thresholdDate.getTime() > 24 * 60 * 60 * 1000)
          {
              console.log(dates[i])
              console.log(dates[i].getTime() - thresholdDate.getTime() > 24 * 60 * 60 * 1000)
              const formattedDate = moment(dates[i]).format('DD/MM/YYYY HH:mm:ss');
              console.log(formattedDate)
              setDate(formattedDate);
              break
          }
      }
     
      setApp(appointments)
      setPres(prescriptions);
      SetDiary(diaries)
      const medicineStrings = prescriptions[0].data.medicines.map((medicine: { name: any; schedule: { morning: any; afternoon: any; evening: any; night: any; }; }) => (
        `${medicine.name}: Sáng: ${medicine.schedule.morning}, Trưa: ${medicine.schedule.afternoon}, Chiều: ${medicine.schedule.evening}, Tối: ${medicine.schedule.night}`))
      setMed(medicineStrings)
    };
    fetchAPI()
  }, [])
  // Sample data
  const nextAppointment = date;
  const recentDietLog = diary.length !== 0 ? diary[0].data.mockKey : "Không tìm thấy nhật ký gần nhất";
  const recentDiagnosis = '13/06/2024 - Viêm họng';
  const recentPrescription = med

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Title
            title="Lịch khám tiếp theo"
            left={props => <IconButton {...props} icon="calendar" />}
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.cardContent}>
              {nextAppointment !== ''
                ? nextAppointment
                : 'Không có lịch khám tiếp theo'}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Nhật ký ăn uống gần nhất"
            left={props => <IconButton {...props} icon="food" />}
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <Text style={styles.cardContent}>{recentDietLog}</Text>
          </Card.Content>
        </Card>

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

        <Card style={styles.card}>
          <Card.Title
            title="Đơn thuốc gần nhất"
            left={props => <IconButton {...props} icon="pill" />}
            titleStyle={styles.cardTitle}
          />
          {recentPrescription.length !== 0 ? recentPrescription.map(item =>
            <Card.Content>
              <Text style={styles.cardContent}>{item}</Text>
            </Card.Content>
          ) : <Card.Content>
            <Text style={styles.cardContent}>Không tìm thấy đơn thuốc</Text>
          </Card.Content>}

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
