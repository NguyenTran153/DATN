import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import OTPScreen from './OtpScreen';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
const PhoneNumber = ({navigation}: any) => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumber = (phone: string) => {
    if (phone.startsWith('0')) {
      // Replace the first '0' with '+84'
      const formattedPhoneNumber = phone.replace(/^0/, '+84');
      setValue(formattedPhoneNumber);
      console.log(formattedPhoneNumber);
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Thất bại',
        textBody: 'Vui lòng nhập số điện thoại hợp lệ',
        button: 'Đóng',
      });
    }
  };
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
      color: theme.colors.primary,
      marginBottom: 6,
      textAlign: 'center',
    },
    input: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 17,
      fontWeight: '600',
      color: theme.colors.primary,
      marginBottom: 8,
    },
    inputControl: {
      borderColor: theme.colors.tertiary,
      height: 44,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      borderRadius: 12,
      fontSize: 15,
      fontWeight: '500',
      color: theme.colors.tertiary,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: theme.colors.secondary,
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
      color: theme.colors.secondary,
      textAlign: 'center',
      letterSpacing: 0.15,
    },
    btn: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
    },
  });
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
          <Text style={styles.title}>Đăng ký Medical</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              id="phoneNumber"
              style={styles.inputControl}
              autoCapitalize="none"
              autoCorrect={false}
              inputMode="numeric"
              placeholderTextColor={theme.colors.secondary}
              onChangeText={number => setValue(number)}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  setIsLoading(true);
                  if (value.length === 10) {
                    const formattedPhoneNumber = value.replace(/^0/, '+84');
                    const pinId = await AuthService.PhoneVerification(
                      formattedPhoneNumber,
                    );
                    console.log(pinId);
                    if (pinId !== 'error') {
                      console.log(pinId);
                      navigation.navigate('OtpScreen', {pinId: pinId});
                    } else {
                      Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Số điện thoại',
                        textBody: 'Số điện thoại đã được đăng ký',
                        button: 'Đóng',
                      });
                    }
                  } else {
                    Dialog.show({
                      type: ALERT_TYPE.DANGER,
                      title: 'Số điện thoại',
                      textBody: 'Số điện thoại không hợp lệ',
                      button: 'Đóng',
                    });
                  }
                } catch (error) {
                } finally {
                  setIsLoading(false);
                }
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Gửi mã OTP</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: 'auto'}}
              onPress={() => navigation.goBack()}>
              <Text
                style={[styles.formFooter, {color: theme.colors.secondary}]}>
                Đã có tài khoản?
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: theme.colors.primary,
                  }}>
                  Đăng nhập
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PhoneNumber;
