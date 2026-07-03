interface AuthFormProps {
    onSuccess: () => void;
}

export interface RegisterFormProps extends AuthFormProps {
    onSwitchToLogin: () => void;
}

export interface LoginFormProps extends AuthFormProps {
    onSwitchToRegister: () => void;
}