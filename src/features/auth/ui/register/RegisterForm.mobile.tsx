import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, MinimalTextInput } from '@/shared/ui';
import { HttpError } from '@/shared/api';
import { registerSchema, type RegisterFormValues } from '../../model/schema';
import { useRegister } from '../../model/useRegister';
import styles from '../AuthForm.module.sass';
import { FC } from 'react';
import { RegisterFormProps } from '../../types';


export const RegisterFormMobile: FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });
    const { mutateAsync, isPending } = useRegister();

    const onSubmit = async (values: RegisterFormValues) => {
        const { passwordConfirm, ...dto } = values;
        try {
            await mutateAsync(dto);
            onSuccess();
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                setError('root', { message: 'Email уже занят' });
            } else {
                setError('root', { message: 'Не удалось зарегистрироваться. Попробуйте ещё раз' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.mobile}>
            <div>
                <Input type="email" placeholder="Email" {...register('email')} />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>
            <div>
                <Input type="text" placeholder="Имя пользователя" {...register('username')} />
                {errors.username && <span className={styles.error}>{errors.username.message}</span>}
            </div>
            <div>
                <Input type="password" placeholder="Пароль" {...register('password')} />
                {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </div>
            <div>
                <Input type="password" placeholder="Повторите пароль" {...register('passwordConfirm')} />
                {errors.passwordConfirm && (
                    <span className={styles.error}>{errors.passwordConfirm.message}</span>
                )}
            </div>
            {errors.root && <span className={styles.error}>{errors.root.message}</span>}

            <div className={styles.formFooter}>
                <Button className={styles.submit} variant="colored" type="submit" disabled={isPending}>
                    {isPending ? 'Регистрация…' : 'Зарегистрироваться'}
                </Button>
                <p className={styles.switch}>
                    Есть аккаунт?{" "}
                    <button type="button" className={styles.switchLink} onClick={onSwitchToLogin}>
                        Войти
                    </button>
                </p>
            </div>
        </form >
    );
};