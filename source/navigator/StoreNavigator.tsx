import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import ProductCard from '../components/ProductCard';
import {StoreRoutes} from '../Routes/Route';

const Stacks = createNativeStackNavigator<StoreRoutes>();

const StoreNavigator = () => {
  return (
    <Stacks.Navigator>
      <Stacks.Screen name="StoreScreen" component={StoreScreen} />
      <Stacks.Screen name="ProductScreen" component={ProductScreen} />
      <Stacks.Screen name="CartScreen" component={CartScreen} />
    </Stacks.Navigator>
  );
};

export default StoreNavigator;
