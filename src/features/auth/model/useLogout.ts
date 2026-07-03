import { clearSession } from '@/entities/session';
import { useUserService } from '@/entities/user';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const useLogout = () => {
    const userService = useUserService();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async () => { },
        onSuccess: () => {
            userService.clearToken()
            dispatch(clearSession()); // clear token in Redux
        },
    });
};