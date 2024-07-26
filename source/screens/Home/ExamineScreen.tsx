import {StyleSheet, SafeAreaView, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, TextInput, useTheme, IconButton} from 'react-native-paper';
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
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      setExamination(prevExamination => [...prevExamination, ...results]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        // Unknown error
        console.error(err);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setExamination(prevExamination => 
      prevExamination.filter((_, i) => i !== index)
    );
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
            <View style={styles.imagesContainer}>
              {examination.map((file, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image
                    source={{uri: file.uri}}
                    style={styles.image}
                  />
                  <IconButton
                    icon="close"
                    size={20}
                    onPress={() => handleDeleteImage(index)}
                    style={styles.deleteButton}
                  />
                </View>
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
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    margin: 4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});