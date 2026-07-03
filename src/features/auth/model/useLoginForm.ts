import { HttpError } from "@/shared/api";
import { useLogin } from "./useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "./schema";
import { useForm } from "react-hook-form";

export const useLoginForm = (onSuccess: () => void) => {
    const form = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
    const { mutateAsync, isPending } = useLogin();

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            await mutateAsync(values);
            onSuccess();
        } catch (error) {
            if (error instanceof HttpError && error.status === 400) {
                form.setError('root', { message: 'Неверный email или пароль' });
            } else {
                form.setError('root', { message: 'Не удалось войти. Попробуйте ещё раз' });
            }
        }
    });

    return { ...form, onSubmit, isPending };
};