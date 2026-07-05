import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../model/selectors';
import { THEME_STORAGE_KEY } from '../model/themeSlice';

export const useThemeSync = () => {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);
};
