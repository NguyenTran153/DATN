import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme, ActivityIndicator} from 'react-native-paper';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

import AuthService from '../../services/AuthService';
import {useDispatch} from 'react-redux';
import {setToken} from '../../redux/slices/tokenSlice';
import UserService from '../../services/UserService';
import {setUser} from '../../redux/slices/userSlice';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [form, setForm] = useState({
    phone: '',
    password: '',
  });
  const [data, setData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (form.phone.length !== 0) {
        const token = await AuthService.login(form.phone, form.password);
        if (token && token?.accessToken !== '' && token?.refreshToken !== '') {
          dispatch(setToken(token!));

          const userData = await UserService.getUserInfo(token.accessToken);

          console.log('USERDATA' + userData);
          setData(userData);
          dispatch(setUser(userData!));
          navigation.navigate('MainNavigator');
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Đăng nhập thất bại',
            textBody: 'Số điện thoại hoặc mật khẩu sai',
            button: 'Đóng',
          });
        }
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Đăng nhập thất bại',
          textBody: 'Đã có lỗi xảy ra',
          button: 'Đóng',
        });
      }
    } catch (error) {
      console.log('Login Error' + error);
      setIsLoading(false);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Đăng nhập thất bại',
        textBody: 'Số điện thoại không hợp lệ',
        button: 'Đóng',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../asset/7677205.jpg')}
            style={styles.img}
            alt="Logo"
          />
          <Text style={[styles.title, {color: theme.colors.primary}]}>
            Sign in to MediConnect
          </Text>
          <Text style={[styles.subtitle, {color: theme.colors.secondary}]}>
            Welcome to the Medic App!
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={[styles.inputLabel, {color: theme.colors.primary}]}>
              Số điện thoại
            </Text>
            <TextInput
              id="phone"
              style={[
                styles.inputControl,
                {
                  borderColor: theme.colors.tertiary,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.tertiary,
                },
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={form.phone}
              placeholder="Điền số điện thoại"
              placeholderTextColor={theme.colors.secondary}
              onChangeText={phone => setForm({...form, phone})}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Mật khẩu</Text>
            <TextInput
              id="password"
              style={[
                styles.inputControl,
                {
                  borderColor: theme.colors.tertiary,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.tertiary,
                },
              ]}
              secureTextEntry
              value={form.password}
              placeholder="Điền mật khẩu"
              placeholderTextColor={theme.colors.secondary}
              onChangeText={password => setForm({...form, password})}
            />
            <TouchableOpacity
              style={{marginTop: 'auto'}}
              onPress={() => {
                navigation.navigate('ForgotPasswordScreen');
              }}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: theme.colors.primary,
                }}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={async () => await handleLogin()}>
              <View
                style={[styles.btn, {backgroundColor: theme.colors.primary}]}>
                <Text
                  style={[styles.btnText, {color: theme.colors.background}]}>
                  Đăng nhập
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: 'auto'}}
              onPress={() => navigation.navigate('PhoneNumberScreen')}>
              <Text
                style={[styles.formFooter, {color: theme.colors.secondary}]}>
                Chưa có tài khoản?
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: theme.colors.primary,
                  }}>
                  Đăng ký
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  btn: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
