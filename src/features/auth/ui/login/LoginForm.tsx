import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, MinimalTextInput } from '@/shared/ui';
import { HttpError } from '@/shared/api';
import { loginSchema, type LoginFormValues } from '../../model/schema';
import { useLogin } from '../../model/useLogin';
import styles from '../AuthForm.module.sass';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;

}

export const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await mutateAsync(values);
      onSuccess();
    } catch (error) {
      if (error instanceof HttpError && error.status === 400) {
        setError('root', { message: 'Неверный email или пароль' });
      } else {
        setError('root', { message: 'Не удалось войти. Попробуйте ещё раз' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <MinimalTextInput
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>
      <div>
        <MinimalTextInput
          type="password"
          placeholder="Пароль"
          {...register('password')}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
      </div>
      {errors.root && <span className={styles.error}>{errors.root.message}</span>}
      <Button className={styles.submit} variant="colored" type="submit" disabled={isPending}>
        {isPending ? 'Вход…' : 'Войти'}
      </Button>

      <p className={styles.switch}>
        Нет аккаунта?{' '}
        <button type="button" className={styles.switchLink} onClick={onSwitchToRegister}>
          Регистрация
        </button>
      </p>
    </form>
  );
};