import {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  TextInput,
  Button,
  IconButton,
  useTheme,
  Modal,
  Text,
} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import AuthService from '../../services/AuthService';

const {width, height} = Dimensions.get('screen');

const SignupScreen = ({navigation}: any) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [otpModal, setOTPModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const theme = useTheme();

  const handleInputChange = (name: any, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignup = () => {
    // Xử lý logic đăng ký tại đây
    console.log('First Name:', form.firstName);
    console.log('Last Name:', form.lastName);
    console.log('Phone:', form.phone);
    console.log('Password:', form.password);
    console.log('Confirm Password:', form.confirmPassword);

    setOTPModal(true);
  };

  const handleOtpSubmit = async () => {
    if (otpValue.length === 6) {
      const result = await AuthService.OTPVerification('pinid', otpValue);
      if (result !== 'error') {
        navigation.navigate('RegisterScreen', {token: result});
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Thất bại',
          textBody: 'Số điện thoại chưa đăng ký hoặc không cho phép tìm kiếm',
          button: 'Đóng',
        });
      }
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Thất bại',
        textBody: 'Số điện thoại chưa đăng ký hoặc không cho phép tìm kiếm',
        button: 'Đóng',
      });
    }
  };

  return (
    <>
      <CustomAppbar title="Tạo tài khoản" goBack={() => navigation.goBack()} />
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={{marginTop: 50}}>
          <TextInput
            style={[styles.input, {backgroundColor: theme.colors.surface}]}
            label="Số điện thoại"
            mode="outlined"
            value={form.phone}
            onChangeText={text => handleInputChange('phone', text)}
            inputMode="numeric"
            left={
              <TextInput.Icon
                icon={() => (
                  <IconButton
                    icon="phone"
                    size={20}
                    onPress={() => console.log('Icon pressed')}
                    iconColor={theme.colors.primary}
                  />
                )}
              />
            }
          />
          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                styles.halfInput,
                {backgroundColor: theme.colors.surface},
              ]}
              label="Họ"
              mode="outlined"
              value={form.firstName}
              onChangeText={text => handleInputChange('firstName', text)}
              left={
                <TextInput.Icon icon="account" color={theme.colors.primary} />
              }
            />
            <TextInput
              style={[
                styles.input,
                styles.halfInput,
                {backgroundColor: theme.colors.surface},
              ]}
              label="Tên"
              mode="outlined"
              value={form.lastName}
              onChangeText={text => handleInputChange('lastName', text)}
              left={
                <TextInput.Icon icon="account" color={theme.colors.primary} />
              }
            />
          </View>

          <TextInput
            style={[styles.input, {backgroundColor: theme.colors.surface}]}
            label="Mật khẩu"
            mode="outlined"
            secureTextEntry
            value={form.password}
            onChangeText={text => handleInputChange('password', text)}
            left={<TextInput.Icon icon="lock" color={theme.colors.primary} />}
          />
          <TextInput
            style={[styles.input, {backgroundColor: theme.colors.surface}]}
            label="Nhập lại mật khẩu"
            mode="outlined"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={text => handleInputChange('confirmPassword', text)}
            left={<TextInput.Icon icon="lock" color={theme.colors.primary} />}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSignup}
          style={styles.button}
          buttonColor={theme.colors.primary}>
          Tạo tài khoản cho bệnh nhân
        </Button>
      </View>
      <Modal
        visible={otpModal}
        onDismiss={() => setOTPModal(false)}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.onBackground,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 20,
          width: width / 1.2,
          height: height / 4,
          borderRadius: 8,
          borderWidth: 1,
        }}>
        <Text style={[styles.modalTitle, {color: theme.colors.onBackground}]}>
          Nhập mã OTP
        </Text>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: theme.colors.surface, width: '80%'},
          ]}
          label="Mã OTP"
          mode="outlined"
          value={otpValue}
          onChangeText={() => {}}
          inputMode="numeric"
        />
        <View style={styles.row}>
          <Button
            mode="contained"
            onPress={handleOtpSubmit}
            style={[styles.modalButton, styles.halfInput]}
            buttonColor={theme.colors.primary}>
            Xác nhận OTP
          </Button>
          <Button
            onPress={() => setOTPModal(false)}
            style={[styles.modalButton, styles.halfInput]}
            textColor={theme.colors.background}
            buttonColor={theme.colors.error}>
            Đóng
          </Button>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
  },

  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalButton: {
    marginTop: 16,
    width: '100%',
    borderRadius: 8,
  },
});

export default SignupScreen;
