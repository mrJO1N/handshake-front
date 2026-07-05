import type { ThemeState } from './themeSlice';

interface ThemeRootState {
  theme: ThemeState;
}

export const selectTheme = (s: ThemeRootState) => s.theme.value;
