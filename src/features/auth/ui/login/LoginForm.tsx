import { useIsMobile } from '@/shared/lib/hooks/useIsMobile';
import { LoginFormMobile } from './LoginForm.mobile';
import { LoginFormDesktop } from './LoginForm.desktop';
import { LoginFormProps } from '../../types';
import { FC } from 'react';

export const LoginForm: FC<LoginFormProps> = (props) => {
  const isMobile = useIsMobile();

  return isMobile ? <LoginFormMobile {...props} /> : <LoginFormDesktop {...props} />;
};
