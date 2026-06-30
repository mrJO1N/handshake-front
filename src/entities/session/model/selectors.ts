import type { RootState } from '@/app/store';

export const selectUser = (s: RootState) => s.session.user;
export const selectAccessToken = (s: RootState) => s.session.accessToken;
export const selectIsAuth = (s: RootState) => Boolean(s.session.accessToken);