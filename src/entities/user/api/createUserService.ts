import type { HttpClient } from '@/shared/api';
import { IUser, type AuthResponse, type ChangePasswordDto, type LoginDto, type RegisterDto, type UpdateProfileDto } from '../model/types';

export const createUserService = (http: HttpClient) => ({
  register: (dto: RegisterDto) => http.post<AuthResponse>('/register', dto),
  login: (dto: LoginDto) => http.post<AuthResponse>('/login', dto),
  fetchMe: (token: string) => http.get<IUser>("/me", { headers: { Authorization: `Bearer ${token}` } }),
  updateProfile: (dto: UpdateProfileDto) => http.patch<IUser>('/me', dto),
  changePassword: (dto: ChangePasswordDto) => http.patch<IUser>('/me/password', dto),
  deleteAccount: () => http.delete<void>('/me'),
  saveToken: (token: string) => localStorage.setItem('authToken', token),
  getToken: () => localStorage.getItem('authToken'),
  clearToken: () => localStorage.removeItem('authToken')
});

export type UserService = ReturnType<typeof createUserService>;