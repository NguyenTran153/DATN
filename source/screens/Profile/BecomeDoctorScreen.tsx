import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button, useTheme, Text, Icon} from 'react-native-paper';

import CustomAppbar from '../../components/CustomAppbar';
import {specialties} from '../../utils/constant';
import DropDown from '../../components/DropDown';

interface FormData {
  image1: File | null;
  image2: File | null;
  files: File[];
  textarea: string;
  specialitites: any[];
}

const BecomeDoctorScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);

  const initialFormState: FormData = {
    image1: null,
    image2: null,
    files: [],
    textarea: '',
    specialitites: [],
  };
  const [form, setForm] = useState<FormData | null>(initialFormState);

  const handleImage1Change = (image: File) => {
    setForm(prevForm => ({
      ...(prevForm ?? initialFormState),
      image1: image,
    }));
  };

  const handleImageChange = (event: any, imageKey: 'image1' | 'image2') => {
    if (event.target.files && event.target.files[0]) {
      setForm(prevForm => {
        const updatedForm = prevForm ? {...prevForm} : initialFormState;
        return {
          ...updatedForm,
          [imageKey]: event.target.files[0],
        };
      });
    }
  };

  const handleFilesChange = (event: any) => {
    if (event.target.files) {
      setForm(prevForm => {
        const updatedForm = prevForm ? {...prevForm} : initialFormState;
        return {
          ...updatedForm,
          files: Array.from(event.target.files),
        };
      });
    }
  };

  const handleTextareaChange = (text: string) => {
    setForm(prevForm => ({
      ...(prevForm ?? initialFormState),
      textarea: text,
    }));
  };

  const handleSpecialitiesChange = (specialities: any[]) => {
    setForm(prevForm => ({
      ...(prevForm ?? initialFormState),
      specialitites: specialities,
    }));
  };

  useEffect(() => {
    console.log(JSON.stringify(form));
  }, [form]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{backgroundColor: theme.colors.background, flex: 1}}>
      <CustomAppbar
        title="Đăng ký tài khoản Bác sĩ"
        goBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{gap: 10}}>
          <Text variant="titleMedium">
            Hình ảnh CMND/CCCD mặt trước và mặt sau
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={[
                styles.photoContainer,
                {backgroundColor: theme.colors.primaryContainer},
              ]}>
              <Icon source="camera" size={36} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.photoContainer,
                {backgroundColor: theme.colors.primaryContainer},
              ]}>
              <Icon source="camera" size={36} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{gap: 10}}>
          <Text variant="titleMedium">Các giấy chứng nhận liên quan</Text>
          <TouchableOpacity style={styles.fileContainer}>
            <Icon source="plus" size={36} />
          </TouchableOpacity>
        </View>

        <View style={{gap: 10}}>
          <Text variant="titleMedium">Mô tả về bản thân</Text>
          <TextInput
            style={styles.textArea}
            multiline
            mode="outlined"
            value={form?.textarea}
            onChangeText={handleTextareaChange}
          />
        </View>

        <View style={{gap: 10}}>
          <Text variant="titleMedium">Chọn chuyên ngành</Text>
          <DropDown
            mode={'outlined'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={form?.specialitites}
            setValue={handleSpecialitiesChange}
            list={specialties}
          />
        </View>
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.button}>
        <Text variant="titleMedium" style={{color: theme.colors.background}}>
          Xác nhận
        </Text>
      </Button>
    </KeyboardAvoidingView>
  );
};

export default BecomeDoctorScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 50,
  },
  photoContainer: {
    borderRadius: 10,
    height: 115,
    width: 170,
    overflow: 'hidden',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
  },
  fileContainer: {
    height: 72,
    width: 72,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textArea: {
    height: 100,
    borderRadius: 10,
  },
});
