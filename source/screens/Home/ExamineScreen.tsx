import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, TextInput, useTheme, Appbar} from 'react-native-paper';

const ExamineScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const [prescription, setPrescription] = useState('');
  const [examination, setExamination] = useState('');
  const [result, setResult] = useState('');

  const handleConfirm = () => {
    const formData = {prescription, examination, result};
    navigation.navigate('DoctorNavigator', {
      screen: 'PrescriptionScreen',
      params: {formData},
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header style={{backgroundColor: theme.colors.primary}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Xét nghiệm" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View
          style={[
            styles.contentContainer,
            {backgroundColor: theme.colors.background},
          ]}>
          <Text style={[styles.title, {color: theme.colors.primary}]}>
            Khám bệnh
          </Text>
          <TextInput
            label="Chẩn đoán"
            mode="outlined"
            onChangeText={setPrescription}
            value={prescription}
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
