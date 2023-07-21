import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { AuthState } from '@/types/auth';

const initialState: AuthState = {
  status: false,
  loading: false
};

export const authSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    updateAuthState: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const { updateAuthState } = authSlice.actions;
export const authState = (state: RootState) => state.auth;
export default authSlice.reducer;
