import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, DataTable, Searchbar, useTheme} from 'react-native-paper';
import PatientCard from '../../components/PatientCard';
import {useSelector} from 'react-redux';
import UserService from '../../services/UserService';

const PatientListScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [searchPatient, setSearchPatient] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);
  const itemsPerPage = 10;
  const token = useSelector((state: any) => state.token);

  useEffect(() => {
    fetchPatients(token.accessToken);
  }, []);

  const fetchPatients = async (token: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await UserService.getFriendList(token);
      if (response && response.data) {
        setPatients(response.data);
        setTotalPatients(response.data.length);
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
      setPage(1);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName} ${patient.phoneNumber}`
      .toLowerCase()
      .includes(searchPatient.toLowerCase()),
  );

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
          renderItem={({item}) => (
            <PatientCard patient={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={{padding: 10}}
        />
      </View>
      <DataTable.Pagination
        style={{bottom: 0, alignSelf: 'flex-end'}}
        page={page - 1}
        numberOfPages={Math.ceil(totalPatients / itemsPerPage)}
        onPageChange={page => setPage(page + 1)}
        label={`${(page - 1) * itemsPerPage + 1}-${Math.min(
          page * itemsPerPage,
          totalPatients,
        )} of ${totalPatients}`}
        showFastPaginationControls
      />
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
});
