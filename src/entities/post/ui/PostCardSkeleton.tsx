import { useIsMobile } from '@/shared/lib/hooks';
import styles from './PostCardSkeleton.module.sass';
import clsx from 'clsx';

export const PostCardSkeleton = () => {
  const isMobile = useIsMobile()

  return (
    <div className={clsx(styles.skeleton, isMobile && styles.mobile)}>
      <div className={styles.header}>
        <span className={styles.titleBar} />
      </div>
      <div className={styles.content}>
        <span className={styles.line} />
        <span className={styles.line} />
      </div>
    </div>
  );
}