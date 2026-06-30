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

export interface AuthResponse {
  user: IUser;
  token: string;
}