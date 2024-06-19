import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  useTheme,
  Text,
  TextInput,
  List,
  Provider as PaperProvider,
  DataTable,
} from 'react-native-paper';
import CustomAppbar from '../../../components/CustomAppbar';

const fakePrescription = {
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
};

const MedicalDetailScreen = ({navigation, route}: any) => {
  const theme = useTheme();

  console.log(JSON.stringify(route.params));

  return (
    <PaperProvider
      theme={{
        ...theme,
        roundness: 10, // Set the roundness value for all Paper components
      }}>
      <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
        <CustomAppbar
          title="Thông tin khám bệnh"
          goBack={() => navigation.goBack()}
        />
        <ScrollView
          style={{padding: 16}}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chi tiết khám bệnh</Text>
            <TextInput
              label="Ngày khám bệnh"
              mode="outlined"
              value="2024-05-20"
              style={styles.input}
              editable={false}
              theme={{roundness: 10}}
            />
            <TextInput
              label="Chẩn đoán"
              mode="outlined"
              value="Bệnh yếu tim"
              multiline
              numberOfLines={4}
              style={styles.input}
              editable={false}
              theme={{roundness: 10}}
            />
            <TextInput
              label="Xét nghiệm"
              mode="outlined"
              value="Xét nghiệm máu"
              multiline
              numberOfLines={4}
              style={styles.input}
              editable={false}
              theme={{roundness: 10}}
            />
            <TextInput
              label="Kết quả"
              mode="outlined"
              value="Kết quả bình thường"
              multiline
              numberOfLines={4}
              style={styles.input}
              editable={false}
              theme={{roundness: 10}}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Đơn thuốc</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{flex: 3}}>Thuốc</DataTable.Title>
                <DataTable.Title style={{flex: 1}}>Buổi</DataTable.Title>
                <DataTable.Title numeric style={{flex: 1}}>
                  Số viên
                </DataTable.Title>
              </DataTable.Header>
              {fakePrescription.medicines.map((medicine, index) => (
                <React.Fragment key={index}>
                  <DataTable.Row>
                    <DataTable.Cell style={{flex: 3}}>
                      {medicine.name}
                    </DataTable.Cell>
                    <DataTable.Cell style={{flex: 1}}>Sáng</DataTable.Cell>
                    <DataTable.Cell numeric style={{flex: 1}}>
                      {medicine.schedule.morning}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell style={{flex: 3}}>.</DataTable.Cell>
                    <DataTable.Cell style={{flex: 1}}>Trưa</DataTable.Cell>
                    <DataTable.Cell numeric style={{flex: 1}}>
                      {medicine.schedule.afternoon}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell style={{flex: 3}}>.</DataTable.Cell>
                    <DataTable.Cell style={{flex: 1}}>Chiều</DataTable.Cell>
                    <DataTable.Cell numeric style={{flex: 1}}>
                      {medicine.schedule.evening}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell style={{flex: 3}}>.</DataTable.Cell>
                    <DataTable.Cell style={{flex: 1}}>Tối</DataTable.Cell>
                    <DataTable.Cell numeric style={{flex: 1}}>
                      {medicine.schedule.night}
                    </DataTable.Cell>
                  </DataTable.Row>
                </React.Fragment>
              ))}
            </DataTable>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default MedicalDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  medicineContainer: {
    marginBottom: 16,
  },
});
