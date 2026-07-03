import { describe, it, expect, vi } from 'vitest';
import { createPostService } from './createPostService';
import type { HttpClient } from '@/shared/api';
import type { CreatePostDto } from '../model/types';

const createMockHttp = (): HttpClient => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
});

describe('createPostService', () => {
  it('findPostsByQuery should call GET /posts without a query string when query is empty', () => {
    const http = createMockHttp();
    const service = createPostService(http);

    service.findPostsByQuery('');

    expect(http.get).toHaveBeenCalledWith('/posts');
  });

  it('findPostsByQuery should call GET /posts?q=<encoded query> when a query is given', () => {
    const http = createMockHttp();
    const service = createPostService(http);

    service.findPostsByQuery('hello world');

    expect(http.get).toHaveBeenCalledWith('/posts?q=hello%20world');
  });

  it('createPost should call POST /posts with the dto', () => {
    const http = createMockHttp();
    const service = createPostService(http);
    const dto: CreatePostDto = {
      title: 'Title',
      theUserWants: 'wants',
      theUserOffers: 'offers',
      author: 'user',
      createdAt: '2026-07-03T00:00:00.000Z',
    };

    service.createPost(dto);

    expect(http.post).toHaveBeenCalledWith('/posts', dto);
  });
});
