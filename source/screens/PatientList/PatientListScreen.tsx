import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Searchbar, useTheme, Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import PatientCard from '../../components/PatientCard';
import {useSelector} from 'react-redux';
import UserService from '../../services/UserService';
import moment from 'moment';

const PatientListScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [searchPatient, setSearchPatient] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state: any) => state.token);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchPatients(token.accessToken);
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

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchPatients(token.accessToken);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
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

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.topbar}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Tìm bệnh nhân"
          onChangeText={setSearchPatient}
          value={searchPatient}
        />
        <View style={{flexDirection: 'row', marginRight: 15}}>
          <IconButton
            icon="account-plus"
            size={24}
            onPress={() =>
              navigation.navigate('DoctorNavigator', {
                screen: 'ConnectDoctorScreen',
              })
            }
          />
          <IconButton
            icon="bell"
            size={24}
            onPress={() =>
              navigation.navigate('HomeNavigator', {
                screen: 'NotificationScreen',
              })
            }
          />
        </View>
      </View>
      <View style={{flex: 1, padding: 10, width: '100%'}}>
        <FlatList
          data={filteredPatients}
          renderItem={({item, index}) => (
            <PatientCard key={index} patient={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={{padding: 10}}
        />
      </View>
    </SafeAreaView>
  );
};

export default PatientListScreen;

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
    width: '70%',
    marginLeft: 15,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loading: {
    paddingVertical: 20,
  },
  button: {
    width: '70%',
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
  },
  line: {
    height: 2,
    marginHorizontal: 10,
    width: '12%',
  },
});
