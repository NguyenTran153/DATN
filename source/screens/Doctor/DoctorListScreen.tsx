import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  useTheme,
  Avatar,
  Text,
  Searchbar,
  IconButton,
  List,
  SegmentedButtons,
  Portal,
  Modal,
  Button,
} from 'react-native-paper';
import UserService from '../../services/UserService';
import {useSelector} from 'react-redux';
import DoctorModal from '../../components/DoctorModal';
import { useIsFocused } from '@react-navigation/native';

const DoctorListScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [value, setValue] = useState<string>('all');
  const [doctors, setDoctors] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const isFocused = useIsFocused();

  const token = useSelector((state: any) => state.token.accessToken);

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const response = await UserService.getFriendList(token);
        console.log('Friend List' + JSON.stringify(response.data));
        if (response && response.data) {
          setDoctors(response.data);
          setFilteredDoctors(response.data);
        }
      } catch (error) {
        console.log('Error fetching friend list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendList();
  }, [isFocused]);

  useEffect(() => {
    const filterDoctors = () => {
      const filtered = doctors.filter(doctor =>
        `${doctor.firstName} ${doctor.lastName}`
          .toLowerCase()
          .includes(searchDoctor.toLowerCase()),
      );
      setFilteredDoctors(filtered);
    };

    filterDoctors();
  }, [searchDoctor, doctors]);

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
      <View style={{gap: 10, padding: 10, width: '90%'}}>
        <Text variant="titleLarge">Danh sách bác sĩ đã liên hệ</Text>

        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {value: 'all', label: 'Tất cả'},
            {value: 'new', label: 'Mới nhất'},
          ]}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <List.Section style={{alignItems: 'flex-start'}}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              filteredDoctors.map(doctor => (
                <List.Item
                  key={doctor.id}
                  onPress={() => {
                    setSelectedDoctor(doctor);
                    setModalVisible(true);
                  }}
                  style={[
                    styles.listItem,
                    {borderBottomColor: theme.colors.surfaceVariant},
                  ]}
                  title={`${doctor.firstName} ${doctor.lastName}`}
                  left={() => (
                    <Avatar.Image
                      style={{alignSelf: 'center'}}
                      size={48}
                      source={
                        doctor.avatar
                          ? {uri: doctor.avatar}
                          : require('../../asset/7677205.jpg')
                      }
                    />
                  )}
                  right={() => (
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
                            params: {userId: doctor.id, userInfo: doctor},
                          });
                        }}
                      />
                      <IconButton
                        icon={'video'}
                        size={30}
                        onPress={() => {
                          navigation.navigate('ChatNavigator', {
                            screen: 'CallingScreen',
                            params: {userInfo: doctor},
                          });
                        }}
                      />
                    </View>
                  )}
                />
              ))
            )}
          </List.Section>
        </ScrollView>
        <DoctorModal
          visible={modalVisible}
          doctor={selectedDoctor}
          onClose={() => setModalVisible(false)}
        />
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
