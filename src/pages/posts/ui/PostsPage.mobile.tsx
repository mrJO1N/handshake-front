import { CreatePostModal } from '@/features/create-post';
import { Button, Input } from '@/shared/ui';
import { PostList } from '@/widgets/post-list';
import { usePosts } from '@/entities/post';
import React, { FC, useState } from 'react';
import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuth } from '@/entities/session';
import styles from './PostsPage.module.sass';
import clsx from "clsx"
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile';

export const PostsPageMobile: FC<{}> = ({ }) => {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [query, setQuery] = useState(''); //search
    const isAuth = useAppSelector(selectIsAuth);

    const isMobile = useIsMobile();

    const { data: posts = [], isLoading, isError } = usePosts(query);

    const handleSearch = () => setQuery(searchValue);

    return (
        <div className={styles.postList} >
            <div className={clsx(styles.filters, styles.mobile)}>
                <Button className={isMobile ? styles.mobile : ""} variant="colored" onClick={() => setCreateOpen(true)} disabled={!isAuth} title={isAuth ? "создать пост" : "должен быть авторизован"}>
                    {isMobile ? "+" : "Создать пост"}
                </Button>
                <Input
                    className={isMobile ? styles.mobile : ""}
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

            <CreatePostModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
        </div>
    );
};