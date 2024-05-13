import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: UserData = {
    createdAt: '',
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    role: '',
    updatedAt: ''
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.createdAt = action.payload.createdAt;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.id = action.payload.id;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
      state.updatedAt = action.payload.updatedAt;
    },
   
  },
});

export const {setUser} =
  userSlice.actions;
// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer;
