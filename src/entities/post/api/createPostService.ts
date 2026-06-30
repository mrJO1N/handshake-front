import type { HttpClient } from '@/shared/api';
import type { CreatePostDto, IPostContent } from '../model/types';

export const createPostService = (http: HttpClient) => ({
  findPostsByQuery: (query: string) =>
    http.get<IPostContent[]>(query ? `/posts?q=${encodeURIComponent(query)}` : '/posts'),

  createPost: (dto: CreatePostDto) =>
    http.post<IPostContent>('/posts', dto),
});

export type PostService = ReturnType<typeof createPostService>;