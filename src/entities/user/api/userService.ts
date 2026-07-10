import { httpClient } from '@/shared/api';
import { createUserService } from './createUserService';

export const userService = createUserService(httpClient);
