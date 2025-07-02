import React, { FC, useState } from "react";

import "./Signup.sass";
import { UI } from "@comp/ui";
import { Link } from "react-router-dom";

const Signup: FC<ISignupProps> = ({ TopMenu, PostList }) => {
  const [authToken, setAuthToken] = useState("");

  return (
    <div className="Signup">
      <TopMenu visibilityType="clear" />
      <UI.Title className="title">Регистрация</UI.Title>
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
          Создать код
        </UI.Button>
        <span className="bottom-title">
          есть аккаунт? <Link to="/login">войдите</Link>
        </span>
      </form>
    </div>
  );
};

interface ISignupProps {
  TopMenu: FC<any>; // работает - не трогай
  PostList: FC;
}

export default Signup;
