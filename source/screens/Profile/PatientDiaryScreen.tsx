import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Appbar, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const PatientDiaryScreen = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [form, setForm] = useState<Entry>({
        breakfast: '',
        lunch: '',
        dinner: '',
        bedtime: '',
        bloodPressure: '',
        bloodSugar: '',
        exercise: '',
    });

    const handleInputChange = (name: keyof Entry, value: string) => {
        setForm({ ...form, [name]: value });
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

       
        try {
            await AsyncStorage.setItem('patientActivities', JSON.stringify(newEntries));
        } catch (error) {
            console.error('Error saving data', error);
        }

        setForm({
            breakfast: '',
            lunch: '',
            dinner: '',
            bedtime: '',
            bloodPressure: '',
            bloodSugar: '',
            exercise: '',
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
                <TextInput
                    label="Bữa sáng"
                    value={form.breakfast}
                    onChangeText={(text) => handleInputChange('breakfast', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Bữa trưa"
                    value={form.lunch}
                    onChangeText={(text) => handleInputChange('lunch', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Bữa chiều"
                    value={form.dinner}
                    onChangeText={(text) => handleInputChange('dinner', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Bữa tối"
                    value={form.bedtime}
                    onChangeText={(text) => handleInputChange('bedtime', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Huyết áp"
                    value={form.bloodPressure}
                    onChangeText={(text) => handleInputChange('bloodPressure', text)}
                    style={styles.input}
                />
                
                <TextInput
                    label="Đường huyết"
                    value={form.bloodSugar}
                    onChangeText={(text) => handleInputChange('bloodSugar', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Thể dục"
                    value={form.exercise}
                    onChangeText={(text) => handleInputChange('exercise', text)}
                    style={styles.input}
                />
                <View style ={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Button mode="contained" onPress={clearAsyncStorage} style={styles.button}>
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
        borderWidth:1,
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
