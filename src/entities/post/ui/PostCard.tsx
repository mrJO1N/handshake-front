import { type FC } from 'react';
import type { IPostContent } from '../model/types';
import styles from './PostCard.module.sass';
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile';
import clsx from 'clsx';

interface IPostProps {
  id?: string;
  content: IPostContent;
}

export const PostCard: FC<IPostProps> = ({ id, content }) => {
  const isMobile = useIsMobile();

  return (
    <div className={clsx(styles.post, isMobile && styles.mobile)}>
      <div className={styles.header}>
        <span className={clsx(styles.title, isMobile && styles.mobile)}>{content.title.toUpperCase()}</span>
        {content.author && (
          <>
            <div className={styles.separator} />
            <span className={clsx(styles.postId, isMobile && styles.mobile)}>автор: {content.author}</span>
          </>
        )}
      </div>
      <div className={styles.content}>
        <div>ПОЛЬЗОВАТЕЛЬ ХОЧЕТ: {content.theUserWants}</div>
        <div>ПОЛЬЗОВАТЕЛЬ ДАСТ: {content.theUserOffers}</div>
      </div>
    </div>
  );
}