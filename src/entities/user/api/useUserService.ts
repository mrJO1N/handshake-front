import { useServicesContext } from '@/app/providers/ServicesProvider';

export const useUserService = () => useServicesContext().userService;
