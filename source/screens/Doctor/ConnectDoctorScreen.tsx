import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {IconButton, List, Text, TextInput, useTheme} from 'react-native-paper';
import QRLoginID from '../QRLoginID';
import DropDown from '../../components/DropDown';
import CustomAppbar from '../../components/CustomAppbar';

const ConnectDoctorScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const [domain, setDomain] = useState('');
  const domainList = [
    {
      label: '+84',
      value: '+84',
    },
    {
      label: '+123',
      value: '+123',
    },
    {
      label: '+456',
      value: '+456',
    },
  ];
  return (
    <>
      <CustomAppbar
        title={'Liên hệ với bác sĩ'}
        goBack={() => navigation.goBack()}
      />

      <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={styles.container}>
          <View
            style={[
              styles.qr_wrapper,
              {backgroundColor: theme.colors.primary},
            ]}>
            <View style={styles.qr_container}>
              <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.background,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                Leo Võ
              </Text>
              <View style={{marginBottom: 10}}>
                <QRLoginID />
              </View>
              <Text style={{color: theme.colors.background, marginBottom: 10}}>
                Quét mã để thêm bạn với tôi
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <DropDown
              label={'Domain'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={domain}
              setValue={setDomain}
              list={domainList}
              inputProps={{
                style: {
                  height: 50,
                  alignSelf: 'center',
                  width: 90,
                },
              }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.background,
                  marginTop: 5,
                  marginLeft: 5,
                },
              ]}
              placeholder="Nhập số điện thoại"
              inputMode="numeric"
              onChangeText={text => console.log(text)}
              underlineColor="transparent"
            />
            <IconButton icon="arrow-right" onPress={() => {}} />
          </View>
          <View style={{width: '100%', justifyContent: 'flex-start'}}>
            <List.Section>
              <List.Item
                title="Quét mã QR"
                left={() => (
                  <List.Icon style={styles.settingCenter} icon="qrcode" />
                )}
                onPress={() => {}}
              />
              <List.Item
                title="Danh bạ máy"
                left={() => (
                  <List.Icon style={styles.settingCenter} icon="contacts" />
                )}
                onPress={() => {}}
              />
              <List.Item
                title="Bạn bè có thể quen"
                left={() => (
                  <List.Icon style={styles.settingCenter} icon="account" />
                )}
                onPress={() => {}}
              />
            </List.Section>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ConnectDoctorScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  settingCenter: {
    paddingLeft: 20,
  },
  qr_container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  qr_wrapper: {
    borderRadius: 10,
    width: 250,
    height: 250,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    width: 220,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },
});
