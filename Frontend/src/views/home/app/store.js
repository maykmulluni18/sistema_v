import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../auth/Authen";

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});