import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
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

interface Entry {
  id: string;
  createdAt: string; // Date the entry was created
  data: {
    time: string;
    food: string;
    bloodPressure: string;
    bloodSugar: string;
    exercise: string;
    note: string;
  };
}

const DiaryRecordScreen = ({navigation}: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: any) => state.user);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const entriesPerPage = 7;

  // Fetch entries when the component mounts or when token or user ID changes
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true); // Start loading
        const fetchedEntries = await DiaryService.getDiaries(
          token.accessToken,
          1, // default page
          100,
          user.id,
        );
        setEntries(fetchedEntries);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEntries();
  }, [token.accessToken, user.id]);

  // Filter entries based on the search query
  useEffect(() => {
    const filtered = searchQuery
      ? entries.filter(entry => {
          const searchDate = moment(searchQuery, 'YYYY-MM-DD', true);
          const createdAtMatch = searchDate.isValid()
            ? moment(entry.createdAt).isSame(searchDate, 'day')
            : false;

          const dataMatch = Object.values(entry.data).some(value =>
            value.toLowerCase().includes(searchQuery.toLowerCase()),
          );

          return createdAtMatch || dataMatch;
        })
      : entries;
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
        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          size={36}
          onPress={() =>
            navigation.navigate('ProfileNavigator', {
              screen: 'PatientDiaryScreen',
            })
          }
          style={{marginLeft: 8}}
        />
      </View>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
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
        style={{alignSelf: 'center'}}
        page={currentPage}
        numberOfPages={Math.ceil(filteredEntries.length / entriesPerPage)}
        onPageChange={page => setCurrentPage(page)}
        label={`Trang ${currentPage + 1} trên ${Math.ceil(
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
    marginRight: 8,
  },
  listContainer: {
    padding: 16,
  },
  lottie: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
  },
});
