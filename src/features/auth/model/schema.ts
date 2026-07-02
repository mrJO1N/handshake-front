import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

export const registerSchema = z
  .object({
    email: z.email('Некорректный email'),
    username: z
      .string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов'),
    password: z.string().min(6, 'Минимум 6 символов'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm'], // ошибка повесится на поле повтора
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
