import {StyleSheet, View} from 'react-native';
import {useState} from 'react';
import {Avatar, Text, useTheme, IconButton} from 'react-native-paper';

const DoctorCard = ({doctorId}: {doctorId: string}) => {
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.onBackground,
        },
      ]}>
      <View
        style={[
          styles.avatarContainer,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.primary,
          },
        ]}>
        <Avatar.Image size={100} source={require('../asset/7677205.jpg')} />
      </View>
      <View style={styles.inforContainer}>
        <Text variant="titleLarge">TS Bác Sĩ {doctorId}</Text>
        <Text variant="titleMedium">CK: Khám chức năng hô hấp</Text>
        <Text variant="titleMedium">Giới tính: Nam</Text>
      </View>

      <IconButton
        style={[styles.favoriteButton]}
        iconColor={isFavorite ? theme.colors.error : theme.colors.onBackground}
        icon="heart"
        size={24}
        onPress={handleFavoritePress}
      />
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 120,
    marginTop: 20,
    marginLeft: 10,
  },
  inforContainer: {
    flexDirection: 'column',
    marginTop: 30,
    marginLeft: 10,
    width: '60%',
  },
  favoriteButton: {
    right: 20,
  },
});
