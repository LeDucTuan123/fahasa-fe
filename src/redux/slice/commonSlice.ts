import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IPositionSearch {
  width: number;
  height: number;
  top: number;
  left: 0;
}

interface CommonState {
  positionSearch: IPositionSearch;
  isShowSearch: boolean;
}

const initialState: CommonState = {
  positionSearch: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  isShowSearch: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsShowSearch: (state, action: PayloadAction<boolean>) => {
      state.isShowSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase
  },
});

const commonReducer = commonSlice.reducer;
export const { setIsShowSearch } = commonSlice.actions;

export default commonReducer;
