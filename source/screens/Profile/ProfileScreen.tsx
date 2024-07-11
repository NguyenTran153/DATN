import {useTheme, Text, Button, List, Switch} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import AuthService from '../../services/AuthService';
import dayjs from 'dayjs';
import { useThemeContext } from '../../context/ThemeContext';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  const handleLogout = async () => {
    try {
      await AuthService.logout(token.accessToken);
      navigation.navigate('LoginScreen');
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Đăng xuất thất bại',
        textBody: 'Lỗi hệ thống đã xảy ra',
        button: 'Đóng',
      });
    }
  };


  const formatGender = (gender: string) => {
    if (gender === 'male') return 'Nam';
    if (gender === 'female') return 'Nữ';
    return 'Không xác định';
  };

  const formatDate = (date: string) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.profile}>
        <Image
          source={
            userData?.avatar
              ? {uri: userData.avatar}
              : require('../../asset/7677205.jpg')
          }
          style={styles.img}
        />
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>
            {userData
              ? `${userData.lastName} ${userData.firstName}`
              : 'Không cập nhật'}
          </Text>
          <Text>
            Ngày sinh:{' '}
            {userData ? formatDate(userData.birthday) : 'Không cập nhật'}
          </Text>
          <Text>
            Giới tính:{' '}
            {userData ? formatGender(userData.gender) : 'Không cập nhật'}
          </Text>
          <Text>Email: {userData?.email || 'Không cập nhật'}</Text>
        </View>
      </View>
      <ScrollView>
        <List.Section>
          <List.Item
            title="Đổi mật khẩu tài khoản"
            left={() => (
              <List.Icon
                style={styles.settingCenter}
                icon="hospital-building"
              />
            )}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          />
          {userData?.role !== 'doctor' && (
            <List.Item
              title="Đăng Ký Bác Sĩ"
              left={() => (
                <List.Icon style={styles.settingCenter} icon="doctor" />
              )}
              right={() => <List.Icon icon="chevron-right" />}
              onPress={() => {
                navigation.navigate('ProfileNavigator', {
                  screen: 'BecomeDoctorScreen',
                });
              }}
            />
          )}
          <List.Item
            title="Chế Độ Tối"
            left={() => (
              <List.Icon style={styles.settingCenter} icon="theme-light-dark" />
            )}
            right={() => (
              <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
            )}
          />
        </List.Section>
      </ScrollView>
      <Button
        onPress={async () => await handleLogout()}
        style={{width: '80%', alignSelf: 'center', marginBottom: 20}}
        icon="logout"
        mode="contained"
        buttonColor={theme.colors.error}>
        Đăng xuất
      </Button>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    alignSelf: 'center',
    paddingVertical: 14,
    flexDirection: 'row',
    paddingHorizontal: 24,
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  settingCenter: {
    paddingLeft: 20,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '800',
  },
  img: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 80,
  },
  patientInfo: {
    paddingHorizontal: 10,
  },
});
