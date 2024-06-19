import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const ExamineScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const [examination, setExamination] = useState<DocumentPickerResponse[]>([]);
  const [result, setResult] = useState('');

  const handleConfirm = () => {
    const formData = {examination, result};
    const params = {...route.params, ...formData};
    console.log(JSON.stringify(params));
    navigation.navigate('DoctorNavigator', {
      screen: 'PrescriptionScreen',
      params: params,
    });
  };

  const handlePickFiles = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      setExamination(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        // Unknown error
        console.error(err);
      }
    }
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
          <Button
            mode="outlined"
            onPress={handlePickFiles}
            style={styles.input}
            theme={{roundness: 8}}>
            Chọn tệp xét nghiệm
          </Button>
          {examination.length > 0 && (
            <View style={styles.filesContainer}>
              {examination.map((file, index) => (
                <Text key={index} style={styles.fileName}>
                  {file.name}
                </Text>
              ))}
            </View>
          )}
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
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  filesContainer: {
    marginBottom: 16,
  },
  fileName: {
    fontSize: 16,
  },
});
