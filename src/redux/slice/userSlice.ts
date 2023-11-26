import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/userData', async () => {
  try {
    const storedToken = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/v1/user', {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    const userData = response.data;


    console.log('User data:', userData);

    return response.data;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    userData: {},
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
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
