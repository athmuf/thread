import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthDialogState } from './types';

const initialState: AuthDialogState = {
  open: false,
  type: 'login',
};

const authDialogSlice = createSlice({
  name: 'auth-dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<'login' | 'register'>) => {
      state.open = true;
      state.type = action.payload;
    },
    closeDialog: state => {
      state.open = false;
    },
  },
});

export const { openDialog, closeDialog } = authDialogSlice.actions;
export default authDialogSlice.reducer;
