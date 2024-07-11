import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, TextInput, Button, IconButton} from 'react-native-paper';
import CustomAppbar from '../../components/CustomAppbar';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {useSelector} from 'react-redux';
import AuthService from '../../services/AuthService';

const ChangePasswordScreen = ({navigation}: any) => {
  const theme = useTheme();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = useSelector((state: any) => state.token.accessToken);

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Lỗi',
        textBody: 'Mật khẩu mới phải lớn hơn 6 ký tự!',
      });
      return;
    }
    if(oldPassword === newPassword) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Lỗi',
        textBody: 'Mật khẩu mới trùng mật khẩu cũ!',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Lỗi',
        textBody: 'Mật khẩu xác nhận không khớp!',
      });
      return;
    }

    try {
      await AuthService.changePassword(token, oldPassword, newPassword);

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
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CustomAppbar title="Đổi mật khẩu" goBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          secureTextEntry={!showOldPassword}
          label="Mật khẩu cũ"
          value={oldPassword}
          onChangeText={setOldPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showOldPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowOldPassword(!showOldPassword)}
            />
          }
        />
        <TextInput
          mode="outlined"
          secureTextEntry={!showNewPassword}
          label="Mật khẩu mới"
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showNewPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowNewPassword(!showNewPassword)}
            />
          }
        />
        <TextInput
          mode="outlined"
          secureTextEntry={!showConfirmPassword}
          label="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />
        <Button
          mode="contained"
          onPress={handleResetPassword}
          style={styles.button}>
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
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
