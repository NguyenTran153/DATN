import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  useTheme,
  List,
  IconButton,
  Button,
  ActivityIndicator,
  Text,
  Appbar,
  Searchbar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {format, isValid, parse} from 'date-fns';
import PrescriptionService from '../../../services/PrescriptionService';

const {height} = Dimensions.get('window');

const ITEMS_PER_PAGE = 7;

const MedicalHistoryScreen = ({navigation}: any) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [medicalHistoryData, setMedicalHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const accessToken = useSelector((state: any) => state.token.accessToken);
  const userId = useSelector((state: any) => state.user.id);

  const totalPages = Math.ceil(medicalHistoryData.length / ITEMS_PER_PAGE);

  const getCurrentPageData = () => {
    const filteredData = searchQuery
      ? medicalHistoryData.filter(item => {
          const dateMatch =
            isValid(parse(searchQuery, 'yyyy-MM-dd', new Date())) &&
            item.date ===
              format(
                parse(searchQuery, 'yyyy-MM-dd', new Date()),
                'yyyy-MM-dd',
              );
          const symptomMatch = convertString(item.symptoms).includes(
            searchQuery,
          );

          return dateMatch || symptomMatch;
        })
      : medicalHistoryData;

    const startIndex = currentPage * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (item: any) => {
    navigation.navigate('DoctorNavigator', {
      screen: 'MedicalDetailScreen',
      params: {item},
    });
  };

  const convertString = (inputString: string): string => {
    if (inputString.startsWith('"') && inputString.endsWith('"')) {
      return inputString.slice(1, -1).replace(/\\"/g, '"');
    }
    return inputString.replace(/\\"/g, '"');
  };

  useEffect(() => {
    const getMedicalData = async () => {
      setLoading(true);
      try {
        const prescriptions = await PrescriptionService.getPrescription(
          userId,
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
  }, [isFocused]);

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
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loader}
        />
      ) : medicalHistoryData.length === 0 ? (
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../../../asset/lottie/notfound.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text variant="titleLarge">Chưa có lịch sử nào</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
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
                    style={styles.iconButton}
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
                  styles.listItem,
                  {
                    borderColor: theme.colors.primaryContainer,
                    height: itemHeight - 1,
                  },
                ]}
              />
            </List.Section>
          ))}
        </ScrollView>
      )}
      {/* <DataTable.Pagination
        page={currentPage}
        numberOfPages={totalPages}
        onPageChange={handlePageChange}
        label={`${currentPage + 1} of ${totalPages}`}
        style={styles.pagination}
      /> */}
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
  searchbar: {
    flex: 1,
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
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 260,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  scrollView: {
    marginBottom: 10,
  },
  listItem: {
    borderBottomWidth: 1,
  },
  iconButton: {
    alignSelf: 'center',
  },
});
