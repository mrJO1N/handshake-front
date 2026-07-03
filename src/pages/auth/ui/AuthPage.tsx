import { LoginForm, RegisterForm } from "@/features/auth";
import { useIsMobile } from "@/shared/lib/hooks";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
    variant: "login" | "register"
}

export const AuthPage: FC<AuthPageProps> = ({ variant }) => {
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isMobile) {
            navigate("/")
        }
    }, [isMobile, navigate])

    if (!isMobile) return null


    if (variant === "login") {
        return <LoginForm onSuccess={() => navigate("/")} onSwitchToRegister={() => navigate("/register")} />
    } else {
        return <RegisterForm onSuccess={() => navigate("/")} onSwitchToLogin={() => navigate("/login")} />

    }
};

