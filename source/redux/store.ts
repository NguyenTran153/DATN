import {configureStore} from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import medicalOrderSlice from './slices/medicalOrderSlice';
import tokenSlice from './slices/tokenSlice';
import userSlice from './slices/userSlice';
import doctorFormSlice from './slices/doctorFormSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    medicalOrder: medicalOrderSlice,
    token: tokenSlice,
    user: userSlice,
    doctorForm: doctorFormSlice,
  },
});
