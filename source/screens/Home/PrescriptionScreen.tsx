import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import DropDown from '../../components/DropDown';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  List,
  TextInput,
  Button,
  useTheme,
  Icon,
  Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatRoutes } from '../../Routes/Route';
import moment from 'moment';
import AutocompleteTextInput from '../../components/AutoComplete';
// import CustomAppbar from '../../components/CustomAppbar';
import UserService from '../../services/UserService';
import { useSelector } from 'react-redux';

const MyDropdownComponent = () => {
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const [medicine, setMedicine] = useState('');
  const [Dosage, setDosage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [afternoon, setAfternoon] = useState('');
  const [evening, setEvening] = useState('');
  const [night, setNight] = useState('');
  const medicineList = [
    'Paracetamol',
    'Aspirin',
    'Prospan',
    'Paracetamol',
    'Aspirin',
    'Prospan',
    'Paracetamol',
    'Aspirin',
    'Prospan',
  ];
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
          justifyContent: 'center'
        }}>
        <View style={{ width: "60%" }}>
          <Text style={styles.text}>Tên thuốc</Text>
          <AutocompleteTextInput suggestions={medicineList} />
        </View>
        <View style={{ marginLeft: "10%", width: "30%" }}>
          <Text style={styles.text}>Số lượng</Text>
          <TextInput
            style={styles.cell}
            placeholder="Số lượng"
            onChangeText={text => setQuantity(text)}
            value={quantity}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
        <View style={{ width: "100%" }}>
          <Text style={styles.text}>Liều lượng</Text>
          <TextInput
            placeholder="Nhập liều lượng"
            style={styles.cell}
            onChangeText={text => setDosage(text)}
            value={Dosage}
          />
        </View>
      </View>
    </View>
  );
};

const PrescriptionScreen = ({ route, navigation }: any) => {
  var date = new Date();
  const [userInfo, setUserInfo] = useState<UserData>();
  const token = useSelector((state: any) => state.token);
  const patientId = route?.params?.patientId;
  const pres = route?.params?.prescription ? route?.params?.prescription : 'Chưa có chẩn đoán';
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // setUserInfo(await UserService.getUserInfoByID(patientId,token.accessToken));
    // console.log(userInfo )
  };

  const [components, setComponents] = useState<
    { id: number; component: React.ReactNode }[]
  >([]);
  const [idCounter, setIdCounter] = useState(0);
  
  const [note, setNote] = useState('');
  const theme = useTheme();
  const addComponent = () => {
    const newId = idCounter + 1;
    setIdCounter(newId);
    setComponents(prevComponents => [
      ...prevComponents,
      { id: newId, component: <MyDropdownComponent key={newId} /> },
    ]);
    console.log(patientId);
  };

  const removeComponent = (idToRemove: number) => {
    setComponents(prevComponents =>
      prevComponents.filter(comp => comp.id !== idToRemove),
    );
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
      marginBottom: 10
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
      {/* <CustomAppbar title={'Kê đơn thuốc'} goBack={() => navigation.goBack()} /> */}
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Đơn thuốc</Text>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Họ tên: </Text>
              <Text style={styles.value}>{userInfo?.firstName} {userInfo?.lastName}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Giới tính: </Text>
              <Text style={styles.value}>{/*userInfo.Gender*/}Nam</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Tuổi: </Text>
              <Text style={styles.value}>{/*userInfo.Age*/} 48</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Địa chỉ: </Text>
              <Text style={styles.value}>{/*userInfo.Address*/} 123, Nguyễn Văn Đậu, P.15, Quận Bình Thạnh</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Chiều cao (cm): </Text>
              <Text style={styles.value}>{/*userInfo.Height*/} 175</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Cân nặng (kg): </Text>
              <Text style={styles.value}>{/*userInfo.Weight*/} 60</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Chẩn đoán: </Text>
              <Text style={styles.value}>{pres}</Text>
            </View>
          </View>
        </View>
        <SafeAreaView style={{ alignSelf: 'center' }}>
          {components.map(({ id, component }) => (
            <View key={id} style={{ flexDirection: 'row' }}>
              {component}
            </View>
          ))}
        </SafeAreaView>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
          }}>
          <Button
            mode='contained'
            style={{ marginRight: 10, width: '25%' }}
            onPress={() =>
              removeComponent(components[components.length - 1]?.id)
            }>
            Xoá
          </Button>
          <Button style={{ width: '25%' }} mode='contained' onPress={addComponent}>
            Thêm
          </Button>
        </View>
        <TextInput
          label="Ghi chú"
          onChangeText={text => setNote(text)}
          value={note}
          style={{ alignSelf: 'center', width: "100%" }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ margin: 20 }}>
            <Text>{moment(date).format('DD/MM/YYYY')}</Text>
            <Text
              style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold' }}>
              Chữ ký
            </Text>
            <View style={{ height: 50, width: 50 }}></View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PrescriptionScreen;
