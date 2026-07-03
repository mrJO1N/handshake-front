import { useIsMobile } from '@/shared/lib/hooks/useIsMobile';
import { RegisterFormMobile } from './RegisterForm.mobile';
import { RegisterFormDesktop } from './RegisterForm.desktop';
import { RegisterFormProps } from '../../types';
import { FC } from 'react';

export const RegisterForm: FC<RegisterFormProps> = (props) => {
  const isMobile = useIsMobile();

  return isMobile ? <RegisterFormMobile {...props} /> : <RegisterFormDesktop {...props} />;
};
