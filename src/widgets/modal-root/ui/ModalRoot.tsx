import { LoginForm, RegisterForm } from "@/features/auth";
import { CreatePostForm } from "@/features/create-post";
import { useModal } from "../model/useModal";
import { selectModalActive, MODAL_TITLES, ModalType } from "@/entities/modal";
import { useSelector } from "react-redux";
import { useIsMobile } from "@/shared/lib/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Modal } from "@/shared/ui";

const MODAL_ROUTES: Record<Exclude<ModalType, null>, string> = {
    login: "/login",
    register: "/register",
    createPost: "/posts/create",
};

export const ModalRoot = () => {
    const active = useSelector(selectModalActive);
    const { close } = useModal();

    const isMobile = useIsMobile()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isMobile || !active) return;
        navigate(MODAL_ROUTES[active])
    }, [isMobile, active, navigate])

    if (isMobile) return null

    return <>
        <Modal isOpen={active === "login"} onClose={close} title={MODAL_TITLES.login}>
            <LoginForm onSuccess={close} onSwitchToRegister={() => navigate("/register")} />
        </Modal>

        <Modal isOpen={active === "register"} onClose={close} title={MODAL_TITLES.register}>
            <RegisterForm onSuccess={close} onSwitchToLogin={() => navigate("/login")} />
        </Modal>

        <Modal isOpen={active === "createPost"} onClose={close} title={MODAL_TITLES.createPost}>
            <CreatePostForm onSuccess={close} />
        </Modal>
    </>
};
