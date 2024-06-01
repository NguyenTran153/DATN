import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Appbar, Divider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import DiaryService from '../../services/DiaryService';
import {useSelector} from 'react-redux';

const PatientDiaryScreen = ({route}: any) => {
  // const belongTo = '1';
  // if(route.params.id){
  //   // Kiểm tra có nhận id bên params không, nếu có thì đây là tài khoản bác sĩ, id được truyền là của bệnh nhân, nếu không thì đây là tài khoản bênh nhân, lấy id từ redux
  //   let id = route.params.id; 
  //   let belongTo =
  // }  
  const userData = useSelector((state: any) => state.user);
  const patientId = route.params.patientId ? route.params.patientId : userData.id;
  const token = useSelector((state: any) => state.token);
  
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState<Entry>({
    time: new Date().toLocaleString(),
    food: '',
    bloodPressure: '',
    bloodSugar: '',
    exercise: '',
    note: '',
  });

  const handleInputChange = (name: keyof Entry, value: string) => {
    setForm({...form, [name]: value});
  };
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      setEntries([]);
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const addEntry = async () => {
    const newEntries = [...entries, form];
    setEntries(newEntries);
    const data = {
      food: form.food,
      bloodPressure: form.bloodPressure,
      bloodSugar: form.bloodSugar,
      exercise: form.exercise,
      note: form.note,
    };

    try {
      // await AsyncStorage.setItem('patientActivities', JSON.stringify(newEntries));
      await DiaryService.postDiary(token.accessToken, patientId, data);
    } catch (error) {
      console.error('Error saving data', error);
    }

    setForm({
      time: new Date().toLocaleString(),
      food: '',
      bloodPressure: '',
      bloodSugar: '',
      exercise: '',
      note: '',
    });
  };

  const loadEntries = async () => {
    try {
      const savedData = await AsyncStorage.getItem('patientActivities');
      if (savedData) {
        setEntries(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: 5,
          }}>
          Nhật ký bệnh nhân
        </Text>
        <TextInput
          label="Thức ăn"
          value={form.food}
          onChangeText={text => handleInputChange('food', text)}
          style={styles.input}
        />
        <TextInput
          label="Huyết áp"
          value={form.bloodPressure}
          onChangeText={text => handleInputChange('bloodPressure', text)}
          style={styles.input}
        />

        <TextInput
          label="Đường huyết"
          value={form.bloodSugar}
          onChangeText={text => handleInputChange('bloodSugar', text)}
          style={styles.input}
        />
        <TextInput
          label="Thể dục"
          value={form.exercise}
          onChangeText={text => handleInputChange('exercise', text)}
          style={styles.input}
        />
        <TextInput
          label="Ghi chú"
          value={form.note}
          onChangeText={text => handleInputChange('note', text)}
          style={styles.input}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            mode="contained"
            onPress={clearAsyncStorage}
            style={styles.button}>
            Xóa dữ liệu
          </Button>
          <Button mode="contained" onPress={addEntry} style={styles.button}>
            Thêm nhật ký
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  button: {
    marginTop: 10,
  },
  listContainer: {
    padding: 16,
  },
  entryContainer: {
    marginBottom: 20,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  fieldLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  fieldValue: {
    flex: 2,
  },
});

export default PatientDiaryScreen;
