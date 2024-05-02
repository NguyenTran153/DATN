import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MedicalOrderItem {
  id: string; // Unique identifier for the medicine
  name: string; // Name of the medicine
  price: number; // Price as a string for precision
  quantity: number; // Quantity of the medicine
}

interface MedicalOrderState {
  orderList: MedicalOrderItem[]; // List of ordered medicines
  orderPrice: any; // Total price of the order
}

const initialState: MedicalOrderState = {
  orderList: [],
  orderPrice: '0.00',
};

export const medicalOrderSlice = createSlice({
  name: 'medicalOrder',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<MedicalOrderItem>) => {
      const newItem = action.payload;
      const existingItemIndex = state.orderList.findIndex(
        item => item.id === newItem.id,
      );

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        state.orderList[existingItemIndex].quantity += newItem.quantity;
      } else {
        // New item, add to the list
        state.orderList.push(newItem);
      }

      // Recalculate order price
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const updatedOrderList = state.orderList.filter(
        item => item.id !== itemId,
      );
      state.orderList = updatedOrderList;

      // Recalculate order price
    },

    updateQuantity: (
      state,
      action: PayloadAction<{id: string; quantity: number}>,
    ) => {
      const {id, quantity} = action.payload;
      const updatedOrderList = state.orderList.map(item => {
        if (item.id === id) {
          return {...item, quantity};
        } else {
          return item;
        }
      });
      state.orderList = updatedOrderList;

      // Recalculate order price
    },

    calculateOrderPrice: state => {
      const totalOrderPrice = state.orderList.reduce((acc, item) => {
        const itemTotalPrice = item.price * item.quantity; // No need for parseFloat
        return acc + itemTotalPrice;
      }, 0);

      // Update the state directly
      state.orderPrice = totalOrderPrice.toFixed(2);
    },

    clearOrder: state => {
      state.orderList = [];
      state.orderPrice = '0.00';
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  calculateOrderPrice,
  clearOrder,
} = medicalOrderSlice.actions;

export default medicalOrderSlice.reducer;
