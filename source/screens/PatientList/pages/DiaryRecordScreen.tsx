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
  ActivityIndicator,
} from 'react-native-paper';
import moment from 'moment';
import LottieView from 'lottie-react-native';

import EntryItem from '../../../components/EntryItem';
import DiaryService from '../../../services/DiaryService';
import {useSelector} from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

interface Entry {
  id: string;
  createdAt: string;
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
  const isFocused = useIsFocused();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const entriesPerPage = 7;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const fetchedEntries = await DiaryService.getDiaries(
          token.accessToken,
          1, // default page
          entriesPerPage,
          patientId,
        );
        setEntries(fetchedEntries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
        setLoading(false);
      }
    };

    fetchEntries();
  }, [isFocused]);

  useEffect(() => {
    const filtered = entries.filter(entry => {
      const entryDate = moment(entry.createdAt).format('DD-MM-YYYY');
      const entryDateSlash = moment(entry.createdAt).format('DD/MM/YYYY');
      const entryTime = entry.data.time
        ? moment(entry.data.time, 'HH:mm:ss').format('DD-MM-YYYY')
        : '';
      const entryTimeSlash = entry.data.time
        ? moment(entry.data.time, 'HH:mm:ss').format('DD/MM/YYYY')
        : '';
      const searchText = searchQuery.toLowerCase();

      return (
        entryDate.includes(searchText) ||
        entryDateSlash.includes(searchText) ||
        (entryTime && entryTime.includes(searchText)) ||
        (entryTimeSlash && entryTimeSlash.includes(searchText)) ||
        (entry.data.food &&
          entry.data.food.toLowerCase().includes(searchText)) ||
        (entry.data.bloodPressure &&
          entry.data.bloodPressure.toLowerCase().includes(searchText)) ||
        (entry.data.bloodSugar &&
          entry.data.bloodSugar.toLowerCase().includes(searchText)) ||
        (entry.data.exercise &&
          entry.data.exercise.toLowerCase().includes(searchText)) ||
        (entry.data.note && entry.data.note.toLowerCase().includes(searchText))
      );
    });
    setFilteredEntries(filtered);
    setCurrentPage(0);
  }, [searchQuery, entries]);

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
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.loading}
        />
      ) : (
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
      )}

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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
