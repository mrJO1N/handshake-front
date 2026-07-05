import { useServicesContext } from '@/app/providers';

export const usePostService = () => useServicesContext().postService;
