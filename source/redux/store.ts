import {configureStore} from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import medicalOrderSlice from './slices/medicalOrderSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    medicalOrder: medicalOrderSlice,
  },
});
