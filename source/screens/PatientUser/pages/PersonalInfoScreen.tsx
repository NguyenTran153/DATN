import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  List,
  Text,
  useTheme,
  IconButton,
  Button,
  Appbar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';

const PersonalInfoScreen = ({navigation}: any) => {
  const theme = useTheme();
  const user = useSelector((state: any) => state.user);

  const handleUpdatePress = () => {
    navigation.navigate('UpdatePersonalInfoScreen');
  };

  const personalInfo = {
    firstName: user.firstName || 'Chưa cập nhật',
    lastName: user.lastName || 'Chưa cập nhật',
    birthdate: user.birthdate
      ? new Date(user.birthdate).toLocaleDateString()
      : 'Chưa cập nhật',
    gender:
      user.gender === 'male'
        ? 'Nam'
        : user.gender === 'female'
        ? 'Nữ'
        : 'Chưa cập nhật',
    address: user.address || 'Chưa cập nhật',
    height: user.height ? `${user.height} cm` : 'Chưa cập nhật',
    weight: user.weight ? `${user.weight} kg` : 'Chưa cập nhật',
    avatar: user.avatar,
  };

  return (
    <View style={[styles.screen, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header>
        <Appbar.Content title="Thông tin cá nhân" />
        <Appbar.Action icon="pencil" onPress={handleUpdatePress} />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={
              personalInfo.avatar
                ? {uri: personalInfo.avatar}
                : require('../../../asset/7677205.jpg')
            }
            style={styles.avatar}
          />
        </View>
        <List.Section>
          <List.Item
            title="Họ"
            description={personalInfo.firstName}
            left={() => <List.Icon icon="account-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Tên"
            description={personalInfo.lastName}
            left={() => <List.Icon icon="account-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Giới tính"
            description={personalInfo.gender}
            left={() => (
              <List.Icon
                icon={
                  personalInfo.gender === 'Nam'
                    ? 'gender-male'
                    : personalInfo.gender === 'Nữ'
                    ? 'gender-female'
                    : 'gender-non-binary'
                }
              />
            )}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Ngày sinh"
            description={personalInfo.birthdate}
            left={() => <List.Icon icon="calendar" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Cân nặng"
            description={personalInfo.weight}
            left={() => <List.Icon icon="weight" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Chiều cao"
            description={personalInfo.height}
            left={() => <List.Icon icon="ruler" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
          <List.Item
            title="Địa chỉ"
            description={personalInfo.address}
            left={() => <List.Icon icon="home-outline" />}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  listItemTitle: {
    fontWeight: 'bold',
  },
  listItemDescription: {
    color: 'gray',
  },
});
