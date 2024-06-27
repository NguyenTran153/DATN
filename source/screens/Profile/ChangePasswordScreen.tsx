import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Text, TextInput, Button} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AuthService from '../../services/AuthService';

const ChangePasswordScreen = ({navigation}: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = useSelector((state: any) => state.token.accessToken);

  const handleResetPassword = async () => {
    if (password.length < 6) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Lỗi',
        textBody: 'Mật khẩu phải lớn hơn 6 ký tự!',
      });
      return;
    }
    if (password !== confirmPassword) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Lỗi',
        textBody: 'Mật khẩu xác nhận không khớp!',
      });
      return;
    }

    try {
      await AuthService.ResetPassword(token, password);

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Thành công',
        textBody: 'Đổi mật khẩu thành công!',
        button: 'Đóng',
      });
      navigation.goBack();
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Lỗi',
        textBody: 'Đổi mật khẩu thất bại. Vui lòng thử lại!',
        button: 'Đóng',
      });
      console.log('Error reset password:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomAppbar title="Đổi mật khẩu" goBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          secureTextEntry
          placeholder="Mật khẩu mới"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          secureTextEntry
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        <Button mode="outlined" onPress={handleResetPassword}>
          Xác nhận
        </Button>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
});
