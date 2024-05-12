import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

interface AppbarProps {
  title: string;
  goBack: () => void;
  iconButton?: any;
}

const CustomAppbar: React.FC<AppbarProps> = ({title, goBack}) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default CustomAppbar;

const styles = StyleSheet.create({});

