import { Button, Input } from '@/shared/ui';
import { PostList } from '@/widgets/post-list';
import { usePosts } from '@/entities/post';
import { selectIsAuth } from '@/entities/session';
import styles from './PostsPage.module.sass';
import { useSelector } from 'react-redux';
import { usePostsPageState } from '../model/usePostsPageState';
import { useModal } from '@/widgets/modal-root';

export const PostsPageDesktop = () => {
  const { query, searchValue, setSearchValue, handleSearch } = usePostsPageState()
  const { open } = useModal()
  const isAuth = useSelector(selectIsAuth);

  const { data: posts = [], isLoading, isError } = usePosts(query);

  return (
    <div className={styles.postList}>
      <div className={styles.filters}>
        <Button variant="colored" onClick={() => open("createPost")} disabled={!isAuth} title={isAuth ? "создать пост" : "должен быть авторизован"}>
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

    </div>
  );
};