import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

const ExamineScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const [prescription, setPrescription] = useState('');
    const [examination, setExamination] = useState('');
    const [result, setResult] = useState('');
    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <ScrollView style={{ flex: 1, marginTop: 30 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Khám bệnh</Text>
                </View>
                <View>
                    <Text style={{ marginLeft: "2.5%", fontWeight: 'bold' }}>Chẩn đoán:</Text>
                    <TextInput
                        label="Chẩn đoán"
                        onChangeText={text => setPrescription(text)}
                        value={prescription}
                        style={{
                            height: 100,
                            width: '95%',
                            alignSelf: 'center',
                            borderRadius: 5,
                            marginBottom: 10
                        }}
                    />
                </View>
                <View>
                    <Text style={{ marginLeft: "2.5%", fontWeight: 'bold' }}>Xét nghiệm:</Text>
                    <TextInput
                        label="Xét nghiệm"
                        onChangeText={text => setExamination(text)}
                        value={examination}
                        style={{
                            height: 100,
                            width: '95%',
                            alignSelf: 'center',
                            borderRadius: 5,
                            marginBottom: 10
                        }}
                    />
                </View>
                <View>
                    <Text style={{ marginLeft: "2.5%", fontWeight: 'bold' }}>Kết quả:</Text>
                    <TextInput
                        label="Kết quả"
                        onChangeText={text => setResult(text)}
                        value={result}
                        style={{
                            height: 100,
                            width: '95%',
                            alignSelf: 'center',
                            borderRadius: 5,
                            marginBottom: 10
                        }}
                    />
                </View>
                <View
                    style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                   
                    <Button style={{ width: '95%' }} mode='contained' onPress={()=>{
                        //  navigation.navigate('PrescriptionScreen', {
                        //     prescription: prescription,
                        //   })
                        }}>
                        Xác nhận
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ExamineScreen;

const styles = StyleSheet.create({
    pressContainer: {
        width: '40%',
        height: 150,
        borderWidth: 1,
        borderRadius: 8,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%',
        alignContent: 'center',
        paddingTop: 20,
        gap: 8,
    },
    rowView: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    textButton: {
        fontWeight: '600',
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        textAlign: 'center',
    },
});
