import { IPostContent, PostCard, PostCardSkeleton } from '@/entities/post';
import { FC } from 'react';
import styles from './PostList.module.sass';

interface PostListProps {
    posts: IPostContent[];
    isLoading?: boolean;
}

const SKELETON_COUNT = 5;

export const PostList: FC<PostListProps> = ({ posts, isLoading }) => (
    <div className={styles.posts}>
        {isLoading
            ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <PostCardSkeleton key={i} />
            ))
            : posts.map((post, i) => <PostCard content={post} key={post.id ?? i} />)}
    </div>
);