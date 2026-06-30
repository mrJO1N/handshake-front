import { useState } from 'react';
import { Button, MinimalTextInput } from '@/shared/ui';
import styles from './CreatePostForm.module.sass';

interface CreatePostFormProps {
  onSuccess: () => void;
}

export const CreatePostForm = ({ onSuccess }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [theUserWants, setWants] = useState('');
  const [theUserOffers, setOffers] = useState('');

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log('create post:', { title, theUserWants, theUserOffers }); // api plug
    onSuccess();
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
      <Button variant="colored" type="submit">
        Создать
      </Button>
    </form>
  );
};