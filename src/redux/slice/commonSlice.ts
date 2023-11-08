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
  category: string;
  textSearchValue: string;
  isShowSearch: boolean;
}

const initialState: CommonState = {
  positionSearch: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  category: 'book',
  textSearchValue: '',
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
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setTextSearchValue: (state, action: PayloadAction<string>) => {
      state.textSearchValue = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getCategory.fulfilled, (state, action: any) => {
  //     state.category = action.payload;
  //   });
  // },
});

const commonReducer = commonSlice.reducer;
export const { setIsShowSearch, setCategory, setTextSearchValue } = commonSlice.actions;

export default commonReducer;
