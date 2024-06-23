import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  TextInput,
  Button,
  useTheme,
  Appbar,
  Divider,
  Avatar,
  RadioButton,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../../redux/slices/userSlice';
import ImagePicker from 'react-native-image-crop-picker';
import UserService from '../../services/UserService'; // Import your service
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Dialog, ALERT_TYPE} from 'react-native-alert-notification'; // Import Alert from your library

const UpdatePersonalInfoScreen = ({navigation}: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token.accessToken);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    birthdate: new Date(), // Set default value for birthdate
    gender: '',
    address: '',
    height: '',
    weight: '',
    avatar: '',
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        birthdate: user.birthdate ? new Date(user.birthdate) : new Date(),
        gender: user.gender || '',
        address: user.address || '',
        height: user.height ? user.height.toString() : '',
        weight: user.weight ? user.weight.toString() : '',
        avatar: user.avatar || null,
      });
    }
  }, [user]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    setPersonalInfo({
      ...personalInfo,
      birthdate: date,
    });
    hideDatePicker();
  };

  const handleInputChange = (field: any, value: any) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (personalInfo.avatar) {
        const avatarResponse = await UserService.uploadAvatar(
          personalInfo.avatar,
          token,
        );
        // Handle avatar response if needed
      }

      const updatedInfo = {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        birthdate: personalInfo.birthdate.toISOString(),
        gender: personalInfo.gender,
        address: personalInfo.address,
        height: personalInfo.height,
        weight: personalInfo.weight,
      };

      const updatedUser = await UserService.updateUserInfo(updatedInfo, token);
      dispatch(setUser(updatedUser));

      Dialog.show({
        title: 'Thông báo',
        type: ALERT_TYPE.SUCCESS,
        textBody: 'Thông tin cá nhân đã được cập nhật thành công!',
        button: 'Đóng',
      });
      navigation.goBack();
      console.log('Information updated:', updatedUser);
    } catch (error) {
      Dialog.show({
        title: 'Lỗi',
        type: ALERT_TYPE.DANGER,
        textBody: 'Thông tin cá nhân không được cập nhật thành công! Kiểm tra lại thông tin có hợp lệ hay không',
        button: 'Đóng',
      });
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  const handlePickAvatar = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then(image => {
        setPersonalInfo({
          ...personalInfo,
          avatar: image.path,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Cập nhật thông tin cá nhân" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handlePickAvatar}>
            <Avatar.Image
              size={100}
              source={
                personalInfo.avatar
                  ? {uri: personalInfo.avatar}
                  : require('../../asset/7677205.jpg')
              }
            />
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={styles.formGroup}>
          <TextInput
            label="Họ"
            value={personalInfo.firstName}
            onChangeText={text => handleInputChange('firstName', text)}
            style={styles.input}
            mode="outlined"
          />
        </View>
        <Divider />
        <View style={styles.formGroup}>
          <TextInput
            label="Tên"
            value={personalInfo.lastName}
            onChangeText={text => handleInputChange('lastName', text)}
            style={styles.input}
            mode="outlined"
          />
        </View>
        <Divider />
        <View style={styles.formGroup}>
          <Text>Giới tính</Text>
          <RadioButton.Group
            onValueChange={value => handleInputChange('gender', value)}
            value={personalInfo.gender}>
            <View style={styles.radioContainer}>
              <RadioButton value="male" />
              <Text>Nam</Text>
            </View>
            <View style={styles.radioContainer}>
              <RadioButton value="female" />
              <Text>Nữ</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Divider />
        <View style={styles.formGroup}>
          <TextInput
            label="Ngày sinh"
            value={personalInfo.birthdate.toLocaleDateString()}
            editable={false} // Disable editing directly in TextInput
            right={<TextInput.Icon icon="calendar" onPress={showDatePicker} />}
            style={styles.input}
            mode="outlined"
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={personalInfo.birthdate}
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </View>
        <Divider />
        <View style={styles.formGroup}>
          <TextInput
            label="Cân nặng (kg)"
            value={personalInfo.weight}
            onChangeText={text => handleInputChange('weight', text)}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />
        </View>
        <Divider />
        <View style={styles.formGroup}>
          <TextInput
            label="Chiều cao (cm)"
            value={personalInfo.height}
            onChangeText={text => handleInputChange('height', text)}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />
        </View>
        <Divider />
        <View style={styles.formGroup}>
          <TextInput
            label="Địa chỉ"
            value={personalInfo.address}
            onChangeText={text => handleInputChange('address', text)}
            style={styles.input}
            mode="outlined"
          />
        </View>
        <Divider />
      </ScrollView>
      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={{fontSize: 16}}>
        {isLoading ? <ActivityIndicator color="white" /> : 'Xác nhận'}
      </Button>
    </View>
  );
};

export default UpdatePersonalInfoScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderRadius: 8,
  },
  button: {
    margin: 30,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
