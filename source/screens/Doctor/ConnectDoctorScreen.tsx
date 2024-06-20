import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {List, Text, TextInput, useTheme} from 'react-native-paper';
import QRLoginID from '../QRLoginID';
import CustomAppbar from '../../components/CustomAppbar';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import UserService from '../../services/UserService'; // import UserService
import PhoneNumber from '../Authorization/PhoneNumberScreen';

const ConnectDoctorScreen = ({navigation}: any) => {
  const theme = useTheme();
  const user = useSelector((state: any) => state.user);

  const [phone, setPhone] = useState('');
  const [accountModal, setAccountModal] = useState(false);
  const token = useSelector((state: any) => state.token.accessToken);

  const sendFriendRequest = async () => {
    try {
      const response = await UserService.findUserByPhone(phone, token);
      if (response) {
        const userId = response[0].id;
        await UserService.sendFriendRequest(userId, token);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Thành công',
          textBody: 'Yêu cầu kết bạn đã được gửi',
          button: 'Đóng',
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Thất bại',
          textBody: 'Số điện thoại chưa đăng ký hoặc không cho phép tìm kiếm',
          button: 'Đóng',
        });
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Thất bại',
        textBody: 'Đã xảy ra lỗi, vui lòng thử lại',
        button: 'Đóng',
      });
    }
  };
  const handlePhoneNumber = (phone: string) => {
    if (phone.startsWith('0')) {
      // Replace the first '0' with '+84'
      const formattedPhoneNumber = phone.replace(/^0/, '+84');
      setPhone(formattedPhoneNumber);
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
  
  return (
    <>
      <CustomAppbar
        title={
          user.role === 'patient'
            ? 'Liên hệ với bác sĩ'
            : 'Liên hệ với bệnh nhân'
        }
        goBack={() => navigation.goBack()}
      />

      <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={styles.container}>
          <View
            style={[
              styles.qr_wrapper,
              {backgroundColor: theme.colors.primary},
            ]}>
            <View style={styles.qr_container}>
              <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.background,
                  fontWeight: '500',
                  marginBottom: 10,
                }}>
                {user.lastName} {user.firstName}
              </Text>
              <View style={{marginBottom: 10}}>
                <QRLoginID />
              </View>
              <Text style={{color: theme.colors.background, marginBottom: 10}}>
                Quét mã để thêm bạn với tôi
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              style={[styles.input]}
              placeholder="Nhập số điện thoại"
              mode="outlined"
              inputMode="numeric"
              onChangeText={phone => handlePhoneNumber(phone)}
              right={
                <TextInput.Icon
                  icon="arrow-right-bold"
                  onPress={sendFriendRequest}
                />
              }
            />
          </View>
          <View style={{width: '100%', justifyContent: 'flex-start'}}>
            <List.Section>
              <List.Item
                title="Quét mã QR"
                left={() => (
                  <List.Icon style={styles.settingCenter} icon="qrcode" />
                )}
                onPress={() => {}}
              />
              <List.Item
                title="Danh bạ máy"
                left={() => (
                  <List.Icon style={styles.settingCenter} icon="contacts" />
                )}
                onPress={() => {}}
              />
              {user.role === 'doctor' && (
                <List.Item
                  title="Tạo tài khoản cho bệnh nhân"
                  left={() => (
                    <List.Icon style={styles.settingCenter} icon="account" />
                  )}
                  onPress={() => {
                    navigation.navigate('DoctorNavigator', {
                      screen: 'CreateAccountScreen',
                    });
                  }}
                />
              )}
            </List.Section>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ConnectDoctorScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    gap: 10,
    padding: 20,
  },
  settingCenter: {
    paddingLeft: 20,
  },
  qr_container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  qr_wrapper: {
    borderRadius: 10,
    width: 250,
    height: 250,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    width: '85%',
    height: 70,
    borderRadius: 10,
  },
});
