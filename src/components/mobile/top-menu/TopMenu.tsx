import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./TopMenu.sass";
import { UI } from "@comp/ui";

const TopMenu: FC<ITopMenuProps> = (props) => {
  const { visibilityType = "default" } = props;

  const navigate = useNavigate();
  return (
    <>
      <header className="Mobile">
        <div className="TopMenu">
          <Link to="/" className="logo">
            ИПОРУКАМ
          </Link>
          {visibilityType === "clear" ? (
            ""
          ) : (
            <UI.Button
              className="login"
              visibilityType="colored"
              onClick={() => navigate("/login")}
            >
              Вход
            </UI.Button>
          )}
        </div>
      </header>
      <div className="plug" />
      {/* for collision at top when i use "position: sticky" */}
    </>
  );
};

interface ITopMenuProps {
  visibilityType: "clear" | "default";
}

export default TopMenu;
