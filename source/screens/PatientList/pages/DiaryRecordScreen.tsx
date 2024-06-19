import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Searchbar,
  useTheme,
  Text,
  IconButton,
  DataTable,
  Appbar,
} from 'react-native-paper';
import moment from 'moment';
import LottieView from 'lottie-react-native';

import EntryItem from '../../../components/EntryItem';
import DiaryService from '../../../services/DiaryService';
import {useSelector} from 'react-redux';

interface Entry {
  id: string;
  createdAt: string; // Thay đổi từ 'date' thành 'createdAt'
  data: {
    time: string;
    food: string;
    bloodPressure: string;
    bloodSugar: string;
    exercise: string;
    note: string;
  };
}

const DiaryRecordScreen = ({route}: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token);
  const patientId = route.params.patient.id;

  const [searchDate, setSearchDate] = useState<string>('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const entriesPerPage = 7;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await DiaryService.getDiaries(
          token.accessToken,
          1, // default page
          entriesPerPage,
          patientId,
        );
        setEntries(fetchedEntries);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };

    fetchEntries();
  }, [token.accessToken, patientId]);

  useEffect(() => {
    const filtered = searchDate
      ? entries.filter(entry =>
          moment(entry.createdAt).isSame(moment(searchDate), 'day'),
        )
      : entries;
    setFilteredEntries(filtered);
    setCurrentPage(0);
  }, [searchDate, entries]);

  const startIndex = currentPage * entriesPerPage;
  const paginatedEntries = filteredEntries.slice(
    startIndex,
    startIndex + entriesPerPage,
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header>
        <Appbar.Content title="Nhật ký" />
      </Appbar.Header>
      <View style={styles.topbar}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Tìm kiếm"
          onChangeText={setSearchDate}
          value={searchDate}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}>
        {filteredEntries.length ? (
          paginatedEntries.map(entry => (
            <EntryItem key={entry.id} entry={entry} />
          ))
        ) : (
          <View style={styles.lottie}>
            <LottieView
              source={require('../../../asset/lottie/notfound.json')}
              autoPlay
              loop
              style={{width: 200, height: 200}}
            />
            <Text variant="titleLarge">Chưa có nhật ký nào</Text>
          </View>
        )}
      </ScrollView>

      <DataTable.Pagination
        page={currentPage}
        style={{alignSelf: 'center'}}
        numberOfPages={Math.ceil(filteredEntries.length / entriesPerPage)}
        onPageChange={page => setCurrentPage(page)}
        label={`Page ${currentPage + 1} of ${Math.ceil(
          filteredEntries.length / entriesPerPage,
        )}`}
      />
    </View>
  );
};

export default DiaryRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 8,
  },
  listContainer: {
    padding: 16,
  },
  lottie: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
