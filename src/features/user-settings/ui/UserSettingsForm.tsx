import { useIsMobile } from '@/shared/lib/hooks';
import { UserSettingsFormMobile } from './UserSettingsForm.mobile';
import { UserSettingsFormDesktop } from './UserSettingsForm.desktop';
import { UserSettingsFormProps } from '../formProps';
import { FC } from 'react';

export const UserSettingsForm: FC<UserSettingsFormProps> = (props) => {
  const isMobile = useIsMobile();

  return isMobile ? <UserSettingsFormMobile {...props} /> : <UserSettingsFormDesktop {...props} />;
};
