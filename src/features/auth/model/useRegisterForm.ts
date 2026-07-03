import { HttpError } from "@/shared/api";
import { useRegister } from "./useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "./schema";
import { useForm } from "react-hook-form";

export const useRegisterForm = (onSuccess: () => void) => {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });
    const { mutateAsync, isPending } = useRegister();

    const onSubmit = form.handleSubmit(async (values: RegisterFormValues) => {
        // because it is just cleaning
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordConfirm: _, ...dto } = values;
        try {
            await mutateAsync(dto);
            onSuccess();
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                form.setError('root', { message: 'Email уже занят' });
            } else {
                form.setError('root', { message: 'Не удалось зарегистрироваться. Попробуйте ещё раз' });
            }
        }
    })

    return { ...form, onSubmit, isPending };
};