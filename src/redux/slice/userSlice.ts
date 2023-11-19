import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const userData = createAsyncThunk('user/userData', async () => {
  try {
    const storedToken = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/v1/user', {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    userData: null,
    error: null as string | null,
  },
  reducers: {
    // login: (state, action) => {
    //   state.user = action.payload;
    //   state.isLogin = true;
    // },
    // setIsLogin: (state, action) => {
    //   state.isLogin = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userData.pending, (state) => {
        state.loading = true;
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(userData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message === 'Request failed with status code 401'
            ? 'Invalid email or password'
            : 'Lỗi fetch data';
      });
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
