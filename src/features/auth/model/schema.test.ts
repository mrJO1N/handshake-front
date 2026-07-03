import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from './schema';

describe('loginSchema', () => {
  it('should accept a valid login payload', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'secret1',
    });
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'secret1',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('should reject a password shorter than 6 characters', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'password')).toBe(true);
    }
  });
});

describe('registerSchema', () => {
  const validPayload = {
    email: 'user@example.com',
    username: 'validuser',
    password: 'secret1',
    passwordConfirm: 'secret1',
  };

  it('should accept a valid register payload', () => {
    const result = registerSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const result = registerSchema.safeParse({ ...validPayload, email: 'bad-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('should reject a username shorter than 3 characters', () => {
    const result = registerSchema.safeParse({ ...validPayload, username: 'ab' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'username')).toBe(true);
    }
  });

  it('should reject a password shorter than 6 characters', () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: '123',
      passwordConfirm: '123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'password')).toBe(true);
    }
  });

  it('should attach a mismatch error to passwordConfirm when passwords differ', () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: 'secret1',
      passwordConfirm: 'different1',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['passwordConfirm']);
      expect(result.error.issues[0].message).toBe('Пароли не совпадают');
    }
  });
});
