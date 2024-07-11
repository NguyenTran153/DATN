import {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {useTheme, Appbar, IconButton} from 'react-native-paper';

interface AppbarProps {
  title: string;
  goBack: () => void;
  iconButton?: any;
}

const CustomAppbar: React.FC<AppbarProps> = ({title, goBack, iconButton}) => {
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Appbar.Header
        style={{backgroundColor: theme.colors.primary}}
        mode="center-aligned">
        <Appbar.BackAction onPress={goBack} color={'white'} />
        <Appbar.Content title={title} color={'white'} />
        {iconButton && (
          <Appbar.Action
            icon={iconButton.icon}
            onPress={iconButton.onPress}
            color={'white'}
          />
        )}
      </Appbar.Header>
    </>
  );
};

export default CustomAppbar;

const styles = StyleSheet.create({});
