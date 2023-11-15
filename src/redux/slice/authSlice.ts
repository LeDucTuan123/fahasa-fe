import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        alert('success');
      }

      const data = await response.data;
      console.log('Login successful:', data);

      const token = data.token;

      localStorage.setItem('token', token);

      // Get user - Đọc token từ localStorage
      const storedToken = localStorage.getItem('token');

      await axios
        .get('http://localhost:8080/api/v1/user', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          // Handle successful response
          const userData = response.data;
          console.log('User data:', response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          // Do something with the data here
        })
        .catch((error) => {
          // Handle error
          console.error('Error fetching user data:', error);
          // Optionally, you can check the status code and handle different errors
          if (error.response && error.response.status === 401) {
            console.log('Unauthorized. Redirect to login page, for example.');
          }
        });

      return data;
    } catch (error: any) {
      console.error('Login error:', error.message);
      if (error.message === 'Network Error') {
        alert('Network Error');
      }

      throw error;
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    error: null as string | null,
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLogin = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message === 'Request failed with status code 401'
            ? 'Invalid email or password'
            : 'Email hoặc mật khẩu không đúng';
      });
  },
});

const authReducer = authSlice.reducer;

export const { setIsLogin } = authSlice.actions;

export default authReducer;
