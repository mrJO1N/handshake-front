export interface ModalFormProps {
    onSuccess: () => void;
}

export interface RegisterFormProps extends ModalFormProps {
    onSwitchToLogin: () => void;
}

export interface LoginFormProps extends ModalFormProps {
    onSwitchToRegister: () => void;
}