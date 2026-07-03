import { FC } from 'react';
import { Button, MinimalTextInput } from '@/shared/ui';
import styles from './CreatePostForm.module.sass';
import { ModalFormProps } from '@/features/auth'
import { useCreatePostForm } from '../model/useCreatePostForm';

export const CreatePostFormDesktop: FC<ModalFormProps> = ({ onSuccess }) => {
    const { register, onSubmit, formState: { errors }, isPending } = useCreatePostForm(onSuccess);

    return (
        <form className={styles.form} onSubmit={onSubmit}>
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
            {errors.root && <span className={styles.error}>{errors.root.message}</span>}
            <Button variant="colored" type="submit" disabled={isPending}>
                {isPending ? 'Создаём…' : 'Создать'}
            </Button>
        </form>
    );
};