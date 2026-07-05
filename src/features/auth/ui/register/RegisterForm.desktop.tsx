import { Button, MinimalTextInput, Form, FormError, FormFooter } from '@/shared/ui';
import styles from './RegisterForm.module.sass';
import { FC } from 'react';
import { RegisterFormProps } from '../../formProps';
import { useRegisterForm } from '../../model/useRegisterForm';

export const RegisterFormDesktop: FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
    const { register, onSubmit, formState: { errors }, isPending } = useRegisterForm(onSuccess);

    return (
        <Form onSubmit={onSubmit} noValidate>
            <div>
                <MinimalTextInput type="email" placeholder="Email" {...register('email')} />
                {errors.email && <FormError>{errors.email.message}</FormError>}
            </div>
            <div>
                <MinimalTextInput type="text" placeholder="Имя пользователя" {...register('username')} />
                {errors.username && <FormError>{errors.username.message}</FormError>}
            </div>
            <div>
                <MinimalTextInput type="password" placeholder="Пароль" {...register('password')} />
                {errors.password && <FormError>{errors.password.message}</FormError>}
            </div>
            <div>
                <MinimalTextInput type="password" placeholder="Повторите пароль" {...register('passwordConfirm')} />
                {errors.passwordConfirm && <FormError>{errors.passwordConfirm.message}</FormError>}
            </div>
            {errors.root && <FormError>{errors.root.message}</FormError>}

            <FormFooter>
                <Button className={styles.submit} variant="colored" type="submit" disabled={isPending}>
                    {isPending ? 'Регистрация…' : 'Зарегистрироваться'}
                </Button>
                <p className={styles.switch}>
                    Есть аккаунт?{' '}
                    <Button variant="clear" className={styles.switchLink} onClick={onSwitchToLogin}>
                        Войти
                    </Button>
                </p>
            </FormFooter>
        </Form>
    );
};
