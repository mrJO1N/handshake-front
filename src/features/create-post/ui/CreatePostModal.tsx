import { Modal } from '@/shared/ui';
import { CreatePostForm } from './CreatePostForm';
import { useIsMobile } from '@/shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  useEffect(() => {
    if (isMobile && isOpen) {
      navigate("/posts/create")
    }

  }, [isMobile, isOpen, navigate])

  if (isMobile) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Создать пост">
      <CreatePostForm onSuccess={onClose} />
    </Modal>
  );
}