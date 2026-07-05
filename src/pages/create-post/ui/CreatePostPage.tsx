import { CreatePostForm } from "@/features/create-post";
import { ModalPage } from "@/widgets/modal-root";
import { FC } from "react";

export const CreatePostPage: FC = () => (
    <ModalPage type="createPost">
        {({ onDone }) => <CreatePostForm onSuccess={onDone} />}
    </ModalPage>
);
