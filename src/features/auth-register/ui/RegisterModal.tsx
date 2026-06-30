import { Modal, type ModalProps } from '@/shared/ui';
import { RegisterForm } from './RegisterForm';

type RegisterModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
  onSwitchToLogin: () => void;
};

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Регистрация">
    <RegisterForm onSuccess={onClose} onSwitchToLogin={onSwitchToLogin} />
  </Modal>
);