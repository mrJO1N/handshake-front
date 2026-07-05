import { Button, Input, Form, FormError, FormFooter } from '@/shared/ui';
import formStyles from '@/shared/ui/Form/Form.module.sass';
import styles from './LoginForm.module.sass';
import { FC } from 'react';
import { LoginFormProps } from '../../formProps';
import { useLoginForm } from '../../model/useLoginForm';

export const LoginFormMobile: FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
    const { register, onSubmit, formState: { errors }, isPending } = useLoginForm(onSuccess);

    return (
        <Form onSubmit={onSubmit} noValidate className={formStyles.mobile}>
            <div>
                <Input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <FormError>{errors.email.message}</FormError>}
            </div>
            <div>
                <Input
                    type="password"
                    placeholder="Пароль"
                    {...register('password')}
                />
                {errors.password && <FormError>{errors.password.message}</FormError>}
            </div>
            {errors.root && <FormError>{errors.root.message}</FormError>}

            <FormFooter>
                <Button className={styles.submit} variant="colored" type="submit" disabled={isPending}>
                    {isPending ? 'Вход…' : 'Войти'}
                </Button>

                <p className={styles.switch}>
                    Нет аккаунта?{' '}
                    <Button variant="clear" className={styles.switchLink} onClick={onSwitchToRegister}>
                        Регистрация
                    </Button>
                </p>
            </FormFooter>
        </Form>
    );
};
