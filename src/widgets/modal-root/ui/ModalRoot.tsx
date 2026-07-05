import { LoginForm, RegisterForm } from "@/features/auth";
import { CreatePostForm } from "@/features/create-post";
import { useModal } from "../model/useModal";
import { selectModalActive } from "@/entities/modal";
import { useSelector } from "react-redux";
import { useIsMobile } from "@/shared/lib/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Modal } from "@/shared/ui";

import styles from "./ModalRoot.module.sass"

export const ModalRoot = () => {
    const active = useSelector(selectModalActive);
    const { close, open } = useModal();

    const isMobile = useIsMobile()
    const navigate = useNavigate()

    useEffect(() => {
        // if (!isMobile) return

        // switch (active) {
        //     case "login":
        //         navigate("/login")
        //         break
        //     case "register":
        //         navigate("/register")
        //         break
        //     case "createPost":
        //         navigate("/posts/crea")
        //         break
        // }
        if (isMobile && active === "login") {
            navigate("/login")
        } else if (isMobile && active === "register") {
            navigate("/login")
        } else if (isMobile && active === "createPost") {
            navigate("/posts/create")
        }
    }, [isMobile, active, navigate])

    if (isMobile) return null

    return <>
        <Modal isOpen={active === "login"} onClose={close} title="Вход">
            <LoginForm onSuccess={close} onSwitchToRegister={() => open("register")} />
        </Modal>

        <Modal isOpen={active === "register"} onClose={close} title="Регистрация">
            <RegisterForm onSuccess={close} onSwitchToLogin={() => open("login")} />
        </Modal>

        <Modal isOpen={active === "createPost"} onClose={close} title="Создать пост">
            <CreatePostForm onSuccess={close} />
        </Modal>
    </>
};