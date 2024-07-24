import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import ItemCatalog from '../../components/ItemCatalog';

const DoctorServiceScreen = ({navigation}: any) => {
  const theme = useTheme();

  const serviceGroupListCatalog = [
    {
      ServiceCatalogID: 4,
      AirtimeServiceGroupID: 2,
      AirtimeServiceGroupName: 'Đặt lịch hẹn',
      source: require('../../asset/booking.png'),
      screen: 'BookingScreen',
    },
    {
      ServiceCatalogID: 4,
      AirtimeServiceGroupID: 8,
      AirtimeServiceGroupName: 'Đặt đơn thuốc',
      source: require('../../asset/medicine.png'),
      screen: 'PatientSelectionScreen',
    },
  ];

  const handleNavigation = (item: any) => {
    if (item.screen) {
      //@ts-ignore
      navigation.navigate('HomeNavigator', {
        screen: item?.screen,
      });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Appbar.Header>
        <Appbar.Content title="Danh mục dịch vụ" />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <FlatList
          data={serviceGroupListCatalog}
          keyExtractor={(item, index) => `${index} `}
          renderItem={({item, index}) => (
            <ItemCatalog
              item={item}
              index={index}
              handleNavigation={() => handleNavigation(item)}
            />
          )}
          bounces={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default DoctorServiceScreen;

const styles = StyleSheet.create({});
