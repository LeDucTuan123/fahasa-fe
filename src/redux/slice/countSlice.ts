import { createSlice } from '@reduxjs/toolkit';

interface CountState {
  count: number;
  temp: number;
}

const initialState: CountState = {
  count: 0,
  temp: 0,
};

const CountSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increase: (state) => {
      state.temp += 1;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

const countReducer = CountSlice.reducer;
export const { increase, setCount } = CountSlice.actions;

export default countReducer;
