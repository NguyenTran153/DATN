import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

const Horizon = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        borderColor: theme.colors.outline,
        width: '100%',
        borderBottomWidth: 1,
        marginVertical: 10,
      }}
    />
  );
};

export default Horizon;
