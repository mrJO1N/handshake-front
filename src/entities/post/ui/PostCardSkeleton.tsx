import styles from './PostCardSkeleton.module.sass';

export const PostCardSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.header}>
      <span className={styles.titleBar} />
    </div>
    <div className={styles.content}>
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  </div>
);