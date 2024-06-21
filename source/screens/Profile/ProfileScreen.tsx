import {useTheme, Text, Button, List, Switch} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import AuthService from '../../services/AuthService';
import {toggleDarkMode} from '../../redux/slices/themeSlice';
import dayjs from 'dayjs';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);

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

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
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
          source={{uri: userData?.avatar || 'default_avatar_url'}}
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
            title="Lịch sử Khám Bệnh"
            description="Những lần khám bệnh gần đây của bệnh nhân"
            left={() => (
              <List.Icon
                style={styles.settingCenter}
                icon="hospital-building"
              />
            )}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Tiền Sử Bệnh Án"
            description="Bệnh án của bệnh nhân"
            left={() => (
              <List.Icon style={styles.settingCenter} icon="stethoscope" />
            )}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Phàn Nàn"
            description="Triệu chứng hoặc vấn đề sức khỏe của bệnh nhân"
            left={() => (
              <List.Icon style={styles.settingCenter} icon="comment-question" />
            )}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Khám Lâm Sàng"
            description="Các đợt khám sức khỏe trong quá khứ"
            left={() => (
              <List.Icon style={styles.settingCenter} icon="test-tube" />
            )}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <List.Item
            title="Thuốc"
            description="Thuốc đã được kê đơn cho bệnh nhân"
            left={() => <List.Icon style={styles.settingCenter} icon="pill" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          {userData?.role !== 'doctor' && (
            <List.Item
              title="Đăng Ký Bác Sĩ"
              description="Đăng ký tài khoản bác sĩ"
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
            title="Chính Sách"
            description="Điều khoản và chính sách"
            left={() => (
              <List.Icon
                style={styles.settingCenter}
                icon="file-document-outline"
              />
            )}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => console.log('')}
          />
          {/* <List.Item
            title="Chế Độ Tối"
            left={() => (
              <List.Icon style={styles.settingCenter} icon="theme-light-dark" />
            )}
            right={() => (
              <Switch value={isDarkMode} onValueChange={handleToggleDarkMode} />
            )}
          /> */}
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
