import { UserSettingsForm } from "@/features/user-settings";
import { ModalPage } from "@/widgets/modal-root";
import { FC } from "react";

export const UserPage: FC = () => (
    <ModalPage type="user">
        {({ navigate }) => <UserSettingsForm onDeleted={() => navigate("/")} />}
    </ModalPage>
);
