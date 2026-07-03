import type { SessionState } from './sessionSlice';

interface SessionRootState {
  session: SessionState;
}

export const selectUser = (s: SessionRootState) => s.session.user;
export const selectAccessToken = (s: SessionRootState) => s.session.accessToken;
export const selectIsAuth = (s: SessionRootState) => Boolean(s.session.accessToken);
