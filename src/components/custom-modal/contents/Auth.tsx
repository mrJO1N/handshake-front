import React, { FC, useState } from "react";

import "./Auth.sass";
import { UI } from "@comp/ui";
import { IModalContentProps } from "../index.types";
import CloseButton from "../components/CloseButton";
import authApiService from "@/api/auth.api.service";

const Auth: FC<IModalContentProps> = ({ closeModal }) => {
  const [token, setToken] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");

  const handleGenAuthCodeFormUpload: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const authToken = await authApiService.getNewAuthToken();

    setGeneratedToken(authToken);
  };

  const handleAuthFormUpload: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const jwtTokens = await authApiService.getJwtTokensWithAuthToken(token);

    if (!jwtTokens) console.error("no jwt tokens");
  };

  return (
    <div className="Auth">
      <UI.Title>Авторизация</UI.Title>
      <CloseButton className="close" onClick={closeModal} />

      <form onSubmit={handleGenAuthCodeFormUpload}>
        <UI.Minimalist.Input
          disabled
          value={generatedToken}
          onChange={(e) => setGeneratedToken(e.target.value)}
        ></UI.Minimalist.Input>
        <UI.Button
          visibilityType="colored"
          onClick={() => {}}
          className="auth-button"
        >
          сгенерировать токен
        </UI.Button>
      </form>

      <form onSubmit={handleAuthFormUpload}>
        <UI.Minimalist.Input
          value={token}
          onChange={(e) => setToken(e.target.value)}
        ></UI.Minimalist.Input>
        <UI.Button
          visibilityType="colored"
          onClick={() => {}}
          className="auth-button"
        >
          Войти
        </UI.Button>
      </form>
    </div>
  );
};

export default Auth;
