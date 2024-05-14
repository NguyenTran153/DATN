import {ScrollView, StyleSheet, View} from 'react-native';
import {useState} from 'react';
import {
  useTheme,
  Avatar,
  Text,
  Searchbar,
  IconButton,
  List,
  SegmentedButtons,
} from 'react-native-paper';

import {specialties} from '../../utils/constant';

const doctors = [
  {id: 1, name: 'Bác sĩ Nguyễn Văn A', specialtyIndex: 0},
  {id: 2, name: 'Bác sĩ Trần Thị B', specialtyIndex: 1},
  {id: 3, name: 'Bác sĩ Lê Hoàng C', specialtyIndex: 2},
  // ... Thêm dữ liệu bác sĩ
];

const fakeData = {
  id: '2',
  userName: 'John Doe',
  userImg: require('../../asset/7677205.jpg'),
  messageTime: '2 hours ago',
  messageText:
    'Hey there, this is my test for a post of my social app in React Native.',
  Gender: 'Nam',
  Age: '34',
  Address: '234 Main Street, City, Country',
  Height: 179,
  Weight: 76,
};

const DoctorListScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [value, setValue] = useState<string>('all');

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.topbar}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Tìm kiếm"
          onChangeText={setSearchDoctor}
          value={searchDoctor}
        />

        <IconButton
          icon="account-plus"
          size={24}
          onPress={() =>
            navigation.navigate('DoctorNavigator', {
              screen: 'ConnectDoctorScreen',
            })
          }
        />
      </View>
      <View style={{gap: 10, padding: 10}}>
        <Text variant="titleLarge"> Danh sách bác sĩ đã liên hệ</Text>

        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'all',
              label: 'Tất cả',
            },
            {
              value: 'new',
              label: 'Mới nhất',
            },
          ]}
        />
        <ScrollView>
          <List.Section style={{alignItems: 'flex-start'}}>
            {doctors.map(doctor => {
              return (
                <List.Item
                  key={doctor.id}
                  style={[
                    styles.listItem,
                    {borderBottomColor: theme.colors.surfaceVariant},
                  ]}
                  title={doctor.name}
                  onPress={() => {}}
                  left={() => (
                    <Avatar.Image
                      style={{alignSelf: 'center'}}
                      size={48}
                      source={require('../../asset/7677205.jpg')}
                    />
                  )}
                  right={() => (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <IconButton
                          icon={'chat'}
                          size={30}
                          onPress={() => {
                            navigation.navigate('ChatNavigator', {
                              screen: 'ChatScreen',
                              params: {userId: fakeData.id, userInfo: fakeData},
                            });
                          }}
                        />
                        <IconButton
                          icon={'video'}
                          size={30}
                          onPress={() => {
                            navigation.navigate('ChatNavigator', {
                              screen: 'CallingScreen',
                              params: {userInfo: fakeData},
                            });
                          }}
                        />
                      </View>
                    </>
                  )}
                />
              );
            })}
          </List.Section>
        </ScrollView>
      </View>
    </View>
  );
};

export default DoctorListScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  searchBar: {
    width: '80%',
    marginLeft: 15,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
