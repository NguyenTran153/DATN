import {View, StyleSheet, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import {TextInput, Button, useTheme, Text, Portal} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import AutocompleteTextInput from '../../components/AutoComplete';
import CustomAppbar from '../../components/CustomAppbar';
import {useSelector} from 'react-redux';
import PrescriptionService from '../../services/PrescriptionService';

interface MyDropdownComponentProps {
  text: string;
  setText: (text: string) => void;
  medicineList: string[];
  onChangeMedicine: (value: string) => void;
  onChangeQuantity: (value: string) => void;
  onChangeMorning: (value: string) => void;
  onChangeAfternoon: (value: string) => void;
  onChangeEvening: (value: string) => void;
  onChangeNight: (value: string) => void;
}

const MyDropdownComponent: React.FC<MyDropdownComponentProps> = ({
  text,
  setText,
  medicineList,
  onChangeMedicine,
  onChangeQuantity,
  onChangeMorning,
  onChangeAfternoon,
  onChangeEvening,
  onChangeNight,
}) => {
  const theme = useTheme();
  const [medicine, setMedicine] = useState('');
  const [quantity, setQuantity] = useState('');
  const [morning, setMorning] = useState('');
  const [afternoon, setAfternoon] = useState('');
  const [evening, setEvening] = useState('');
  const [night, setNight] = useState('');

  useEffect(() => {
    onChangeMedicine(medicine);
    onChangeQuantity(quantity);
    onChangeMorning(morning);
    onChangeAfternoon(afternoon);
    onChangeEvening(evening);
    onChangeNight(night);
  }, [medicine, quantity, morning, afternoon, evening, night]);
  useEffect(() => {}, [medicine]);

  const styles = StyleSheet.create({
    textInput: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      marginHorizontal: 10,
      height: 50,
    },
    cell: {
      borderWidth: 1,
      height: 40,
      fontSize: 14,
      backgroundColor: theme.colors.background,
      width: '100%',
      borderRadius: 5,
    },
    text: {
      fontStyle: 'italic',
      fontWeight: '800',
      fontFamily: 'Cochin',
    },
  });

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{width: '60%'}}>
          <Text style={styles.text}>Tên thuốc</Text>
          <AutocompleteTextInput
            text={text}
            setText={setText}
            suggestions={medicineList}
            onSelect={selectedMedicine => setMedicine(selectedMedicine)}
          />
        </View>
        <View style={{marginLeft: '10%', width: '30%'}}>
          <Text style={styles.text}>Số lượng</Text>
          <TextInput
            style={styles.cell}
            placeholder="Số lượng"
            onChangeText={setQuantity}
            value={quantity}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View style={{width: '24%', marginRight: '1%'}}>
          <Text style={styles.text}>Sáng</Text>
          <TextInput
            placeholder="Sáng"
            style={styles.cell}
            onChangeText={setMorning}
            value={morning}
          />
        </View>
        <View style={{width: '24%', marginRight: '1%'}}>
          <Text style={styles.text}>Trưa</Text>
          <TextInput
            placeholder="Trưa"
            style={styles.cell}
            onChangeText={setAfternoon}
            value={afternoon}
          />
        </View>
        <View style={{width: '24%', marginRight: '1%'}}>
          <Text style={styles.text}>Chiều</Text>
          <TextInput
            placeholder="Chiều"
            style={styles.cell}
            onChangeText={setEvening}
            value={evening}
          />
        </View>
        <View style={{width: '24%'}}>
          <Text style={styles.text}>Tối</Text>
          <TextInput
            placeholder="Tối"
            style={styles.cell}
            onChangeText={setNight}
            value={night}
          />
        </View>
      </View>
    </View>
  );
};

const PrescriptionScreen: React.FC<any> = ({route, navigation}) => {
  var date = new Date();
  const [userInfo, setUserInfo] = useState(route.params?.patient || {});
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token.accessToken);
  const pres = route?.params?.result || 'Chưa có chẩn đoán';

  const [components, setComponents] = useState<
    {
      id: number;
      medicine: string;
      quantity: string;
      morning: string;
      afternoon: string;
      evening: string;
      night: string;
    }[]
  >([]);
  const [idCounter, setIdCounter] = useState(0);

  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const theme = useTheme();

  const [medicineList, setMedicineList] = useState([]);

  useEffect(() => {
    const fetchMedicineList = async () => {
      try {
        const response = await PrescriptionService.getDrug(token, '', 1, 10);
        const names = response?.result.items.map((item: any) => item.tenThuoc);
        setMedicineList(names);
      } catch (error) {
        console.error('Error fetching medicine list:', error);
      }
    };

    fetchMedicineList();
  }, [search]);

  const addComponent = () => {
    const newId = idCounter + 1;
    setIdCounter(newId);
    setComponents(prevComponents => [
      ...prevComponents,
      {
        id: newId,
        medicine: '',
        quantity: '',
        morning: '',
        afternoon: '',
        evening: '',
        night: '',
      },
    ]);
  };

  const updateComponent = (id: number, field: string, value: string) => {
    setComponents(prevComponents =>
      prevComponents.map(comp =>
        comp.id === id ? {...comp, [field]: value} : comp,
      ),
    );
  };

  const removeComponent = (idToRemove: number) => {
    setComponents(prevComponents =>
      prevComponents.filter(comp => comp.id !== idToRemove),
    );
  };

  const handleConfirm = async () => {
    const prescription = {
      patientName: `${userInfo?.firstName} ${userInfo?.lastName}`,
      doctorName: `${user.firstName} ${user.lastName}`,
      date: moment(date).format('YYYY-MM-DD'),
      problem: pres,
      medicines: components.map(comp => ({
        name: comp.medicine,
        dosage: comp.quantity,
        schedule: {
          morning: comp.morning,
          afternoon: comp.afternoon,
          evening: comp.evening,
          night: comp.night,
        },
      })),
    };

    try {
      console.log(route.params.patient.id);
      const createdPrescription = await PrescriptionService.postPrescription(
        token,
        prescription,
        [],
        route.params.patient.id,
      );

      const createdDiagnosis = await PrescriptionService.postDiagnosis(
        createdPrescription.id.toString(),
        pres,
        token,
        route.params?.examination || null,
      );
      console.log(
        'Đơn xét nghiệm đã được tạo:',
        JSON.stringify(createdDiagnosis, null, 2),
      );

      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.log('Error posting prescription:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 5,
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
    },
    value: {
      marginBottom: 10,
      fontSize: 15,
    },
  });

  return (
    <>
      <CustomAppbar title={'Kê đơn thuốc'} goBack={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
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

        <SafeAreaView style={{alignSelf: 'center', zIndex: 999}}>
          {components.map(
            ({id, medicine, quantity, morning, afternoon, evening, night}) => (
              <MyDropdownComponent
                text={search}
                setText={setSearch}
                key={id}
                medicineList={medicineList}
                onChangeMedicine={value =>
                  updateComponent(id, 'medicine', value)
                }
                onChangeQuantity={value =>
                  updateComponent(id, 'quantity', value)
                }
                onChangeMorning={value => updateComponent(id, 'morning', value)}
                onChangeAfternoon={value =>
                  updateComponent(id, 'afternoon', value)
                }
                onChangeEvening={value => updateComponent(id, 'evening', value)}
                onChangeNight={value => updateComponent(id, 'night', value)}
              />
            ),
          )}
        </SafeAreaView>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Button
            mode="contained"
            style={{marginRight: 10, width: '25%', zIndex: 5}}
            onPress={() =>
              removeComponent(components[components.length - 1]?.id)
            }>
            Xoá
          </Button>
          <Button
            style={{width: '25%', zIndex: 5}}
            mode="contained"
            onPress={addComponent}>
            Thêm
          </Button>
        </View>
        <TextInput
          label="Ghi chú"
          onChangeText={text => setNote(text)}
          value={note}
          style={{alignSelf: 'center', width: '100%'}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={{margin: 20}}>
            <Text>{moment(date).format('DD/MM/YYYY')}</Text>
            <Text
              style={{alignSelf: 'center', fontSize: 15, fontWeight: 'bold'}}>
              Chữ ký
            </Text>
            <View style={{height: 50, width: 50}}></View>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-end',
          }}></View>
      </ScrollView>
      <Button
        mode="contained"
        style={{width: '75%', alignSelf: 'center', marginBottom: 16}}
        onPress={handleConfirm}>
        Xác nhận
      </Button>
    </>
  );
};

export default PrescriptionScreen;
