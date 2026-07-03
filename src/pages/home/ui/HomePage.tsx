import { FC } from "react";
import { Link } from "react-router-dom";

export const HomePage: FC = () => {
    return (
        <>
            ты можешь перейти на <Link to={"/posts"} >страница постов</Link> и посмотреть объявления прямо сейчас
        </>
    );
};

