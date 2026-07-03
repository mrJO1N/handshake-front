import { HttpError } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { selectUser } from "@/entities/session";
import { useSelector } from "react-redux";
import { useCreatePost } from "@/entities/post";
import { CreatePostFormValues, createPostSchema } from "./schema";

export const useCreatePostForm = (onSuccess: () => void) => {
    const { mutateAsync, isPending } = useCreatePost();
    const user = useSelector(selectUser);

    const form = useForm<CreatePostFormValues>({
        resolver: zodResolver(createPostSchema),
    });

    const onSubmit = form.handleSubmit(async (values: CreatePostFormValues) => {
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
                form.setError('root', { message: 'Проверьте введённые данные и попробуйте снова' });
            } else {
                form.setError('root', { message: 'Не удалось создать пост. Попробуйте ещё раз' });
            }
        }
    })

    return { ...form, onSubmit, isPending };
};