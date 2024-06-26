import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  Appbar,
  Card,
  useTheme,
  Text,
  Icon,
  TouchableRipple,
} from 'react-native-paper';

const HomeScreen = ({navigation}: any) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background, flex: 1}}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header
        mode="center-aligned"
        style={{backgroundColor: theme.colors.primary}}>
        <Appbar.Content
          title="Kết nối bệnh nhân"
          color={theme.colors.background}
        />
        <Appbar.Action
          color={theme.colors.background}
          icon="qrcode"
          onPress={() => {}}
        />
        <Appbar.Action
          icon="bell"
          color={theme.colors.background}
          onPress={() => {
            navigation.navigate('HomeNavigator', {
              screen: 'NotificationScreen',
            });
          }}
        />
      </Appbar.Header>
      <ScrollView style={{flex: 1, marginTop: 30}}>
        <View style={styles.rowView}>
          <TouchableRipple
            style={[
              styles.pressContainer,
              {
                borderColor: theme.colors.onBackground,
                backgroundColor: theme.colors.background,
              },
            ]}
            onPress={() => {
              navigation.navigate('HomeNavigator', {
                screen: 'BookingScreen',
              });
            }}>
            <>
              <Text
                style={[
                  styles.textButton,
                  {
                    color: theme.colors.onPrimaryContainer,
                  },
                ]}
                variant="titleLarge">
                Đặt Lịch
              </Text>
              <Icon
                source={'calendar'}
                size={64}
                color={theme.colors.onPrimaryContainer}
              />
            </>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.pressContainer,
              {
                borderColor: theme.colors.onBackground,
                backgroundColor: theme.colors.background,
              },
            ]}
            onPress={() => {
              navigation.navigate('ProfileNavigator', {
                screen: 'PatientDiaryScreen',
                params: {patientId: null},
              });
            }}>
            <>
              <Text
                style={[
                  styles.textButton,
                  {
                    color: theme.colors.onPrimaryContainer,
                  },
                ]}
                variant="titleLarge">
                Viết nhật ký
              </Text>
              <Icon
                source={'note-edit'}
                size={64}
                color={theme.colors.onPrimaryContainer}
              />
            </>
          </TouchableRipple>
        </View>
        <View style={styles.rowView}>
          <TouchableRipple
            style={[
              styles.pressContainer,
              {
                borderColor: theme.colors.onBackground,
                backgroundColor: theme.colors.background,
              },
            ]}
            onPress={() => {
              navigation.navigate('HomeNavigator', {
                screen: 'PrescriptionListScreen',
              });
            }}>
            <>
              <Text
                style={[
                  styles.textButton,
                  {
                    color: theme.colors.onPrimaryContainer,
                  },
                ]}
                variant="titleMedium">
                Tra cứu đơn thuốc
              </Text>
              <Icon
                source={'pill'}
                size={64}
                color={theme.colors.onPrimaryContainer}
              />
            </>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.pressContainer,
              {
                borderColor: theme.colors.onBackground,
                backgroundColor: theme.colors.background,
              },
            ]}
            onPress={() => {
              navigation.navigate('HomeNavigator', {
                screen: 'ScheduleScreen',
              });
            }}>
            <>
              <Text
                style={[
                  styles.textButton,
                  {
                    color: theme.colors.onPrimaryContainer,
                  },
                ]}
                variant="titleLarge">
                Tra cứu lịch hẹn
              </Text>
              <Icon
                source={'book-search-outline'}
                size={64}
                color={theme.colors.onPrimaryContainer}
              />
            </>
          </TouchableRipple>
        </View>
        <View style={styles.rowView}>
          <TouchableRipple
            style={[
              styles.pressContainer,
              {
                borderColor: theme.colors.onBackground,
                backgroundColor: theme.colors.background,
              },
            ]}>
            <>
              <Text
                style={[
                  styles.textButton,
                  {
                    color: theme.colors.onPrimaryContainer,
                  },
                ]}
                variant="titleMedium">
                Tra cứu kết quả khám bệnh
              </Text>
              <Icon
                source={'text-box-search-outline'}
                size={64}
                color={theme.colors.onPrimaryContainer}
              />
            </>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.pressContainer,
              {
                borderColor: theme.colors.onBackground,
                backgroundColor: theme.colors.background,
              },
            ]}
            onPress={() => {
              navigation.navigate('ProfileNavigator', {
                screen: 'DiaryRecordScreen',
                params: {patientId: null},
              });
            }}>
            <>
              <Text
                style={[
                  styles.textButton,
                  {
                    color: theme.colors.onPrimaryContainer,
                  },
                ]}
                variant="titleLarge">
                Tra cứu nhật ký
              </Text>
              <Icon
                source={'chat-question'}
                size={64}
                color={theme.colors.onPrimaryContainer}
              />
            </>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  pressContainer: {
    width: '40%',
    height: 150,
    borderWidth: 1,
    borderRadius: 8,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
    alignContent: 'center',
    paddingTop: 20,
    gap: 8,
  },
  rowView: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  textButton: {
    fontWeight: '600',
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
