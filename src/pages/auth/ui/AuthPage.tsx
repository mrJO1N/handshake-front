import { LoginForm } from "@/features/auth/ui/login/LoginForm";
import { RegisterForm } from "@/features/auth/ui/register/RegisterForm";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import { FC, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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

