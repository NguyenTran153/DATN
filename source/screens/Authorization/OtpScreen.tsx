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
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import AuthService from '../../services/AuthService';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
const OTPScreen = ({route, navigation}: any) => {
  const pinId = route.params.pinId;
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [value, setValue] = useState('');
  const handleChange = (text: string) => {
    if (text.length <= 6) {
      // Limit to 6 characters after the prefix
      setValue(text);
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
      color: theme.colors.background,
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
            <Text style={styles.inputLabel}>Mã OTP</Text>
            <TextInput
              id="OtpNumber"
              style={styles.inputControl}
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              inputMode="numeric"
              placeholderTextColor={theme.colors.secondary}
              onChangeText={number => handleChange(number)}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  setIsLoading(true);
                  if (value.length === 6) {
                    const result = await AuthService.OTPVerification(
                      pinId,
                      value,
                    );
                    if (result !== 'error') {
                      navigation.navigate('RegisterScreen', {token: result});
                    } else {
                      Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Mã OTP',
                        textBody: 'Mã OTP không hợp lệ',
                        button: 'Đóng',
                      });
                    }
                    console.log(value);
                  } else {
                    Dialog.show({
                      type: ALERT_TYPE.DANGER,
                      title: 'Mã OTP',
                      textBody: 'Mã OTP không hợp lệ',
                      button: 'Đóng',
                    });
                  }
                } catch (error) {
                  Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Mã OTP',
                    textBody: 'Mã OTP không hợp lệ',
                    button: 'Đóng',
                  });
                } finally {
                  setIsLoading(false);
                }
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Nhập mã OTP</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: 'auto'}}
              onPress={() => navigation.navigate('LoginScreen')}>
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

export default OTPScreen;
