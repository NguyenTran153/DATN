import {StyleSheet, View, ScrollView} from 'react-native';
import {useTheme, Text, DataTable, List} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import CustomAppbar from '../../components/CustomAppbar';
import {useSelector} from 'react-redux';
import PrescriptionService from '../../services/PrescriptionService';
import moment from 'moment';

const PrescriptionListScreen = ({navigation, route}: any) => {
  const theme = useTheme();

  const [prescriptions, setPrescriptions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userData = useSelector((state: any) => state.user);
  const patientId = route?.params?.patientId
    ? route.params.patientId
    : userData.id;
  const token = useSelector((state: any) => state.token);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Attempt to fetch real data from the API
        const data = await PrescriptionService.getPrescription(
          patientId,
          token.accessToken,
        );
        setPrescriptions([
          {
            id: 1,
            patientName: 'Nguyễn Văn A',
            doctorName: 'Bác sĩ Trần Thị B',
            date: '2024-05-20',
            problem: 'Bệnh yếu tim',
            medicines: [
              {
                name: 'Paracetamol',
                dosage: 2,
                schedule: {morning: 1, afternoon: 0, evening: 1, night: 0},
              },
              {
                name: 'Prospan',
                dosage: 3,
                schedule: {morning: 1, afternoon: 1, evening: 1, night: 0},
              },
            ],
          },
          // Add more mock prescriptions as needed
        ]);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        // If fetching fails, use mock data
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, [patientId, token]);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <CustomAppbar
        title="Danh sách đơn thuốc"
        goBack={() => navigation.goBack()}
      />
      <View>
        <ScrollView>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            prescriptions.map((prescription: any) => (
              <List.AccordionGroup key={prescription.id}>
                <List.Accordion
                  title={`Ngày: ${moment(prescription.date).format(
                    'YYYY-MM-DD',
                  )}`}
                  description={`Bác sĩ: ${prescription.doctorName} - Vấn đề: ${prescription.problem}`}
                  id={prescription.id.toString()}>
                  {prescription.medicines.map(
                    (medicine: any, index: number) => (
                      <List.Item
                        key={index}
                        title={medicine.name}
                        description={`Liều dùng: ${medicine.dosage} - Sáng: ${medicine.schedule.morning}, Trưa: ${medicine.schedule.afternoon}, Chiều: ${medicine.schedule.evening}, Tối: ${medicine.schedule.night}`}
                      />
                    ),
                  )}
                </List.Accordion>
              </List.AccordionGroup>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PrescriptionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
