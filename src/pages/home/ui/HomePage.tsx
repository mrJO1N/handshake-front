import { Button, Input } from "@/shared/ui";
import React, { FC, useState } from "react";

export const HomePage: FC<IHomeProps> = ({ }) => {
    const [s, setS] = useState("")
    return (
        <>
            <Button >Cоздать пост</Button>

            <Button variant="colored">Cоздать пост</Button>

            <Button variant="clear">Cоздать пост</Button>
            <Input style={{ width: 200 }} value={s} onChange={(e) => setS(e.target.value)} variant="search" placeholder="поиск" />
        </>
    );
};

interface IHomeProps {
}


