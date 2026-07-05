import { describe, it, expect } from 'vitest';
import { profileSchema, passwordSchema } from './schema';

describe('profileSchema', () => {
  it('should accept a valid profile payload', () => {
    const result = profileSchema.safeParse({
      email: 'user@example.com',
      username: 'validuser',
    });
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const result = profileSchema.safeParse({
      email: 'not-an-email',
      username: 'validuser',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('should reject a username shorter than 3 characters', () => {
    const result = profileSchema.safeParse({
      email: 'user@example.com',
      username: 'ab',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'username')).toBe(true);
    }
  });
});

describe('passwordSchema', () => {
  const validPayload = {
    currentPassword: 'oldsecret',
    newPassword: 'newsecret',
    newPasswordConfirm: 'newsecret',
  };

  it('should accept a valid password payload', () => {
    const result = passwordSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('should reject a new password shorter than 6 characters', () => {
    const result = passwordSchema.safeParse({ ...validPayload, newPassword: '123', newPasswordConfirm: '123' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'newPassword')).toBe(true);
    }
  });

  it('should attach a mismatch error to newPasswordConfirm when passwords differ', () => {
    const result = passwordSchema.safeParse({
      ...validPayload,
      newPassword: 'newsecret',
      newPasswordConfirm: 'different1',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['newPasswordConfirm']);
      expect(result.error.issues[0].message).toBe('Пароли не совпадают');
    }
  });
});
