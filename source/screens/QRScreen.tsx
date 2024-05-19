import {SafeAreaView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';
import QRLoginID from './QRLoginID';
const QRScreen = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>
          Kết bạn bằng mã QR:
        </Text>
        <View style={{marginVertical: 5}}>
          <QRLoginID />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: theme.colors.primary,
              textDecorationLine: 'underline',
            }}>
            datn://users/123
          </Text>
          <IconButton
            icon="content-copy"
            iconColor={theme.colors.primary}
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default QRScreen;
