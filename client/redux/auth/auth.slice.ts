import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../../types';
import setAuthToken from '../../utils/setAuthToken.util';

interface AuthState {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  token: typeof window != 'undefined' ? localStorage.getItem('token') : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.warn(action.payload);

        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, state => {
        localStorage.removeItem('token');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.token = null;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('payload: ' + action.payload);

        localStorage.setItem('token', action.payload.token);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, state => {
        localStorage.removeItem('token');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    // setting auth header
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      return rejectWithValue('You have no token');
    }
    try {
      const res = await axios.get('/api/auth');
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { handle: string; password: string }) => {
    try {
      const res = await axios.post('/api/auth', credentials);
      console.warn('res: ' + res);
      return;

      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      return error;
    }
  }
);
