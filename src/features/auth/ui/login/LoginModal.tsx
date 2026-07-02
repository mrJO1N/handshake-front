import { Modal, type ModalProps } from '@/shared/ui';
import { LoginForm } from './LoginForm';

type LoginModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
  onSwitchToRegister: () => void;
};

export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Вход">
    <LoginForm onSuccess={onClose} onSwitchToRegister={onSwitchToRegister} />
  </Modal>
);