import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
// import fetch from 'src/services/axios/Axios';
// import { CategoryType } from 'src/types';

interface IPositionSearch {
  width: number;
  height: number;
  top: number;
  left: 0;
}
interface favoriteType {
  userId: number;
  bookId?: number | null;
  schooltoolId?: number | null;
}

interface CommonState {
  positionSearch: IPositionSearch;
  // category: CategoryType[];
  category: string;
  textSearchValue: string;
  isShowSearch: boolean;

  catelvId: number | null;
  id: number | null;
  parenCategory: string | null;
  favorite: any;
  isFavorite: boolean;
  // favoriteTool: any;
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
  catelvId: null,
  id: null,
  parenCategory: '',
  favorite: [],
  isFavorite: false,
  // favoriteTool: [],
  // category: [],
};

export const addToFavoriteBook = createAsyncThunk(
  'favorite/setFavoriteBook',
  async ({ userId, bookId }: favoriteType, { getState }) => {
    const postFavorite = fetch({
      url: 'http://localhost:8080/rest/favorite',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        user: { id: userId },
        book: { id: bookId },
      }),
    });
    return postFavorite;
  },
);

export const addToFavoriteTool = createAsyncThunk(
  'favorite/setFavoriteTool',
  async ({ userId, schooltoolId }: favoriteType, { getState }) => {
    const postFavorite = fetch({
      url: 'http://localhost:8080/rest/favorite',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        user: { id: userId },
        schooltool: { id: schooltoolId },
      }),
    });
    return postFavorite;
  },
);

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
    setCatelvId: (state, action: PayloadAction<number | null>) => {
      state.catelvId = action.payload;
    },
    setId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
    setParentCategory: (state, action: PayloadAction<string>) => {
      state.parenCategory = action.payload;
    },
    setFavorite: (state, action: PayloadAction<[]>) => {
      state.favorite = action.payload;
    },
    // addFavoriteTool: (state, action: PayloadAction<favoriteType>) => {
    //   state.favoriteTool = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(addToFavoriteBook.fulfilled, (state, action) => {
      state.favorite = action.payload;
      state.isFavorite = true;
    });
    builder.addCase(addToFavoriteTool.fulfilled, (state, action) => {
      state.favorite = action.payload;
      state.isFavorite = true;
    });
  },
});

const commonReducer = commonSlice.reducer;
export const {
  setIsShowSearch,
  setCategory,
  setTextSearchValue,
  setCatelvId,
  setParentCategory,
  setId,
  setFavorite,
  // addFavoriteTool,
} = commonSlice.actions;

export default commonReducer;
