import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TextInput, Button, Text, useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DiaryService from '../../services/DiaryService';
import {useSelector} from 'react-redux';
import CustomAppbar from '../../components/CustomAppbar';

const PatientDiaryScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const user = useSelector((state: any) => state.user);
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
      await DiaryService.postDiary(token.accessToken, data, []);
      navigation.goBack();
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
    <View style={styles.container}>
      <CustomAppbar title="Viết nhật ký" goBack={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Nhật ký bệnh nhân</Text>
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
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={clearAsyncStorage}
              style={[styles.button, {backgroundColor: theme.colors.error}]}>
              Xóa dữ liệu
            </Button>
            <Button
              mode="contained"
              onPress={addEntry}
              style={[styles.button, {backgroundColor: theme.colors.primary}]}>
              Thêm nhật ký
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default PatientDiaryScreen;
