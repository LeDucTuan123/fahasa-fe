import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import bookReducer from './slice/bookSlice';
import commonReducer from './slice/commonSlice';
import toolReducer from './slice/ToolSlice';
// ...

export const store = configureStore({
  reducer: {
    book: bookReducer,
    common: commonReducer,
    tool: toolReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
