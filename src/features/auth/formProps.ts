import type { ModalFormProps } from '@/shared/ui';

export type { ModalFormProps };

export interface RegisterFormProps extends ModalFormProps {
    onSwitchToLogin: () => void;
}

export interface LoginFormProps extends ModalFormProps {
    onSwitchToRegister: () => void;
}