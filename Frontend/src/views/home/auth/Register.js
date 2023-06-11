import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DB_URL } from "../../../config/config";
const URI = DB_URL + 'login'

const {
    registration: {
      user: {
        email,
        password,
        password_confirmation
      },
    },
  } = getState();

  export const getUsers = createAsyncThunk(
    'registration/getUsers',
    async (arg, { getState }) => {
      const {
        registration: {
          user: {
            email,
            password,
            password_confirmation
          },
        },
      } = getState();
  
      return axios
        .post(
          'http://localhost:3001/registrations',
          {
            user: {
              email,
              password,
              password_confirmation,
            },
          },
          { withCredentials: true },
        )
        .then((response) => {
          if (response.data.status === 'created') {
            return response.data;
          }
        });
  });

  const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
      setUsers: (state, action) => {
        const { email, password, password_confirmation } = action.payload;
        state.user = {
          email,
          password,
          password_confirmation,
        };
      },
      setUserProperty: (state, action) => {
        const { name, value } = action.payload;
        state.user[name] = value;
      },
    },
    extraReducers: {
      [getUsers.pending]: (state, action) => {
        state.loading = true;
      },
      [getUsers.fulfilled]: (state, action) => {
        state.user = action.payload;
        state.loading = false;
      },
      [getUsers.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    },
  });


