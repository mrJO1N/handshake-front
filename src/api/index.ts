import authApiService from "./auth.api.service";
import postsApiService from "./posts.api.service";

export const api = { post: postsApiService, auth: authApiService };
