import { Modal, type ModalProps } from '@/shared/ui';
import { RegisterForm } from './RegisterForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/shared/lib/hooks';

type RegisterModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
  onSwitchToLogin: () => void;
};

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  useEffect(() => {
    if (isMobile && isOpen) {
      navigate("/register")
    }

  }, [isMobile, isOpen, navigate])

  if (isMobile) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Регистрация">
      <RegisterForm onSuccess={onClose} onSwitchToLogin={onSwitchToLogin} />
    </Modal>
  );
}