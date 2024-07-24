import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {useTheme, Text, Provider as PaperProvider} from 'react-native-paper';
import CustomAppbar from '../../../components/CustomAppbar';
import {useSelector} from 'react-redux';

const MedicalDetailScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const {item} = route.params;
  const {prescription, diagnosis} = item;
  const user = useSelector((state: any) => state.user);
  const guest = useSelector((state: any) => state.guest);
  const [doctor, setDoctor] = useState<UserData>();
  const [patient, setPatient] = useState<UserData>();

  useEffect(() => {
    if (user.role === 'patient') {
      setDoctor(guest);
      setPatient(user);
    } else {
      setDoctor(user);
      setPatient(guest);
    }
  }, []);

  const convertString = (inputString: string): string => {
    if (inputString.startsWith('"') && inputString.endsWith('"')) {
      return inputString.slice(1, -1).replace(/\\"/g, '"');
    }
    return inputString.replace(/\\"/g, '"');
  };

  return (
    <PaperProvider
      theme={{
        ...theme,
        roundness: 10,
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
            <Text style={styles.headerText}>
              Bác sĩ: {doctor?.firstName} {doctor?.lastName}
            </Text>
            <Text style={styles.subHeaderText}>
              Số điện thoại: {doctor?.phoneNumber}
            </Text>
            <Text style={styles.subHeaderText}>Địa chỉ phòng khám: {doctor?.address}</Text>
            <Text style={styles.subHeaderText}>Ngày khám: {item.date}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.headerText}>
              Bệnh nhân: {patient?.firstName} {patient?.lastName}
            </Text>
            <Text style={styles.subHeaderText}>
              Số điện thoại: {patient?.phoneNumber}
            </Text>
            <Text style={styles.subHeaderText}>
              Giới tính: {patient?.gender === 'male' ? 'Nam' : 'Nữ'}
            </Text>
            <Text style={styles.subHeaderText}>
              Địa chỉ: {patient?.address}
            </Text>
            <Text style={styles.subHeaderText}>
              Cân nặng: {patient?.weight}
            </Text>
            <Text style={styles.subHeaderText}>
              Chiều cao: {patient?.height}
            </Text>
            <Text style={styles.subHeaderText}>Số phiếu: {item.id}</Text>
            <Text style={styles.subHeaderText}>
              Ngày sinh: {item.birthdate}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chi tiết khám bệnh</Text>
            <Text style={styles.detailText}>Ngày khám bệnh: {item.date}</Text>
            <Text style={styles.detailText}>
              Kết quả: {convertString(diagnosis.problem)}
            </Text>
          </View>

          {diagnosis.images && diagnosis.images.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Xét nghiệm</Text>
              {diagnosis.images.map((image: string, index: number) => (
                <Image key={index} source={{uri: image}} style={styles.image} />
              ))}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Đơn thuốc</Text>
            {prescription.data.medicines.map((medicine: any, index: number) => (
              <View key={index} style={styles.medicineContainer}>
                <Text style={styles.medicineText}>
                  {medicine.name} SL: {medicine.dosage} viên
                </Text>
                <Text style={styles.medicineSchedule}>
                  Sáng: {medicine.schedule.morning} viên, Trưa:{' '}
                  {medicine.schedule.afternoon} viên, Chiều:{' '}
                  {medicine.schedule.evening} viên, Tối:{' '}
                  {medicine.schedule.night} viên
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.footerText}>Ngày: {item.date}</Text>
            <Text style={styles.footerText}>Bác sĩ khám bệnh</Text>
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
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  medicineContainer: {
    marginBottom: 8,
  },
  medicineText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicineSchedule: {
    fontSize: 14,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
