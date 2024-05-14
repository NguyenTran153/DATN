import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  TextInput,
  Button,
  HelperText,
  useTheme,
  Text,
  Chip,
  Icon,
} from 'react-native-paper';

import CustomAppbar from '../../components/CustomAppbar';
import {specialties} from '../../utils/constant';

const BecomeDoctorScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [fullName, setFullName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Xử lý lỗi các trường nhập liệu
  const [errorFullName, setErrorFullName] = useState(false);
  const [errorSpecialization, setErrorSpecialization] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);

  // Hàm xử lý khi submit form
  const handleSubmit = () => {
    // Kiểm tra tính hợp lệ của các trường
    // ... (Thêm logic kiểm tra ở đây)
    // Nếu hợp lệ, gửi dữ liệu lên server
    // ...
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{backgroundColor: theme.colors.background, flex: 1}}>
      <CustomAppbar
        title="Đăng ký tài khoản Bác sĩ"
        goBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{flexDirection: 'column', gap: 10}}>
          <Text variant="titleMedium">Chụp ảnh CMND hoặc CCCD mặt trước</Text>
          <TouchableOpacity
            style={[
              styles.photoContainer,
              {backgroundColor: theme.colors.primaryContainer},
            ]}>
            <Icon source="camera" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', gap: 10}}>
          <Text variant="titleMedium">Chụp ảnh CMND hoặc CCCD mặt sau</Text>
          <TouchableOpacity
            style={[
              styles.photoContainer,
              {backgroundColor: theme.colors.primaryContainer},
            ]}>
            <Icon source="camera" size={24} />
          </TouchableOpacity>
        </View>

        <Text variant="titleMedium">Nhập các thông tin cá nhân sau</Text>
        <TextInput
          mode="outlined"
          label="Họ và tên"
          value={fullName}
          onChangeText={setFullName}
          error={errorFullName}
          style={styles.input}
        />
        {errorFullName && (
          <HelperText type="error">Vui lòng nhập họ tên.</HelperText>
        )}

        <TextInput
          mode="outlined"
          label="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          error={errorPhoneNumber}
          style={styles.input}
        />
        {errorPhoneNumber && (
          <HelperText type="error">
            Vui lòng nhập số điện thoại hợp lệ.
          </HelperText>
        )}

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errorEmail}
          style={styles.input}
        />
        {errorEmail && (
          <HelperText type="error">
            Vui lòng nhập địa chỉ email hợp lệ.
          </HelperText>
        )}
        <TextInput
          mode="outlined"
          label="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          error={errorAddress}
          style={styles.input}
        />
        {errorAddress && (
          <HelperText type="error">Vui lòng nhập địa chỉ cá nhân hợp lệ.</HelperText>
        )}

        

        <View style={{flexDirection: 'column', gap: 10}}>
          <Text variant="titleMedium">Chọn chuyên ngành</Text>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {specialties.map(specialty => (
              <Chip
                key={specialty.index}
                mode="flat"
                showSelectedCheck={true}
                onPress={() => console.log(specialty.name)}
                style={{margin: 4}}>
                {specialty.name}
              </Chip>
            ))}
          </View>
        </View>

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Đăng ký
        </Button>
      </ScrollView>
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
    width: '50%',
    alignSelf: 'center',
  },
  photoContainer: {
    borderRadius: 8,
    height: 200,
    width: 300,
    overflow: 'hidden',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
  },
});
