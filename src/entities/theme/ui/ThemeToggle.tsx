import { useDispatch, useSelector } from 'react-redux';
import { ThemeToggle as ThemeToggleView } from '@/shared/ui';
import { selectTheme } from '../model/selectors';
import { toggleTheme } from '../model/themeSlice';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <ThemeToggleView
      isDark={theme === 'dark'}
      onToggle={() => dispatch(toggleTheme())}
      className={className}
    />
  );
};
