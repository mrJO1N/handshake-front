// PostsPage.tsx
import { CreatePostModal } from '@/features/create-post';
import { Button, Input } from '@/shared/ui';
import { PostList } from '@/widgets/post-list';
import { usePosts } from '@/entities/post';
import { useState } from 'react';
import styles from './PostsPage.module.sass';

export const PostsPage = () => {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState(''); // то, по чему реально ищем

  const { data: posts = [], isLoading, isError } = usePosts(query);

  const handleSearch = () => setQuery(searchValue);

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