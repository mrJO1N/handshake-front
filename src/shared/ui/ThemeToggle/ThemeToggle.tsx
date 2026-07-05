import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectTheme, toggleTheme } from '@/entities/theme';
import styles from './ThemeToggle.module.sass';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={clsx(styles.toggle, className)}
      onClick={() => dispatch(toggleTheme())}
      role="switch"
      aria-checked={isDark}
      aria-label="Тёмная тема"
    >
      <span className={styles.track}>
        <span className={styles.thumb}>{isDark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  );
};
