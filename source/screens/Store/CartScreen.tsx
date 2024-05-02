import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import CartItem from '../../components/CartItem';
import {useDispatch, useSelector} from 'react-redux';

const CartScreen = () => {
  const theme = useTheme();
  const CartList = [];

  const dispatch = useDispatch();

  const counter = useSelector((state: any) => state.counter.value);
  console.log('Counter: ' + counter);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          {CartList.length === 0 ? <View></View> : <View></View>}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
