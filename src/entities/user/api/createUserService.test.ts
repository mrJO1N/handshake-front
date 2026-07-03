import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createUserService } from './createUserService';
import type { HttpClient } from '@/shared/api';
import type { LoginDto, RegisterDto } from '../model/types';

const createMockHttp = (): HttpClient => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
});

describe('createUserService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('register should call POST /register with the dto', () => {
    const http = createMockHttp();
    const service = createUserService(http);
    const dto: RegisterDto = { email: 'user@example.com', username: 'user', password: 'secret1' };

    service.register(dto);

    expect(http.post).toHaveBeenCalledWith('/register', dto);
  });

  it('login should call POST /login with the dto', () => {
    const http = createMockHttp();
    const service = createUserService(http);
    const dto: LoginDto = { email: 'user@example.com', password: 'secret1' };

    service.login(dto);

    expect(http.post).toHaveBeenCalledWith('/login', dto);
  });

  it('fetchMe should call GET /me with an Authorization header built from the token', () => {
    const http = createMockHttp();
    const service = createUserService(http);

    service.fetchMe('token-123');

    expect(http.get).toHaveBeenCalledWith('/me', {
      headers: { Authorization: 'Bearer token-123' },
    });
  });

  it('saveToken should persist the token to localStorage', () => {
    const service = createUserService(createMockHttp());
    service.saveToken('token-123');
    expect(localStorage.getItem('authToken')).toBe('token-123');
  });

  it('getToken should read the token from localStorage', () => {
    localStorage.setItem('authToken', 'token-456');
    const service = createUserService(createMockHttp());
    expect(service.getToken()).toBe('token-456');
  });

  it('clearToken should remove the token from localStorage', () => {
    localStorage.setItem('authToken', 'token-456');
    const service = createUserService(createMockHttp());
    service.clearToken();
    expect(localStorage.getItem('authToken')).toBeNull();
  });
});
