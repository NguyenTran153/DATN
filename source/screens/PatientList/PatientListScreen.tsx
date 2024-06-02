import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  IconButton,
  DataTable,
  Searchbar,
  useTheme,
  Modal,
} from 'react-native-paper';

import PatientCard from '../../components/PatientCard';

interface Patient {
  id: number;
  name: string;
}

const PatientListScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [searchPatient, setSearchPatient] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  // Tạo dữ liệu giả
  const generateFakePatients = (page: number): Patient[] => {
    const patients: Patient[] = [];
    for (let i = 1; i <= itemsPerPage; i++) {
      patients.push({
        id: (page - 1) * itemsPerPage + i * 2,
        name: `Bệnh nhân ${(page - 1) * itemsPerPage + i}`,
      });
    }
    return patients;
  };

  const fetchPatientsAPI = async (pageNumber: number) => {
    return generateFakePatients(pageNumber);
  };

  const fetchPatients = async (pageNumber: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response: Patient[] = await fetchPatientsAPI(pageNumber);
      setPatients(response);
      // Giả lập tổng số bệnh nhân (bạn có thể cập nhật từ API thật)
      setTotalPatients(50); // Giả lập tổng số bệnh nhân là 50
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch dữ liệu mới
      const newPatients = await fetchPatientsAPI(1);

      if (page === 1) {
        // Xóa các phần tử trùng lặp trong dữ liệu mới
        const filteredNewPatients = newPatients.filter(
          newPatient =>
            !patients.some(oldPatient => oldPatient.id === newPatient.id),
        );

        // Thêm dữ liệu mới vào đầu danh sách hiện tại nếu đang ở trang đầu tiên
        setPatients(prevPatients => [...filteredNewPatients, ...prevPatients]);
      } else {
        // Cập nhật danh sách bệnh nhân với dữ liệu mới mà không thêm vào đầu danh sách
        setPatients(newPatients);
      }

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
      <View style={{flex: 1, padding: 10, width: '100%'}}>
        <FlatList
          data={patients}
          renderItem={({item}) => (
            <PatientCard patientId={item.id} navigation={navigation} />
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
    width: '80%',
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
