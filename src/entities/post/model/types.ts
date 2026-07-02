export interface IPostContent {
  id: string;
  title: string;
  theUserWants: string;
  theUserOffers: string;
  author: string;      // username
  createdAt: string;
}

export interface CreatePostDto {
  title: string;
  theUserWants: string;
  theUserOffers: string;
  author: string;
  createdAt: string;
}