import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios/Axios';
import { ProductType } from 'src/types/product';

interface ProductState {
  product: ProductType[];
}

const initialState: ProductState = {
  product: [],
};

//  AsyncThunk
export const getProduct = createAsyncThunk('product/getProduct', async (_, thunkApi) => {
  const res = await fetch.get<ProductType[]>(apiPaths.book, {
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
    builder.addCase('product/getProduct', (state, action: any) => {
      state.product = action.payload;
    });
  },
});

const productReducer = productSlice.reducer;

export default productReducer;
