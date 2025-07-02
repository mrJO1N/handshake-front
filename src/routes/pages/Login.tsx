import React, { FC, useState } from "react";

import "./Login.sass";
import { UI } from "@comp/ui";
import { Link } from "react-router-dom";

const Login: FC<ILoginProps> = ({ TopMenu, PostList }) => {
  const [authToken, setAuthToken] = useState("");

  return (
    <div className="Login">
      <TopMenu visibilityType="clear" />
      <UI.Title className="title">Вход</UI.Title>
      <form>
        <UI.Input
          className="input"
          value={authToken}
          onChange={(e) => setAuthToken(e.target.value)}
        />
        <UI.Button
          className="sumbit"
          visibilityType="colored"
          type="submit"
          onClick={() => {}}
        >
          Вход
        </UI.Button>
        <span className="bottom-title">
          нет аккаунта? <Link to="/signup">зарегистрируйтесь</Link>
        </span>
      </form>
    </div>
  );
};

interface ILoginProps {
  TopMenu: FC<any>;
  PostList: FC;
}

export default Login;
