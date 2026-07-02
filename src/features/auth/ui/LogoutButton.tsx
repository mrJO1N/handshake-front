import { Button } from "@/shared/ui";
import { FC } from "react";
import { useLogout } from "../model/useLogout";

export const LogoutButton: FC = () => {
    const { mutateAsync } = useLogout();
    return <Button variant="clear" onClick={() => mutateAsync()}>выйти</Button>

}