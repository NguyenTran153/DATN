import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StoreScreen from '../screens/Store/StoreScreen';
import ProductScreen from '../screens/Store/ProductScreen';
import CartScreen from '../screens/Store/CartScreen';
import {StoreRoutes} from '../Routes/Route';

const Stacks = createNativeStackNavigator<StoreRoutes>();

const StoreNavigator = () => {
  return (
    <Stacks.Navigator>
      <Stacks.Screen name="StoreScreen" component={StoreScreen} />
      <Stacks.Screen name="ProductScreen" component={ProductScreen} />
      <Stacks.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Giỏ hàng',
        }}
      />
    </Stacks.Navigator>
  );
};

export default StoreNavigator;
