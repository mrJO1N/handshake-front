import clsx from 'clsx';
import styles from './ThemeToggle.module.sass';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle = ({ isDark, onToggle, className }: ThemeToggleProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.toggle, className)}
      onClick={onToggle}
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
