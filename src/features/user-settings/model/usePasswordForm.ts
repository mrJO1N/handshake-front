import { HttpError } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChangePassword } from "./useChangePassword";
import { PasswordFormValues, passwordSchema } from "./schema";

export const usePasswordForm = () => {
    const form = useForm<PasswordFormValues>({ resolver: zodResolver(passwordSchema) });
    const { mutateAsync, isPending, isSuccess } = useChangePassword();

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            await mutateAsync(values);
            form.reset();
        } catch (error) {
            if (error instanceof HttpError && error.status === 401) {
                form.setError('currentPassword', { message: 'Неверный текущий пароль' });
            } else {
                form.setError('root', { message: 'Не удалось изменить пароль' });
            }
        }
    });

    return { ...form, onSubmit, isPending, isSuccess };
};
