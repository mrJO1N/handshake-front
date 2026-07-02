import { z } from 'zod';

export const createPostSchema = z
  .object({
  title:z.string().min(5, 'Минимум 5 символа'),
  theUserOffers:z.string().min(10, 'Минимум 10 символа'),
  theUserWants:z.string().min(10, 'Минимум 10 символа'),
  })

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
