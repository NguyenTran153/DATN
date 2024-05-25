import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Appbar, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EntryItem from '../../components/EntryItem';
import DiaryService from '../../services/DiaryService';
import { useSelector } from 'react-redux';
const PatientDiaryScreen = () => {
    const token = useSelector((state: any) => state.token);
    const [entries, setEntries] = useState([]);
    const styles = StyleSheet.create({
        container: {
            flex: 1,

        },
        listContainer: {
            padding: 16,
            alignItems: 'center'
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
            width: '100%'
        },
        fieldLabel: {
            flex: 1,
            fontWeight: 'bold',
        },
        fieldValue: {
            flex: 2,
        },
    });
    const loadEntries = async () => {
        try {
            // const savedData = await AsyncStorage.getItem('patientActivities');
            const savedData = await DiaryService.getDiary(token.accessToken)
            
           
            if (savedData) {
                 setEntries(savedData);
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
            <View style={styles.listContainer}>
                {entries.length !== 0 ? entries.map((entry: any) => (
                    <EntryItem  entry={entry} />)) : (<Text style={{ alignSelf: 'center' }}>Chưa có nhật ký</Text>)}
            </View>
        </ScrollView>
    );
};



export default PatientDiaryScreen;
