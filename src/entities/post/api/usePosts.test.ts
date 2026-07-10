import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { usePosts } from './usePosts';
import { renderHookWithProviders } from '@/app/test/renderWithProviders';
import { postService } from './postService';
import type { IPostContent } from '../model/types';

const posts: IPostContent[] = [
  {
    id: '1',
    title: 'first post',
    theUserWants: 'wants',
    theUserOffers: 'offers',
    author: 'alice',
    createdAt: '2026-07-01T00:00:00.000Z',
  },
];

describe('usePosts', () => {
  it('should query posts using the given search query', async () => {
    const findPostsByQuerySpy = vi.spyOn(postService, 'findPostsByQuery').mockResolvedValue(posts);

    const { result } = renderHookWithProviders(() => usePosts('hello'));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(findPostsByQuerySpy).toHaveBeenCalledWith('hello');
    expect(result.current.data).toEqual(posts);
  });

  it('should default to an empty query when none is given', async () => {
    const findPostsByQuerySpy = vi.spyOn(postService, 'findPostsByQuery').mockResolvedValue(posts);

    const { result } = renderHookWithProviders(() => usePosts());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(findPostsByQuerySpy).toHaveBeenCalledWith('');
  });
});
