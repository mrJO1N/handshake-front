import { IPostContent } from "@/main.types";
import api from "@/services/api.service";

class PostService {
  create(post: IPostContent) {}
  async findPostsByQuery(query: string): Promise<IPostContent[]> {
    return {} as any;
  }
}

export default new PostService();
