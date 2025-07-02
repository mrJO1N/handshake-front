import { IJwtTokens } from "@/main.types";
import api from "@/services/api.service";
import storageService from "@/services/storage.service";

class AuthService {
  async getNewAuthToken(): Promise<string> {
    const res = await api.get("/account");
    const authKey: TAuthKey = res.data.auth_key;

    if (!authKey) {
      console.error("no auth key");
    }

    storageService.set("authKey", authKey);

    return res.data.auth_key;
  }
  async getJwtTokensWithAuthToken(
    authToken?: string
  ): Promise<IJwtTokens | void> {
    const authKey = authToken ?? storageService.get("authKey");

    if (!authKey) return console.warn("no authKey");

    const res = await api.post<null, IJwtTokens>(
      "/account",
      JSON.stringify({
        auth_token: authKey,
      })
    );

    const { access_token = "", refresh_token = "" } = res;

    if (!access_token.length || !refresh_token.length)
      return console.warn("no access or refresh token");

    storageService.set("access", access_token);
    storageService.set("refresh", refresh_token);

    return { access_token, refresh_token };
  }
  refreshAccessJwtToken(refreshToken: string): string {
    return "access token";
  }
}

type TAuthKey = string;

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
