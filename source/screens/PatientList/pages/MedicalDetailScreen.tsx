import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {
  useTheme,
  Text,
  Provider as PaperProvider,
  Appbar,
  IconButton,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomAppbar from '../../../components/CustomAppbar';

const Tab = createMaterialTopTabNavigator();

const MedicalDetailScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const {item} = route.params;
  const {prescription, diagnosis} = item;
  const user = useSelector((state: any) => state.user);
  const [doctor, setDoctor] = useState<UserData>();
  const [patient, setPatient] = useState<UserData>();

  useEffect(() => {
    setDoctor(item?.prescription?.createdBy);
    if (user.role === 'patient') setPatient(user);
    else setPatient(route?.params?.patient);
  }, []);

  const convertString = (inputString: string): string => {
    if (inputString.startsWith('"') && inputString.endsWith('"')) {
      return inputString.slice(1, -1).replace(/\\"/g, '"');
    }
    return inputString.replace(/\\"/g, '"');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    infoContainer: {
      flexDirection: 'row',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize: 15,
    },
    value: {
      marginBottom: 10,
      fontSize: 15,
    },
    section: {
      marginBottom: 16,
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

  const DiagnosisTab = () => (
    <ScrollView style={styles.container}>
      {diagnosis.images && diagnosis.images.length > 0 ? (
        diagnosis.images.map((image: string, index: number) => (
          <Image key={index} source={{uri: image}} style={styles.image} />
        ))
      ) : (
        <Text>Không có xét nghiệm nào</Text>
      )}
    </ScrollView>
  );

  const PrescriptionTab = () => (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text>
          <Text style={styles.label}>Bác sĩ:</Text> {doctor?.firstName}{' '}
          {doctor?.lastName}
        </Text>
        <Text>{moment(item.date).format('DD/MM/YYYY HH:mm')}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>Đơn thuốc</Text>
      </View>

      <View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Họ tên: </Text>
            <Text style={styles.value}>
              {patient?.firstName} {patient?.lastName}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Giới tính: </Text>
            <Text style={styles.value}>
              {patient?.gender === 'male' ? 'Nam' : 'Nữ'}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Tuổi: </Text>
            <Text style={styles.value}>
              {moment().diff(patient?.birthdate, 'years')}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Địa chỉ: </Text>
            <Text style={styles.value}>{patient?.address}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Chiều cao (cm): </Text>
            <Text style={styles.value}>{patient?.height}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Cân nặng (kg): </Text>
            <Text style={styles.value}>{patient?.weight}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Chẩn đoán: </Text>
            <Text style={styles.value}>{convertString(diagnosis.problem)}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: theme.colors.onSurface,
          marginBottom: 10,
          marginTop: 10,
        }}
      />

      <View>
        {prescription.data.medicines.map((medicine: any, index: number) => (
          <View key={index}>
            <View style={styles.row}>
              <Text>
                <Text style={styles.label}>{index + 1}. Tên thuốc: </Text>
                {medicine.name}
              </Text>
              <Text>
                <Text style={styles.label}>Số lượng: </Text>
                {medicine.dosage}
              </Text>
            </View>
            <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
              <View style={{width: '24%', marginRight: '1%'}}>
                <Text style={styles.label}>
                  Sáng: {medicine.schedule.morning}
                </Text>
              </View>
              <View style={{width: '24%', marginRight: '1%'}}>
                <Text style={styles.label}>
                  Trưa: {medicine.schedule.afternoon}
                </Text>
              </View>
              <View style={{width: '24%', marginRight: '1%'}}>
                <Text style={styles.label}>
                  Chiều: {medicine.schedule.evening}
                </Text>
              </View>
              <View style={{width: '24%'}}>
                <Text style={styles.label}>Tối: {medicine.schedule.night}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <View style={{margin: 20}}>
          <Text>{moment(item.date).format('DD/MM/YYYY')}</Text>
          <Text style={{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>
            Chữ ký
          </Text>
          <View style={{height: 50, width: 50}} />
          <Text style={styles.label}>
            {doctor?.firstName} {doctor?.lastName}
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <PaperProvider theme={{...theme, roundness: 10}}>
      <CustomAppbar
        title="Thông tin khám bệnh"
        goBack={() => navigation.goBack()}
      />
      <Tab.Navigator>
        <Tab.Screen name="Đơn thuốc" component={PrescriptionTab} />
        {diagnosis.images && diagnosis.images.length > 0 && (
          <Tab.Screen name="Xét nghiệm" component={DiagnosisTab} />
        )}
      </Tab.Navigator>
    </PaperProvider>
  );
};

export default MedicalDetailScreen;
