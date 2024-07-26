import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomAppbar from '../../components/CustomAppbar';
import {Button, useTheme} from 'react-native-paper';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import PrescriptionService from '../../services/PrescriptionService';

const Prescription = ({route, navigation}: any) => {
  const userInfo = route.params.patientInfo;
  const prescription = route.params.prescription;
  const doctorInfo = route.params.doctorInfo;
  const examination = route.params.examination;
  const theme = useTheme();
  const token = useSelector((state: any) => state.token.accessToken);
  useEffect(() => {
    console.log(userInfo.birthdate);
  });

  const pres = route.params.pres;
  var date = new Date();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.onPrimary,
      padding: 5,
    },
    text: {
      color: theme.colors.onSurface,
    },
    prescriptionInput: {
      height: 100,
      width: '100%',
      alignSelf: 'center',
      borderRadius: 5,
      marginBottom: 10,
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
      color: theme.colors.onSurface,
    },
    value: {
      marginBottom: 10,
      fontSize: 15,
      color: theme.colors.onSurface,
    },
  });
  const handleConfirm = async () => {
    console.log(prescription);
    try {
      const createdPrescription = await PrescriptionService.postPrescription(
        token,
        prescription,
        [],
        userInfo.id,
      );
      const createdDiagnosis = await PrescriptionService.postDiagnosis(
        createdPrescription.id.toString(),
        pres,
        token,
        examination,
      );
      console.log(
        'Đơn xét nghiệm đã được tạo:',
        JSON.stringify(createdDiagnosis, null, 2),
      );

      navigation.goBack();
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.log('Error posting prescription:', error);
    }
  };
  return (
    <>
      <CustomAppbar
        title={'Xác nhận đơn thuốc'}
        goBack={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              marginHorizontal: 10,
            }}>
            <Text style={styles.text}>
              <Text style={styles.label}>Bác sĩ:</Text>{' '}
              {prescription.doctorName}
            </Text>
            <Text style={styles.text}>
              {moment(date).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: theme.colors.onSurface,
            }}>
            Đơn thuốc
          </Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Họ tên: </Text>
              <Text style={styles.value}>
                {userInfo?.firstName} {userInfo?.lastName}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Giới tính: </Text>
              <Text style={styles.value}>
                {userInfo?.gender === 'male' ? 'Nam' : 'Nữ'}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Tuổi: </Text>
              <Text style={styles.value}>
                {moment().diff(userInfo?.birthdate, 'years')}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Địa chỉ: </Text>
              <Text style={styles.value}>{userInfo?.address}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Chiều cao (cm): </Text>
              <Text style={styles.value}>{userInfo?.height}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Cân nặng (kg): </Text>
              <Text style={styles.value}>{userInfo?.weight}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Chẩn đoán: </Text>
              <Text style={styles.value}>{pres}</Text>
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
        <SafeAreaView>
          {prescription.medicines.map((item: any, index: number) => (
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  <Text style={styles.label}>{index + 1}. Tên thuốc: </Text>
                  {item.name}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Số lượng: </Text>
                  {item.dosage}
                </Text>
              </View>
              <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                <View style={{width: '24%', marginRight: '1%'}}>
                  <Text style={styles.label}>
                    Sáng: {item.schedule.morning}
                  </Text>
                </View>
                <View style={{width: '24%', marginRight: '1%'}}>
                  <Text style={styles.label}>
                    Trưa: {item.schedule.afternoon}
                  </Text>
                </View>
                <View style={{width: '24%', marginRight: '1%'}}>
                  <Text style={styles.label}>
                    Chiều: {item.schedule.evening}
                  </Text>
                </View>
                <View style={{width: '24%'}}>
                  <Text style={styles.label}>Tối: {item.schedule.night}</Text>
                </View>
              </View>
            </View>
          ))}
        </SafeAreaView>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={{margin: 20}}>
            <Text style={styles.text}>{moment(date).format('DD/MM/YYYY')}</Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                color: theme.colors.onSurface,
              }}>
              Chữ ký
            </Text>
            <View style={{height: 50, width: 50}}></View>
            <Text style={styles.label}>{prescription.doctorName}</Text>
          </View>
        </View>
        <Button
          mode="contained"
          style={{width: '75%', alignSelf: 'center', marginBottom: 16}}
          onPress={() => handleConfirm()}>
          Xác nhận
        </Button>
      </ScrollView>
    </>
  );
};
export default Prescription;
