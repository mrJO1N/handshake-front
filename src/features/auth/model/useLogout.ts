import { useAppDispatch } from '@/app/store/hooks';
import { clearSession } from '@/entities/session';
import { useUserService } from '@/entities/user';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
    const userService = useUserService();
    const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: async () => { },
        onSuccess: () => {
            userService.clearToken()
            dispatch(clearSession()); // clear token in Redux
        },
    });
};