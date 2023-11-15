import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios';
import { BookType } from 'src/types/book';

interface BookState {
  books: BookType[];
  bookDetail: BookType | null;
}

const initialState: BookState = {
  books: [],
  bookDetail: null,
};

//  AsyncThunk
export const getBook = createAsyncThunk('book/getBook', async (_, thunkApi) => {
  const res = await fetch.get<BookType[]>(`${apiPaths.book}`, {
    signal: thunkApi.signal,
  });
  return res.data;
});

export const getDetailBook = createAsyncThunk('book/getDetailBook', async (id: any, thunkApi) => {
  const res = await fetch.get<BookType>(`${apiPaths.book}/${id}`, {
    signal: thunkApi.signal,
  });
  console.log(res.data);
  return res.data;
});

//Slice
const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBook.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase('book/getDetailBook', (state, action: any) => {
        const detail: any = state.books.find((post) => post.id === action.payload.id);
        state.bookDetail = detail;
      });
  },
});

const bookReducer = BookSlice.reducer;

export default bookReducer;
