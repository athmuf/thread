import {createSlice} from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit';

const getThreads: CaseReducer<State, PayloadAction<number>> = (state, action) => state + action.payload

const threads = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    getThreads: 
  }
});
