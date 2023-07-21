import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { DialogState } from '@/types/dialog';

const initialState: DialogState = {
  open: false
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    updateDialogState: (state, action: PayloadAction<DialogState>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const { updateDialogState } = dialogSlice.actions;
export const dialogState = (state: RootState) => state.dialog;
export default dialogSlice.reducer;
