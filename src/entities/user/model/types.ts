export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: IUser;
}

export interface UpdateProfileDto {
  email?: string;
  username?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

