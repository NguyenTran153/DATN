import {StyleSheet} from 'react-native';
import {useTheme, Appbar} from 'react-native-paper';

interface AppbarProps {
  title: string;
  goBack: () => void;
  iconButton?: any;
}

const CustomAppbar: React.FC<AppbarProps> = ({title, goBack}) => {
  const theme = useTheme();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default CustomAppbar;

const styles = StyleSheet.create({});
