import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiPaths } from 'src/services/api/path-api';
import fetch from 'src/services/axios';
import { ToolType } from 'src/types/tool';

interface ToolState {
  tools: ToolType[];
}

const initialState: ToolState = {
  tools: [],
};

export const getTools = createAsyncThunk('tools/getTools', async (_, thunkApi) => {
  const res = await fetch.get<ToolType[]>(apiPaths.school, {
    signal: thunkApi.signal,
  });
  return res.data;
});

const ToolSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTools.fulfilled, (state, action) => {
      state.tools = action.payload;
    });
  },
});

const toolReducer = ToolSlice.reducer;
// export const {} = ToolSlice.actions;

export default toolReducer;
