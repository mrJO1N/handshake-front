import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { useCreatePost } from './useCreatePost';
import { createMockServices, createTestQueryClient, renderHookWithProviders } from '@/shared/lib/test/renderWithProviders';
import type { CreatePostDto, IPostContent } from '../model/types';

const dto: CreatePostDto = {
  title: 'Title',
  theUserWants: 'wants',
  theUserOffers: 'offers',
  author: 'user',
  createdAt: '2026-07-03T00:00:00.000Z',
};

const createdPost: IPostContent = { id: '1', ...dto };

describe('useCreatePost', () => {
  it('should invalidate the posts query on success', async () => {
    const services = createMockServices({
      postService: { createPost: vi.fn().mockResolvedValue(createdPost) },
    });
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHookWithProviders(() => useCreatePost(), { services, queryClient });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['posts'] });
  });

  it('should not invalidate the posts query when the mutation fails', async () => {
    const services = createMockServices({
      postService: { createPost: vi.fn().mockRejectedValue(new Error('Server error')) },
    });
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHookWithProviders(() => useCreatePost(), { services, queryClient });

    result.current.mutate(dto);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
