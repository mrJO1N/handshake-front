import { Button, Input, Form, FormError, FormFooter } from '@/shared/ui';
import formStyles from '@/shared/ui/Form/Form.module.sass';
import styles from './RegisterForm.module.sass';
import { FC } from 'react';
import { RegisterFormProps } from '../../formProps';
import { useRegisterForm } from '../../model/useRegisterForm';

export const RegisterFormMobile: FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
    const { register, onSubmit, formState: { errors }, isPending } = useRegisterForm(onSuccess);

    return (
        <Form onSubmit={onSubmit} noValidate className={formStyles.mobile}>
            <div>
                <Input type="email" placeholder="Email" {...register('email')} />
                {errors.email && <FormError>{errors.email.message}</FormError>}
            </div>
            <div>
                <Input type="text" placeholder="Имя пользователя" {...register('username')} />
                {errors.username && <FormError>{errors.username.message}</FormError>}
            </div>
            <div>
                <Input type="password" placeholder="Пароль" {...register('password')} />
                {errors.password && <FormError>{errors.password.message}</FormError>}
            </div>
            <div>
                <Input type="password" placeholder="Повторите пароль" {...register('passwordConfirm')} />
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
