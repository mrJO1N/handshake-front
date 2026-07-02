import { type FC } from 'react';
import type { IPostContent } from '../model/types';
import styles from './PostCard.module.sass';

interface IPostProps {
  id?: string;
  content: IPostContent;
}

export const PostCard: FC<IPostProps> = ({ id, content }) => {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <span className={styles.title}>{content.title.toUpperCase()}</span>
        {content.author && (
          <>
            <div className={styles.separator} />
            <span className={styles.postId}>автор: {content.author}</span>
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