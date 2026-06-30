import { useState } from 'react';
import { Button, MinimalTextInput } from '@/shared/ui';
import { useCreatePost } from '@/entities/post';
import styles from './CreatePostForm.module.sass';

interface CreatePostFormProps {
  onSuccess: () => void;
}

export const CreatePostForm = ({ onSuccess }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [theUserWants, setWants] = useState('');
  const [theUserOffers, setOffers] = useState('');
  const { mutateAsync, isPending } = useCreatePost();

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({ title, theUserWants, theUserOffers });
      onSuccess();
    } catch {
      // здесь можно показать ошибку; пока модалку не закрываем
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <MinimalTextInput
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MinimalTextInput
        variant="textarea"
        placeholder="Что хотите получить"
        value={theUserWants}
        onChange={(e) => setWants(e.target.value)}
      />
      <MinimalTextInput
        variant="textarea"
        placeholder="Что предлагаете"
        value={theUserOffers}
        onChange={(e) => setOffers(e.target.value)}
      />
      <Button variant="colored" type="submit" disabled={isPending}>
        {isPending ? 'Создаём…' : 'Создать'}
      </Button>
    </form>
  );
};