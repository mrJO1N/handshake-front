import { httpClient } from '@/shared/api';
import { createPostService } from './createPostService';

export const postService = createPostService(httpClient);
