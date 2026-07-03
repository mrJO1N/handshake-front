import { useIsMobile } from '@/shared/lib/hooks';
import { PostsPageMobile } from './PostsPage.mobile';
import { PostsPageDesktop } from './PostsPage.desktop';

export const PostsPage = () => {
  const isMobile = useIsMobile();

  return isMobile ? <PostsPageMobile /> : <PostsPageDesktop />;
};
