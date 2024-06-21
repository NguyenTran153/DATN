import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface FormData {
  image1: string | null;
  image2: string | null;
  files: any[];
  textarea: string;
  specialitites: any[];
}

const initialFormState: FormData = {
  image1: null,
  image2: null,
  files: [],
  textarea: '',
  specialitites: [],
};

const doctorFormSlice = createSlice({
  name: 'doctorForm',
  initialState: initialFormState,
  reducers: {
    setImage1: (state, action: PayloadAction<string | null>) => {
      state.image1 = action.payload;
    },
    setImage2: (state, action: PayloadAction<string | null>) => {
      state.image2 = action.payload;
    },
    addFiles: (state, action: PayloadAction<any[]>) => {
      state.files = [...state.files, ...action.payload];
    },
    setTextarea: (state, action: PayloadAction<string>) => {
      state.textarea = action.payload;
    },
    setSpecialities: (state, action: PayloadAction<any[]>) => {
      state.specialitites = action.payload;
    },
    resetForm: state => {
      state.image1 = initialFormState.image1;
      state.image2 = initialFormState.image2;
      state.files = initialFormState.files;
      state.textarea = initialFormState.textarea;
      state.specialitites = initialFormState.specialitites;
    },
  },
});

export const {
  setImage1,
  setImage2,
  addFiles,
  setTextarea,
  setSpecialities,
  resetForm,
} = doctorFormSlice.actions;
export default doctorFormSlice.reducer;
