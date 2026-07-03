import { Button, MinimalTextInput } from '@/shared/ui';
import styles from '../AuthForm.module.sass';
import { FC } from 'react';
import { RegisterFormProps } from '../../formProps';
import { useRegisterForm } from '../../model/useRegisterForm';

export const RegisterFormDesktop: FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
    const { register, onSubmit, formState: { errors }, isPending } = useRegisterForm(onSuccess);

    return (
        <form onSubmit={onSubmit} noValidate>
            <div>
                <MinimalTextInput type="email" placeholder="Email" {...register('email')} />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>
            <div>
                <MinimalTextInput type="text" placeholder="Имя пользователя" {...register('username')} />
                {errors.username && <span className={styles.error}>{errors.username.message}</span>}
            </div>
            <div>
                <MinimalTextInput type="password" placeholder="Пароль" {...register('password')} />
                {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </div>
            <div>
                <MinimalTextInput type="password" placeholder="Повторите пароль" {...register('passwordConfirm')} />
                {errors.passwordConfirm && (
                    <span className={styles.error}>{errors.passwordConfirm.message}</span>
                )}
            </div>
            {errors.root && <span className={styles.error}>{errors.root.message}</span>}
            <Button className={styles.submit} variant="colored" type="submit" disabled={isPending}>
                {isPending ? 'Регистрация…' : 'Зарегистрироваться'}
            </Button>
            <p className={styles.switch}>
                Есть аккаунт?{' '}
                <button type="button" className={styles.switchLink} onClick={onSwitchToLogin}>
                    Войти
                </button>
            </p>
        </form>
    );
};