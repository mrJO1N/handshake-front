import { useIsMobile } from '@/shared/lib/hooks';
import { CreatePostFormDesktop } from './CreatePostForm.desktop';
import { CreatePostFormMobile } from './CreatePostForm.mobile';
import { FC } from 'react';
import { ModalFormProps } from '@/features/auth';

export const CreatePostForm: FC<ModalFormProps> = (props) => {
  const isMobile = useIsMobile();

  return isMobile ? <CreatePostFormMobile {...props} /> : <CreatePostFormDesktop {...props} />;
};
