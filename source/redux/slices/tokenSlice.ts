import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: Token = {
  accessToken:"",
  refreshToken:""
};

export const tokenSlice = createSlice({
  name: 'token',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Token>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
   
  },
});

export const {setToken} =
  tokenSlice.actions;
// Other code such as selectors can use the imported `RootState` type

export default tokenSlice.reducer;
