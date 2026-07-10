import { useQuery } from '@tanstack/react-query';
import { postService } from './postService';

export const usePosts = (query = '') => {
    return useQuery({
        queryKey: ['posts', query],
        queryFn: () => postService.findPostsByQuery(query),
    });
};