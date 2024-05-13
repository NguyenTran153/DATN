import {useTheme, Text, Button, List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token);
  const dispatch = useDispatch();
  const [data, setData] = useState<UserData>();
  console.log(token.accessToken)
  useEffect( () => {
      fetchData()
      
  }, []);
  const fetchData = async () => {
    setData(await UserService.getUserInfo(token.accessToken));
    dispatch(setUser(data!))
  }
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.profile}>
        <Image source={require('../../asset/7677205.jpg')} style={styles.img} />
        <View style={styles.patientInfo}>
          <View style={styles.editContainer}>
            <Text style={styles.patientName}>{data?.lastName + ' ' + data?.firstName}</Text>
            <Button
              icon="pencil"
              mode="text"
              onPress={() => {}}
              contentStyle={{flexDirection: 'row-reverse'}}>
              Chỉnh sửa
            </Button>
          </View>
          <Text>Ngày sinh: 1991/02/01</Text>
          <Text>Giới tính: Female</Text>
          <Text>Địa chỉ: 68894 Caleigh Trafficway Suite 387</Text>
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
          <List.Item
            title="Đăng Ký Bác Sĩ"
            description="Đăng ký lịch khám với bác sĩ"
            left={() => (
              <List.Icon style={styles.settingCenter} icon="doctor" />
            )}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
        </List.Section>
      </ScrollView>
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
  },
  settingCenter: {
    paddingLeft: 20,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
