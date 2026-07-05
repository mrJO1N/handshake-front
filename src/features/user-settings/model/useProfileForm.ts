import { HttpError } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "@/entities/session";
import { useUpdateProfile } from "./useUpdateProfile";
import { ProfileFormValues, profileSchema } from "./schema";

export const useProfileForm = () => {
    const user = useSelector(selectUser);
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: { email: user?.email ?? '', username: user?.username ?? '' },
    });
    const { mutateAsync, isPending, isSuccess } = useUpdateProfile();

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            await mutateAsync(values);
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                form.setError('username', { message: 'Имя пользователя уже занято' });
            } else {
                form.setError('root', { message: 'Не удалось сохранить изменения' });
            }
        }
    });

    return { ...form, onSubmit, isPending, isSuccess };
};
