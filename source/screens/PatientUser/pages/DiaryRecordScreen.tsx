import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Searchbar,
  useTheme,
  Text,
  IconButton,
  ActivityIndicator,
  SegmentedButtons,
  Appbar,
  Card,
  Avatar,
} from 'react-native-paper';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import DiaryService from '../../../services/DiaryService';

interface Entry {
  id: string;
  createdAt: string;
  data: {
    time?: string;
    food?: string;
    bloodPressure?: string;
    bloodSugar?: string;
    exercise?: string;
    note?: string;
    morning?: string;
    afternoon?: string;
    evening?: string;
  };
  type: string;
}

const DiaryRecordScreen = ({navigation}: any) => {
  const theme = useTheme();
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: any) => state.user);
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [currentType, setCurrentType] = useState<string>('food');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const fetchedEntries = await DiaryService.getDiaries(
          token.accessToken,
          1,
          100,
          user.id,
          currentType,
        );
        setEntries(fetchedEntries);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [isFocused, currentType]);

  useEffect(() => {
    const filtered = searchQuery
      ? entries.filter(entry => {
          const searchDate = moment(
            searchQuery,
            ['DD/MM/YYYY', 'DD-MM-YYYY', 'DD', 'MM', 'DD/MM'],
            true,
          );
          const createdAtMatch = searchDate.isValid()
            ? moment(entry.createdAt).isSame(searchDate, 'day')
            : false;

          const timeMatch =
            entry.data.time && moment(entry.data.time, 'HH:mm:ss').isValid()
              ? moment(entry.data.time, 'HH:mm:ss').isSame(searchDate, 'day')
              : false;

          const dataMatch = Object.values(entry.data).some(value =>
            value.toLowerCase().includes(searchQuery.toLowerCase()),
          );

          const foodMatch =
            entry.data.morning
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            entry.data.afternoon
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            entry.data.evening
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase());

          return createdAtMatch || timeMatch || dataMatch || foodMatch;
        })
      : entries;
    setFilteredEntries(filtered);
  }, [searchQuery, entries]);

  const EntryItem = ({entry}: {entry: Entry}) => {
    const renderContent = () => {
      switch (entry.type) {
        case 'food':
          return (
            <>
              <View style={styles.entryRow}>
                <Avatar.Icon
                  size={24}
                  icon="calendar"
                  style={{backgroundColor: theme.colors.primary}}
                />
                <Text style={styles.entryText}>
                  Ngày: {moment(entry.createdAt).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={styles.entryRow}>
                <Avatar.Icon
                  size={24}
                  icon="food"
                  style={{backgroundColor: theme.colors.primary}}
                />
                <Text style={styles.entryText}>Sáng: {entry.data.morning}</Text>
              </View>
              <View style={styles.entryRow}>
                <Avatar.Icon
                  size={24}
                  icon="food"
                  style={{backgroundColor: theme.colors.primary}}
                />
                <Text style={styles.entryText}>
                  Trưa: {entry.data.afternoon}
                </Text>
              </View>
              <View style={styles.entryRow}>
                <Avatar.Icon
                  size={24}
                  icon="food"
                  style={{backgroundColor: theme.colors.primary}}
                />
                <Text style={styles.entryText}>Tối: {entry.data.evening}</Text>
              </View>
            </>
          );
        case 'blood_pressure':
          return (
            <>
              <View style={styles.entryRow}>
                <Avatar.Icon
                  size={24}
                  icon="clock"
                  style={{backgroundColor: theme.colors.primary}}
                />
                <Text style={styles.entryText}>
                  Thời gian: {entry.data.time}
                </Text>
              </View>
              <View style={styles.entryRow}>
                <Avatar.Icon
                  size={24}
                  icon="heart-pulse"
                  style={{backgroundColor: theme.colors.primary}}
                />
                <Text style={styles.entryText}>
                  Huyết áp: {entry.data.bloodPressure}
                </Text>
              </View>
            </>
          );
        case 'blood_sugar':
          return (
            <>
              <View style={styles.entryRow}>
                <Avatar.Icon
                  size={24}
                  icon="clock"
                  style={{backgroundColor: theme.colors.primary}}
                />
                <Text style={styles.entryText}>
                  Thời gian: {entry.data.time}
                </Text>
              </View>
              <View style={styles.entryRow}>
                <Avatar.Icon
                  size={24}
                  icon="water"
                  style={{backgroundColor: theme.colors.primary}}
                />
                <Text style={styles.entryText}>
                  Đường huyết: {entry.data.bloodSugar}
                </Text>
              </View>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <Card style={[styles.card, {backgroundColor: theme.colors.surface}]}>
        <Card.Content>{renderContent()}</Card.Content>
      </Card>
    );
  };

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
      <SegmentedButtons
        value={currentType}
        onValueChange={setCurrentType}
        buttons={[
          {value: 'food', label: 'Ăn uống'},
          {value: 'blood_sugar', label: 'Đường huyết'},
          {value: 'blood_pressure', label: 'Huyết áp'},
        ]}
        style={styles.segmentedButtons}
      />
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}>
          {filteredEntries.length ? (
            filteredEntries.map(entry => (
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
  segmentedButtons: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryText: {
    marginLeft: 8,
  },
});
