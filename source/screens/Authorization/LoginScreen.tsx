import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import AuthService from '../../services/AuthService';
import {useSelector, useDispatch} from 'react-redux';
import {setToken} from '../../redux/slices/tokenSlice';
import {combineSlices} from '@reduxjs/toolkit';
const LoginScreen = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
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
              Email
            </Text>
            <TextInput
              id="email"
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
              value={form.email}
              placeholder="Điền địa chỉ email"
              placeholderTextColor={theme.colors.secondary}
              onChangeText={email => setForm({...form, email})}
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
            <TouchableOpacity style={{marginTop: 'auto'}} onPress={() => {}}>
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
            <TouchableOpacity
              onPress={async () => {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                if (reg.test(form.email) === true) {
                  // if (
                  //   form.email === account.email &&
                  //   form.password === account.password
                  // ) {
                  //   navigation.navigate('BottomTabNavigator');
                  // } else {
                  //   Alert.alert('Wrong email or password');
                  // }

                  const token = await AuthService.login(
                    form.email,
                    form.password,
                  );
                  if (token?.accessToken !== '' && token?.refreshToken !== '') {
                    console.log(token);
                    dispatch(setToken(token!));
                    navigation.navigate('BottomTabNavigator');
                  } else {
                    Alert.alert('Wrong email or password');
                  }
                } else {
                  Alert.alert('Invalid email');
                }
                navigation.navigate('BottomTabNavigator');
              }}>
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
              onPress={() => navigation.navigate('RegisterScreen')}>
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
