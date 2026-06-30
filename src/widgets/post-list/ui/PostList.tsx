
import { Button, Input } from '@/shared/ui';
import { PostCard } from '@/entities/post';
import { FC, useState } from 'react';

import styles from './PostList.module.sass';
import { CreatePostModal } from '@/features/create-post';

export const PostList: FC = () => {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className={styles.postList}>
            <div className={styles.filters}>
                <Button variant="colored" onClick={() => setCreateOpen(true)}>
                    Создать пост
                </Button>
                <Input
                    variant="search"
                    placeholder="Поиск"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={() => console.log('click: search')}
                />
            </div>

            <div className={styles.posts}>
                <PostCard content={{ title: 'titile', theUserWants: 'wants', theUserOffers: 'offer' }} />
            </div>

            <CreatePostModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
        </div>
    );
};
