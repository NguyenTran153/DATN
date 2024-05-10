import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MedicalOrderItem {
  id: number;
  name: string;
  category: string;
  image: any;
  price: number;
  quantity: number;
}

interface MedicalOrderState {
  orderList: MedicalOrderItem[];
  orderPrice: number;
}

const initialState: MedicalOrderState = {
  orderList: [],
  orderPrice: 0,
};

export const medicalOrderSlice = createSlice({
  name: 'medicalOrder',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<MedicalOrderItem>) => {
      const newItem = action.payload;
      const existingItem = state.orderList.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.orderList.push(newItem);
      }

      // Recalculate order price
      state.orderPrice = state.orderList.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemToRemove = state.orderList.find(item => item.id === itemId);

      if (itemToRemove) {
        state.orderList = state.orderList.filter(item => item.id !== itemId);
      }

      // Recalculate order price
      state.orderPrice = state.orderList.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemToUpdate = state.orderList.find(item => item.id === itemId);

      if (itemToUpdate) {
        itemToUpdate.quantity++;
      }

      state.orderPrice = state.orderList.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemToUpdate = state.orderList.find(item => item.id === itemId);

      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity--;
      }

      state.orderPrice = state.orderList.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },

    clearOrder: state => {
      state.orderList = [];
      state.orderPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearOrder,
  increaseQuantity,
  decreaseQuantity,
} = medicalOrderSlice.actions;

export default medicalOrderSlice.reducer;
