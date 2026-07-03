import { CreatePostForm } from "@/features/create-post";
import { useIsMobile } from "@/shared/lib/hooks";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePostPage: FC = () => {
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isMobile) {
            navigate("/posts")
        }
    }, [isMobile, navigate])

    if (!isMobile) return null

    return <>
        <CreatePostForm onSuccess={() => navigate("/posts")} />
    </>
};

