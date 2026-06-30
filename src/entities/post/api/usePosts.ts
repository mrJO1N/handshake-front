import { useQuery } from '@tanstack/react-query';
import { usePostService } from './usePostService';

export const usePosts = (query = '') => {
    const postService = usePostService();
    return useQuery({
        queryKey: ['posts', query],
        queryFn: () => postService.findPostsByQuery(query),
    });
};