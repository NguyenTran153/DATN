import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, useTheme, Appbar} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';

const ExamineScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const [diagnotic, setDiagnotic] = useState('');
  const [examination, setExamination] = useState('');
  const [result, setResult] = useState('');

  const handleConfirm = () => {
    const formData = {diagnotic, examination, result};
    const params = {...route.params, ...formData};
    navigation.navigate('DoctorNavigator', {
      screen: 'PrescriptionScreen',
      params: params,
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CustomAppbar title="Xét nghiệm" goBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View
          style={[
            styles.contentContainer,
            {backgroundColor: theme.colors.background},
          ]}>
          <TextInput
            label="Chẩn đoán"
            mode="outlined"
            onChangeText={setDiagnotic}
            value={diagnotic}
            style={styles.input}
            multiline
            numberOfLines={4}
            theme={{roundness: 8}}
          />
          <TextInput
            label="Xét nghiệm"
            mode="outlined"
            onChangeText={setExamination}
            value={examination}
            style={styles.input}
            multiline
            numberOfLines={4}
            theme={{roundness: 8}}
          />
          <TextInput
            label="Kết quả"
            mode="outlined"
            onChangeText={setResult}
            value={result}
            style={styles.input}
            multiline
            numberOfLines={4}
            theme={{roundness: 8}}
          />
          <Button
            mode="contained"
            onPress={handleConfirm}
            style={styles.button}
            contentStyle={styles.buttonContent}
            theme={{roundness: 8}}>
            Xác nhận
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  contentContainer: {
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
