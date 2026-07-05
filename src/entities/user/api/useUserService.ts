import { useServicesContext } from '@/app/providers';

export const useUserService = () => useServicesContext().userService;
