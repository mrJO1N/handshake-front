import { Button, Input } from '@/shared/ui';
import { PostList } from '@/widgets/post-list';
import { usePosts } from '@/entities/post';
import { FC } from 'react';
import { selectIsAuth } from '@/entities/session';
import styles from './PostsPage.module.sass';
import clsx from "clsx"
import { useSelector } from 'react-redux';
import { usePostsPageState } from '../model/usePostsPageState';
import { useModal } from '@/widgets/modal-root';

export const PostsPageMobile: FC = () => {
    const { query, searchValue, setSearchValue, handleSearch } = usePostsPageState()
    const { open } = useModal()

    const isAuth = useSelector(selectIsAuth);

    const { data: posts = [], isLoading, isError } = usePosts(query);

    return (
        <div className={styles.postList} >
            <div className={clsx(styles.filters, styles.mobile)}>
                <Button className={styles.mobile} variant="colored" onClick={() => open("createPost")} disabled={!isAuth} title={isAuth ? "создать пост" : "должен быть авторизован"}>
                    +
                </Button>
                <Input
                    className={styles.mobile}
                    variant="search"
                    placeholder="Поиск"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={handleSearch}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
            </div>

            {isError ? (
                <p>Не удалось загрузить посты</p>
            ) : (
                <PostList posts={posts} isLoading={isLoading} />
            )}

        </div>
    );
};