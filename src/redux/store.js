import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer
  }
});

export default store;