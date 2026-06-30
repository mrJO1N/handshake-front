import type { HttpClient } from '@/shared/api';
import type { AuthResponse, RegisterDto } from '../model/types';

export const createUserService = (http: HttpClient) => ({
  register: (dto: RegisterDto) =>
    http.post<AuthResponse>('/auth/register', dto),
});

export type UserService = ReturnType<typeof createUserService>;