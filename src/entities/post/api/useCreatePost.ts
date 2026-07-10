import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from './postService';
import type { CreatePostDto } from '../model/types';

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreatePostDto) => postService.createPost(dto),
        onSuccess: () => {
            // update cached list
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};