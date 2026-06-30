import type { HttpClient } from '@/shared/api';
import type { AuthResponse, LoginDto, RegisterDto } from '../model/types';

export const createUserService = (http: HttpClient) => ({
  register: (dto: RegisterDto) => http.post<AuthResponse>('/register', dto),
  login: (dto: LoginDto) => http.post<AuthResponse>('/login', dto),
});

export type UserService = ReturnType<typeof createUserService>;