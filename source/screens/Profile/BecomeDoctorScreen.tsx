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
import PhotoTakingComponent from '../../components/PhotoTakingComponent';
import DropDown from '../../components/DropDown';

//Fake
const specialties = [
  {index: 0, name: 'Khám chức năng hô hấp', iconName: 'Respirology'},
  {index: 1, name: 'Khám da liễu', iconName: 'Measles'}, // Measles icon might not be appropriate for dermatology
  {index: 2, name: 'Khám điều trị vết thương', iconName: 'Bandaged'},
  {index: 3, name: 'Khám hậu môn-trực tràng', iconName: 'Intestine'},
  {index: 4, name: 'Khám mắt', iconName: 'Eye'},
  {index: 5, name: 'Khám tai mũi họng', iconName: 'Ear'},
  {index: 6, name: 'Khám nội tiết', iconName: 'Endocrinology'},
  {index: 7, name: 'Khám phụ khoa', iconName: 'Gynecology'}, // Consider a more generic icon like 'uterus' or 'gynecology'
  {index: 8, name: 'Khám thai', iconName: 'Fetus'},
  {index: 9, name: 'Khám thần kinh', iconName: 'Psychology'},
  {index: 10, name: 'Khám tiết niệu', iconName: 'Kidneys'},
  {index: 11, name: 'Khám tiêu hoá-gan mật', iconName: 'Stomach'},
  {index: 12, name: 'Khám tim mạch', iconName: 'Heart'},
  {index: 13, name: 'Khám tổng quát', iconName: 'Tac'}, // CT Scan might not be appropriate for a general checkup
  {index: 14, name: 'Khám viêm gan', iconName: 'Liver'},
  {index: 15, name: 'Khám xương khớp', iconName: 'Joints'},
  {index: 16, name: 'Lồng ngực - Mạch máu - Bướu cổ', iconName: 'BloodVessel'},
  {index: 17, name: 'Thẩm mỹ - chăm sóc da', iconName: 'Allergies'}, // Allergies icon might not be appropriate for aesthetics or skincare
];

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
          <HelperText type="error">Vui lòng nhập địa chỉ hợp lệ.</HelperText>
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
  button: {},
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
  photoBackground: {},
});
