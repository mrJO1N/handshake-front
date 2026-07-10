import { FC, useState } from 'react';
import { Button, Input, Form, FormError, FormFooter } from '@/shared/ui';
import { ThemeToggle } from '@/entities/theme';
import formStyles from '@/shared/ui/Form/Form.module.sass';
import { LogoutButton } from './LogoutButton';
import { UserSettingsFormProps } from '../formProps';
import { useProfileForm } from '../model/useProfileForm';
import { usePasswordForm } from '../model/usePasswordForm';
import { useDeleteAccount } from '../model/useDeleteAccount';
import styles from './UserSettingsForm.module.sass';

export const UserSettingsFormMobile: FC<UserSettingsFormProps> = ({ onDeleted, className }) => {
    const profile = useProfileForm();
    const password = usePasswordForm();
    const { mutateAsync: deleteAccount, isPending: isDeleting } = useDeleteAccount();
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const handleDelete = async () => {
        await deleteAccount();
        onDeleted();
    };

    return (
        <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Профиль</h3>
                <Form onSubmit={profile.onSubmit} noValidate className={formStyles.mobile}>
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            {...profile.register('email')}
                        />
                        {profile.formState.errors.email && <FormError>{profile.formState.errors.email.message}</FormError>}
                    </div>
                    <div>
                        <Input
                            placeholder="Имя пользователя"
                            {...profile.register('username')}
                        />
                        {profile.formState.errors.username && <FormError>{profile.formState.errors.username.message}</FormError>}
                    </div>
                    {profile.formState.errors.root && <FormError>{profile.formState.errors.root.message}</FormError>}

                    <FormFooter>
                        <Button variant="colored" type="submit" disabled={profile.isPending}>
                            {profile.isPending ? 'Сохраняем…' : 'Сохранить'}
                        </Button>
                        {profile.isSuccess && <span className={styles.success}>Сохранено</span>}
                    </FormFooter>
                </Form>
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Пароль</h3>
                <Form onSubmit={password.onSubmit} noValidate className={formStyles.mobile}>
                    <div>
                        <Input
                            type="password"
                            placeholder="Текущий пароль"
                            {...password.register('currentPassword')}
                        />
                        {password.formState.errors.currentPassword && <FormError>{password.formState.errors.currentPassword.message}</FormError>}
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Новый пароль"
                            {...password.register('newPassword')}
                        />
                        {password.formState.errors.newPassword && <FormError>{password.formState.errors.newPassword.message}</FormError>}
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Новый пароль"
                            {...password.register('newPasswordConfirm')}
                        />
                        {password.formState.errors.newPasswordConfirm && <FormError>{password.formState.errors.newPasswordConfirm.message}</FormError>}
                    </div>
                    {password.formState.errors.root && <FormError>{password.formState.errors.root.message}</FormError>}

                    <FormFooter>
                        <Button variant="colored" type="submit" disabled={password.isPending}>
                            {password.isPending ? 'Меняем…' : 'Изменить пароль'}
                        </Button>
                        {password.isSuccess && <span className={styles.success}>Пароль изменён</span>}
                    </FormFooter>
                </Form>
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Тема</h3>
                <div className={styles.themeRow}>
                    <span>Тёмная тема</span>
                    <ThemeToggle />
                </div>
            </section>

            <section className={styles.section}>
                <LogoutButton />
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Удаление аккаунта</h3>
                {confirmingDelete ? (
                    <div className={styles.confirmRow}>
                        <span>Вы уверены? Это действие необратимо.</span>
                        <Button
                            variant="clear"
                            className={styles.dangerButton}
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Удаляем…' : 'Да, удалить'}
                        </Button>
                        <Button variant="clear" onClick={() => setConfirmingDelete(false)} disabled={isDeleting}>
                            Отмена
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="clear"
                        className={styles.dangerButton}
                        onClick={() => setConfirmingDelete(true)}
                    >
                        Удалить аккаунт
                    </Button>
                )}
            </section>
        </div>
    );
};
