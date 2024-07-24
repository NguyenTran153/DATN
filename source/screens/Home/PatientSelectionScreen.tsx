import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Searchbar,
  useTheme,
  Text,
  Avatar,
  TouchableRipple,
} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import UserService from '../../services/UserService';
import moment from 'moment';
import {setGuest} from '../../redux/slices/guestSlice';
import CustomAppbar from '../../components/CustomAppbar';

const defaultAvatar = require('../../asset/7677205.jpg');

const PatientListScreen = ({navigation}: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchPatient, setSearchPatient] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.token.accessToken);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchPatients(token);
  }, [isFocused]);

  const fetchPatients = async (token: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await UserService.getFriendList(token);
      if (response && response.data) {
        setPatients(response.data);
        setFilteredPatients(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const filtered = searchPatient
      ? patients.filter(patient => {
          const searchDate = moment(searchPatient, 'YYYY-MM-DD', true);
          const createdAtMatch = searchDate.isValid()
            ? moment(patient.createdAt).isSame(searchDate, 'day')
            : false;

          const dataMatch = Object.values(patient).some(value => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(searchPatient.toLowerCase());
            }
            return false;
          });

          return createdAtMatch || dataMatch;
        })
      : patients;
    setFilteredPatients(filtered);
  }, [searchPatient, patients]);

  const handlePress = async (patient: Patient) => {
    console.log(JSON.stringify(patient));
    navigation.navigate('DoctorNavigator', {
      screen: 'ExamineScreen',
      params: {patient},
    });
  };

  const renderPatientCard = ({item}: {item: Patient}) => (
    <TouchableRipple
      onPress={() => handlePress(item)}
      style={[styles.card, {borderBottomColor: theme.colors.primaryContainer}]}>
      <View style={styles.cardContainer}>
        <Avatar.Image
          source={item.avatar ? {uri: item.avatar} : defaultAvatar}
        />
        <View style={styles.textContainer}>
          <Text variant="titleMedium">
            {item.firstName} {item.lastName}
          </Text>
          <Text variant="bodySmall">
            Giới tính:{' '}
            {item.gender === 'male'
              ? 'Nam'
              : item.gender === 'female'
              ? 'Nữ'
              : 'Chưa cập nhật'}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <CustomAppbar
        title="Vui lòng chọn bệnh nhân"
        goBack={() => navigation.goBack()}
      />
      <Searchbar
        style={styles.searchBar}
        placeholder="Tìm bệnh nhân"
        onChangeText={setSearchPatient}
        value={searchPatient}
      />
      <FlatList
        style={{flex: 1, width: '100%'}}
        data={filteredPatients}
        renderItem={renderPatientCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{padding: 10, width: '100%'}}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  searchBar: {
    width: '90%',
    marginVertical: 15,
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default PatientListScreen;
