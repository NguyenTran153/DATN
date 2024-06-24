import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  TextInput,
  Button,
  useTheme,
  Text,
  Icon,
} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

import {specialties} from '../../utils/constant';
import DropDown from '../../components/DropDown';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import UserService from '../../services/UserService';
import CustomAppbar from '../../components/CustomAppbar';
interface FormData {
  image1: string | null;
  image2: string | null;
  files: any[];
  textarea: string;
  specialitites: any[];
}

const BecomeDoctorScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFront, setIsFront] = useState(false);

  const token = useSelector((state: any) => state.token.accessToken);

  const initialFormState: FormData = {
    image1: null,
    image2: null,
    files: [],
    textarea: '',
    specialitites: [],
  };
  const [form, setForm] = useState<FormData | null>(initialFormState);

  const handleFilesChange = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setForm(prevForm => ({
        ...(prevForm ?? initialFormState),
        files: [...(prevForm?.files ?? []), ...results],
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Unknown error: ', err);
      }
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
  async function base64toBlob(
    base64Data: string,
    contentType: string = '',
  ): Promise<Blob> {
    // Define a file path to save the temporary file
    const path = `${RNFetchBlob.fs.dirs.CacheDir}/temp_blob`;

    // Write the base64 data to a temporary file
    await RNFetchBlob.fs.writeFile(path, base64Data, 'base64');

    // Read the file and convert it to a Blob
    const blobData = await RNFetchBlob.wrap(path);

    // Create a new Blob with the required options
    const blobOptions: BlobOptions = {
      type: contentType,
      lastModified: Date.now(),
    };
    return new Blob([blobData], blobOptions);
  }

  const handleRegisterDoctor = async () => {
    if (!form || !form.image1 || !form.image2) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Thiếu thông tin',
        textBody: 'Vui lòng điền đầy đủ thông tin.',
        button: 'Đóng',
      });
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();

      const idCardFrontBlob = await base64toBlob(form.image1, 'image/jpeg');
      const idCardBackBlob = await base64toBlob(form.image2, 'image/jpeg');

      formData.append('idCardFront', idCardFrontBlob);
      formData.append('idCardBack', idCardBackBlob);

      form.files.forEach(file => {
        formData.append('files', file);
      });

      formData.append('specialties', JSON.stringify(form.specialitites));
      formData.append('metadata', JSON.stringify({textarea: form.textarea}));
      const response = await UserService.registerDoctor(token, formData);
      navigation.goBack();
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Đăng ký thành bác sĩ thành công',
        textBody:
          'Bạn đã gửi thành công, xin hãy chờ xác nhận từ phía hệ thống',
        button: 'Đóng',
      });
      return response;
    } catch (error) {
      console.log(error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Đăng ký thành bác sĩ thất bại',
        button: 'Đóng',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFront === true) {
      console.log('Capture Front');
      setForm(prevForm => ({
        ...(prevForm ?? initialFormState),
        image1: route?.params?.base64,
      }));
      setIsFront(false);
    } else if (isFront === false) {
      setForm(prevForm => ({
        ...(prevForm ?? initialFormState),
        image2: route?.params?.base64,
      }));
    }
  }, [route]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{backgroundColor: theme.colors.background, flex: 1}}>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9,
            elevation: 9,
          }}>
          <ActivityIndicator size={64} />
        </View>
      )}
      <CustomAppbar
        title="Đăng ký trở thành bác sĩ"
        goBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{gap: 10}}>
          <Text variant="titleMedium">
            Hình ảnh CMND/CCCD mặt trước và mặt sau
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => {
                setIsFront(true);
                navigation.navigate('CameraScreen', isFront);
              }}
              style={[
                styles.photoContainer,
                {backgroundColor: theme.colors.primaryContainer},
              ]}>
              {form?.image1 ? (
                <Image
                  source={{uri: `data:image/jpeg;base64,${form.image1}`}}
                  resizeMode="cover"
                  style={styles.photoContainer}
                />
              ) : (
                <Icon source="camera" size={36} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsFront(false);
                navigation.navigate('CameraScreen', isFront);
              }}
              style={[
                styles.photoContainer,
                {backgroundColor: theme.colors.primaryContainer},
              ]}>
              {form?.image2 ? (
                <Image
                  source={{uri: `data:image/jpeg;base64,${form.image2}`}}
                  resizeMode="cover"
                  style={styles.photoContainer}
                />
              ) : (
                <Icon source="camera" size={36} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{gap: 10}}>
          <Text variant="titleMedium">Các giấy chứng nhận liên quan</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            {form?.files.map((file, index) => (
              <View key={index} style={styles.fileContainer}>
                <Text>{file.name}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.fileContainer}
              onPress={handleFilesChange}>
              <Icon source="plus" size={36} />
            </TouchableOpacity>
          </View>
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
        onPress={async () => await handleRegisterDoctor()}
        style={styles.button}
        disabled={isLoading}>
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
