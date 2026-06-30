import { Modal, type ModalProps } from '@/shared/ui';
import { RegisterForm } from './RegisterForm';

type RegisterModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Регистрация">
        <RegisterForm onSuccess={onClose} />
    </Modal>
);
