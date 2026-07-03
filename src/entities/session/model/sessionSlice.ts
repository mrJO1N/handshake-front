import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '@/entities/user';

export interface SessionState {
  user: IUser | null;
  accessToken: string | null;
}

const initialState: SessionState = {
  user: null,
  accessToken: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (
      state,
      action: PayloadAction<{ user: IUser; accessToken: string }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearSession: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;