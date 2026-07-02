import { useAppSelector } from "@/app/store/hooks";
import { selectAccessToken, selectIsAuth } from "@/entities/session";
import { Button, Input } from "@/shared/ui";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

export const HomePage: FC<IHomeProps> = ({ }) => {
    const isAuth = useAppSelector(selectIsAuth)
    const token = useAppSelector(selectAccessToken)
    console.log(isAuth, token)


    const [s, setS] = useState("")
    return (
        <>
            ты можешь перейти на <Link to={"/posts"} >страница постов</Link> и посмотреть объявления прямо сейчас
        </>
    );
};

interface IHomeProps {
}


