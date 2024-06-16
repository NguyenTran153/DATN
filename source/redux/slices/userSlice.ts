import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: UserData = {
  address: null,
  avatar: null,
  birthdate: null,
  createdAt: '',
  email: '',
  firstName: '',
  gender: null,
  height: null,
  id: 0,
  lastName: '',
  phoneNumber: '',
  role: '',
  updatedAt: '',
  weight: null,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.address = action.payload.address;
      state.avatar = action.payload.avatar;
      state.birthdate = action.payload.birthdate;
      state.createdAt = action.payload.createdAt;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.gender = action.payload.gender;
      state.height = action.payload.height;
      state.id = action.payload.id;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.role = action.payload.role;
      state.updatedAt = action.payload.updatedAt;
      state.weight = action.payload.weight;
    },
  },
});

export const {setUser} = userSlice.actions;
// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer;
