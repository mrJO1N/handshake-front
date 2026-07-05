import { z } from 'zod';

export const profileSchema = z.object({
  email: z.email('Некорректный email'),
  username: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов'),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Минимум 6 символов'),
    newPassword: z.string().min(6, 'Минимум 6 символов'),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'Пароли не совпадают',
    path: ['newPasswordConfirm'],
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;

export type PasswordFormValues = z.infer<typeof passwordSchema>;
