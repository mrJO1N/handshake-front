export interface IPostContent {
  id: string;
  title: string;
  theUserWants: string;
  theUserOffers: string;
}

export interface CreatePostDto {
  title: string;
  theUserWants: string;
  theUserOffers: string;
}