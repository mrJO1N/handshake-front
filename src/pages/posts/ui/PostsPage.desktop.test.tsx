import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { PostsPageDesktop } from './PostsPage.desktop';
import { usePosts } from '@/entities/post';
import { renderWithProviders, createTestStore } from '@/app/test/renderWithProviders';
import type { IUser } from '@/entities/user';

vi.mock('@/entities/post', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/post')>();
  return { ...actual, usePosts: vi.fn() };
});

const mockedUsePosts = vi.mocked(usePosts);

const user: IUser = { id: '1', email: 'user@example.com', username: 'alice' };

describe('PostsPageDesktop', () => {
  beforeEach(() => {
    mockedUsePosts.mockReset();
    mockedUsePosts.mockReturnValue({ data: [], isLoading: false, isError: false } as unknown as ReturnType<
      typeof usePosts
    >);
  });

  it('disables "Создать пост" when the user is not authenticated', () => {
    renderWithProviders(<PostsPageDesktop />, {
      store: createTestStore({ session: { user: null, accessToken: null } }),
    });

    expect(screen.getByRole('button', { name: 'Создать пост' })).toBeDisabled();
  });

  it('enables "Создать пост" when the user is authenticated', () => {
    renderWithProviders(<PostsPageDesktop />, {
      store: createTestStore({ session: { user, accessToken: 'token' } }),
    });

    expect(screen.getByRole('button', { name: 'Создать пост' })).toBeEnabled();
  });
});
