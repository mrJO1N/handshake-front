import { useServicesContext } from '@/app/providers/ServicesProvider';

export const usePostService = () => useServicesContext().postService;
