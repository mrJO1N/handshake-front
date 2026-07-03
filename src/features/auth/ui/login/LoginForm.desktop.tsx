import { Button, MinimalTextInput } from '@/shared/ui';
import styles from '../AuthForm.module.sass';
import { FC } from 'react';
import { LoginFormProps } from '../../formProps';
import { useLoginForm } from '../../model/useLoginForm';


export const LoginFormDesktop: FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
   const { register, onSubmit, formState: { errors }, isPending } = useLoginForm(onSuccess);

    return (
        <form onSubmit={onSubmit} noValidate>
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