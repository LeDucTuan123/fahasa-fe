import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import fetch from 'src/services/axios/Axios';
// import { CategoryType } from 'src/types';

interface IPositionSearch {
  width: number;
  height: number;
  top: number;
  left: 0;
}

interface CommonState {
  positionSearch: IPositionSearch;
  // category: CategoryType[];
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
  // category: [],
};

// export const getCategory = createAsyncThunk('cate/getcategory', async (_, thunkApi) => {
//   const res = await fetch.get('/rest/category', {
//     signal: thunkApi.signal,
//   });

//   return res.data;
// });

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsShowSearch: (state, action: PayloadAction<boolean>) => {
      state.isShowSearch = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getCategory.fulfilled, (state, action: any) => {
  //     state.category = action.payload;
  //   });
  // },
});

const commonReducer = commonSlice.reducer;
export const { setIsShowSearch } = commonSlice.actions;

export default commonReducer;
