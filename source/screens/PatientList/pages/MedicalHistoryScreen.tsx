import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  useTheme,
  List,
  IconButton,
  DataTable,
  Searchbar,
  Button,
  ActivityIndicator,
  Text,
  Appbar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {format} from 'date-fns';
import PrescriptionService from '../../../services/PrescriptionService';

const {height} = Dimensions.get('window');

const ITEMS_PER_PAGE = 7;

const MedicalHistoryScreen = ({navigation, route}: any) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [medicalHistoryData, setMedicalHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const accessToken = useSelector((state: any) => state.token.accessToken);

  const totalPages = Math.ceil(medicalHistoryData.length / ITEMS_PER_PAGE);

  const getCurrentPageData = () => {
    const filteredData = searchQuery
      ? medicalHistoryData.filter(
          item =>
            item.date.includes(searchQuery) ||
            convertString(item.symptoms).includes(searchQuery),
        )
      : medicalHistoryData;

    const startIndex = currentPage * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (item: any) => {
    navigation.navigate('MedicalDetailScreen', {item});
  };

  const convertString = (inputString: string): string => {
    if (inputString.startsWith('"') && inputString.endsWith('"')) {
      return inputString.slice(1, -1).replace(/\\"/g, '"');
    }
    return inputString.replace(/\\"/g, '"');
  };

  useEffect(() => {
    const getMedicalData = async () => {
      const patientId = route.params.patient.id;
      setLoading(true);
      try {
        const prescriptions = await PrescriptionService.getPrescription(
          patientId,
          accessToken,
        );

        const medicalDataPromises = prescriptions.map(
          async (prescription: any) => {
            const diagnoses = await PrescriptionService.getDiagnosis(
              prescription.id,
              accessToken,
            );
            return diagnoses.map((diagnosis: any) => ({
              id: diagnosis.id,
              date: format(new Date(diagnosis.createdAt), 'yyyy-MM-dd'),
              symptoms: convertString(diagnosis.problem),
              prescription,
              diagnosis,
            }));
          },
        );

        const medicalData = await Promise.all(medicalDataPromises);
        const flatMedicalData = medicalData.flat();
        setMedicalHistoryData(flatMedicalData);
      } catch (error) {
        console.error('Error getting medical data:', error);
      } finally {
        setLoading(false);
      }
    };
    getMedicalData();
  }, [route.params.patient.id, accessToken]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  const itemHeight = height / 10;

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header>
        <Appbar.Content title="Lịch sử khám bệnh" />
      </Appbar.Header>
      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{flex: 1}}
        />
        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          size={36}
          onPress={() =>
            navigation.navigate('DoctorNavigator', {
              screen: 'ExamineScreen',
              params: route.params,
            })
          }
          style={{marginLeft: 8}}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loader}
        />
      ) : medicalHistoryData.length === 0 ? (
        <View style={styles.lottie}>
          <LottieView
            source={require('../../../asset/lottie/notfound.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
          <Text variant="titleLarge">Chưa có nhật ký nào</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {getCurrentPageData().map((item, index) => (
            <List.Section key={index} style={{height: itemHeight}}>
              <List.Item
                title={item.date}
                description={item.symptoms}
                left={props => (
                  <IconButton
                    {...props}
                    icon="calendar"
                    iconColor={theme.colors.primary}
                    style={{alignSelf: 'center'}}
                    size={36}
                  />
                )}
                right={props => (
                  <Button
                    mode="outlined"
                    onPress={() => handleViewDetails(item)}
                    style={styles.viewDetailsButton}>
                    Xem chi tiết
                  </Button>
                )}
                style={[
                  {
                    borderColor: theme.colors.primaryContainer,
                    borderBottomWidth: 1,
                    height: itemHeight - 1,
                  },
                ]}
              />
            </List.Section>
          ))}
        </ScrollView>
      )}
      <DataTable.Pagination
        page={currentPage}
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        label={`${currentPage + 1} of ${totalPages}`}
        style={styles.pagination}
      />
    </View>
  );
};

export default MedicalHistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pagination: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  viewDetailsButton: {
    marginRight: 8,
    alignSelf: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
