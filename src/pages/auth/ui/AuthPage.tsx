import { LoginForm, RegisterForm } from "@/features/auth";
import { ModalPage } from "@/widgets/modal-root";
import { FC } from "react";

interface AuthPageProps {
    variant: "login" | "register"
}

export const AuthPage: FC<AuthPageProps> = ({ variant }) => (
    <ModalPage type={variant}>
        {({ navigate, onDone }) => variant === "login"
            ? <LoginForm onSuccess={onDone} onSwitchToRegister={() => navigate("/register")} />
            : <RegisterForm onSuccess={onDone} onSwitchToLogin={() => navigate("/login")} />}
    </ModalPage>
);
