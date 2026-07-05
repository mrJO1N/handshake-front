import { FC } from 'react';
import { Button, MinimalTextInput, Form, FormError } from '@/shared/ui';
import { ModalFormProps } from '@/features/auth'
import { useCreatePostForm } from '../model/useCreatePostForm';

export const CreatePostFormDesktop: FC<ModalFormProps> = ({ onSuccess }) => {
    const { register, onSubmit, formState: { errors }, isPending } = useCreatePostForm(onSuccess);

    return (
        <Form onSubmit={onSubmit}>
            <div>
                <MinimalTextInput
                    placeholder="Заголовок"
                    {...register("title")}
                />
                {errors.title && <FormError>{errors.title.message}</FormError>}
            </div>
            <div>
                <MinimalTextInput
                    variant="textarea"
                    placeholder="Что хотите получить"
                    {...register("theUserWants")}
                />
                {errors.theUserWants && <FormError>{errors.theUserWants.message}</FormError>}
            </div>
            <div>
                <MinimalTextInput
                    variant="textarea"
                    placeholder="Что предлагаете"
                    {...register("theUserOffers")}
                />
                {errors.theUserOffers && <FormError>{errors.theUserOffers.message}</FormError>}
            </div>
            {errors.root && <FormError>{errors.root.message}</FormError>}
            <Button variant="colored" type="submit" disabled={isPending}>
                {isPending ? 'Создаём…' : 'Создать'}
            </Button>
        </Form>
    );
};
