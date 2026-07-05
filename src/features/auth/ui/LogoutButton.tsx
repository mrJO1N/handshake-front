import { Button } from "@/shared/ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../model/useLogout";

export const LogoutButton: FC = () => {
    const { mutateAsync } = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await mutateAsync();
        navigate("/");
    };

    return <Button variant="clear" onClick={handleLogout}>выйти</Button>
}