import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from '@/entities/session';
import { modalReducer } from '@/entities/modal';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    modal: modalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;