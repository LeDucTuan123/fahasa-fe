import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { BookType } from 'src/types/book';

interface ProductState {
  product: BookType[];
  productDetail: BookType | null;
}

const initialState: ProductState = {
  product: [],
  productDetail: null,
};

//  AsyncThunk
export const getProduct = createAsyncThunk('product/getProduct', async (_, thunkApi) => {
  const res = await fetch.get<BookType[]>(apiPaths.book, {
    signal: thunkApi.signal,
  });
  console.log(res.data);
  return res.data;
});

export const getDetailProduct = createAsyncThunk('product/getDetailProduct', async (id: any, thunkApi) => {
  const res = await fetch.get<BookType>(`${apiPaths.book}/${id}`, {
    signal: thunkApi.signal,
  });
  console.log(res.data);
  return res.data;
});

//Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('product/getProduct', (state, action: any) => {
        state.product = action.payload;
      })
      .addCase('product/getDetailProduct', (state, action: any) => {
        const detail: any = state.product.find((post) => post.id === action.payload.id);
        state.productDetail = detail;
      });
  },
});

const productReducer = productSlice.reducer;

export default productReducer;
