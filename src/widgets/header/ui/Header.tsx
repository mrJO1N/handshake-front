import { useIsMobile } from '@/shared/lib/hooks';
import { HeaderMobile } from './Header.mobile';
import { HeaderDesktop } from './Header.desktop';

export const Header = () => {
  const isMobile = useIsMobile();

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};
