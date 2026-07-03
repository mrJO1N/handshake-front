import { describe, it, expect } from 'vitest';
import { createPostSchema } from './schema';

describe('createPostSchema', () => {
  const validPayload = {
    title: 'Valid title',
    theUserOffers: 'Something to offer',
    theUserWants: 'Something wanted',
  };

  it('should accept a valid payload', () => {
    const result = createPostSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('should reject a title shorter than 5 characters', () => {
    const result = createPostSchema.safeParse({ ...validPayload, title: 'abcd' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'title')).toBe(true);
    }
  });

  it('should reject theUserOffers shorter than 10 characters', () => {
    const result = createPostSchema.safeParse({ ...validPayload, theUserOffers: 'short' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'theUserOffers')).toBe(true);
    }
  });

  it('should reject theUserWants shorter than 10 characters', () => {
    const result = createPostSchema.safeParse({ ...validPayload, theUserWants: 'short' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'theUserWants')).toBe(true);
    }
  });

  it('should reject empty fields', () => {
    const result = createPostSchema.safeParse({ title: '', theUserOffers: '', theUserWants: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toEqual(expect.arrayContaining(['title', 'theUserOffers', 'theUserWants']));
    }
  });
});
