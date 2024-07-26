import {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  TextInput,
  Button,
  IconButton,
  useTheme,
  Modal,
  Text,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(false);
  const [pinId, setPinId] = useState('');
  const theme = useTheme();

  const handleInputChange = (name: any, value: any) => {
    if (name === 'phone') {
      if (value.startsWith('0') || value.startsWith('+')) {
        // Replace the first '0' with '+84'
        const formattedPhoneNumber = value.replace(/^0/, '+84');
        setForm({
          ...form,
          [name]: formattedPhoneNumber,
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Thất bại',
          textBody: 'Vui lòng nhập số điện thoại hợp lệ',
          button: 'Đóng',
        });
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      if (
        form.confirmPassword === form.password &&
        form.phone.length !== 0 &&
        form.firstName.length !== 0 &&
        form.lastName.length !== 0
      ) {
        const result = await AuthService.PhoneVerification(form.phone);
        setPinId(result);
        setOTPModal(true);
        console.log(pinId);
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Thất bại',
          textBody: 'Số điện thoại hoặc mật khẩu chưa hợp lệ',
          button: 'Đóng',
        });
      }
      // Xử lý logic đăng ký tại đây
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setIsLoading(true);
      if (otpValue.length === 6) {
        const result = await AuthService.OTPVerification(pinId, otpValue);
        console.log(result);
        if (result !== 'error') {
          // navigation.navigate('RegisterScreen', {token: result});
          await AuthService.signUp(
            result,
            '',
            form.password,
            form.firstName,
            form.lastName,
          );
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Đăng ký',
            textBody: 'Đăng ký thành công',
            button: 'Đóng',
          });
          navigation.navigate('DoctorNavigator', {
            screen: 'ConnectDoctorScreen',
          });
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
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomAppbar title="Tạo tài khoản" goBack={() => navigation.goBack()} />
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
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
          width: '90%',
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
          onChangeText={text => setOtpValue(text)}
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
