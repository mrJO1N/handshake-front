import { Modal } from '@/shared/ui';
import { CreatePostForm } from './CreatePostForm';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Создать пост">
    <CreatePostForm onSuccess={onClose} />
  </Modal>
);