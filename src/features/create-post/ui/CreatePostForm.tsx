import { useState } from 'react';
import { Button, MinimalTextInput } from '@/shared/ui';
import { useCreatePost } from '@/entities/post';
import { useAppSelector } from '@/app/store/hooks';
import { selectUser } from '@/entities/session';

import styles from './CreatePostForm.module.sass';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostFormValues, createPostSchema } from '../model/schema';
import { useForm } from 'react-hook-form';
import { HttpError } from '@/shared/api';

interface CreatePostFormProps {
  onSuccess: () => void;
}

export const CreatePostForm = ({ onSuccess }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [theUserWants, setWants] = useState('');
  const [theUserOffers, setOffers] = useState('');
  const { mutateAsync, isPending } = useCreatePost();
  const user = useAppSelector(selectUser);


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (values: CreatePostFormValues) => {
    e.preventDefault();
    if (!user) return;

    try {
      await mutateAsync({
        ...values,
        author: user.username,
        createdAt: new Date().toISOString()
      });
      onSuccess();
    } catch (err) {
      if (err instanceof HttpError && err.status === 400) {
        setError('root', { message: 'Неверный email или пароль' });
      } else {
        setError('root', { message: 'Не удалось создать пост. Попробуйте ещё раз' });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <MinimalTextInput
          placeholder="Заголовок"
          {...register("title")}
        />
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </div>
      <div>
        <MinimalTextInput
          variant="textarea"
          placeholder="Что хотите получить"
          {...register("theUserWants")}
        />
        {errors.theUserWants && <span className={styles.error}>{errors.theUserWants.message}</span>}
      </div>
      <div>
        <MinimalTextInput
          variant="textarea"
          placeholder="Что предлагаете"
          {...register("theUserOffers")}
        />
        {errors.theUserOffers && <span className={styles.error}>{errors.theUserOffers.message}</span>}
      </div>
      <Button variant="colored" type="submit" disabled={isPending}>
        {isPending ? 'Создаём…' : 'Создать'}
      </Button>
    </form>
  );
};