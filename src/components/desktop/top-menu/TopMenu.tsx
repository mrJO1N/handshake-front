import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";

import "./TopMenu.sass";
import { UI } from "@comp/ui";
import appContext from "@/contexts/app.context";

const TopMenu: FC = () => {
  const { toggleModal } = useContext(appContext);
  return (
    <>
      <header className="Desktop">
        <div className="TopMenu">
          <Link to="/" className="logo">
            ИПОРУКАМ
          </Link>
          <div className="auth-buttons">
            <UI.Button
              className="login"
              visibilityType="clear"
              onClick={() => toggleModal("auth")}
            >
              Вход
            </UI.Button>
            <UI.Button className="signup" onClick={() => toggleModal("auth")}>
              Регистрация
            </UI.Button>
          </div>
        </div>
      </header>
      <div className="plug" />
      {/* for collision at top when i use "position: sticky" */}
    </>
  );
};

export default TopMenu;
